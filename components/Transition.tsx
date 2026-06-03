"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { RouteContext } from "@/context/routeContext";

const SLIDE_MS = 450;
// Navbar order — used to decide travel direction.
const ORDER = ["/", "/about", "/projects", "/skills", "/blog", "/contact"];

export default function Transition() {
  const pathname = usePathname();
  const router = useRouter();
  const { pendingRoute, setPendingRoute } = useContext(RouteContext);

  const isFirstLoad = useRef(true);
  const [phase, setPhase] = useState<"idle" | "covering" | "uncovering">("idle");
  // 1 = forward (overlay sweeps right→left), -1 = backward (left→right)
  const [direction, setDirection] = useState(1);

  const targetRef = useRef<string | null>(null);
  const pushedRef = useRef(false);

  // Step 1: a navigation is requested — capture it, pick direction, start covering.
  useEffect(() => {
    if (!pendingRoute) return;

    if (pendingRoute === pathname) {
      setPendingRoute(null);
      return;
    }

    // Navigating to the home page: skip the slide overlay entirely.
    if (pendingRoute === "/") {
      router.push(pendingRoute);
      setPendingRoute(null);
      return;
    }

    const from = ORDER.indexOf(pathname ?? "/");
    const to = ORDER.indexOf(pendingRoute);
    // Going to a lower index (e.g. back to Home) = backward; otherwise forward.
    setDirection(from !== -1 && to !== -1 && to < from ? -1 : 1);

    targetRef.current = pendingRoute;
    pushedRef.current = false;
    setPhase("covering");
    setPendingRoute(null); // consumed — target is held in the ref
  }, [pendingRoute, pathname, setPendingRoute, router]);

  // Step 2: once the destination page is actually mounted, reveal it.
  useEffect(() => {
    if (phase !== "covering") return;
    if (!pushedRef.current) return; // wait until we've pushed the route
    if (pathname !== targetRef.current) return; // wait until it's committed

    // Give the new page a frame to paint before uncovering.
    const t = setTimeout(() => setPhase("uncovering"), 80);
    return () => clearTimeout(t);
  }, [pathname, phase]);

  // Safety net: never stay stuck under the overlay if navigation stalls.
  useEffect(() => {
    if (phase !== "covering") return;
    const safety = setTimeout(() => setPhase("uncovering"), 2500);
    return () => clearTimeout(safety);
  }, [phase]);

  const handleAnimationComplete = () => {
    if (phase === "covering") {
      // Screen is fully covered — now swap the route behind it.
      if (!pushedRef.current && targetRef.current) {
        pushedRef.current = true;
        router.push(targetRef.current);
      }
    } else if (phase === "uncovering") {
      setPhase("idle");
      targetRef.current = null;
    }
  };

  // forward: enter from right (100%), exit to left (-100%)
  // backward: enter from left (-100%), exit to right (100%)
  const enterFrom = direction === 1 ? "100%" : "-100%";
  const exitTo = direction === 1 ? "-100%" : "100%";

  return (
    <>
      {phase !== "idle" && (
        <motion.div
          initial={{ x: enterFrom }}
          animate={{ x: phase === "covering" ? "0%" : exitTo }}
          transition={{ duration: SLIDE_MS / 1000, ease: "easeInOut" }}
          onAnimationComplete={handleAnimationComplete}
          className="fixed inset-0 bg-front z-[9999]"
        />
      )}

      {pathname === "/" && (
        <AnimatePresence>
          <div className="fixed inset-0 overflow-hidden z-50 pointer-events-none md:flex hidden">
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
              className="w-fit h-fit absolute -top-2 -left-1 right-0 bottom-16 m-auto text-white text-center flex items-center justify-center pointer-events-auto"
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
                  loading="eager"
                  className="flex justify-center items-center z-10 cursor-pointer"
                />
              </motion.div>
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </>
  );
}
