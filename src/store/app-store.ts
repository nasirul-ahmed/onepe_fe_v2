import { create } from "zustand";

export enum ActiveTab {
  homepage = "/",
  profile = "/profile",
}

interface AppState {
  activeTab: ActiveTab;
  isLoading: boolean;
  setActiveTab: (tab: ActiveTab) => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  activeTab: ActiveTab.homepage,
  isLoading: false,
  setActiveTab: (tab: ActiveTab) => set({ activeTab: tab }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
