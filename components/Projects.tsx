"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InfoCard from "./InfoCard";
import useEmblaCarousel from "embla-carousel-react";
import { div } from "framer-motion/client";

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
      title: "Remaster",
      des: "A platform for artists to store and sell their music",
      image: "/images/projects/remaster.webp",
      animation: "center",
<<<<<<< Updated upstream
      link: "https://remaster.in/",
      tags: ["all", "personal"],
=======
      type: ["web"],
      tags: ["all", "client"],
      content: `this is some randome text`,
>>>>>>> Stashed changes
    },
    {
      title: "Ardent Co.",
      des: "Dynamic communications, research, and public policy advisory firm",
      image: "/images/projects/ardent.webp",
      link: "https://ardentco.in/",
      animation: "center",
      tags: ["all", "client"],
    },
    {
      title: "Rhetor",
      des: "Content and creator agency that pairs thoughtful strategy with high-impact execution.",
      image: "/images/projects/rhetor.webp",
      link: "https://rhetor.in/",
      animation: "center",
      tags: ["all", "client"],
    },
    {
      title: "Guru Nanak Dev University",
      des: "Bringing all colleges under one website",
      image: "/images/projects/gndu.webp",
      animation: "center",
      link: "https://university-verka.vercel.app/",
      tags: ["all", "client", "collaboration"],
    },
    {
      title: "Fullscreen",
      des: "See your spotify songs in fullscreen",
      image: "/images/projects/fullscreen.webp",
      link: "https://fullscreen.remaster.in/",
      animation: "center",
      tags: ["all", "personal"],
    },
    {
      title: "UK India Business Council",
      des: "Client work Website for UK India Business Council",
      image: "/images/projects/ukindia.webp",
      link: "https://www.ukibc.com/",
      animation: "center",
      tags: ["all", "client"],
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

  const activeFilter = filter.find((f) => f.active)?.name.toLowerCase();

  const filteredData = data.filter((item) => {
    if (activeFilter === "all") return true;
    return item.tags.includes(activeFilter || "");
  });

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  return (
    <div className="w-full h-fit flex flex-col items-center justify-center overflow-hidden">
<<<<<<< Updated upstream
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
          {filter.map((item, index) => {
            return (
              <motion.p
                // initial={{
                //   backgroundColor: "transparent",
                //   color: "white",
                // }}
                // whileHover={{
                //   backgroundColor: "rgba(255, 255, 255, 0.5)",
                //   color: "black",
                // }}
                // animate={{
                //   backgroundColor:
                //     item.active === true
                //       ? "rgba(255, 255, 255, 1)"
                //       : "transparent",
                //   color: item.active === true ? "black" : "white",
                // }}
                key={index}
                className={`md:text-base text-sm cursor-pointer font-bold rounded-full md:px-4 md:py-2 py-2 px-3 hover:bg-white/50 hover:text-black first:hover:bg-white first:hover:text-black first:bg-white first:text-black`}
                onClick={() =>
                  setFilter(
                    filter.map((item, index1) => {
                      if (index === index1) {
                        return { ...item, active: true };
                      }
                      return { ...item, active: false };
                    })
                  )
                }
              >
                <motion.span
                  key={
                    filter.sort((a, b) => Number(b.active) - Number(a.active))[
                      index
                    ].name
                  }
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {
                    filter.sort((a, b) => Number(b.active) - Number(a.active))[
                      index
                    ].name
                  }
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
        <div className="flex flex-row gap-10 w-[100vw] py-1 ">
          {filteredData.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center items-center text-center pr-20 w-full"
            >
              <p className="flex text-2xl font-medium">No projects found :/</p>
            </motion.div>
          )}

          {filteredData.map((item, index) => {
            return (
              <div className="flex flex-col " key={index}>
                <InfoCard
                  title1={item.title}
                  des={item.des}
                  image={item.image}
                  link={item.link}
                  animation={"center"}
                />
              </div>
            );
          })}
        </div>
        {/* control buttons */}
        <div className="flex flex-row gap-3 ml-auto my-5 text-white w-fit pr-20 ">
          <svg
            className="size-10 bg-white rounded-full p-1 cursor-pointer"
            viewBox="-8.5 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <title>left</title>
            <path d="M7.094 15.938l7.688 7.688-3.719 3.563-11.063-11.063 11.313-11.344 3.531 3.5z"></path>
          </svg>

          <svg
            className="size-10 bg-white rounded-full p-1 cursor-pointer rotate-180"
            viewBox="-8.5 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => emblaApi?.scrollNext()}
          >
            <title>left</title>
            <path d="M7.094 15.938l7.688 7.688-3.719 3.563-11.063-11.063 11.313-11.344 3.531 3.5z"></path>
          </svg>
=======
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
                        setContent({
                          active: true,
                          index: index,
                        })
                      }
                    >
                      <InfoCard
                        title1={item.title}
                        des={item.des}
                        image={item.image}
                        // link={item.link}
                        animation={"center"}
                        type={item.type}
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
>>>>>>> Stashed changes
        </div>
      ) : (
        <div>hello</div>
      )}
    </div>
  );
}
