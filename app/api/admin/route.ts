import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  console.log("Password: ", password);
  if(password !== process.env.PASSWORD){
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  } else {
    const token = await new SignJWT({ admin: true }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("1h").sign(new TextEncoder().encode(process.env.JWT_SECRET as string));
    const cookieStore = await cookies();
    cookieStore.set("token", token);
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  }
}