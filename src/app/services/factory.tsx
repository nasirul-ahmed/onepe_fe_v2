import SkeletonList from "@/components/SkeletonList";
import { AppService } from "@/lib/interfaces/services";
import dynamic, { DynamicOptionsLoadingProps } from "next/dynamic";

const createServiceModule = (path: string) => {
  return dynamic(() => import(`../../modules/${path}`), {
    // ssr: false,
    loading: (loadingProps: DynamicOptionsLoadingProps) => {
      return <SkeletonList count={8} />;
    },
  });
};

const modules: Record<
  string,
  React.ComponentType<Record<string, AppService | unknown>>
> = {
  // gas: createServiceModule("gas"),
  // water: createServiceModule("water"),
  // dth: createServiceModule("dth-recharge"),
  // electricity: createServiceModule("electricity"),
  recharge: createServiceModule("recharge/mobile-recharge"),
};
export const ServiceModuleFactory = (type: string) => {
  return modules[type] || modules["recharge"];
};

// const RechargeModule = dynamic(() => import("./components/mobile-recharge"), options);
// const DTHRechargeModule = dynamic(() => import("./components/dth-recharge"));
// const ElectricityModule = dynamic(() => import("./components/electricity"));
// const GasBillModule = dynamic(() => import("./components/gas"));
// const WaterBillModule = dynamic(() => import("./components/water"));

// export const ServiceModuleFactory = (type: string) => {
//   const modules: Record<
//     string,
//     React.ComponentType<Record<string, AppService | unknown>>
//   > = {
//     gas: GasBillModule,
//     water: WaterBillModule,
//     dth: DTHRechargeModule,
//     recharge: RechargeModule,
//     electricity: ElectricityModule,
//   };

//   return modules[type] || modules["recharge"];
// };
