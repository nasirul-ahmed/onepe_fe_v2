import { mapMobilePlanToCard } from "@/lib/mobilePlan.mapper";
import { detectOperatorCircle } from "@/services/mobileRecharge.service";
import { getPlans } from "@/services/plan.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const queryKeys = {
  mobilePlans: (operatorId: string, circleId: string) => [
    "mobile-plans",
    operatorId,
    circleId,
  ],
};

export function useMobilePlans({
  operatorId,
  circleId,
}: {
  operatorId?: string;
  circleId?: string;
}) {
  return useQuery({
    queryKey:
      operatorId && circleId ? queryKeys.mobilePlans(operatorId, circleId) : [],

    queryFn: async () => {
      const plans = await getPlans({
        operatorId: operatorId!,
        circleId: circleId!,
      });

      return plans.map(mapMobilePlanToCard);
    },

    enabled: !!operatorId && !!circleId,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}

export const useDetectOperatorCircle = () => {
  return useMutation({
    mutationFn: (phone: string) => detectOperatorCircle(phone),
  });
};
