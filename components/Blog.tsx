"use client";

import Link from "next/link";
import React from "react";
import InfoCard from "./InfoCard";

interface Blog {
  id: string;
  title: string;
  slug: string;
  author: string;
  excerpt: string | null;
  coverImage: string | null;
}

export default function Blog( { blogs }: { blogs: Blog[] } ) {
  return (
    <main className="z-20 min-h-screen w-full bg-back text-white flex flex-col items-center px-4 sm:px-6 py-10 sm:py-16 gap-10">
      <header className="w-full max-w-7xl flex flex-col gap-3">
        {/* <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors w-fit"
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
        </Link> */}
        <h1 className="text-5xl sm:text-6xl font-bold font-bebas">Blog</h1>
        <p className="text-white/60">
          {blogs.length === 0
            ? "Nothing here yet — check back soon."
            : `${blogs.length} ${blogs.length === 1 ? "post" : "posts"}`}
        </p>
      </header>

      {blogs.length > 0 && (
        <section className="w-full max-w-7xl">
          <div className="flex flex-wrap gap-6 justify-center xl:justify-start">
            {blogs.map((blog) => (
              <InfoCard
                key={blog.id}
                title1={blog.title}
                des={blog.excerpt ?? blog.author}
                image={
                  blog.coverImage
                    ? `/api/blogs/${blog.id}/cover`
                    : "/images/projects/remaster.webp"
                }
                link={`/blog/${blog.slug}`}
                animation="center"
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
