import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { S3_BUCKET, s3Client } from "@/lib/s3";
import { BLOG_IMAGE_NAME_RE, BLOG_IMAGE_PREFIX } from "@/lib/blog-images";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  if (!BLOG_IMAGE_NAME_RE.test(name)) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  try {
    const result = await s3Client.send(
      new GetObjectCommand({
        Bucket: S3_BUCKET,
        Key: `${BLOG_IMAGE_PREFIX}${name}`,
      })
    );

    if (!result.Body) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return new NextResponse(result.Body.transformToWebStream(), {
      status: 200,
      headers: {
        "Content-Type": result.ContentType ?? "application/octet-stream",
        // Names are random UUIDs and never reused, so cache forever.
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    const status =
      (error as { name?: string }).name === "NoSuchKey" ? 404 : 500;
    return NextResponse.json(
      { message: (error as Error).message },
      { status }
    );
  }
}
