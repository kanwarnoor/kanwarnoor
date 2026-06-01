"use client";

import React, { createContext, useState } from "react";

interface RouteContextType {
  route: string;
  setRoute: (route: string) => void;
  pendingRoute: string | null;
  setPendingRoute: (route: string | null) => void;
}

export const RouteContext = createContext<RouteContextType>({
  route: "",
  setRoute: () => {},
  pendingRoute: null,
  setPendingRoute: () => {},
});

export const RouteProvider = ({ children }: { children: React.ReactNode }) => {
  const [route, setRoute] = useState("");
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  return (
    <RouteContext.Provider value={{ route, setRoute, pendingRoute, setPendingRoute }}>
      {children}
    </RouteContext.Provider>
  );
};
