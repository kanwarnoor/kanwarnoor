"use server"

import React from "react";
import { cookies } from "next/headers";
import AdminUI from "./AdminUI";
import { jwtVerify } from "jose";
import { redirect, RedirectType} from "next/navigation";

export default async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    try {
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET as string)
      );
    } catch (error) {
      return <AdminUI />;
    }
    finally{
      return redirect("/admin/dashboard", RedirectType.replace);
    }
  } 
  return <AdminUI />;
}
