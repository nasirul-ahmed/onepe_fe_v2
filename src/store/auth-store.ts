import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  // Only session state (not server data)
  isAuthenticated: boolean;
  isInitialized: boolean;

  // Actions
  setAuthenticated: (authenticated: boolean) => void;
  setInitialized: (initialized: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!Cookies.get("authToken"),
  isInitialized: false,

  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  setInitialized: (initialized) => set({ isInitialized: initialized }),
}));
