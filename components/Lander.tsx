"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import { RouteContext } from "@/context/routeContext";

export default function Lander() {
  const [isClient, setIsClient] = useState(false);
  const { route } = useContext(RouteContext);

  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="w-screen h-screen bg-back flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute top-0 left-0 w-screen h-screen opacity-100"
          style={{ height: "-webkit-fill-available" }}
        >
          {isClient && (
            <>
              <video
                src="/videos/texture2.mp4"
                autoPlay
                loop
                muted
                playsInline
                suppressHydrationWarning
                crossOrigin="anonymous"
                className="w-full h-full object-cover mix-blend-hard-light britness-200 contrast-200 hue-rotate-180 overflow-hidden"
                onLoadStart={() => setVideoLoaded(false)}
                onCanPlay={() => setVideoLoaded(true)}
              />
              {!videoLoaded && (
                <div className="absolute inset-0 bg-back w-full h-full flex items-center justify-center">
                  <Image
                    src="/videos/placeholder.webp"
                    alt="Lander"
                    width={0}
                    priority
                    height={0}
                    sizes="100% 100%"
                    className="flex justify-center items-center cursor-pointer w-full h-full object-cover  mix-blend-hard-light britness-200 contrast-200 hue-rotate-180 overflow-hidden"
                  />
                </div>
              )}
            </>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`flex items-center justify-center ${
            route === "/" ? "gap-5" : "gap-5"
          }`}
        >
          <p className="md:text-7xl text-5xl transform font-oswald scale-y-[300%] scale-x-[200%] font-extrabold drop-shadow-[0_0_1px_rgba(255,255,255,1)] drop-shadow-white flex justify-center items-center">
            N
          </p>
          <AnimatePresence>
       
              <motion.div
                initial={{ rotate: 0, scale: 1 }}
                animate={{
                  rotate: 360,
                  transition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                exit={{
                  rotate: 0,
                  scale: 1,
                  transition: { duration: 0.1, ease: "easeInOut" },
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                whileTap={{
                  scale: 1.2,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className={`z-10 md:mt-6 mt-4 md:w-48 w-32 ${route == "/" ? "opacity-0" : "opacity-100"} `}
              >
                <Image
                  src="/logo/logo-red.webp"
                  alt="Lander"
                  width={0}
                  height={0}
                  sizes="100% 100%"
                  className="flex justify-center w-full h-full items-center  z-50 cursor-pointer "
                />
              </motion.div>
 
          </AnimatePresence>

          <p className="md:text-7xl text-5xl transform font-oswald scale-y-[300%] scale-x-[200%] font-extrabold drop-shadow-[0_0_1px_rgba(255,255,255,1)] drop-shadow-white flex justify-center items-center">
            R
          </p>
        </motion.div>

        <div className={`md:-z-0 z-10 flex justify-center items-center mt-5`}>
          <Button link={"/Kanwarnoor_Resume.pdf"} type={"secondary"} theme={"dark"} text={"Resume"} />
        </div>

        {/* <p className="text-2xl font-extrabold uppercase">Fullstack Developer</p> */}
      </div>

      <div className="min-h-screen w-screen h-[100dvh] bg-back flex flex-col items-center justify-center overflow-hidden md:hidden">
        {/* <div className="absolute top-0 left-0 w-screen  opacity-100">
          {isClient && (
            <>
              <video
                src="/videos/texture2.mp4"
                autoPlay
                loop
                muted
                playsInline
                suppressHydrationWarning
                crossOrigin="anonymous"
                className="h-screen w-screen object-cover mix-blend-exclusion contrast-200 hue-rotate-130 overflow-hidden"
              />
            </>
          )}
        </div> */}

        {/* mobile view */}
        {/* <div className="hidden flex-col items-center justify-center gap-5 w-screen h-[100lvh] ">
          <div className="flex flex-col items-center justify-center gap-5 mt-10">
            <p className="text-6xl font-extrabold font-bebas uppercase ">
              Coming soon
            </p>
            <p className="text-6xl font-extrabold font-bebas uppercase">
              Coming soon
            </p>

            <p className="text-6xl font-extrabold font-bebas uppercase">
              Coming soon
            </p>
            <p className="text-6xl font-extrabold font-bebas uppercase">
              Coming soon
            </p>
          </div>
        </div> */}

        {/* <p className="text-2xl font-extrabold uppercase">Fullstack Developer</p> */}
      </div>
    </>
  );
}
