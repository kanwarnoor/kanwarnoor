"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { RouteContext } from "@/context/routeContext";
import { motion } from "framer-motion";
import { LoadingContext } from "@/context/loadingContext";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [showAdmin, setShowAdmin] = useState(false);

  // Don't render navbar on admin pages
  useEffect(() => {
    if (pathname?.startsWith("/admin")) {
      setShowAdmin(true);
    } else {
      setShowAdmin(false);
    }
  }, [pathname]);

  const links = [
    {
      name: "Home",
      hrefPC: "/#home",
      hrefMobile: "/#home",
      timeout: 0,
    },
    {
      name: "About",
      hrefPC: "/#about",
      hrefMobile: "/#about",
      timeout: 0,
    },
    {
      name: "Projects",
      hrefPC: "/#projects",
      hrefMobile: "/#projects",
      timeout: 500,
    },
    {
      name: "Skills",
      hrefPC: "/#skills",
      hrefMobile: "/#skills",
      timeout: 500,
    },
    {
      name: "Contact",
      hrefPC: "/#contact",
      hrefMobile: "/#contact",
      timeout: 500,
    },
    // {
    //   name: "Blog",
    //   hrefPC: "/#blog",
    //   hrefMobile: "/#blog",
    //   timeout: 500,
    // },
  ];

  const { route, setRoute } = useContext(RouteContext);
  const { loading } = useContext(LoadingContext);

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
        <div className=" fixed bottom-0 left-0 right-0 bg-gradient-to-t z-40 bg-black/50 backdrop-blur-xl border-2 border-white/50  rounded-full mb-5 px-5 w-fit m-auto hidden md:flex">
          <ul className="flex-row text-xl md:flex hidden gap-10 font-medium m-5 justify-center">
            {links.map((link, index) => (
              <motion.li
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                key={link.name}
                className={`cursor-pointer hover:underline transition-all duration-300 ${
                  link.hrefPC === pathname ? "underline" : "no-underline"
                } ${
                  pathname === "/#contact"
                    ? "text-white bg-black"
                    : "text-white"
                }`}
                onClick={() => {
                  setRoute(link.hrefPC || link.hrefMobile || "");
                  router.push(link.hrefPC || link.hrefMobile || "");
                }}
              >
                {link.name}
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
