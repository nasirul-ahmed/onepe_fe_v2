import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface NavigationStore {
  history: string[];
  push: (path: string) => void;
  pop: () => string | null;
  clear: () => void;
  peek: () => string | null; // what's on top without removing
}

export const useNavigationStore = create<NavigationStore>()(
  persist(
    (set, get) => ({
      history: [],

      push: (path) =>
        set((s) => {
          if (s.history[s.history.length - 1] === path) return s;

          const existingIndex = s.history.indexOf(path);
          if (existingIndex !== -1) {
            return { history: s.history.slice(0, existingIndex + 1) };
          }
          const updated = [...s.history, path];
          return { history: updated.slice(-10) };
        }),

      pop: () => {
        const { history } = get();
        if (history.length === 0) return null;
        const previous = history[history.length - 1];
        set({ history: history.slice(0, -1) });
        return previous;
      },

      peek: () => {
        const { history } = get();
        return history[history.length - 1] ?? null;
      },

      clear: () => set({ history: [] }),
    }),
    {
      name: "navigation-history",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
