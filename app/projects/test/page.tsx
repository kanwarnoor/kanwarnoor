"use client";

import { motion } from "framer-motion"
import Image from "next/image"

export default function page() {
  return (
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

  )
}

