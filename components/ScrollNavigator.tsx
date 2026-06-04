"use client";

import { useEffect, useRef, useContext } from "react";
import { usePathname } from "next/navigation";
import { RouteContext } from "@/context/routeContext";

const LINKS = ["/", "/about", "/projects", "/skills", "/blog", "/contact"];
// How long the scroll must be idle after a navigation before the next one is
// allowed. The timer resets on every wheel event, so a single momentum/inertial
// scroll (trackpad or mouse) counts as one gesture and can't skip routes.
const COOLDOWN_MS = 600;
// Ignore tiny deltas so trackpad jitter doesn't trigger navigation.
const DELTA_THRESHOLD = 8;

export default function ScrollNavigator() {
  const pathname = usePathname();
  const { setPendingRoute } = useContext(RouteContext);
  const cooldown = useRef(false);
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (pathnameRef.current?.startsWith("/admin")) return;
      if (Math.abs(e.deltaY) < DELTA_THRESHOLD) return;

      // Keep pushing the cooldown release forward while wheel events keep
      // arriving (momentum scrolling). The cooldown only clears once the
      // gesture has been idle for COOLDOWN_MS.
      if (cooldown.current) {
        if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
        cooldownTimer.current = setTimeout(() => {
          cooldown.current = false;
        }, COOLDOWN_MS);
        return;
      }

      const current = pathnameRef.current ?? "/";
      const idx = LINKS.indexOf(current);
      if (idx === -1) return;

      const next = e.deltaY > 0 ? LINKS[idx + 1] : LINKS[idx - 1];
      if (!next) return;

      cooldown.current = true;
      setPendingRoute(next);
      cooldownTimer.current = setTimeout(() => {
        cooldown.current = false;
      }, COOLDOWN_MS);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
    };
  }, [setPendingRoute]);

  return null;
}
