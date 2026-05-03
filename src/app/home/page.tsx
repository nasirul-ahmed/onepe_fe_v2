import HomeView from "./HomeView";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { APP_BANNERS_QUERY_KEYS } from "@/hooks/useBanners";
import { APP_SERVICES_QUERY_KEYS } from "@/hooks/useAppServices";

async function fetchBanners(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/banners`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch user");

  const data = await res.json();
  return data;
}

async function fetchAppServices(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/app-services`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch the app services");

  const data = await res.json();
  return data;
}

export default async function HomePage() {
  const queryClient = getQueryClient();

  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    console.log("token not found");
  }

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: APP_BANNERS_QUERY_KEYS,
      queryFn: () => fetchBanners(token!),
    }),

    queryClient.prefetchQuery({
      queryKey: APP_SERVICES_QUERY_KEYS,
      queryFn: () => fetchAppServices(token!),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeView />
    </HydrationBoundary>
  );
}
