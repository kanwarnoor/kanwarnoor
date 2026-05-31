import React from "react";
import Lander from "@/components/Lander";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import About from "@/components/About"
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Page() {
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
    <>
      <section id="home" className="w-full h-screen overflow-hidden">
        <Lander />
      </section>

      {/* <Player /> */}
      <section
        id="projects"
        className="w-full md:hidden flex h-screen bg-back flex-row items-center justify-center"
      >
        <About />
      </section>


      <section
        id="projects"
        className="w-full md:hidden flex h-screen bg-back flex-row items-center justify-center"
      >
        <Projects />
      </section>

      <section
        id="skills"
        className="w-full h-screen flex md:hidden bg-black flex flex-row items-center justify-center overflow-hidden"
      >
        <Skills />
      </section>
      <section
        id="blog"
        className="w-full h-screen flex md:hidden  bg-back flex flex-row items-center justify-center overflow-hidden"
      >
        <Blog blogs={blogs} />
      </section>

      <section
        id="contact"
        className="w-full h-screen flex md:hidden bg-white text-black flex flex-row items-center justify-center overflow-hidden"
      >
        <Contact />
      </section>

      <section id="footer" className="w-screen h-1/2 flex md:hidden ">
        <Footer />
      </section>


    </>
  );
}
