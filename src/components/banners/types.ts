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

// export interface BannerRegistry<T extends z.ZodTypeAny = z.ZodTypeAny> {
//   component: React.ComponentType<z.infer<T>>;
//   schema: T;
// }

export interface BannerRegistry {
  component: React.ComponentType<Record<string, unknown>>;
  schema: z.ZodSchema<Record<string, unknown>>;
}
