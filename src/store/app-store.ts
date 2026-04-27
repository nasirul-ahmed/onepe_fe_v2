import { create } from "zustand";
import { ROUTE_PATHS } from "@/config/routes";

export const ActiveTab = {
  homepage: ROUTE_PATHS.HOME,
  profile: ROUTE_PATHS.PROFILE,
} as const;

export type ActiveTab = (typeof ActiveTab)[keyof typeof ActiveTab];

interface AppState {
  activeTab: ActiveTab;
  isLoading: boolean;
  setActiveTab: (tab: ActiveTab) => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  activeTab: ActiveTab.homepage,
  isLoading: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
