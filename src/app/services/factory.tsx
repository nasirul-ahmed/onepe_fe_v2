import OnepeLiquidLoader from "@/components/OnePeLoader";
import { AppService } from "@/lib/interfaces/services";
import dynamic from "next/dynamic";
import { lazy } from "react";

const createServiceModule = (path: string) => {
  return lazy(() => import(`../../modules/${path}`));
};

const modules: Record<
  string,
  React.ComponentType<Record<string, AppService | unknown>>
> = {
  recharge: createServiceModule("recharge/mobile-recharge"),
};

export const ServiceModuleFactory = (type: string) => {
  return modules[type] || modules["recharge"];
};

// export const availableServiceslugs = Object.keys(modules).reduce(
//   (prev, slug) => {
//     const data = { ...prev, [slug]: slug };
//     return data;
//   },
//   {} as Record<string, string>,
// );
