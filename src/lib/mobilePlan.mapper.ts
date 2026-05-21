import { MobileRechargePlan } from "@/lib/interfaces/recharge.interface";
import { MobilePlan } from "@/services/plan.service";

export function mapMobilePlanToCard(plan: MobilePlan): MobileRechargePlan {
  return {
    id: plan.id,

    amount: Number(plan.amount),

    validity: plan.validity || "",

    data: plan.data || "",

    description: plan.description,

    badge: plan.planCategory,

    badgeColor: plan.isPopular ? "blue" : "green",

    benefits: plan.benefits || {}

    // planCategory: plan?.planCategory
  };
}
