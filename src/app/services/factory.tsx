import { AppService } from "@/lib/interfaces/services";
import { lazy } from "react";

const createServiceModule = (path: string) => {
  return lazy(() => import(`../../modules/${path}`));
};

const modules: Record<
  string,
  React.ComponentType<Record<string, AppService | unknown>>
> = {
  recharge: createServiceModule("recharge/mobile-recharge"),
  ["coming-soon"]: lazy(() => import(`../../components/ComingSoon`)),
};

export const ServiceModuleFactory = (type: string) => {
  return modules[type] || modules["coming-soon"];
};
