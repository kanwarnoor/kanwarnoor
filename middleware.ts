import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    console.log("No token found");
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }
  
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
    await jwtVerify(token, secret);
    console.log("Token verified");
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
