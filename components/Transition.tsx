"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { RouteContext } from "@/context/routeContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Transition() {
  const pathname = usePathname();
  const { route } = useContext(RouteContext);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    console.log(route);

    if (route == "") {
      setAnimate(false);
      return;
    }

    setAnimate(true);

    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [route]);

  return (
    <>
      {route !== "/" && (
        <AnimatePresence>
          {animate && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: route !== pathname ? "0%" : "-100%" }}
              transition={{ duration: 0.5 }}
              exit={{ x: "-100%" }}
              className="w-screen h-screen absolute top-0 left-0 bg-front z-50 text-white text-center flex items-center justify-center overflow-hidden"
            >
              {/* <p className="text-2xl font-bold capitalize">{route.split("/")[1]}</p> */}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {route === "/" && (
        <AnimatePresence>
          <motion.div
            initial={{ scale: 10, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            exit={{
              scale: 1,
              opacity: 0,
              transition: { duration: 0.1, ease: "easeInOut" },
            }}
            className="w-fit h-fit absolute top-0 left-2 right-0 bottom-[4rem] m-auto z-50 text-white text-center flex items-center justify-center"
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
              className="z-10 md:mt-6 mt-4 md:w-48 w-32"
            >
              <Image
                src="/logo/logo-red.webp"
                alt="Lander"
                width={200}
                height={200}
                priority
                className="flex justify-center items-center  z-10 cursor-pointer "
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* <div className="w-screen h-screen absolute top-0 left-0 bg-front z-50 text-white text-center flex items-center justify-center">
        <p className="text-2xl font-bold">{route || pathname}</p>
      </div> */}
    </>
  );
}
