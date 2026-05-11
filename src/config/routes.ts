import { match, compile } from "path-to-regexp";

export interface RouteConfig {
  path: string;
  name: string;
  requiresBackButton?: boolean;
  isBottomTabRoute?: boolean;
  parentRoute?: string;
  icon?: string;
  category?: "service" | "profile" | "main" | "transaction";
}

/**
 * Enterprise Route Registry`
 * Only define structural routes here. Specific services are dynamic.
 */
export const ROUTES: Record<string, RouteConfig> = {
  HOME: {
    path: "/home",
    name: "Home",
    requiresBackButton: false,
    isBottomTabRoute: true,
    icon: "🏠",
    category: "main",
  },
  // The "Master" route for all services: /services/mobile-recharge, etc.
  SERVICE_ENTITY: {
    path: "/services/:slug",
    name: "Service",
    requiresBackButton: true,
    parentRoute: "/home",
    category: "service",
  },
  SERVICES: {
    path: "/services",
    name: "Services",
    requiresBackButton: true,
    icon: "⚡",
    category: "service",
  },
  TRANSACTIONS: {
    path: "/transactions",
    name: "Transactions",
    requiresBackButton: true,
    parentRoute: "/home",
    icon: "💳",
    category: "transaction",
  },
  PROFILE: {
    path: "/profile",
    name: "Profile",
    isBottomTabRoute: true,
    icon: "👤",
    category: "main",
  },
  SEARCH: {
    path: "/search",
    name: "Search",
    requiresBackButton: true,
    parentRoute: "/home",
  },
  NOTIFICATIONS: {
    path: "/notifications",
    name: "Notifications",
    requiresBackButton: true,
    parentRoute: "/home",
  },
  WALLET_TOPUP: {
    path: "/home/wallet-topup",
    name: "Wallet Topup",
    requiresBackButton: true,
    parentRoute: "/home",
  },
  LOGIN: { path: "/login", name: "Login" },
  MANAGE_NOTIFICATIONS: {
    path: "/profile/manage-notifications",
    name: "Manage Notifications",
    requiresBackButton: true,
    parentRoute: "/profile",
  },
} as const;

export type AppRouteKey = keyof typeof ROUTES;
export type AppRouteConfig = (typeof ROUTES)[AppRouteKey];

export class RouteUtils {
  /**
   * Universal Route Resolver
   * Matches a URL string to a configuration object and extracts params
   */
  static resolve(path: string) {
    const cleanPath = path.split("?")[0];

    for (const route of Object.values(ROUTES)) {
      const matcher = match(route.path, {
        decode: decodeURIComponent,
        end: true,
      });
      const result = matcher(cleanPath);

      if (result) {
        return {
          config: route as RouteConfig,
          params: result.params as Record<string, string>,
        };
      }
    }
    return null;
  }

  /**
   * Type-safe Path Builder
   * Usage: RouteUtils.build(ROUTES.SERVICE_ENTITY, { slug: 'mobile-recharge' })
   */
  static build(
    route: RouteConfig,
    params?: Record<string, string | number>,
  ): string {
    try {
      const toPath = compile(route.path, { encode: encodeURIComponent });
      const stringParams = params
        ? Object.fromEntries(
            Object.entries(params).map(([k, v]) => [k, String(v)]),
          )
        : undefined;
      return toPath(stringParams);
    } catch (e) {
      console.error(`[RouteUtils] Error building path for ${route.path}`, e);
      return route.path;
    }
  }

  /**
   * Helper to get parent route, ensuring dynamic parts are handled
   */
  static getParentPath(path: string): string {
    const resolved = this.resolve(path);
    return resolved?.config.parentRoute ?? "/home";
  }

  static getRouteName(path: string, searchParams?: URLSearchParams): string {
    const resolved = this.resolve(path);

    if (resolved?.config.path === "/services/:slug") {
      const step = searchParams?.get("step");
      const slug = resolved.params.slug;

      if (slug === "recharge") {
        if (step === "plans") return "Select Plan";
        if (step === "confirm") return "Confirm Payment";
        return "Mobile Recharge";
      }
    }

    return resolved?.config.name || "OnePe";
  }

  static isBottomTab(path: string): boolean {
    return this.resolve(path)?.config.isBottomTabRoute ?? false;
  }

  static requiresBackButton(path: string): boolean {
    const resolved = this.resolve(path);

    // If route isn't defined, default to true for safety (sub-pages)
    if (!resolved) return true;

    return resolved.config.requiresBackButton ?? false;
  }
}

/**
 * Simple path constants for quick access
 */
export const ROUTE_PATHS = Object.fromEntries(
  Object.entries(ROUTES).map(([key, value]) => [key, value.path]),
) as Record<AppRouteKey, string>;

export default ROUTES;
