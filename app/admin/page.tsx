"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/admin", { password });

      if (res.status === 200) {
        router.push("/admin/dashboard");
      }
      router.push("/admin/dashboard");
    } catch (error) {
      setError(axios.isAxiosError(error) ? error.response?.data.message : "Something went wrong");
    }
  };

  return (
    <div className="w-screen h-screen bg-back flex flex-col items-center justify-center overflow-hidden gap-3">
      <form action="" name="w-screen" onSubmit={handleSubmit}>
        <input
          className="bg-transparent border-2 px-3 py-2 w-72 border-white/50 rounded-full text-white"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          placeholder="Password"
        />
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
