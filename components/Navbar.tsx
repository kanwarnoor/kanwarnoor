"use client";

import React, { useContext, useMemo } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { RouteContext } from "@/context/routeContext";
import { motion } from "framer-motion";
import { LoadingContext } from "@/context/loadingContext";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const showAdmin = pathname?.startsWith("/admin") ?? false;

  const links = useMemo(
    () => [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Skills", href: "/skills" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
    []
  );

  const { setRoute, setPendingRoute } = useContext(RouteContext);
  const { loading } = useContext(LoadingContext);

  const activeLink = links.find((link) =>
    link.href === "/"
      ? pathname === "/"
      : pathname?.startsWith(link.href)
  )?.href;

  const isLight = false;

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
          setRoute("/");
          setPendingRoute("/");
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
                const isActive = link.href === activeLink;
                return (
                  <li key={link.name} className="relative">
                    <button
                      onClick={() => {
                        setRoute(link.href);
                        setPendingRoute(link.href);
                      }}
                      className={`relative cursor-pointer px-5 py-2 rounded-full transition-colors duration-300 ${isActive ? textActive : textInactive
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
