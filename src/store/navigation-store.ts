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
          // Don't push duplicates — user clicked same link twice
          if (s.history[s.history.length - 1] === path) return s;

          const updated = [...s.history, path];

          // limited stack on 10 entry or nested paths
          return { history: updated.slice(-10) };

          //   history:
          //     s.history[s.history.length - 1] === path
          //       ? s.history
          //       : [...s.history, path],
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
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
