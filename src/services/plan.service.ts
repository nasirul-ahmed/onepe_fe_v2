import httpClient from "@/lib/httpClient";

export enum PlanType {
  PREPAID = "prepaid",
  POSTPAID = "postpaid",
  DONGLE = "dongle",
}

export interface MobilePlanBenefits {
  talktime?: string;
  sms?: string;
  unlimitedCalls?: boolean;
  streamingApps?: string[];
  [key: string]: unknown; // Fallback index signature for flexible jsonb tracking
}

export interface MobilePlan {
  id: string;
  operatorId: string;
  circleId: string;
  planName: string | null;
  planType: PlanType;

  /** * Note: Decimal types are often transmitted as strings
   * over API responses to preserve currency floating point precision
   */
  amount: number | string;

  validity: string | null; // e.g., "28 days", "56 days"
  validityInDays: number | null; // Raw scalar number like 28, 56, 84
  data: string | null; // e.g., "1.5GB/day", "50GB"

  /** Typed representation of jsonb structure */
  benefits: MobilePlanBenefits | null;

  description: string;
  planCategory: string; // e.g., "Unlimited", "Data Add-on", "Top-up"
  isPopular: boolean;

  /** Flexible schema space for secondary vendor details */
  metadata: Record<string, unknown> | null;

  /** ISO Date strings passed over the API network layer */
  syncedAt: string;
  createdAt: string;
  updatedAt: string;
}

export async function getPlans({
  operatorId,
  circleId,
}: {
  operatorId: string;
  circleId: string;
}) {
  const { data } = await httpClient.get<MobilePlan[]>(
    `/plans?operatorId=${operatorId}&circleId=${circleId}`,
  );
  return data;
}
