import type { JSONContent } from "@tiptap/react";

/** S3 key prefix for images embedded in blog content. */
export const BLOG_IMAGE_PREFIX = "blogs/content/";

/** Public URL prefix that serves those images (see app/api/blogs/images). */
export const BLOG_IMAGE_ROUTE = "/api/blogs/images/";

/**
 * Kept under Vercel's ~4.5MB request body limit, since uploads go
 * through a Next.js route handler.
 */
export const MAX_BLOG_IMAGE_SIZE = 4 * 1024 * 1024;

/** Only names we generated: <uuid>.<ext>. Blocks path traversal. */
export const BLOG_IMAGE_NAME_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|gif|webp|avif)$/;

/** Walks Tiptap JSON and collects the S3 keys of our uploaded images. */
export function collectBlogImageKeys(content: JSONContent | null): string[] {
  const keys = new Set<string>();
  const walk = (node: JSONContent) => {
    const src = node.type === "image" ? node.attrs?.src : undefined;
    if (typeof src === "string" && src.startsWith(BLOG_IMAGE_ROUTE)) {
      const name = src.slice(BLOG_IMAGE_ROUTE.length);
      if (BLOG_IMAGE_NAME_RE.test(name)) keys.add(`${BLOG_IMAGE_PREFIX}${name}`);
    }
    node.content?.forEach(walk);
  };
  if (content) walk(content);
  return [...keys];
}

/** True if the content still contains an upload placeholder box. */
export function hasPendingImageUploads(content: JSONContent | null): boolean {
  if (!content) return false;
  if (content.type === "imageUpload") return true;
  return content.content?.some(hasPendingImageUploads) ?? false;
}

/**
 * Public URL for a blog's cover image. Every upload gets a fresh S3 key, so
 * the key doubles as a cache-busting version: replacing the cover changes
 * the URL, and browsers / the Next image optimizer fetch the new image.
 */
export function blogCoverUrl(blog: { id: string; coverImage: string }) {
  return `/api/blogs/${blog.id}/cover?v=${coverVersion(blog.coverImage)}`;
}

/** Size of the link-preview (Open Graph / Twitter card) image. */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/** Link-preview URL for a blog's cover: resized JPEG (see app/api/blogs/[id]/og). */
export function blogOgImageUrl(blog: { id: string; coverImage: string }) {
  return `/api/blogs/${blog.id}/og?v=${coverVersion(blog.coverImage)}`;
}

function coverVersion(coverImage: string) {
  return encodeURIComponent(coverImage.split("/").pop() ?? coverImage);
}
