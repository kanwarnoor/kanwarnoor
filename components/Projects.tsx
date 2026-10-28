"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InfoCard from "./InfoCard";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { RouteContext } from "@/context/routeContext";
// import { div, i } from "framer-motion/client";

export default function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
    skipSnaps: false,
  });

  const data = [
    {
      title: "UK India Business Council",
      des: "Client work Website for UK India Business Council",
      image: "/images/projects/ukindia.webp",
      link: "https://www.ukibc.com/",
      animation: "center",
      type: ["web"],
      tags: ["all", "client"],
      index: 1,
      content: `My role at UKIBC was to completely rebuild their website, migrating it from an old WordPress installation to a modern full-stack architecture. They wanted advanced animations, fully custom UI components, and custom business logic that wasn't possible with their previous setup.
      <br><br>
      The organization already had thousands of existing posts, news articles, events, and reports. One of my first tasks was migrating all of this content from WordPress into Amazon DynamoDB. Since the data was largely unstructured, a document database was the right choice—it was cost-effective on AWS and performed well for the project's requirements. I also migrated all media assets to Amazon S3, allowing them to be served efficiently through CloudFront.
<br><br>
To automate the migration, I wrote a custom Python script that transferred content directly from the WordPress API into DynamoDB.
<br><br>
Once the migration was complete, I started building the frontend and integrating it with the new database.
<br><br>
This project was particularly challenging because it required much more than standard CRUD functionality for posts and reports. The entire website had to be fully dynamic, allowing administrators to modify sections, titles, images, and page content without touching the code. Every page has its own dedicated admin interface, making the entire website editable from the backend.
<br><br>
This project also gave me practical experience with Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR). Initially, I hosted the website on Vercel, but because of the large number of images that needed optimization and delivery, I reached the limits of the free plan on the first day after launch. Rather than paying for Vercel's Pro plan, I decided to migrate the project to AWS Amplify. Although configuring ISR on Amplify introduced its own challenges, the migration proved worthwhile. The website became faster than it was on Vercel, while the complete AWS infrastructure cost remained under $5 per month.
<br><br>
The infrastructure uses a combination of AWS services:
<br><br>
Amazon DynamoDB for content storage
<br>
Amazon S3 for media storage
<br>
Amazon CloudFront for global content delivery
<br>
AWS Amplify for hosting and deployment
<br><br>
Despite being my first large-scale production infrastructure project, it taught me a great deal about cloud architecture, performance optimization, and scalable web development. Seeing everything come together into a fast, reliable, and cost-effective platform made the challenges well worth it.
<br><br>
Note: The website is now managed by UKIBC's internal team. I handed over the complete codebase and the project is hosted within their own AWS infrastructure.`,
    },
    {
      title: "Ardent Co.",
      des: "Dynamic communications, research, and public policy advisory firm",
      image: "/images/projects/ardent.webp",
      link: "https://ardentco.in/",
      animation: "center",
      tags: ["all", "client"],
      type: ["web"],
      index: 2,
      content: `Ardent Co wanted a modern, animation-heavy website that reflected their brand identity. My work on this project was primarily focused on the frontend, with the exception of the contact forms, which required SMTP integration, along with Google and Meta Analytics for visitor tracking.<br><br>

I had only recently started working with React and Next.js when I got Ardent Co as a client. Although I was new to Next.js, I picked it up quickly because this project was more creative than technically complex. It also introduced me to several animation frameworks that make websites feel more interactive and engaging. Two of the main libraries I learned were Framer Motion and GSAP. This website relies primarily on Framer Motion for its animations, and it has remained one of my go-to libraries because of how simple it is to use while still producing smooth, high-quality animations.<br><br>

Every carousel on the website was built from scratch. I deliberately avoided using pre-built components or libraries because I wanted complete control over the behavior and animations. This approach not only gave me the flexibility to create exactly what I envisioned but also helped me better understand how these interactions work under the hood.<br><br>

One of my favorite sections is the first one users encounter after the landing page. It features a 3D chess piece rendered with Three.js that rotates clockwise or counterclockwise depending on the user's scroll direction. Since this is the first section visitors see after scrolling, I wanted it to leave a strong impression.<br><br>

Before settling on the chess piece, I experimented with several concepts. One idea used a compass as the background with the compass needle as a separate PNG layered on top. The needle would rotate 90 degrees as the user moved between sections. Exploring ideas like these and solving the animation challenges was one of the most enjoyable parts of building this project.<br><br>

Note: The website is now managed by Ardent Co's own team. I handed over the complete codebase, and it is now hosted on their own infrastructure.
`,
    },
    {
      title: "TSS",
      des: "Official website for Technical Student Society of G.N.D.U .",
      image: "/images/projects/tss.webp",
      animation: "center",
      link: "https://tssgndu.vercel.app/",
      tags: ["all", "client"],
      type: ["web"],
      index: 5,
      content: "A",
    },
    {
      title: "Remaster",
      des: "A platform for artists to store and sell their music",
      image: "/images/projects/remaster.webp",
      animation: "center",
      link: "https://remaster.in/",
      tags: ["all", "personal"],
      type: ["web", "app"],
      index: 3,
      content: "A",
    },
    {
      title: "Rhetor",
      des: "Content and creator agency that pairs thoughtful strategy with high-impact execution.",
      image: "/images/projects/rhetor.webp",
      link: "https://rhetor.in/",
      animation: "center",
      tags: ["all", "client"],
      type: ["web"],
      index: 4,
      content: `Rhetor was a fast-paced client project that I completed in under a week. It is a single-page website that required a variety of animations and several sections where I had the freedom to be creative.<br><br>

This project was where I properly learned <a href="https://gsap.com/" target="_blank" rel="noopener noreferrer">GSAP</a>. It required sequenced animations and fine-grained control over individual animation timelines. Combining <a href="https://motion.dev/" target="_blank" rel="noopener noreferrer">Framer Motion</a> for smooth UI transitions with GSAP for complex animation sequences allowed me to build the entire experience exactly as the client envisioned.<br><br>

Each section of the website uses relatively simple GSAP animations, but together they create an engaging experience that matches Rhetor's branding. Every section occupies the full viewport height (100vh) and snaps into place as the user scrolls, which was a specific requirement from the client.<br><br>

Personally, I prefer websites with natural scrolling over full-page snap scrolling, especially when a visible scrollbar is present. That preference influenced the design of <a href="https://kanwarnoor.com" target="_blank" rel="noopener noreferrer">kanwarnoor.com</a>, where I built pages that transition their content based on the user's scroll position instead of relying on traditional page snapping. This approach keeps the experience fluid while still allowing for highly interactive animations.
`,
    },
    {
      title: "Guru Nanak Dev University",
      des: "Bringing all colleges under one website",
      image: "/images/projects/gndu.webp",
      animation: "center",
      link: "https://university-verka.vercel.app/",
      tags: ["all", "client", "collaboration"],
      type: ["web"],
      index: 6,
      content: "A",
    },
    {
      title: "Fullscreen",
      des: "See your spotify songs in fullscreen",
      image: "/images/projects/fullscreen.webp",
      link: "https://fullscreen.remaster.in/",
      animation: "center",
      tags: ["all", "personal"],
      type: ["web"],
      index: 7,
      content: "A",
    },
  ];

  const [filter, setFilter] = useState([
    {
      name: "All",
      sort: 0,
      active: true,
    },
    {
      name: "Personal",
      sort: 1,
      active: false,
    },
    {
      name: "Client",
      sort: 2,
      active: false,
    },
    {
      name: "Collaboration",
      sort: 3,
      active: false,
    },
  ]);

  const [content, setContent] = useState<{ active: boolean; index: number }>({
    active: false,
    index: 0,
  });

  const { setNavLocked } = useContext(RouteContext);

  const activeFilter = filter.find((f) => f.active)?.name.toLowerCase();

  const filteredData = data.filter((item) => {
    if (activeFilter === "all") return true;
    return item.tags.includes(activeFilter || "");
  });

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  useEffect(() => {
    if (!content.active) return;

    // Suspend scroll-to-navigate so the user can scroll the content freely.
    setNavLocked(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setContent((prev) => ({ ...prev, active: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      setNavLocked(false);
    };
  }, [content.active, setNavLocked]);

  return (
    <div className="w-full h-fit flex flex-col items-center justify-center overflow-hidden">
      {!content.active ? (
        <div className="items-center justify-center flex flex-col">
          <div className="flex flex-row">
            {Array.from("Projects").map((letter, index) => {
              return (
                <motion.p
                  key={index}
                  initial={{
                    opacity: 0,
                    filter: "blur(20px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="md:text-7xl text-6xl font-bold flex font-bebas"
                >
                  {letter}
                </motion.p>
              );
            })}
          </div>
          <div className="flex mr-auto pt-5 pb-3 pl-10 flex-row  gap-10">
            <div className="flex flex-row md:gap-3 gap-1">
              {[...filter]
                .sort((a, b) => Number(b.active) - Number(a.active))
                .map((item, index) => {
                  return (
                    <motion.p
                      layout
                      key={item.name}
                      className={`md:text-base text-sm cursor-pointer font-bold rounded-full md:px-4 md:py-2 py-2 px-3 transition-colors ${
                        item.active
                          ? "bg-white/20 border border-white/20 backdrop-blur-sm text-white"
                          : "hover:bg-white/20 hover:text-white text-white/60"
                      }`}
                      onClick={() =>
                        setFilter(
                          filter.map((f) => ({
                            ...f,
                            active: f.name === item.name,
                          })),
                        )
                      }
                    >
                      <motion.span
                        className="inline-block"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: (index + 1) * 0.05,
                        }}
                      >
                        {item.name}
                      </motion.span>
                    </motion.p>
                  );
                })}
            </div>
          </div>
          <div
            className="overflow-hidden flex flex-col mr-auto pl-10 "
            ref={emblaRef}
          >
            <div className="flex flex-row gap-10 w-[100vw] pt-1 pb-6 ">
              {filteredData.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col justify-center items-center text-center pr-20 w-full"
                >
                  <p className="flex text-2xl font-medium">
                    No projects found :/
                  </p>
                </motion.div>
              )}

              <AnimatePresence mode="popLayout">
                {filteredData.map((item, index) => {
                  return (
                    <motion.div
                      layout
                      key={item.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      // transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="flex flex-col "
                      onClick={() =>
                        item.content &&
                        setContent({
                          active: true,
                          index: item.index,
                        })
                      }
                    >
                      <InfoCard
                        title1={item.title}
                        des={item.des}
                        type={item.type}
                        image={item.image}
                        animation={"center"}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            {/* control buttons */}
            <div className="flex flex-row gap-3 ml-auto my-5 text-white w-fit pr-20 ">
              <motion.svg
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="size-10 bg-white/50 border border-white/20 backdrop-blur-sm rounded-full p-1 cursor-pointer"
                viewBox="-8.5 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => emblaApi?.scrollPrev()}
              >
                <title>left</title>
                <path d="M7.094 15.938l7.688 7.688-3.719 3.563-11.063-11.063 11.313-11.344 3.531 3.5z"></path>
              </motion.svg>

              <motion.svg
                animate={{ rotate: 180 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="size-10 bg-white/50 border border-white/20 backdrop-blur-sm rounded-full p-1 cursor-pointer"
                viewBox="-8.5 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => emblaApi?.scrollNext()}
              >
                <title>left</title>
                <path d="M7.094 15.938l7.688 7.688-3.719 3.563-11.063-11.063 11.313-11.344 3.531 3.5z"></path>
              </motion.svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen max-h-screen overflow-y-auto items-start flex flex-col pt-24 pb-32 relative">
          <motion.div
            initial={{
              opacity: 0,
              filter: "blur(20px)",
              y: -15,
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="w-full h-auto relative flex flex-col"
          >
            {/* blurred colorful shadow behind */}
            <Image
              src={data[content.index - 1].image}
              width={0}
              height={0}
              sizes="100vh"
              aria-hidden
              className="absolute  inset-0  w-1/2 h-full justify-center m-auto scale-105 blur-2xl opacity-70 rounded-2xl pointer-events-none"
              alt=""
            />
            {/* sharp image on top */}
            <Image
              src={data[content.index - 1].image}
              width={0}
              height={0}
              sizes="100vh"
              className="relative z-10 w-1/2 justify-center m-auto h-full rounded-2xl"
              alt="project image"
            />
            <div className="flex w-1/2 left-0 right-0 justify-center m-auto items-center gap-3 z-10 -bottom-5 absolute text-6xl font-bold text-left">
              <motion.span
                initial={{ opacity: 0, filter: "blur(20px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {data[content.index - 1].title}
              </motion.span>
              {data[content.index - 1].type &&
                data[content.index - 1].type.length > 0 && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      filter: "blur(20px)",
                      y: -15,
                    }}
                    animate={{
                      opacity: 1,
                      filter: "blur(0px)",
                      y: 0,
                    }}
                    transition={{
                      delay: 0.3,
                    }}
                    className="flex  mt-5 justify-center my-auto items-center gap-2 rounded-full border border-white/20 bg-black/10 px-4 py-2 shadow-lg backdrop-blur-sm"
                  >
                    {data[content.index - 1].type.includes("web") && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                        />
                      </svg>
                    )}
                    {data[content.index - 1].type.includes("app") && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                        />
                      </svg>
                    )}
                  </motion.div>
                )}
            </div>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              filter: "blur(20px)",
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{
              delay: 0.5,
            }}
            className="project-content mt-20 text-left text-xl w-[70%] text-white/80 m-auto"
            dangerouslySetInnerHTML={{
              __html: data[content.index - 1].content ?? "",
            }}
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, scale: "90%" }}
            animate={{ opacity: 1, scale: "100%" }}
            whileHover={{
              scale: "110%",
            }}
            className="fixed right-10 top-20 cursor-pointer hover:scale-110 z-50"
            onClick={() => setContent((prev) => ({ ...prev, active: false }))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: "90%", y: -10 }}
            animate={{ opacity: 1, scale: "100%", y: 0 }}
            whileHover={{
              scale: "110%",
            }}
            className="fixed left-1/2 -translate-x-1/2 z-50 bottom-10 cursor-pointer border-white/20 border-1 bg-white/10 backdrop-blur-sm flex flex-row justify-center items-center px-3 py-2 w-fit rounded-full gap-2"
            onClick={() => window.open(data[content.index - 1].link, "_blank")}
          >
            Check it out
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  );
}
