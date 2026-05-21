"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import InfoCard from "@/components/InfoCard";
import AddBlog from "@/components/admin/AddBlog";

type Visibility = "PUBLIC" | "PRIVATE" | "UNLISTED";

interface Blog {
  id: string;
  title: string;
  slug: string;
  author: string;
  excerpt: string | null;
  coverImage: string | null;
  visibility: Visibility;
  createdAt: string;
}

const visibilityBadge: Record<Visibility, string> = {
  PUBLIC: "bg-green-500/20 text-green-300 border-green-400/40",
  UNLISTED: "bg-yellow-500/20 text-yellow-200 border-yellow-400/40",
  PRIVATE: "bg-red-500/20 text-red-300 border-red-400/40",
};

type ModalState =
  | { kind: "closed" }
  | { kind: "create" }
  | { kind: "edit"; id: string };

interface DashboardProps {
  logout: () => void;
}

export default function DashboardPage({ logout }: DashboardProps) {
  const [modal, setModal] = useState<ModalState>({ kind: "closed" });

  const { data, isLoading, error } = useQuery<Blog[]>({
    queryKey: ["admin-blogs"],
    queryFn: async () => (await axios.get("/api/admin/blogs")).data,
  });

  return (
    <div className="w-screen min-h-screen bg-back flex flex-col items-center gap-6 overflow-x-hidden p-6 sm:p-10">
      <div
        className="absolute top-0 right-0 p-4 cursor-pointer text-white"
        onClick={logout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
          />
        </svg>
      </div>

      <h1 className="text-4xl font-bold text-white mt-6">Welcome Noor</h1>

      <div className="w-full flex flex-col gap-4 max-w-7xl">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            Blogs
          </h2>
          <button
            type="button"
            onClick={() => setModal({ kind: "create" })}
            aria-label="Add blog"
            className="cursor-pointer hover:scale-110 duration-150 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>

        {isLoading && <div className="white-spinner w-7 h-7" />}
        {error && (
          <p className="text-red-400">
            {(error as Error).message ?? "Failed to load blogs"}
          </p>
        )}

        {data && data.length === 0 && (
          <p className="text-white/60">
            No blogs yet. Click the + above to add one.
          </p>
        )}

        {data && data.length > 0 && (
          <div className="flex flex-wrap gap-6 justify-center xl:justify-start">
            {data.map((blog) => (
              <div key={blog.id} className="relative">
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
                <span
                  className={`absolute top-3 left-3 z-10 px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border backdrop-blur-md ${visibilityBadge[blog.visibility]}`}
                >
                  {blog.visibility.toLowerCase()}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModal({ kind: "edit", id: blog.id });
                  }}
                  aria-label={`Edit ${blog.title}`}
                  title="Edit"
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 hover:scale-110 duration-150 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.862 4.487zM19.5 7.125l-3-3"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal.kind === "create" && (
        <AddBlog closeItem={() => setModal({ kind: "closed" })} />
      )}
      {modal.kind === "edit" && (
        <AddBlog
          blogId={modal.id}
          closeItem={() => setModal({ kind: "closed" })}
        />
      )}
    </div>
  );
}
