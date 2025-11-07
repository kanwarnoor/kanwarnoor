"use client";

import React from "react";

interface DashboardProps {
  logout: () => void;
}

export default function DashboardPage({ logout }: DashboardProps) {
  return (
    <div className="w-screen h-screen bg-back flex flex-col items-center justify-center overflow-hidden gap-3">
      <div className="absolute top-0 right-0 p-4 cursor-pointer" onClick={logout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
          />
        </svg>
      </div>


      <h1 className="text-4xl font-bold">Welcome Noor</h1>
      <h1>Projects</h1>
      

    </div>
  );
}
