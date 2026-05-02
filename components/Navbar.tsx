"use client";

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { RouteContext } from "@/context/routeContext";
import { motion } from "framer-motion";
import { LoadingContext } from "@/context/loadingContext";

type NavTheme = "light" | "dark";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) {
      setShowAdmin(true);
    } else {
      setShowAdmin(false);
    }
  }, [pathname]);

  const links = useMemo(
    () => [
      { name: "Home", hrefPC: "/#home", hrefMobile: "/#home", timeout: 0 },
      { name: "About", hrefPC: "/#about", hrefMobile: "/#about", timeout: 0 },
      { name: "Projects", hrefPC: "/#projects", hrefMobile: "/#projects", timeout: 500 },
      { name: "Skills", hrefPC: "/#skills", hrefMobile: "/#skills", timeout: 500 },
      { name: "Contact", hrefPC: "/#contact", hrefMobile: "/#contact", timeout: 500 },
    ],
    []
  );

  const { setRoute } = useContext(RouteContext);
  const { loading } = useContext(LoadingContext);

  const [activeSection, setActiveSection] = useState<string>("home");
  const [theme, setTheme] = useState<NavTheme>("dark");
  const ratiosRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (showAdmin || loading) return;

    const ids = links.map((l) => l.hrefPC.replace("/#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    const ratios = ratiosRef.current;
    elements.forEach((el) => ratios.set(el.id, 0));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });

        let bestId = "";
        let bestRatio = 0;
        ratios.forEach((r, id) => {
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        });

        if (bestId && bestRatio > 0) {
          setActiveSection(bestId);
          const el = document.getElementById(bestId);
          const declared = el?.dataset.theme as NavTheme | undefined;
          setTheme(declared === "light" ? "light" : "dark");
          setRoute(`/#${bestId}`);
        }
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i * 0.1) }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [showAdmin, loading, links, setRoute]);

  const isLight = theme === "light";

  const shellClass = isLight
    ? "border-black/10 bg-white/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_8px_32px_0_rgba(0,0,0,0.12)]"
    : "border-white/15 bg-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_8px_32px_0_rgba(0,0,0,0.35)]";

  const sheenClass = isLight
    ? "bg-linear-to-b from-white/40 to-transparent"
    : "bg-linear-to-b from-white/10 to-transparent";

  const pillClass = isLight
    ? "bg-white/70 border-white/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_2px_8px_0_rgba(0,0,0,0.1)]"
    : "bg-white/30 border-white/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_2px_8px_0_rgba(0,0,0,0.2)]";

  const textActive = isLight ? "text-black" : "text-white";
  const textInactive = isLight
    ? "text-black/60 hover:text-black"
    : "text-white/70 hover:text-white";

  return (
    <>
      <div
        className=" fixed top-0 m-5 z-40 flex cursor-pointer"
        onClick={() => {
          setRoute("/#home");
          router.push("/");
        }}
      >
        <Image src="/logo/logo-white.webp" alt="logo" width={35} height={35} />
      </div>

      {!showAdmin && !loading && (
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed bottom-5 left-0 right-0 z-40 w-fit mx-auto hidden md:flex bg-black/50 rounded-full"
        >
          <div
            className={`relative rounded-full border backdrop-blur-md px-2 py-2 transition-colors duration-500 ${shellClass}`}
          >
            <div
              className={`pointer-events-none absolute inset-0 rounded-full transition-opacity duration-500 ${sheenClass}`}
            />

            <ul className="relative flex items-center gap-1 text-sm font-medium">
              {links.map((link) => {
                const id = link.hrefPC.replace("/#", "");
                const isActive = id === activeSection;
                return (
                  <li key={link.name} className="relative">
                    <button
                      onClick={() => {
                        setRoute(link.hrefPC);
                        router.push(link.hrefPC);
                      }}
                      className={`relative px-5 py-2 rounded-full transition-colors duration-300 ${
                        isActive ? textActive : textInactive
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="navbar-pill"
                          className={`absolute inset-0 rounded-full border ${pillClass}`}
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.nav>
      )}
    </>
  );
}
