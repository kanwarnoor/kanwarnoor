"use server";

import React from "react";
import DashboardPage from "./DashboardPage";
import { redirect } from "next/navigation";

async function logout() {
  "use server";
  await fetch(`${process.env.URL}/api/admin/logout`, {
    method: "POST",
  });
  redirect("/");
}

export default async function page() {
  return <DashboardPage logout={logout} />;
}
