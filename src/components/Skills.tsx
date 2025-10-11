"use client";

import { motion } from "framer-motion";
import { useContext, useState } from "react";
import Block from "./Block";
import React from "react";
import { LoadingContext } from "@/context/loadingContext";

export default function Skills() {
  const skills = [
    {
      name: "React",
      shorty: "react",
      link: "https://react.dev/",
      image: "/images/skills/react.webp",
      description: "JavaScript library for building user interfaces",
    },
    {
      name: "Next.js",
      shorty: "next",
      description: "React framework for building server-side apps",
      image: "/images/skills/next.webp",
      link: "https://nextjs.org/",
    },
    {
      name: "Tailwind CSS",
      shorty: "tailwind",
      description:
        "Utility-first CSS framework for building responsive user interfaces",
      image: "/images/skills/tailwind.webp",
      link: "https://tailwindcss.com/",
    },
    {
      name: "TypeScript",
      description:
        " Strongly typed programming language that builds on JavaScript",
      shorty: "TypeScript",
      image: "/images/skills/ts.webp",
      link: "https://www.typescriptlang.org/",
    },
    {
      name: "JavaScript",
      shorty: "JavaScript",
      image: "/images/skills/js.webp",
      description: "100%",
      link: "https://en.wikipedia.org/wiki/JavaScript",
    },
    {
      name: "Git/Github",
      shorty: "GITHUB",
      image: "/images/skills/git.webp",
      description: "Version control system for tracking changes in code",
      link: "https://github.com/",
    },
    {
      name: "AWS",
      shorty: "aws",
      image: "/images/skills/aws.webp",
      link: "https://aws.amazon.com/",
    },
    {
      name: "Python",
      shorty: "python",
      image: "/images/skills/python.webp",
      link: "https://www.python.org/",
    },
    {
      name: "Java",
      shorty: "java",
      image: "/images/skills/java.webp",
      link: "https://www.java.com/",
    },
    {
      name: "C/C++",
      shorty: "CPP",
      image: "/images/skills/c++.webp",
      link: "https://en.wikipedia.org/wiki/C%2B%2B",
    },

    {
      name: "MongoDB",
      shorty: "mongodb",
      image: "/images/skills/mongo.webp",
      link: "https://www.mongodb.com/",
    },
    {
      name: "Framer Motion",
      shorty: "framer",
      image: "/images/skills/framer.webp",
      link: "https://motion.dev/",
    },
    {
      name: "GSAP",
      shorty: "gsap",
      image: "/images/skills/gsap.webp",
      link: "https://gsap.com/",
    },
  ];

  const [text, setText] = useState("Skills");

  const { loading } = useContext(LoadingContext);

  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className=" w-screen h-screen overflow-hidden flex flex-row-reverse items-center justify-center">
      {/* <div className="flex flex-col items-center justify-center">
        <div className="w-fit h-fit mr-auto pr-4 flex flex-row gap-2 justify-center items-center">
          {Array.from({ length: 5 }).map((_, index) => {
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
                className="text-[10rem] font-bold font-bebas flex leading-[8rem] hover:text-white/80 transition-all text-red-700 duration-100 cursor-pointer"
              >
                Skills
              </motion.p>
            );
          })}
        </div>
      </div> */}
      <div className="flex flex-col items-center justify-center">
        {!loading &&
          Array.from({ length: 10 }).map((_, realIndex) => {
            return (
              <div
                className="w-fit h-fit mr-auto pr-4 flex flex-row gap-2 justify-center items-center"
                key={realIndex}
              >
                {Array.from({ length: 10 }).map((_, index) => {
                  return (
                    <motion.p
                      key={index}
                      initial={{
                        opacity: 0,
                        filter: "blur(20px)",
                      }}
                      animate={{
                        opacity: 1,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                      }}
                      className={`text-[10rem] font-bold font-bebas flex leading-[8rem] hover:text-white/80 transition-all text-red-700 duration-100 cursor-pointer ${
                        realIndex === 5 && index === 6
                          ? "text-white"
                          : "text-red-700"
                      }`}
                    >
                      {text}
                    </motion.p>
                  );
                })}
              </div>
            );
          })}
      </div>

      {!loading && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.3,
            }}
            className="bg-back md:w-[80%] w-[120%] rounded-r-full h-[150%] overflow-hidden left-0 rounded-xl absolute blur-3xl md:-translate-x-[15%] -translate-x-[30%]"
          ></motion.div>

          <div className="absolute flex flex-col md:ml-10 md:left-0">
            <div className="w-fit h-fit grid md:grid-cols-3 grid-cols-2  justify-center items-center gap-5">
              {skills.map((skill, index) => {
                return (
                  (selected === index || selected === null) && (
                    <div key={index} className="w-full gap-5 flex flex-col items-center justify-center">
                      <motion.div
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        transition={{
                          duration: 2,
                          delay: !loading ? index * 0.1 : index * 0.1 + 1,
                        }}
                        key={index}
                        onMouseEnter={() => setText(skill.shorty)}
                        onMouseLeave={() => setText("Skills")}
                        className="w-full"
                        onClick={() =>
                          setSelected((prev) => (prev === index ? null : index))
                        }
                      >
                        <Block
                          name={skill.name}
                          image={skill.image}
                          description={skill.description}
                        />
                      </motion.div>
                      {selected === index && (
                        <p className=" t ">{skill.description}</p>
                      )}
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
