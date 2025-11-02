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
      description: "React is a JavaScript library for building user interfaces",
    },
    {
      name: "Next.js",
      shorty: "next",
      description: "Next.js is a React framework for building server-side apps",
      image: "/images/skills/next.webp",
      link: "https://nextjs.org/",
    },
    {
      name: "Tailwind CSS",
      shorty: "tailwind",
      description:
        "Tailwind CSS is a utility-first CSS framework for building responsive user interfaces",
      image: "/images/skills/tailwind.webp",
      link: "https://tailwindcss.com/",
    },
    {
      name: "TypeScript",
      description:
        "TypeScript is a strongly typed programming language that builds on JavaScript",
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
      description: "Git is a version control system for tracking changes in code",
      link: "https://github.com/",
    },
    {
      name: "AWS",
      shorty: "aws",
      image: "/images/skills/aws.webp",
      description: "AWS is a cloud platform for building scalable and reliable applications",
      link: "https://aws.amazon.com/",
    },
    {
      name: "Python",
      shorty: "python",
      image: "/images/skills/python.webp",
      description: "Python is a programming language for building scalable and reliable applications",
      link: "https://www.python.org/",
    },
    {
      name: "Java",
      shorty: "java",
      image: "/images/skills/java.webp",
      description: "Java is a programming language for building scalable and reliable applications",
      link: "https://www.java.com/",
    },
    {
      name: "C/C++",
      shorty: "CPP",
      image: "/images/skills/c++.webp",
      description: "C++ is a programming language for building scalable and reliable applications",
      link: "https://en.wikipedia.org/wiki/C%2B%2B",
    },

    {
      name: "MongoDB",
      shorty: "mongodb",
      image: "/images/skills/mongo.webp",
      description: "MongoDB is a NoSQL database for building scalable and reliable applications",
      link: "https://www.mongodb.com/",
    },
    {
      name: "Framer Motion",
      shorty: "framer",
      image: "/images/skills/framer.webp",
      description: "Framer Motion is a library for building scalable and reliable applications",
      link: "https://motion.dev/",
    },
    {
      name: "GSAP",
      shorty: "gsap",
      image: "/images/skills/gsap.webp",
      description: "GSAP is a library for building scalable and reliable applications",
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
              {selected === null &&
                skills.map((skill, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full gap-5 flex flex-col items-center justify-center"
                    >
                      <motion.div
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
                    </div>
                  );
                })}
            </div>

            {selected !== null && (
              <div className="w-[80%]  gap-5 flex flex-col m-auto items-center justify-center text-center relative">
                {/* cross button svg */}
                <button
                  className="absolute top-0 right-0 cursor-pointer flex justify-center items-center"
                  onClick={() => setSelected(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-8 hover:scale-110 duration-150 flex justify-center items-center "
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <p className="md:text-6xl flex text-center text-2xl font-bold">
                  {skills[selected].name}
                </p>
                <p className="md:text-xl flex flex-col text-sm text-center">
                  {skills[selected].description?.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
