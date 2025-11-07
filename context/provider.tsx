"use client";

import { LoadingProvider } from "./loadingContext";
import { RouteProvider } from "./routeContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'  

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <RouteProvider>{children}</RouteProvider>
      </LoadingProvider>
    </QueryClientProvider>
  );
};
