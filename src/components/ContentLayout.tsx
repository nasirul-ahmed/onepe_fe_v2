"use client";

import { ReactNode } from "react";
import { useAppStore } from "@/store/app-store";
import styles from "@/styles/components/contentLayout.module.css";
import { cn } from "@/lib/utils";
import OnepeLiquidLoader from "./OnePeLoader";

interface IContentLayoutInputProps {
  children: ReactNode;
  className?: string;
}
const ContentLayout = ({
  children,
  className = "",
}: IContentLayoutInputProps) => {
  const isLoading = useAppStore((state) => state.isLoading);
  return (
    <main className={cn(`${styles.contentLayout}`, className)}>
      <div className={cn(isLoading ? "flex" : "hidden")}>
        <OnepeLiquidLoader />
      </div>

      <div
        className={styles.contentContainer}
        style={{ display: isLoading ? "none" : "block" }}
      >
        {children}
      </div>
    </main>
  );
};

export default ContentLayout;
