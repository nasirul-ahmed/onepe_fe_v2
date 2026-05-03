import dynamic from "next/dynamic";
import { promoBannerSchema } from "./banner-types";
import { BannerRegistry } from "./types";

export const COMPONENT_REGISTRY: Record<string, BannerRegistry> = {
  promo_banner_v1: {
    component: dynamic(() => import("./banner-types/promo-banner/PromoBanner")),
    schema: promoBannerSchema,
  },
  // here goes the other banners comps
};
