"use client";

import React, { useState, useEffect } from "react";
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

  const [isClient, setIsClient] = useState(false);

  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

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

              {isClient && (
                <>
                  <video
                    src="/videos/texture2.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadStart={() => setVideoLoaded(false)}
                    onCanPlay={() => setVideoLoaded(true)}
                    suppressHydrationWarning
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover absolute mix-blend-hard-light britness-200 contrast-200 hue-rotate-180 overflow-hidden"
                  />
                  {!videoLoaded && (
                    <>
                      <Image
                        src="/videos/placeholder.webp"
                        alt="Lander"
                        width={0}
                        priority
                        height={0}
                        placeholder="blur"
                        blurDataURL="data:image/webp;base64,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"
                        sizes="100% 100%"
                        className="flex justify-center inset-0 absolute items-center cursor-pointer w-full h-full object-cover  mix-blend-hard-light britness-200 contrast-200 hue-rotate-180 overflow-hidden"
                      />
                    </>
                  )}
                </>
              )}
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
