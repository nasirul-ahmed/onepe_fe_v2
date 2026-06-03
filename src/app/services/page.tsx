"use client";

import React from "react";
import { motion } from "framer-motion";
import ContentLayout from "@/components/ContentLayout";
import styles from "@/styles/pages/services.module.css";
import ServicesGrid, { ServiceTile } from "@/components/ServicesGrid";
import { getQueryClient } from "@/lib/getQueryClient";
// import { cookies } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { APP_SERVICES_QUERY_KEYS } from "@/hooks/useAppServices";
import { AppService } from "@/lib/interfaces/services";
import config from "@/config/config.json";
import { capitalize, groupByCategory } from "@/lib/utils";
import { ServicesCategory } from "@/components/modals/AllServicesModal";
import { Typography } from "@/components/Typography";
import ROUTES, { RouteUtils } from "@/config/routes";
import { useNavigation } from "@/hooks/useNavigate";
import SectionHeader from "@/components/SectionHeader";

// async function fetchAppServices(token: string) {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/app-services`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//         cache: "no-store",
//       },
//     );

//     if (!res.ok) throw new Error("Failed to fetch the app services");

//     const data = await res.json();
//     return data.services;
//   } catch (error) {
//     console.error("Error fetching app services:", error);
//     return config.appServices;
//   }
// }

export default function ServicesPage() {
  const { navigate } = useNavigation();
  const queryClient = getQueryClient();
  // const cookieStore = await cookies();
  // const token = cookieStore.get("authToken")?.value;

  // await queryClient.prefetchQuery({
  //   queryKey: APP_SERVICES_QUERY_KEYS,
  //   queryFn: () => config.appServices,
  // });

  // const data: AppService[] =
  //   queryClient.getQueryData(APP_SERVICES_QUERY_KEYS) || [];

  const groupedServices = groupByCategory(
    config.appServices,
  ) as unknown as ServicesCategory[];

  const handleServiceClick = (slug: string) => {
    const url = RouteUtils.build(ROUTES.SERVICE_ENTITY, {
      slug: slug,
    });

    navigate(url);
  };

  return (
    <div className="h-full px-2 pb-40 overflow-y-auto">
      {groupedServices.map(({ category, items }) => (
        <div key={category} className="p-2">
          <SectionHeader
            title={capitalize(category) as string}
            classes="mb-2"
          />
          <div className="grid grid-cols-4 p-4 gap-[0.3rem] rounded-lg bg-surface-2">
            {items.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <ServiceTile
                  service={service}
                  size="xs"
                  onClick={() => handleServiceClick(service.slug)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
