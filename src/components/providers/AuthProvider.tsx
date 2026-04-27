"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useUserProfile } from "@/hooks/useAuth";
import Loader from "../Loader";
import configuration from "@/config/config.json";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, setInitialized, isInitialized } = useAuthStore();
  const { isLoading } = useUserProfile();

  useEffect(() => {
    if (!isLoading) {
      setInitialized(true);
    }
  }, [isLoading, setInitialized]);

  useEffect(() => {
    if (isInitialized) {
      const isPublicRoute = configuration.publicRoutes.includes(pathname);

      // if (!isAuthenticated && !isPublicRoute) {
      //   router.push("/login");
      // } else

      if (isAuthenticated && pathname === "/login") {
        router.push("/home");
      }
    }
  }, [isAuthenticated, isInitialized, pathname, router]);

  return (
    <>
      {/* ALWAYS render the Loader, but hide it if initialized */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        style={{ display: isInitialized ? "none" : "flex" }}
      >
        <Loader />
      </div>

      {/* ALWAYS render the children, but hide if not initialized */}
      <div
        className="h-full w-full"
        style={{ display: isInitialized ? "block" : "none" }}
      >
        {children}
      </div>
    </>
  );
}
