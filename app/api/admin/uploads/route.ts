import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { S3_BUCKET, s3Client } from "@/lib/s3";
import { isAdmin } from "@/lib/admin-auth";
import {
  BLOG_IMAGE_PREFIX,
  BLOG_IMAGE_ROUTE,
  MAX_BLOG_IMAGE_SIZE,
} from "@/lib/blog-images";

export const runtime = "nodejs";

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/avif": "avif",
};

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    const ext = EXT_BY_TYPE[file.type];
    if (!ext) {
      return NextResponse.json(
        { message: "Unsupported image type (use JPG, PNG, GIF, WebP or AVIF)" },
        { status: 415 }
      );
    }

    if (file.size > MAX_BLOG_IMAGE_SIZE) {
      return NextResponse.json(
        {
          message: `Image is too large (max ${MAX_BLOG_IMAGE_SIZE / 1024 / 1024}MB)`,
        },
        { status: 413 }
      );
    }

    const name = `${crypto.randomUUID()}.${ext}`;
    await s3Client.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: `${BLOG_IMAGE_PREFIX}${name}`,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: file.type,
      })
    );

    return NextResponse.json(
      { url: `${BLOG_IMAGE_ROUTE}${name}` },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
