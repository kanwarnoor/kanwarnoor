"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { RouteContext } from "@/context/routeContext";
import { motion } from "framer-motion";
import { LoadingContext } from "@/context/loadingContext";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    {
      name: "Home",
      hrefPC: "/",
      hrefMobile: "/#home",
      timeout: 0,
    },
    {
      name: "Projects",
      hrefPC: "/projects",
      hrefMobile: "/#projects",   
      timeout: 500,
    },
    {
      name: "Skills",
      hrefPC: "/skills",
      hrefMobile: "/#skills",
      timeout: 500,
    },
    {
      name: "Contact",
      hrefPC: "/contact",
      hrefMobile: "/#contact",
      timeout: 500,
    },
    {
      name: "Blog",
      hrefPC: "/blog",
      hrefMobile: "/#blog",
      timeout: 500,
    },
  ];

  const { route, setRoute } = useContext(RouteContext);
  const { loading } = useContext(LoadingContext);

  return (
    <>
      <div
        className=" fixed top-0 m-5 z-40 flex cursor-pointer"
        onClick={() => {
          setRoute("/");
          router.push("/");
        }}
      >
        <Image src="/logo/logo-white.webp" alt="logo" width={35} height={35} />
      </div>

      {!loading && (
        <div className=" fixed bottom-0 left-0 right-0 bg-gradient-to-t z-40">
          <ul className="flex-row text-2xl md:flex hidden gap-10 font-medium m-5 justify-center">
            {links.map((link, index) => (
              <motion.li
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                key={link.name}
                className={`cursor-pointer hover:underline transition-all duration-300 ${
                  link.hrefPC === pathname ? "underline" : "no-underline"
                } ${pathname === "/contact" ? "text-white bg-black" : "text-white"}`}
                onClick={() => {
                  setRoute(link.hrefPC || link.hrefMobile || "");
                  const timeout = setTimeout(() => {
                    router.push(link.hrefPC || link.hrefMobile || "");
                  }, link.timeout);
                  return () => clearTimeout(timeout);
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
