# Route Configuration System

This document describes the centralized route configuration system implemented to eliminate hardcoded routes throughout the OnePe application.

## Overview

The route system is now centralized in `/src/config/routes.ts` which provides:
- Route definitions with metadata
- Navigation rules (back button requirements)
- Service mappings
- Utility functions for route operations
- Type safety for all routing operations

## Usage

### Importing Routes

```typescript
import { ROUTES, ROUTE_PATHS, RouteUtils } from '@/config/routes';
```

### Using Route Constants

Instead of hardcoded strings, use the constants:

```typescript
// ❌ Before (hardcoded)
router.push('/home');

// ✅ After (centralized)
router.push(ROUTE_PATHS.HOME);
```

### Route Utilities

The `RouteUtils` class provides helpful methods:

```typescript
// Check if route requires back button
RouteUtils.requiresBackButton('/services/mobile-recharge'); // true

// Get service route by name
RouteUtils.getServiceRoute('Mobile Recharge'); // '/services/mobile-recharge'

// Get route name for display
RouteUtils.getRouteName('/profile/settings'); // 'Settings'

// Get parent route for navigation
RouteUtils.getParentRoute('/services/mobile-recharge'); // '/services'
```

## Route Structure

Each route is defined with the following properties:

```typescript
interface RouteConfig {
  path: string;                    // URL path
  name: string;                    // Display name
  requiresBackButton: boolean;     // Navigation behavior
  isBottomTabRoute: boolean;       // Bottom tab visibility
  parentRoute?: string;            // Parent route for breadcrumbs
  icon?: string;                   // Icon emoji
  category?: 'service' | 'profile' | 'main' | 'transaction';
}
```

## Route Categories

### Main Routes (Bottom Tabs)
- Home (`/home`)
- Services (`/services`) 
- Transactions (`/transactions`)
- Profile (`/profile`)

### Service Routes
- Mobile Recharge (`/services/mobile-recharge`)
- DTH Recharge (`/services/dth-recharge`)
- Electricity Bill (`/services/electricity-bill`)
- Water Bill (`/services/water-bill`)
- Gas Booking (`/services/gas-booking`)

### Navigation Routes
- Search (`/search`)
- Notifications (`/notifications`)

### Profile Routes
- Settings (`/profile/settings`)
- Help & Support (`/profile/help`)
- Privacy Policy (`/profile/privacy`)

## Service Mapping

Services are mapped by display name to route keys:

```typescript
const SERVICE_ROUTES = {
  "Mobile Recharge": "MOBILE_RECHARGE",
  "DTH Recharge": "DTH_RECHARGE",
  "Electricity Bill": "ELECTRICITY_BILL",
  "Water Bill": "WATER_BILL",
  "Gas Bill": "GAS_BOOKING",
};
```

## Updated Components

The following components now use the centralized route system:

1. **app-store.ts** - Uses `RouteUtils.requiresBackButton()` for navigation logic
2. **Header.tsx** - Uses `RouteUtils.getRouteName()` for page titles
3. **Footer.tsx** - Uses `ROUTE_PATHS` constants for navigation
4. **AvailableServices.tsx** - Uses `RouteUtils.getServiceRoute()` for service navigation
5. **SplashScreen.tsx** - Uses `ROUTE_PATHS.HOME` for navigation

## Benefits

1. **Centralized Configuration** - All routes defined in one place
2. **Type Safety** - TypeScript ensures route consistency
3. **Easy Maintenance** - Single point of change for route modifications
4. **Automatic Navigation Logic** - Back button behavior determined by route config
5. **Consistent Naming** - Route names centrally managed for UI display
6. **Breadcrumb Support** - Parent route relationships for navigation hierarchy

## Adding New Routes

To add a new route:

1. Add route definition to `ROUTES` object in `/src/config/routes.ts`
2. Add route constant to `ROUTE_PATHS` for easy access
3. If it's a service, add mapping to `SERVICE_ROUTES`
4. The route will automatically work with the navigation system

Example:

```typescript
// Add to ROUTES
NEW_SERVICE: {
  path: "/services/new-service",
  name: "New Service",
  requiresBackButton: true,
  isBottomTabRoute: false,
  parentRoute: "/services",
  category: "service"
}

// Add to ROUTE_PATHS
NEW_SERVICE: ROUTES.NEW_SERVICE.path,

// Add to SERVICE_ROUTES (if applicable)
"New Service": "NEW_SERVICE",
```

## Migration Complete

All hardcoded routes have been eliminated from:
- ✅ App store navigation logic
- ✅ Header component page titles
- ✅ Footer navigation items
- ✅ Service navigation routing
- ✅ Splash screen navigation
- ✅ Back button logic

The application now has a robust, maintainable route configuration system that eliminates hardcoded route strings and provides a single source of truth for all routing operations.