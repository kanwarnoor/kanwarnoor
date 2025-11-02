import { s } from "framer-motion/client";
import React from "react";

export default function Footer() {
  const links = [
    {
      name: "Linkedin",
      href: "https://www.linkedin.com/in/wellitsnoor/",
    },
    {
      name: "Github",
      href: "https://github.com/kanwarnoor",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/wellitsnoor",
    },
    {
      name: "Twitter",
      href: "https://x.com/wellitsnoor",
    },
  ];

  const quickLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Projects",
      href: "/#projects",
    },
    {
      name: "Skills",
      href: "/#skills",
    },
    {
      name: "Contact",
      href: "/#contact",
    },
  ];

  return (
    <div className="w-full h-full text-center flex-col justify-center items-center md:text-xl text-sm grid grid-cols-3 bg-gradient-to-r from-back to-front p-20">
      <div className="flex flex-col justify-between items-center w-full h-full">
        <div>
          <p className="md:text-2xl text-base text-left">Developed by</p>
          <p className="text-4xl font-bold">Kanwarnoor</p>
        </div>
        <p className="text-left text-sm flex mr-10">
          © 2025-{new Date().getFullYear()} Kanwarnoor
        </p>
      </div>

      <div className=" w-full h-full justify-between items-center flex flex-col gap-5">
        <p className="text-2xl font-bold mt-0">Quick Links</p>

        <div className="gap-3 flex flex-col">
          {quickLinks.map((link) => {
            return (
              <a
                key={link.name}
                href={link.href}
                className="hover:underline text-base"
              >
                {link.name}
              </a>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-5 justify-between items-center w-full h-full">
        <p className="text-2xl font-bold ">Connect</p>

        <div className="gap-3 flex flex-col">
          {links.map((link) => {
            return (
              <a
                key={link.name}
                href={link.href}
                className="hover:underline text-base"
                target="_blank"
              >
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
