import { create } from "zustand";
import { RouteUtils, ROUTE_PATHS } from "@/config/routes";

export const ActiveTab = {
  homepage: ROUTE_PATHS.HOME,
  profile: ROUTE_PATHS.PROFILE,
} as const;

export type ActiveTab = typeof ActiveTab[keyof typeof ActiveTab];

interface AppState {
  activeTab: ActiveTab;
  isLoading: boolean;
  
  // Navigation state
  showBackButton: boolean;
  previousRoute: string | null;
  currentRoute: string;
  
  setActiveTab: (tab: ActiveTab) => void;
  setLoading: (loading: boolean) => void;
  
  // Navigation actions
  setShowBackButton: (show: boolean) => void;
  setPreviousRoute: (route: string | null) => void;
  setCurrentRoute: (route: string) => void;
  
  // Navigation helpers
  handleRouteChange: (newRoute: string, showBack?: boolean) => void;
  resetNavigation: () => void;
}

export const useAppStore = create<AppState>()((set, get) => ({
  activeTab: ActiveTab.homepage,
  isLoading: false,
  
  // Navigation initial state
  showBackButton: false,
  previousRoute: null,
  currentRoute: ROUTE_PATHS.HOME,
  
  setActiveTab: (tab: ActiveTab) => set({ activeTab: tab }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  // Navigation actions
  setShowBackButton: (show) => set({ showBackButton: show }),
  setPreviousRoute: (route) => set({ previousRoute: route }),
  setCurrentRoute: (route) => set({ currentRoute: route }),
  
  // Navigation helpers
  handleRouteChange: (newRoute: string, showBack?: boolean) => {
    const currentRoute = get().currentRoute;
    
    // Determine if we should show back button
    let shouldShowBack = false;
    
    if (showBack !== undefined) {
      shouldShowBack = showBack;
    } else {
      // Auto-detect based on route using centralized config
      shouldShowBack = RouteUtils.requiresBackButton(newRoute);
    }
    
    set({
      currentRoute: newRoute,
      previousRoute: currentRoute,
      showBackButton: shouldShowBack,
    });
  },

  resetNavigation: () => set({
    showBackButton: false,
    previousRoute: null,
    currentRoute: ROUTE_PATHS.HOME,
  }),
}));
