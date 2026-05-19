"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useNavigationStore } from "@/store/navigation-store";
import { RouteUtils } from "@/config/routes";
import React, { useRef } from "react";

export function useNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push, clear, history } = useNavigationStore();

  const isNavigating = useRef(false);

  React.useEffect(() => {
    isNavigating.current = false;
  }, [pathname, searchParams]);

  const currentFullUrl = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  const navigate = (to: string) => {
    if (isNavigating.current) return;

    const resolved = RouteUtils.resolve(to);
    if (!resolved) return;

    // marked as navigating
    isNavigating.current = true;

    const isNavTab = resolved.config.isBottomTabRoute;

    if (isNavTab) {
      clear();
      router.replace(to);
      return;
    }

    if (history[history.length - 1] !== currentFullUrl) {
      push(currentFullUrl);
    }

    router.push(to);
  };

  const goBack = () => {
    if (isNavigating.current) return;

    const { pop } = useNavigationStore.getState();
    const previous = pop();

    isNavigating.current = true;

    if (previous) {
      router.push(previous);
    } else {
      // Fallback to parent if history is empty
      router.push(RouteUtils.getParentPath(pathname));
    }
  };

  return { navigate, goBack };
}
