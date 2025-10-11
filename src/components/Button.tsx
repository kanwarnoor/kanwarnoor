import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ButtenProps {
  text?: string;
  link?: string | null;
  type: "primary" | "secondary";
  loading?: boolean;
  theme?: "dark" | "light";
}

export default function Button(Props: ButtenProps) {
  const router = useRouter();

  if (Props.type === "primary") {
    return (
      <div
        onClick={() => {
          if (Props.link) {
            router.push(Props.link);
          }
        }}
        className={`text-base w-fit z-40 font-bold ${
          Props.theme === "dark" ? "bg-white text-black" : "bg-black text-white"
        } px-4 py-2 flex items-center justify-center cursor-pointer`}
      >
        {Props.loading ? (
          <>
            {Props.text || "Know more"}
            <div className="ml-2 animate-spin rounded-full h-5 w-5 border-white white-spinner"></div>
          </>
        ) : (
          Props.text || "Know more"
        )}
      </div>
    );
  }
  return (
    <Link
      href={Props.link || "/"}
      className={`md:text-base bg-white text-sm font-bold z-40 flex w-fit border-2 rounded-md items-center justify-center ${
        Props.theme === "dark" ? "text-black" : "text-black"
      }  px-4 py-2`}
    >
      {Props.loading ? (
        <>
          {Props.text || "Know more"}
          <div className="ml-2 animate-spin rounded-full h-5 w-5 border-black black-spinner"></div>
        </>
      ) : (
        Props.text || "Know more"
      )}
    </Link>
  );
}
