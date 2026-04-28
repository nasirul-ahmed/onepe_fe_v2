/**
 * Centralized Route Configuration
 * This file contains all route definitions, navigation rules, and service mappings
 * to eliminate hardcoded routes throughout the application.
 */

export interface RouteConfig {
  path: string;
  name: string;
  requiresBackButton: boolean;
  isBottomTabRoute: boolean;
  parentRoute?: string; // fallback only — used when nav stack is empty
  icon?: string;
  category?: "service" | "profile" | "main" | "transaction";
}

export const ROUTES: Record<string, RouteConfig> = {
  HOME: {
    path: "/home",
    name: "Home",
    requiresBackButton: false,
    isBottomTabRoute: true,
    icon: "🏠",
    category: "main",
  },
  SERVICES: {
    path: "/services",
    name: "Services",
    requiresBackButton: false,
    isBottomTabRoute: true,
    icon: "⚡",
    category: "main",
  },
  TRANSACTIONS: {
    path: "/transactions",
    name: "Transactions",
    requiresBackButton: true,
    isBottomTabRoute: false,
    icon: "💳",
    category: "transaction",
    parentRoute: "/home", // ← was '/home/wallet' which doesn't exist
  },
  PROFILE: {
    path: "/profile",
    name: "Profile",
    requiresBackButton: false,
    isBottomTabRoute: true,
    icon: "👤",
    category: "main",
  },
  SEARCH: {
    path: "/search",
    name: "Search",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/home",
    category: "main",
  },
  NOTIFICATIONS: {
    path: "/notifications",
    name: "Notifications",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/home",
    category: "main",
  },
  MOBILE_RECHARGE: {
    path: "/services/mobile-recharge",
    name: "Mobile Recharge",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/services",
    icon: "📱",
    category: "service",
  },
  DTH_RECHARGE: {
    path: "/services/dth-recharge",
    name: "DTH Recharge",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/services",
    icon: "📺",
    category: "service",
  },
  ELECTRICITY_BILL: {
    path: "/services/electricity-bill",
    name: "Electricity Bill",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/services",
    icon: "💡",
    category: "service",
  },
  WATER_BILL: {
    path: "/services/water-bill",
    name: "Water Bill",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/services",
    icon: "💧",
    category: "service",
  },
  GAS_BOOKING: {
    path: "/services/gas-booking",
    name: "Gas Bill",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/services",
    icon: "🛢️",
    category: "service",
  },
  PROFILE_SETTINGS: {
    path: "/profile/settings",
    name: "Settings",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/profile",
    category: "profile",
  },
  PROFILE_HELP: {
    path: "/profile/help",
    name: "Help & Support",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/profile",
    category: "profile",
  },
  PROFILE_PRIVACY: {
    path: "/profile/privacy",
    name: "Privacy Policy",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/profile",
    category: "profile",
  },
  TRANSACTION_DETAILS: {
    path: "/transactions/details",
    name: "Transaction Details",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/transactions",
    category: "transaction",
  },
  WALLET_TOPUP: {
    path: "/home/wallet-topup",
    name: "Wallet Topup",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/home",
    category: "service",
  },
  LOGIN: {
    path: "/login",
    name: "Login",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/",
  },
} as const;

export const SERVICE_ROUTES: Record<string, keyof typeof ROUTES> = {
  "Recharge": "MOBILE_RECHARGE",
  "DTH Recharge": "DTH_RECHARGE",
  "Electricity Bill": "ELECTRICITY_BILL",
  "Water Bill": "WATER_BILL",
  "Gas Bill": "GAS_BOOKING",
  "Gas Booking": "GAS_BOOKING",
} as const;

export class RouteUtils {
  static requiresBackButton(path: string): boolean {
    const route = this.getRouteByPath(path);
    return route?.requiresBackButton ?? false;
  }

  static isBottomTabRoute(path: string): boolean {
    const route = this.getRouteByPath(path);
    return route?.isBottomTabRoute ?? false;
  }

  /**
   * Fixed — exact match first, then longest prefix match.
   * Old endsWith() was matching wrong routes.
   */
  static getRouteByPath(path: string): RouteConfig | undefined {
    const cleanPath = path.split("?")[0];

    // 1. Exact match
    const exact = Object.values(ROUTES).find((r) => r.path === cleanPath);
    if (exact) return exact;

    // 2. Longest prefix match (handles dynamic segments)
    return Object.values(ROUTES)
      .filter((r) => cleanPath.startsWith(r.path))
      .sort((a, b) => b.path.length - a.path.length)[0];
  }

  static getServiceRoute(serviceName: string): string {
    const routeKey = SERVICE_ROUTES[serviceName];
    return routeKey ? ROUTES[routeKey].path : "/services";
  }

  /**
   * Fallback only — real back navigation uses the stack in useBackNavigation.
   * This is only called when the stack is empty (direct URL / refresh).
   */
  static getParentRoute(path: string): string {
    const route = this.getRouteByPath(path);
    return route?.parentRoute ?? "/home";
  }

  static getRoutesByCategory(category: RouteConfig["category"]): RouteConfig[] {
    return Object.values(ROUTES).filter((r) => r.category === category);
  }

  static getRouteName(path: string): string {
    const route = this.getRouteByPath(path.split("?")[0]);
    return route?.name ?? "Page";
  }

  static routeExists(path: string): boolean {
    return !!this.getRouteByPath(path);
  }

  // getBreadcrumb removed — use navigation stack from useNavigationStore instead
}

export const ROUTE_PATHS = {
  HOME: ROUTES.HOME.path,
  SERVICES: ROUTES.SERVICES.path,
  TRANSACTIONS: ROUTES.TRANSACTIONS.path,
  PROFILE: ROUTES.PROFILE.path,
  SEARCH: ROUTES.SEARCH.path,
  NOTIFICATIONS: ROUTES.NOTIFICATIONS.path,
  MOBILE_RECHARGE: ROUTES.MOBILE_RECHARGE.path,
  DTH_RECHARGE: ROUTES.DTH_RECHARGE.path,
  ELECTRICITY_BILL: ROUTES.ELECTRICITY_BILL.path,
  WATER_BILL: ROUTES.WATER_BILL.path,
  GAS_BOOKING: ROUTES.GAS_BOOKING.path,
  PROFILE_SETTINGS: ROUTES.PROFILE_SETTINGS.path,
  PROFILE_HELP: ROUTES.PROFILE_HELP.path,
  PROFILE_PRIVACY: ROUTES.PROFILE_PRIVACY.path,
  TRANSACTION_DETAILS: ROUTES.TRANSACTION_DETAILS.path,
  WALLET_TOPUP: ROUTES.WALLET_TOPUP.path,
  LOGIN: ROUTES.LOGIN.path,
} as const;

export default ROUTES;
