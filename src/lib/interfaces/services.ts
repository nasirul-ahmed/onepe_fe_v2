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

  type: ServiceType;
  category: ServiceCategory;

  icon?: string;

  isPopular: boolean;
  priority: number;

  route: string;

  discountPercentage?: number | null;
  discountLabel?: string | null;

  keywords?: string[];

  displayOrder: number;

  isActive: boolean;

  metadata?: Record<string, any>;

  createdAt?: Date;
  updatedAt?: Date;
}
