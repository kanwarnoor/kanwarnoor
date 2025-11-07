"use server";

import React from "react";
import { cookies } from "next/headers";
import AdminUI from "./AdminUI";
import { jwtVerify } from "jose";
import { redirect, RedirectType } from "next/navigation";

export default async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return <AdminUI />;
  }

  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET as string)
    );
    return redirect("/admin/dashboard", RedirectType.replace);
  } catch (error) {
    await fetch(`${process.env.URL}/api/admin/logout`, {
      method: "POST",
    });
    return <AdminUI />;
  }
}
