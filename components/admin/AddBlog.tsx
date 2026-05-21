"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { JSONContent } from "@tiptap/react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

type Visibility = "PUBLIC" | "PRIVATE" | "UNLISTED";

interface BlogDetail {
  id: string;
  title: string;
  slug: string;
  author: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  visibility: Visibility;
}

interface AddBlogProps {
  closeItem: () => void;
  blogId?: string;
}

export default function AddBlog({ closeItem, blogId }: AddBlogProps) {
  const isEditMode = !!blogId;

  const queryClient = useQueryClient();

  const {
    data: blog,
    isLoading: isLoadingBlog,
    error: loadError,
  } = useQuery<BlogDetail>({
    queryKey: ["admin-blog", blogId],
    queryFn: async () =>
      (await axios.get(`/api/admin/blogs/${blogId}`)).data,
    enabled: isEditMode,
  });

  if (isEditMode && (isLoadingBlog || loadError || !blog)) {
    return (
      <Shell closeItem={closeItem} title="Edit Blog">
        {isLoadingBlog && <div className="white-spinner w-7 h-7" />}
        {loadError && (
          <p className="text-red-400">
            {(loadError as Error).message ?? "Failed to load blog"}
          </p>
        )}
      </Shell>
    );
  }

  return (
    <Shell closeItem={closeItem} title={isEditMode ? "Edit Blog" : "Add Blog"}>
      <BlogForm
        closeItem={closeItem}
        blog={blog ?? null}
        onSaved={() => {
          queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
          if (blog) {
            queryClient.invalidateQueries({
              queryKey: ["admin-blog", blog.id],
            });
          }
          closeItem();
        }}
      />
    </Shell>
  );
}

function Shell({
  closeItem,
  title,
  children,
}: {
  closeItem: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 sm:p-8">
      <div className="relative w-full max-w-4xl bg-back/95 border border-white/10 rounded-2xl shadow-2xl flex flex-col gap-6 p-6 sm:p-8 my-8">
        <button
          type="button"
          onClick={closeItem}
          aria-label="Close"
          className="absolute top-3 right-3 cursor-pointer hover:scale-110 duration-150 p-2 text-white"
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
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>

        <h1 className="text-3xl font-bold text-white">{title}</h1>

        {children}
      </div>
    </div>
  );
}

function parseContent(raw: string | undefined | null): JSONContent | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as JSONContent;
  } catch {
    return null;
  }
}

function BlogForm({
  closeItem,
  blog,
  onSaved,
}: {
  closeItem: () => void;
  blog: BlogDetail | null;
  onSaved: () => void;
}) {
  const isEditMode = !!blog;

  const [title, setTitle] = useState(blog?.title ?? "");
  const [author, setAuthor] = useState(blog?.author ?? "");
  const [excerpt, setExcerpt] = useState(blog?.excerpt ?? "");
  const [visibility, setVisibility] = useState<Visibility>(
    blog?.visibility ?? "PRIVATE"
  );
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const contentRef = useRef<JSONContent | null>(parseContent(blog?.content));

  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!title.trim() || !author.trim()) {
        throw new Error("Title and author are required");
      }
      if (!contentRef.current) {
        throw new Error("Content cannot be empty");
      }

      const form = new FormData();
      form.append("title", title.trim());
      form.append("author", author.trim());
      form.append("excerpt", excerpt.trim());
      form.append("visibility", visibility);
      form.append("content", JSON.stringify(contentRef.current));
      if (coverFile) form.append("coverImage", coverFile);

      const url = isEditMode
        ? `/api/admin/blogs/${blog!.id}`
        : "/api/admin/blogs";
      const method = isEditMode ? "patch" : "post";
      const { data } = await axios.request({ url, method, data: form });
      return data;
    },
    onSuccess: () => {
      onSaved();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!blog) return;
      await axios.delete(`/api/admin/blogs/${blog.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      closeItem();
    },
  });

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCoverFile(file);
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverPreview(file ? URL.createObjectURL(file) : null);
  };

  const isSaving = saveMutation.isPending;
  const isDeleting = deleteMutation.isPending;
  const errorMessage =
    (saveMutation.error as Error | null)?.message ??
    (deleteMutation.error as Error | null)?.message ??
    null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveMutation.mutate();
      }}
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm text-white/70">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My great post"
          className="w-full p-2 rounded-md border border-white/30 bg-black/30 text-white"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-white/70">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Kanwarnoor"
          className="w-full p-2 rounded-md border border-white/30 bg-black/30 text-white"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-white/70">Excerpt (optional)</label>
        <input
          type="text"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Short summary for cards"
          className="w-full p-2 rounded-md border border-white/30 bg-black/30 text-white"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-white/70">Visibility</label>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value as Visibility)}
          className="w-full p-2 rounded-md border border-white/30 bg-black/30 text-white cursor-pointer"
        >
          <option value="PUBLIC" className="bg-back">
            Public — listed on home page, anyone with the link can view
          </option>
          <option value="UNLISTED" className="bg-back">
            Unlisted — hidden from home, anyone with the link can view
          </option>
          <option value="PRIVATE" className="bg-back">
            Private — hidden everywhere, link does not work
          </option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-white/70">
          Cover image{isEditMode ? " (leave empty to keep current)" : ""}
        </label>
        {isEditMode && blog?.coverImage && !coverPreview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/api/blogs/${blog.id}/cover`}
            alt="Current cover"
            className="max-h-48 w-auto object-cover rounded-md border border-white/10"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverChange}
          className="w-full p-2 rounded-md border border-white/30 bg-black/30 text-white file:bg-white/10 file:border-0 file:text-white file:px-3 file:py-1 file:mr-3 file:rounded-md cursor-pointer"
        />
        {coverPreview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverPreview}
            alt="Cover preview"
            className="mt-2 max-h-48 w-auto object-cover rounded-md border border-white/10"
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-white/70">Content</label>
        <div className="admin-editor-host">
          <SimpleEditor
            content={parseContent(blog?.content)}
            onUpdate={(json) => {
              contentRef.current = json;
            }}
          />
        </div>
      </div>

      {errorMessage && (
        <p className="text-red-400 text-sm">{errorMessage}</p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        {isEditMode ? (
          <div className="flex items-center gap-2">
            {!confirmDelete ? (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="px-4 py-2 rounded-md border border-red-500/60 text-red-400 hover:bg-red-500/10 cursor-pointer"
                disabled={isSaving || isDeleting}
              >
                Delete
              </button>
            ) : (
              <>
                <span className="text-red-400 text-sm">Are you sure?</span>
                <button
                  type="button"
                  onClick={() => deleteMutation.mutate()}
                  disabled={isDeleting}
                  className="px-3 py-2 rounded-md bg-red-500/80 text-white hover:bg-red-500 disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {isDeleting && <span className="white-spinner w-4 h-4" />}
                  {isDeleting ? "Deleting…" : "Yes, delete"}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  disabled={isDeleting}
                  className="px-3 py-2 rounded-md border border-white/30 text-white hover:bg-white/10 cursor-pointer"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        ) : (
          <span />
        )}

        <div className="flex gap-3 ml-auto">
          <button
            type="button"
            onClick={closeItem}
            className="px-4 py-2 rounded-md border border-white/30 text-white hover:bg-white/10 cursor-pointer"
            disabled={isSaving || isDeleting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving || isDeleting}
            className="px-4 py-2 rounded-md bg-front text-white border border-white/30 hover:bg-front/80 disabled:opacity-50 cursor-pointer flex items-center gap-2"
          >
            {isSaving && <span className="white-spinner w-4 h-4" />}
            {isSaving
              ? isEditMode
                ? "Saving…"
                : "Publishing…"
              : isEditMode
                ? "Save changes"
                : "Publish"}
          </button>
        </div>
      </div>
    </form>
  );
}
