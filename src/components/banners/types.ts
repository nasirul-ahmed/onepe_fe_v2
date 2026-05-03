import z from "zod";

export interface BannerEvent {
  type: string;
  action: string;
  metadata?: Record<string, unknown>;
}

export interface BannerData {
  props: unknown;
  styles?: Record<string, string>;
  events?: BannerEvent[];
}

export interface BaseBanner {
  id: string;
  component: string;
  version: number;
  priority: number;
  data: BannerData;
}

export interface BannerRegistry {
  component: React.ComponentType<any>;
  schema: z.ZodSchema<unknown>;
}
