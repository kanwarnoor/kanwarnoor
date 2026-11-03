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
