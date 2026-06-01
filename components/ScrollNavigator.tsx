"use client";

import { useEffect, useRef, useContext } from "react";
import { usePathname } from "next/navigation";
import { RouteContext } from "@/context/routeContext";

const LINKS = ["/", "/about", "/projects", "/skills", "/blog", "/contact"];
const COOLDOWN_MS = 1000;

export default function ScrollNavigator() {
  const pathname = usePathname();
  const { setPendingRoute } = useContext(RouteContext);
  const cooldown = useRef(false);
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (cooldown.current) return;
      if (pathnameRef.current?.startsWith("/admin")) return;

      const current = pathnameRef.current ?? "/";
      const idx = LINKS.indexOf(current);
      if (idx === -1) return;

      const next = e.deltaY > 0 ? LINKS[idx + 1] : LINKS[idx - 1];
      if (!next) return;

      cooldown.current = true;
      setPendingRoute(next);
      setTimeout(() => { cooldown.current = false; }, COOLDOWN_MS);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [setPendingRoute]);

  return null;
}
