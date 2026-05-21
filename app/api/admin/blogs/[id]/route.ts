import { NextRequest, NextResponse } from "next/server";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Visibility } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { S3_BUCKET, s3Client } from "@/lib/s3";
import { isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

function parseVisibility(raw: string | null | undefined): Visibility | null {
  if (!raw) return null;
  const upper = raw.toUpperCase();
  if (upper === "PUBLIC" || upper === "PRIVATE" || upper === "UNLISTED") {
    return upper as Visibility;
  }
  return null;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function uniqueSlug(base: string, excludeId: string): Promise<string> {
  const root = base || "post";
  let candidate = root;
  let n = 1;
  while (true) {
    const existing = await prisma.blog.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!existing || existing.id === excludeId) return candidate;
    n += 1;
    candidate = `${root}-${n}`;
  }
}

async function deleteFromS3(key: string | null | undefined) {
  if (!key) return;
  try {
    await s3Client.send(
      new DeleteObjectCommand({ Bucket: S3_BUCKET, Key: key })
    );
  } catch (err) {
    console.error("Failed to delete S3 object", key, err);
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const existing = await prisma.blog.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const form = await req.formData();
    const title = (form.get("title") as string | null)?.trim();
    const author = (form.get("author") as string | null)?.trim();
    const contentRaw = form.get("content") as string | null;
    const excerptRaw = form.get("excerpt") as string | null;
    const visibility = parseVisibility(form.get("visibility") as string | null);
    const cover = form.get("coverImage");

    const data: {
      title?: string;
      slug?: string;
      author?: string;
      content?: string;
      excerpt?: string | null;
      coverImage?: string | null;
      visibility?: Visibility;
    } = {};

    if (visibility) data.visibility = visibility;

    if (title && title !== existing.title) {
      data.title = title;
      data.slug = await uniqueSlug(slugify(title), id);
    }
    if (author) data.author = author;
    if (contentRaw) data.content = contentRaw;
    if (excerptRaw !== null) {
      const trimmed = excerptRaw.trim();
      data.excerpt = trimmed.length ? trimmed : null;
    }

    let oldCoverToDelete: string | null = null;
    if (cover instanceof File && cover.size > 0) {
      const ext = (cover.name.split(".").pop() || "bin").toLowerCase();
      const key = `blogs/${crypto.randomUUID()}.${ext}`;
      const arrayBuffer = await cover.arrayBuffer();
      await s3Client.send(
        new PutObjectCommand({
          Bucket: S3_BUCKET,
          Key: key,
          Body: Buffer.from(arrayBuffer),
          ContentType: cover.type || "application/octet-stream",
        })
      );
      data.coverImage = key;
      oldCoverToDelete = existing.coverImage;
    }

    const updated = await prisma.blog.update({ where: { id }, data });

    if (oldCoverToDelete && oldCoverToDelete !== updated.coverImage) {
      await deleteFromS3(oldCoverToDelete);
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const existing = await prisma.blog.findUnique({
      where: { id },
      select: { coverImage: true },
    });
    if (!existing) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    await prisma.blog.delete({ where: { id } });
    await deleteFromS3(existing.coverImage);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
