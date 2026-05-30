"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Transition() {
  const pathname = usePathname();

  const isFirstLoad = useRef(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (pathname === "/") {
      setAnimate(false);
      return;
    }

    setAnimate(true);

    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {animate && pathname !== "/" && (
          <motion.div
            key={pathname}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5 }}
            className="w-screen h-screen absolute top-0 left-0 bg-front z-50 text-white text-center flex items-center justify-center overflow-hidden"
          />
        )}
      </AnimatePresence>

      {pathname === "/" && (
        <AnimatePresence>
          <motion.div
            initial={{ scale: 10, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: isFirstLoad.current ? 1 : 0 }}
            exit={{
              scale: 1,
              opacity: 0,
              transition: { duration: 0.1, ease: "easeInOut" },
            }}
            onAnimationComplete={() => { isFirstLoad.current = false; }}
            className="w-fit h-fit absolute -top-2 -left-1 right-0 bottom-16 m-auto z-50 text-white text-center flex items-center justify-center"
          >
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
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{
                scale: 1.2,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className="z-10  md:mt-6 mt-4 md:w-48 w-32"
            >
              <Image
                src="/logo/logo-red.webp"
                alt="Lander"
                width={200}
                height={200}
                priority
                loading="eager"
                className="flex justify-center items-center  z-10 cursor-pointer "
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
