import React from "react";
import ContentLayout from "@/components/ContentLayout";
import styles from "@/styles/pages/services.module.css";
import ServicesGrid from "@/components/ServicesGrid";
import { getQueryClient } from "@/lib/getQueryClient";
import { cookies } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { APP_SERVICES_QUERY_KEYS } from "@/hooks/useAppServices";
import { AppService } from "@/lib/interfaces/services";
import config from "@/config/config.json";

async function fetchAppServices(token: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/app-services`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      },
    );

    if (!res.ok) throw new Error("Failed to fetch the app services");

    const data = await res.json();
    return data.services;
  } catch (error) {
    console.error("Error fetching app services:", error);
    return config.appServices;
  }
}

export default async function ServicesPage() {
  const queryClient = getQueryClient();
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  await queryClient.prefetchQuery({
    queryKey: APP_SERVICES_QUERY_KEYS,
    queryFn: () => fetchAppServices(token!),
  });

  const data: AppService[] =
    queryClient.getQueryData(APP_SERVICES_QUERY_KEYS) || [];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ContentLayout>
        <div className={styles.container}>
          <ServicesGrid services={data} modalEnabled={false} />
        </div>
      </ContentLayout>
    </HydrationBoundary>
  );
}
