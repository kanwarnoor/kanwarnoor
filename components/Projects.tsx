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
    },
    {
      title: "Guru Nanak Dev University",
      des: "Bringing all colleges under one website",
      image: "/images/projects/gndu.webp",
      animation: "center",
      link: "https://university-verka.vercel.app/",
      tags: ["all", "client", "collaboration"],
      type: ["web"],
      index: 5,
    },
    {
      title: "Fullscreen",
      des: "See your spotify songs in fullscreen",
      image: "/images/projects/fullscreen.webp",
      link: "https://fullscreen.remaster.in/",
      animation: "center",
      tags: ["all", "personal"],
      type: ["web"],
      index: 6,
      content: "testing, please ignore"
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
        <div className="w-1/2 h-full justify-center items-center flex flex-col py-24">
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
              className="absolute  inset-0  w-full h-full scale-105 blur-2xl opacity-70 rounded-2xl pointer-events-none"
              alt=""
            />
            {/* sharp image on top */}
            <Image
              src={data[content.index - 1].image}
              width={0}
              height={0}
              sizes="100vh"
              className="relative z-10 w-full h-full rounded-2xl"
              alt="project image"
            />
            <div className="flex items-center gap-3 z-10 -bottom-5 absolute left-5 text-6xl font-bold text-left ">
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
            className="mt-20 text-left mr-auto ml-5 text-xl"
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
            className="absolute right-10 top-20 cursor-pointer hover:scale-110"
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
        </div>
      )}
    </div>
  );
}
