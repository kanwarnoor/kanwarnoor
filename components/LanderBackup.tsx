"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Butten from "./Button";

export default function Lander() {
  return (
    <div className="w-full h-screen bg-black flex flex-row items-center justify-center">
      <div className="w-1/2 h-full flex flex-col pl-40 justify-center ">
        <div className="flex flex-row -z-10">
          {Array.from("Kanwarnoor").map((letter, index) => {
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
                  delay: index * 0.1 + 0.5,
                }}
                className="text-7xl font-bold flex"
              >
                {letter}
              </motion.p>
            );
          })}
        </div>

        <p className="text-3xl font-medium">Fullstack Developer</p>

        <p className="text-base mt-10">
          I'm a software engineer that loves to create.
        </p>

        <div className="flex flex-row gap-3 mt-10">
          <Butten type="primary" theme="dark" link="/#contact" text="Hire me" />
          <Butten
            type="secondary"
            theme="dark"
            link="#projects"
            text="Know more"
          />
        </div>
      </div>
      <div className="w-1/2 h-full">
        <Image
          src={"/bully.jpg"}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
