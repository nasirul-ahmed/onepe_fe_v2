"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/auth-store";
import { useUserProfile } from "@/hooks/useAuth";
import Loader from "../Loader"; // Assuming Loader is a full screen spinner or skeleton shell
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

  // 1. Mark authentication as initialized once profile resolution completes
  useEffect(() => {
    if (!isLoading) {
      setInitialized(true);
    }
  }, [isLoading, setInitialized]);

  // 2. Client-side Route Guard Logic (Replacing the old middleware)
  useEffect(() => {
    if (isInitialized) {
      const isPublicRoute = configuration.publicRoutes.includes(pathname);
      const authToken = Cookies.get("authToken");

      // Scenario A: No local token exists and trying to view a restricted page -> Kick to login
      if (!authToken && !isPublicRoute) {
        router.replace("/login");
        return;
      }

      // Scenario B: Authenticated user manually tries to view /login -> Redirect to home dashboard
      if (isAuthenticated && pathname === "/login") {
        router.replace("/home");
        return;
      }
    }
  }, [isAuthenticated, isInitialized, pathname, router]);

  // Determine if the client route is safe to layout render
  const isPublicRoute = configuration.publicRoutes.includes(pathname);
  const hasToken = typeof window !== "undefined" ? !!Cookies.get("authToken") : false;
  
  // Show a full loader if initialization hasn't finished, 
  // or if an unauthorized user lands on a private route to avoid flashing stale components
  if (!isInitialized || (!hasToken && !isPublicRoute)) {
    return (
      <div className="flex h-[100dvh] w-full items-center justify-center bg-background">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      {children}
    </div>
  );
}