"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";

interface InfoCardProps {
  title1: string;
  title2?: string;
  des?: string;
  description?: string;
  image: string;
  link?: string;
  animation: "left" | "center" | "right";
  type?: string[];
}

export default function InfoCard({
  title1,
  title2,
  image,
  des,
  description,
  animation,
  link,
  type,
}: InfoCardProps) {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="relative w-fit">
      <motion.div
        initial={{
          opacity: 0,
          x:
            animation == "left" ? "-10%" : animation === "center" ? "0" : "10%",
          y: animation == "center" ? "10%" : "0%",
        }}
        animate={{
          transition: {
            duration: 0.5,
          },
        }}
        whileHover={{
          scale: 1.02,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.5,
          },
        }}
        transition={{
          duration: 0.1,
        }}
        // viewport={{
        //   amount: 0.3,
        // }}
        // onClick={() => setClicked1((clicked1) => !clicked1)}
        className="relative flex flex-col cursor-pointer 2xl:w-[711.11px] xl:w-[533.33px] shadow-xl 2xl:h-[400px] xl:h-[300px] w-[300px] h-[350px] bg-black/50 backdrop-blur-xl rounded-2xl"
      >
        {!clicked && (
          <div
            className="flex flex-col bg-black/50 backdrop-blur-xl h-full rounded-2xl"
            onClick={() =>
              description
                ? setClicked((clicked) => !clicked)
                : window.open(link, "_ blank")
            }
          >
            <div
              className={`relative w-full duration-300 rounded-t-2xl h-full`}
            >
              <Image
                src={image}
                width={0}
                height={0}
                sizes="100% 100%"
                alt="Saturn Roman"
                className={`w-full h-full object-cover object-center duration-300 rounded-2xl `}
              ></Image>

              <div
                className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none 
               backdrop-blur-xl
               [mask-image:linear-gradient(to_top,black_50%,transparent)]
               [Webkit-mask-image:linear-gradient(to_top,black_50%,transparent)] rounded-b-2xl"
              />
            </div>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
              }}
              className={` w-full h-1/3 transition px-5 absolute flex flex-col m-auto justify-center items-center  left-0 right-0 bottom-0 rounded-b-2xl `}
            >
              <p className="text-white font-bold md:text-3xl text-lg text-center ">
                {title1}
                {title2 && (
                  <>
                    <br />
                    {title2}
                  </>
                )}
              </p>
              {des && (
                <p
                  className={`text-center text-white text-sm opacity-80 font-bold mt-1`}
                >
                  {des}
                </p>
              )}
            </motion.div>
          </div>
        )}

        {clicked && description && (
          <>
            <div
              className={`absolute w-full h-full duration-300 rounded-t-2xl md:h-full -z-10`}
            >
              <Image
                src={image}
                width={0}
                height={0}
                sizes="100% 100%"
                alt="Saturn Roman"
                className={`w-full h-full object-cover object-center duration-300 rounded-2xl `}
              ></Image>
            </div>
            <div
              className="absolute bottom-0 left-0 w-full h-full pointer-events-none 
               backdrop-blur-xl
               [mask-image:linear-gradient(to_top,black_100%,transparent)]
               [Webkit-mask-image:linear-gradient(to_top,black_100%,transparent)] rounded-2xl -z-10"
            />
            <div className="flex justify-end p-5 cursor-default">
              <motion.svg
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="size-9 cursor-pointer hover:scale-110 duration-150"
                onClick={() => setClicked((clicked) => !clicked)}
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                  clip-rule="evenodd"
                />
              </motion.svg>
            </div>

            <div className="relative h-full md:p-10 px-10 md:text-base text-white text-center cursor-default">
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="md:text-base text-sm"
              >
                {description}
              </motion.p>

              {link && (
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="absolute bottom-0 flex justify-center m-auto left-0 right-0 pb-10 rounded-b-2xl"
                >
                  <a
                    href={link}
                    target="_blank"
                    className="px-5 py-2 border-2 border-white rounded-full hover:scale-110 duration-200"
                  >
                    Read more
                  </a>
                </motion.div>
              )}
            </div>
          </>
        )}
      </motion.div>

      {type && type.length > 0 && (
        <div className="pointer-events-none absolute -bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-black/10 px-4 py-2 shadow-lg backdrop-blur-sm ">
          {type.includes("web") && (
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
          {type.includes("app") && (
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
        </div>
      )}
    </div>
  );
}
