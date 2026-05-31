import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import InfoCard from "@/components/InfoCard";
import Blog from "@/components/Blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing by Kanwarnoor",
};

export default async function BlogIndexPage() {
  const blogs = await prisma.blog.findMany({
    where: { visibility: "PUBLIC" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      author: true,
      excerpt: true,
      coverImage: true,
      createdAt: true,
    },
  });

  return (
    <section className="w-full min-h-screen bg-back text-white flex flex-row items-center justify-center overflow-hidden">
      <Blog blogs={blogs} />
    </section>
  );
}
