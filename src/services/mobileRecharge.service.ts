import httpClient from "@/lib/httpClient";

interface RechargePayload {
  mobileNumber: string;
  operatorId: string;
  circleId?: string;
  planId?: string;
  amount: number;
}

export interface OperatorCircle {
  circle: string;
  circleName: string;
  fromCache: boolean;
  operatorId: string;
  operatorName: string;
  type: string;
}

export async function initiateMobileRecharge(payload: RechargePayload) {
  const { data } = await httpClient.post<{ orderId: string }>(
    "/services/mobile-recharge/initiate",
    payload,
  );
  return data;
}

export async function detectOperatorCircle(
  phone: string,
): Promise<OperatorCircle> {
  const { data } = await httpClient.get<OperatorCircle>(
    `/services/mobile-recharge/operator?number=${phone}`,
  );
  return data;
}
