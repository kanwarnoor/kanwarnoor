import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { prisma } from "@/lib/prisma";
import { S3_BUCKET, s3Client } from "@/lib/s3";
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "@/lib/blog-images";

export const runtime = "nodejs";

/**
 * Link-preview version of a blog's cover: 1200x630 JPEG, small enough for
 * WhatsApp / iMessage / Discord / X etc. Raw covers can be up to 4MB and in
 * formats (webp, avif, heic) that many preview scrapers ignore.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const blog = await prisma.blog.findUnique({
      where: { id },
      select: { coverImage: true, visibility: true },
    });

    if (!blog?.coverImage || blog.visibility === "PRIVATE") {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const result = await s3Client.send(
      new GetObjectCommand({ Bucket: S3_BUCKET, Key: blog.coverImage })
    );
    if (!result.Body) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const input = await result.Body.transformToByteArray();
    const jpeg = await sharp(input)
      .rotate() // respect EXIF orientation
      .resize(OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT, { fit: "cover" })
      .flatten({ background: "#000000" }) // transparent PNGs → black, not white
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();

    return new NextResponse(new Uint8Array(jpeg), {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Length": String(jpeg.length),
        // URL carries ?v=<s3 key>, so a new cover gets a new URL.
        "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
