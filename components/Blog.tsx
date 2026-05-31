"use client";

import Link from "next/link";
import React from "react";
import InfoCard from "./InfoCard";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  author: string;
  excerpt: string | null;
  coverImage: string | null;
}

export default function Blog({ blogs }: { blogs: Blog[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
    skipSnaps: false,
  });

  return (
    <div className="w-full h-fit flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-row">
        {Array.from("Blog").map((letter, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="md:text-7xl text-6xl font-bold flex font-bebas"
          >
            {letter}
          </motion.p>
        ))}
      </div>

      <div className="flex mr-auto pt-5 pb-3 pl-10">
        <p className="text-white/60 text-sm font-bold">
          {blogs.length === 0
            ? "Nothing here yet — check back soon."
            : `${blogs.length} ${blogs.length === 1 ? "post" : "posts"}`}
        </p>
      </div>

      <div className="overflow-hidden flex flex-col mr-auto pl-10" ref={emblaRef}>
        <div className="flex flex-row gap-10 w-[100vw] py-1">
          {blogs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center items-center text-center pr-20 w-full"
            >
              <p className="flex text-2xl font-medium">No posts found :/</p>
            </motion.div>
          )}

          {blogs.map((blog) => (
            <div className="flex flex-col" key={blog.id}>
              <InfoCard
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
            </div>
          ))}
        </div>

        <div className="flex flex-row gap-3 ml-auto my-5 text-white w-fit pr-20">
          <svg
            className="size-10 bg-white rounded-full p-1 cursor-pointer"
            viewBox="-8.5 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <title>left</title>
            <path d="M7.094 15.938l7.688 7.688-3.719 3.563-11.063-11.063 11.313-11.344 3.531 3.5z"></path>
          </svg>

          <svg
            className="size-10 bg-white rounded-full p-1 cursor-pointer rotate-180"
            viewBox="-8.5 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => emblaApi?.scrollNext()}
          >
            <title>left</title>
            <path d="M7.094 15.938l7.688 7.688-3.719 3.563-11.063-11.063 11.313-11.344 3.531 3.5z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
