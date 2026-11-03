import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { JSONContent } from "@tiptap/react";

import { prisma } from "@/lib/prisma";
import BlogContent from "@/components/blog/BlogContent";
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  blogCoverUrl,
  blogOgImageUrl,
} from "@/lib/blog-images";

export const dynamic = "force-dynamic";

function parseContent(raw: string | null | undefined): JSONContent | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as JSONContent;
  } catch {
    return null;
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      excerpt: true,
      author: true,
      coverImage: true,
      visibility: true,
      createdAt: true,
    },
  });
  if (!blog || blog.visibility === "PRIVATE") return { title: "Not found" };

  const description = blog.excerpt ?? `By ${blog.author}`;
  const ogImage = blog.coverImage
    ? {
        url: blogOgImageUrl({ id: blog.id, coverImage: blog.coverImage }),
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        type: "image/jpeg",
        alt: blog.title,
      }
    : undefined;

  return {
    title: blog.title,
    description,
    authors: [{ name: blog.author }],
    robots: blog.visibility === "UNLISTED" ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title: blog.title,
      description,
      url: `/blog/${slug}`,
      authors: [blog.author],
      publishedTime: blog.createdAt.toISOString(),
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: blog.title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog || blog.visibility === "PRIVATE") notFound();

  const content = parseContent(blog.content);

  return (
    <article className="min-h-screen w-full bg-back text-white flex flex-col items-center pb-20">
      {/* <div className="w-full xl:max-w-6xl md:max-w-3xl max-w-fit  px-4 sm:px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back
        </Link>
      </div> */}

      {blog.coverImage && (
        <div className="w-full h-full mt-10">
          <div className="relative w-1/2 rounded-xl border-white/10 border-2 justify-center items-center m-auto aspect-video  overflow-hidden border border-white/10">
            <Image
              src={blogCoverUrl({ id: blog.id, coverImage: blog.coverImage })}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <header className="w-full max-w-3xl px-4 sm:px-6 mt-10 flex flex-col gap-4">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          {blog.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/60 text-sm">
          <span>By {blog.author}</span>
          <span aria-hidden>·</span>
          <time dateTime={blog.createdAt.toISOString()}>
            {formatDate(blog.createdAt)}
          </time>
        </div>
        {blog.excerpt && (
          <p className="text-white/70 text-lg leading-relaxed">
            {blog.excerpt}
          </p>
        )}
      </header>

      <div className="w-full max-w-3xl px-4 sm:px-6 mt-10">
        {content ? (
          <BlogContent content={content} />
        ) : (
          <p className="text-white/60">This post has no content.</p>
        )}
      </div>
    </article>
  );
}
