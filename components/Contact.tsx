"use client";

import React, { useState } from "react";
import Button from "./Button";
import { animate, AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import Image from "next/image";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    error: false,
    errorMessage: "",
    success: false,
    loading: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({ ...form, error: false, loading: true });

    try {
      const res = await axios.post("/api/send", {
        name: form.name,
        email: form.email,
        message: form.message,
      });
    } catch (error) {
      let errorMessage = "Something went wrong";

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setForm({
        ...form,
        error: true,
        loading: false,
        errorMessage,
      });
      return;
    }

    setForm({
      ...form,
      name: "",
      email: "",
      message: "",
      error: false,
      success: true,
      loading: false,
      errorMessage: "",
    });
  };

  return (
    // simple contact form
    <>
      <div className="flex w-full h-full flex-row items-center justify-center relative">
        {form.success ? (
          <>
            <div className="w-screen h-screen flex justify-center items-center flex-col">
              <div className="flex flex-row relative">
                {Array.from(`Success!`).map((letter, index) => {
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
                      className="text-7xl font-bold flex"
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.p>
                  );
                })}
              </div>
              <p className="text-xl w-1/2 mt-3 text-center">
                Your message has been sent successfully. I'll get back to you as
                soon as possible.
              </p>

              <div className=" hidden absolute bottom-0 mb-10 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold">Other ways to connect :-</p>
                <div className="flex flex-row gap-5">
                  <a
                    href="https://www.linkedin.com/in/wellitsnoor/"
                    target="_blank"
                  >
                    Linkedin
                  </a>
                  <a href="https://instagram.com/wellitsnoor" target="_blank">
                    Instagram
                  </a>
                  <a href="mailto:wellitsnoor@gmail.com" target="_blank">
                    wellitsnoor@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-1/2 bg-front relative h-screen md:flex justify-center items-center hidden">
              <AnimatePresence>
                <motion.div
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  exit={{
                    scale: 1,
                    opacity: 0,
                    transition: { duration: 0.1, ease: "easeInOut" },
                  }}
                  className="w-fit h-fit  top-0 left-0 right-0 bottom-0 m-auto  text-white text-center flex items-center justify-center"
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
                    className="z-10 mt-6"
                  >
                    <Image
                      src="/logo/logo-red.webp"
                      alt="Lander"
                      width={300}
                      height={300}
                      loading="lazy"
                      className="flex justify-center items-center  z-10 cursor-pointer "
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
              <video
                src="/videos/texture2.mp4"
                autoPlay
                loop
                muted
                playsInline
                suppressHydrationWarning
                crossOrigin="anonymous"
                className="w-full h-full object-cover absolute mix-blend-hard-light britness-200 contrast-200 hue-rotate-180 overflow-hidden"
              />
            </div>
            <div className="flex flex-col items-center justify-center md:w-1/2 w-full">
              <div className="flex flex-row justify-center items-center">
                {Array.from(`Connect with me`).map((letter, index) => {
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
                      {letter === " " ? "\u00A0" : letter}
                    </motion.p>
                  );
                })}
              </div>
              <p className=" w-[80%] text-center flex justify-center items-center md:text-xl text-sm">
                I'm always looking for new opportunities and collaborations. If
                you have any questions or want to work together, please feel
                free to contact me.
              </p>

              <div className="flex w-full flex-col items-center justify-center gap-5">
                <div className="w-1/2 flex justify-center items-center mt-10">
                  <form
                    className="flex flex-col w-[80%] gap-2"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex flex-col">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        required
                        className="bg-transparent border-2 px-3 py-2 border-black text-black"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        required
                        className="bg-transparent border-2 px-3 py-2 border-black text-black"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="message">Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        required
                        className="px-3 py-2 border-2 border-black text-black resize-y max-h-36"
                      ></textarea>
                    </div>
                    <div className="w-full flex justify-center items-center">
                      {form.loading ? (
                        <Button
                          type="primary"
                          loading={true}
                          theme="light"
                          text="Sending"
                          link="#"
                        />
                      ) : form.success ? (
                        <Button type="primary" theme="light" text="Success" />
                      ) : (
                        <button
                          type="submit"
                          className="w-full flex justify-center items-center"
                        >
                          <Button type="primary" theme="light" text="Send" />
                        </button>
                      )}
                    </div>
                    {form.error && (
                      <p className="text-red-500 flex justify-center items-center">
                        {form.errorMessage || "Something went wrong"}
                      </p>
                    )}
                  </form>
                </div>

                <div className="flex flex-col items-center justify-center md:w-1/2 w-full">
                  <p className="text-2xl font-bold">More ways to connect</p>
                  <div className="flex flex-row gap-5">
                    <a
                      href="https://www.linkedin.com/in/wellitsnoor/"
                      target="_blank"
                      className="hover:underline"
                    >
                      Linkedin
                    </a>
                    <a
                      href="https://instagram.com/wellitsnoor"
                      target="_blank"
                      className="hover:underline"
                    >
                      Instagram
                    </a>
                    <a
                      href="mailto:wellitsnoor@gmail.com"
                      target="_blank"
                      className="hover:underline"
                    >
                      wellitsnoor@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
