import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import {
  BLOG_IMAGE_NAME_RE,
  BLOG_IMAGE_PREFIX,
  BLOG_IMAGE_ROUTE,
} from "@/lib/blog-images";
import { deleteUnreferencedBlogImages } from "@/lib/blog-images-server";

export const runtime = "nodejs";

/**
 * Called by the editor when it closes, with every image URL uploaded during
 * that session. Deletes the ones no saved blog references (uploaded then
 * removed, or the editor was closed without saving). POST so that
 * navigator.sendBeacon can call it when the tab is closed.
 */
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as { urls?: unknown };
    const urls = Array.isArray(body.urls) ? body.urls.slice(0, 100) : [];

    const keys = urls
      .filter((u): u is string => typeof u === "string")
      .filter((u) => u.startsWith(BLOG_IMAGE_ROUTE))
      .map((u) => u.slice(BLOG_IMAGE_ROUTE.length))
      .filter((name) => BLOG_IMAGE_NAME_RE.test(name))
      .map((name) => `${BLOG_IMAGE_PREFIX}${name}`);

    await deleteUnreferencedBlogImages(keys);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
