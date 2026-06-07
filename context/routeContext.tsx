"use client";

import React, { createContext, useState } from "react";

interface RouteContextType {
  route: string;
  setRoute: (route: string) => void;
  pendingRoute: string | null;
  setPendingRoute: (route: string | null) => void;
  // When true, scroll-based route navigation is suspended (e.g. while a
  // full-screen content view is open and the user needs to scroll its body).
  navLocked: boolean;
  setNavLocked: (locked: boolean) => void;
}

export const RouteContext = createContext<RouteContextType>({
  route: "",
  setRoute: () => {},
  pendingRoute: null,
  setPendingRoute: () => {},
  navLocked: false,
  setNavLocked: () => {},
});

export const RouteProvider = ({ children }: { children: React.ReactNode }) => {
  const [route, setRoute] = useState("");
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const [navLocked, setNavLocked] = useState(false);

  return (
    <RouteContext.Provider
      value={{
        route,
        setRoute,
        pendingRoute,
        setPendingRoute,
        navLocked,
        setNavLocked,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};
