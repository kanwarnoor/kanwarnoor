import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";
import { S3_BUCKET, s3Client } from "@/lib/s3";
import { isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function uniqueSlug(base: string): Promise<string> {
  const root = base || "post";
  let candidate = root;
  let n = 1;
  while (await prisma.blog.findUnique({ where: { slug: candidate } })) {
    n += 1;
    candidate = `${root}-${n}`;
  }
  return candidate;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        author: true,
        excerpt: true,
        coverImage: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const title = (form.get("title") as string | null)?.trim();
    const author = (form.get("author") as string | null)?.trim();
    const contentRaw = form.get("content") as string | null;
    const excerpt = (form.get("excerpt") as string | null)?.trim() || null;
    const cover = form.get("coverImage");

    if (!title || !author || !contentRaw) {
      return NextResponse.json(
        { message: "title, author and content are required" },
        { status: 400 }
      );
    }

    let coverKey: string | null = null;
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

      coverKey = key;
    }

    const slug = await uniqueSlug(slugify(title));

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        author,
        content: contentRaw,
        excerpt,
        coverImage: coverKey,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
