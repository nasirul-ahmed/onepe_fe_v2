"use client";

import { useEffect } from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useAppStore } from "@/store/app-store";

export function LoaderProvider() {
  const setLoading = useAppStore((state) => state.setLoading);
  const isFetching = useIsFetching({
    predicate: (query) => query.meta?.globalLoading !== false,
  });
  const isMutating = useIsMutating();

  useEffect(() => {
    setLoading(isFetching > 0 || isMutating > 0);
  }, [isFetching, isMutating, setLoading]);

  return null;
}
