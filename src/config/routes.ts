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
  parentRoute?: string;
  icon?: string;
  category?: 'service' | 'profile' | 'main' | 'transaction';
}

/**
 * Main route definitions with navigation metadata
 */
export const ROUTES: Record<string, RouteConfig> = {
  // Main bottom tab routes
  HOME: {
    path: "/home",
    name: "Home",
    requiresBackButton: false,
    isBottomTabRoute: true,
    icon: "🏠",
    category: "main"
  },
  SERVICES: {
    path: "/services",
    name: "Services",
    requiresBackButton: false,
    isBottomTabRoute: true,
    icon: "⚡",
    category: "main"
  },
  TRANSACTIONS: {
    path: "/transactions",
    name: "Transactions",
    requiresBackButton: false,
    isBottomTabRoute: true,
    icon: "💳",
    category: "main"
  },
  PROFILE: {
    path: "/profile",
    name: "Profile",
    requiresBackButton: false,
    isBottomTabRoute: true,
    icon: "👤",
    category: "main"
  },

  // Navigation routes that require back button
  SEARCH: {
    path: "/search",
    name: "Search",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/home",
    category: "main"
  },
  NOTIFICATIONS: {
    path: "/notifications",
    name: "Notifications", 
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/home",
    category: "main"
  },

  // Service routes
  MOBILE_RECHARGE: {
    path: "/services/mobile-recharge",
    name: "Mobile Recharge",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/services",
    icon: "📱",
    category: "service"
  },
  DTH_RECHARGE: {
    path: "/services/dth-recharge",
    name: "DTH Recharge",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/services",
    icon: "📺",
    category: "service"
  },
  ELECTRICITY_BILL: {
    path: "/services/electricity-bill",
    name: "Electricity Bill",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/services",
    icon: "💡",
    category: "service"
  },
  WATER_BILL: {
    path: "/services/water-bill",
    name: "Water Bill",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/services",
    icon: "💧",
    category: "service"
  },
  GAS_BOOKING: {
    path: "/services/gas-booking",
    name: "Gas Bill",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/services",
    icon: "🛢️",
    category: "service"
  },

  // Profile sub-routes
  PROFILE_SETTINGS: {
    path: "/profile/settings",
    name: "Settings",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/profile",
    category: "profile"
  },
  PROFILE_HELP: {
    path: "/profile/help",
    name: "Help & Support",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/profile",
    category: "profile"
  },
  PROFILE_PRIVACY: {
    path: "/profile/privacy",
    name: "Privacy Policy",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/profile",
    category: "profile"
  },

  // Transaction routes
  TRANSACTION_DETAILS: {
    path: "/transactions/details",
    name: "Transaction Details",
    requiresBackButton: true,
    isBottomTabRoute: false,
    parentRoute: "/transactions",
    category: "transaction"
  }
} as const;

/**
 * Service name to route mapping for dynamic navigation
 */
export const SERVICE_ROUTES: Record<string, keyof typeof ROUTES> = {
  "Mobile Recharge": "MOBILE_RECHARGE",
  "DTH Recharge": "DTH_RECHARGE", 
  "Electricity Bill": "ELECTRICITY_BILL",
  "Water Bill": "WATER_BILL",
  "Gas Bill": "GAS_BOOKING",
  "Gas Booking": "GAS_BOOKING", // Alternative name
  // Add aliases and variations as needed
} as const;

/**
 * Route utility functions
 */
export class RouteUtils {
  /**
   * Check if a route requires back button
   */
  static requiresBackButton(path: string): boolean {
    return Object.values(ROUTES).some(
      route => path.startsWith(route.path) && route.requiresBackButton
    );
  }

  /**
   * Check if a route is a bottom tab route
   */
  static isBottomTabRoute(path: string): boolean {
    return Object.values(ROUTES).some(
      route => path === route.path && route.isBottomTabRoute
    );
  }

  /**
   * Get route config by path
   */
  static getRouteByPath(path: string): RouteConfig | undefined {
    return Object.values(ROUTES).find(route => 
      path.startsWith(route.path)
    );
  }

  /**
   * Get service route by service name
   */
  static getServiceRoute(serviceName: string): string {
    const routeKey = SERVICE_ROUTES[serviceName];
    return routeKey ? ROUTES[routeKey].path : "/services";
  }

  /**
   * Get parent route for navigation
   */
  static getParentRoute(path: string): string {
    const route = this.getRouteByPath(path);
    return route?.parentRoute || "/home";
  }

  /**
   * Get all routes of a specific category
   */
  static getRoutesByCategory(category: RouteConfig['category']): RouteConfig[] {
    return Object.values(ROUTES).filter(route => route.category === category);
  }

  /**
   * Get all routes that require back button
   */
  static getBackButtonRoutes(): string[] {
    return Object.values(ROUTES)
      .filter(route => route.requiresBackButton)
      .map(route => route.path);
  }

  /**
   * Get route name by path
   */
  static getRouteName(path: string): string {
    const route = this.getRouteByPath(path);
    return route?.name || "Page";
  }

  /**
   * Check if route exists
   */
  static routeExists(path: string): boolean {
    return Object.values(ROUTES).some(route => 
      path.startsWith(route.path)
    );
  }

  /**
   * Get breadcrumb trail for a route
   */
  static getBreadcrumb(path: string): RouteConfig[] {
    const breadcrumb: RouteConfig[] = [];
    let currentPath = path;
    
    while (currentPath && currentPath !== "/") {
      const route = this.getRouteByPath(currentPath);
      if (route) {
        breadcrumb.unshift(route);
        currentPath = route.parentRoute || "";
      } else {
        break;
      }
    }
    
    return breadcrumb;
  }
}

/**
 * Route constants for easy access
 */
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
} as const;

export default ROUTES;