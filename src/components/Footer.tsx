import React from "react";

export default function Footer() {
  return (
    <div className="w-full h-full bg-back text-center flex flex-col justify-center items-center md:text-xl text-sm ">
      <p className="md:text-xl text-base font-bold mb-10">
        {"Developed with ❤️ by Kanwarnoor"}
      </p>

      <a
        href="https://www.linkedin.com/in/wellitsnoor/"
        className="hover:underline"
        target="_blank"
      >
        Linkedin
      </a>
      <a
        href="https://github.com/kanwarnoor"
        className="hover:underline"
        target="_blank"
      >
        Github
      </a>
      <a
        href="https://instagram.com/wellitsnoor"
        className="hover:underline"
        target="_blank"
      >
        Twitter
      </a>
      <a
        href="https://instagram.com/wellitsnoor"
        className="hover:underline"
        target="_blank"
      >
        Instagram
      </a>
    </div>
  );
}
