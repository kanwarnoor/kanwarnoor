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

      {/* <section
        id="about"
        className="w-full h-screen bg-gradient-to-b bg-back/50 to-back flex flex-row items-center justify-center"
      >
        <About />
      </section>

      <section
        id="projects"
        className="w-full h-screen bg-back flex flex-row items-center justify-center"
      >
        <Projects />
      </section>

      <section
        id="skills"
        className="w-full h-screen  bg-black flex flex-row items-center justify-center overflow-hidden"
      >
        <Skills />
      </section>
      <section
        id="blog"
        className="w-full h-screen  bg-black flex flex-row items-center justify-center overflow-hidden"
      > 
        <Blog blogs={blogs} />
      </section>

      <section
        id="contact"
        className="w-full h-screen bg-white text-black flex flex-row items-center justify-center overflow-hidden"
      >
        <Contact />
      </section> */}

      {/* <section
        id="blog"
        className="w-full h-screen  bg-black flex flex-row items-center justify-center"
      >
        <div className="w-full h-full flex flex-col justify-center items-center ">
          <Blog />
        </div>
      </section> */}
{/* 
      <section id="footer" className="w-screen h-1/2 flex ">
        <Footer />
      </section> */}

      {/* <div className="w-screen h-screen bg-red-200 text-white flex flex-row items-center justify-center">
        <div className="w-full h-full flex flex-col justify-center items-center ">
          <p>Footer</p>
        </div>
      </div> */}
    </>
  );
}
