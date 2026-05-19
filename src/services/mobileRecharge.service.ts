import httpClient from "@/lib/httpClient";

interface RechargePayload {
  mobileNumber: string;
  operatorId: string;
  circleId?: string;
  planId?: string;
  amount: number;
}

export async function initiateMobileRecharge(payload: RechargePayload) {
  const { data } = await httpClient.post<{ orderId: string }>(
    "/services/mobile-recharge/initiate",
    payload,
  );
  return data;
}
