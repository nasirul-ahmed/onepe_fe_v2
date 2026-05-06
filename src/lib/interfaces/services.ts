export type ServiceType = "recharge" | "bill" | "finance" | "other";

export type ServiceCategory =
  | "recharge"
  | "bill"
  | "finance"
  | "insurance"
  | "education";

export interface AppService {
  id: string;

  name: string;
  slug: string;

  type: string;
  category: string;

  icon?: string;

  isPopular: boolean;
  priority: number;

  route: string;

  discountPercentage?: number | null;
  discountLabel?: string | null;

  keywords?: string[];

  displayOrder: number;

  isActive: boolean;

  metadata?: Record<string, unknown> | null;

  createdAt?: Date;
  updatedAt?: Date;
}
