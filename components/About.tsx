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
    </div>
  );
}
