import { create } from "zustand";
import { getProfile, logoutApi } from "@/services/authService";

interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  initializeAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  initializeAuth: async () => {
    try {
      const profile = await getProfile();
      set({ user: profile, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  setUser: (user) => set({ user }),

  logout: async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error("Logout failed:", err);
    }
    set({ user: null });
  },
}));
