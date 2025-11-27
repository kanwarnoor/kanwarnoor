"use client";

import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingContext } from "@/context/loadingContext";

export default function Loader() {

  const [punjabi, setPunjabi] = useState(0);
  const [english, setEnglish] = useState(0);


  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let interval2: NodeJS.Timeout;
    let loopTimeout: NodeJS.Timeout;

    const runSequence = () => {
      // First phase: flicker punjabi
      interval = setInterval(() => {
        setPunjabi((prev) => (prev === 0 ? 1 : 0));
      }, 200);

      // After 1.5 seconds, stop punjabi and start english
      setTimeout(() => {
        setPunjabi(0);
        clearInterval(interval);

        interval2 = setInterval(() => {
          setEnglish((prev) => (prev === 0 ? 1 : 0));
        }, 600);
      }, 1500);

      // After another 1.5 seconds, stop english and restart the sequence
      setTimeout(() => {
        setEnglish(0);
        clearInterval(interval2);
        loopTimeout = setTimeout(runSequence, 0); // Small delay before restarting
      }, 3000);
    };

    // Start the sequence
    runSequence();

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
      clearTimeout(loopTimeout);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // Function to handle when everything is loaded
    const handleLoad = () => {
      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    // Check if page is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      // Wait for everything to load
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute bg-front w-screen h-screen flex justify-center items-center z-[100]"
          >
            <div className="flex items-center justify-center gap-150">
              <p className="text-4xl transform scale-x-[300%] font-bold opacity-70 font-bebas tracking-wider animate-pulse hidden md:flex">
                KANWAR
              </p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: punjabi }}
                transition={{ duration: 0.2 }}
                className="absolute text-7xl transform scale-y-[400%] drop-shadow-[0_0_1px_rgba(255,255,255,1)] drop-shadow-white mb-10 
                [@supports(-moz-appearance:none)]:font-extrabold
                [@supports(not(-moz-appearance:none))]:font-bold
              "
              >
                ਨੂਰ
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: english }}
                transition={{ duration: 0.2 }}
                className="absolute text-7xl transform font-oswald scale-y-[400%] font-bold drop-shadow-[0_0_1px_rgba(255,255,255,1)] drop-shadow-white mb-10"
              >
                NOOR
              </motion.p>

              <p className="text-4xl transform scale-x-[300%] font-extrabold opacity-70 font-bebas tracking-wider animate-pulse hidden md:flex">
                KANWAR
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
