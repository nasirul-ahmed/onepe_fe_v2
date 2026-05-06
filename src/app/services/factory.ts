import { AppService } from "@/lib/interfaces/services";
import dynamic from "next/dynamic";

const RechargeModule = dynamic(() => import("./components/mobile-recharge"));
const DTHRechargeModule = dynamic(() => import("./components/dth-recharge"));
const ElectricityModule = dynamic(() => import("./components/electricity"));
const GasBillModule = dynamic(() => import("./components/gas"));
const WaterBillModule = dynamic(() => import("./components/water"));

export const ServiceModuleFactory = (type: string) => {
  const modules: Record<
    string,
    React.ComponentType<Record<string, AppService | unknown>>
  > = {
    gas: GasBillModule,
    water: WaterBillModule,
    dth: DTHRechargeModule,
    recharge: RechargeModule,
    electricity: ElectricityModule,
  };

  return modules[type] || modules["recharge"];
};
