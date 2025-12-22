"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InfoCard from "./InfoCard";
import useEmblaCarousel from "embla-carousel-react";
import { div } from "framer-motion/client";

export default function Projects() {
  return (
    <div className="w-full h-fit flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-row">
        {Array.from("About").map((letter, index) => {
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
      <div className="md:w-[50%] w-[70%] md:text-xl text-sm flex flex-col gap-5 mt-5 text-center text-white/70">
        <p>
          Hi, I’m <b className="text-white">Kanwarnoor Singh</b>, a{" "}
          {new Date().getFullYear() == 2025
            ? "3rd"
            : new Date().getFullYear() == 2026
            ? "4th"
            : "5th"}{" "}
          year Computer Science student at
          <b className="text-white"> Guru Nanak Dev University</b>. I’m
          passionate about computers and love building products from the ground
          up, turning ideas into fully working systems with clear vision.
        </p>
        <p>
          I specialize in <b className="text-white">Fullstack Web</b> and{" "}
          <b className="text-white">Mobile Development</b>, and I enjoy working
          on projects where clean architecture, performance, and usability
          matter.
        </p>
        <p>
          Outside of coding, I make music, play games, explore unconventional
          albums, and watch obscure films. These are some creative spaces that
          constantly influence how I think and build.
        </p>
      </div>
    </div>
  );
}
