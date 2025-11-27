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
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,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"
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
              className={`z-10 md:mt-6 mt-4 md:w-48 w-32 ${
                route == "/" ? "opacity-0" : "opacity-100"
              } `}
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
          <Button
            link={"/Kanwarnoor_Resume.pdf"}
            type={"secondary"}
            theme={"dark"}
            text={"Resume"}
          />
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
