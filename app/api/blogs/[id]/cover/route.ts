import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";
import { S3_BUCKET, s3Client } from "@/lib/s3";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const blog = await prisma.blog.findUnique({
      where: { id },
      select: { coverImage: true },
    });

    if (!blog?.coverImage) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const result = await s3Client.send(
      new GetObjectCommand({ Bucket: S3_BUCKET, Key: blog.coverImage })
    );

    if (!result.Body) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return new NextResponse(result.Body.transformToWebStream(), {
      status: 200,
      headers: {
        "Content-Type": result.ContentType ?? "application/octet-stream",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
