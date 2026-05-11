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
          // const lastEntry = s.history[s.history.length - 1];

          // if (lastEntry === path) return s;

          // if (s.history.includes(path)) {
          //   const index = s.history.indexOf(path);
          //   return { history: s.history.slice(0, index + 1) };
          // }

          // const updated = [...s.history, path];
          // return { history: updated.slice(-10) };

          if (s.history[s.history.length - 1] === path) return s;

          // 2. PATH SYNC: If we are going back to a page already in our history,
          // truncate the stack to that point. This prevents: /home -> /profile -> /home
          const existingIndex = s.history.indexOf(path);
          if (existingIndex !== -1) {
            return { history: s.history.slice(0, existingIndex + 1) };
          }

          // 3. Otherwise, push new path and keep last 10
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
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
