import { QueryClient } from "@tanstack/react-query";

let clientQueryClientSingleton: QueryClient | undefined;

function getQueryClientSingleton() {
  if (typeof window === "undefined") {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute
          gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
        },
      },
    });
  }

  // Browser: create singleton to avoid recreating
  if (!clientQueryClientSingleton) {
    clientQueryClientSingleton = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute
          gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
        },
      },
    });
  }

  return clientQueryClientSingleton;
}

export function getQueryClient() {
  return getQueryClientSingleton();
}
