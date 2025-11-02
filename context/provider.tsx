import { LoadingProvider } from "./loadingContext";
import { RouteProvider } from "./routeContext";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoadingProvider>
      <RouteProvider>{children}</RouteProvider>
    </LoadingProvider>
  );
};
