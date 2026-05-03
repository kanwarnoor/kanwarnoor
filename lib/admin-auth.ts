import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function isAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return false;
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET as string)
    );
    return true;
  } catch {
    return false;
  }
}
