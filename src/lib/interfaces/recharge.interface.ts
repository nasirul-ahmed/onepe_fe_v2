export interface MobileRechargePlan {
  id: string;
  amount: number;
  validity: string;
  data: string;
  talktime?: string;
  badge?: string;
  badgeColor?: "green" | "blue";
  benefits?: string[];
  description?: string;
  type?: string;
}

export interface MobileRechargeDetails {
  phone: string;
  operator?: string;
  circle?: string;
  planDetails: Partial<MobileRechargePlan>;
}
