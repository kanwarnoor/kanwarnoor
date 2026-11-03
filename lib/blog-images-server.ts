// Server-only: imports prisma and the S3 client. Never import from client code.
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import type { JSONContent } from "@tiptap/react";
import { prisma } from "@/lib/prisma";
import { S3_BUCKET, s3Client } from "@/lib/s3";
import { BLOG_IMAGE_PREFIX, collectBlogImageKeys } from "@/lib/blog-images";

/** Parses stored blog content; returns null for empty / non-JSON content. */
export function parseStoredContent(raw: string | null | undefined) {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as JSONContent;
  } catch {
    return null;
  }
}

/**
 * Deletes the given blog-content image keys from S3, skipping any that are
 * still referenced by some saved blog (e.g. an image copy-pasted into
 * another post). Call it AFTER the database write, so the check sees the
 * new state.
 */
export async function deleteUnreferencedBlogImages(keys: string[]) {
  const unique = [...new Set(keys)].filter((k) =>
    k.startsWith(BLOG_IMAGE_PREFIX)
  );

  await Promise.all(
    unique.map(async (key) => {
      const name = key.slice(BLOG_IMAGE_PREFIX.length);
      try {
        const stillUsed = await prisma.blog.findFirst({
          where: { content: { contains: name } },
          select: { id: true },
        });
        if (stillUsed) return;

        await s3Client.send(
          new DeleteObjectCommand({ Bucket: S3_BUCKET, Key: key })
        );
      } catch (err) {
        console.error("Failed to clean up blog image", key, err);
      }
    })
  );
}

/** Image keys present in `before` but no longer in `after`. */
export function removedImageKeys(
  before: string | null | undefined,
  after: string | null | undefined
) {
  const next = new Set(collectBlogImageKeys(parseStoredContent(after)));
  return collectBlogImageKeys(parseStoredContent(before)).filter(
    (k) => !next.has(k)
  );
}
