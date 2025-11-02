"use client";

import React, { createContext, useState } from "react";

interface RouteContextType {
  route: string;
  setRoute: (route: string) => void;
}

export const RouteContext = createContext<RouteContextType>({
  route: "",
  setRoute: () => {},
});

export const RouteProvider = ({ children }: { children: React.ReactNode }) => {
  const [route, setRoute] = useState("");

  return (
    <RouteContext.Provider value={{ route, setRoute }}>
      {children}
    </RouteContext.Provider>
  );
};
