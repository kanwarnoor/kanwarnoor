"use server"

import React from "react";
import DashboardPage from "./DashboardPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Expose the logout function as a "server action"
export async function logout() {
  const cookieStore = await cookies();
  console.log("Logging out");
  cookieStore.delete("token");
  redirect("/");
}

export default async function page() {
  return <DashboardPage logout={logout} />;
}
