"use client";

import { useEffect, useRef } from "react";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { usePathname } from "next/navigation";

import { useAppStore } from "@/store/app-store";
import { useNavigationStore } from "@/store/navigation-store";
import { useNavigation } from "@/hooks/useNavigate";

export function useAndroidBackHandler() {
  const pathname = usePathname();
  const { goBack } = useNavigation();

  const lastBackPress = useRef(0);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const listener = App.addListener("backButton", () => {
      const appStore = useAppStore.getState();

      /**
       * 1. Close active sheet first
       */
      if (appStore.activeSheet) {
        appStore.closeSheet();
        return;
      }

      /**
       * 2. Close active modal
       */
      if (appStore.modal) {
        appStore.closeModal();
        return;
      }

      /**
       * 3. Navigation stack
       */
      const navStore = useNavigationStore.getState();

      if (navStore.history.length > 0) {
        goBack();
        return;
      }

      /**
       * 4. Home screen
       */
      if (pathname === "/home") {
        const now = Date.now();

        if (now - lastBackPress.current < 2000) {
          App.exitApp();
          return;
        }

        lastBackPress.current = now;

        // Replace with your toast system
        console.log("Press back again to exit");

        return;
      }

      /**
       * 5. Fallback
       */
      goBack();
    });

    return () => {
      listener.then((l) => l.remove());
    };
  }, [pathname, goBack]);
}
