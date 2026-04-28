"use client";

import { ReactNode } from "react";
import { useAppStore } from "@/store/app-store";
import styles from "@/styles/components/contentLayout.module.css";

interface IContentLayoutInputProps {
  children: ReactNode;
  className?: string;
}
const ContentLayout = ({
  children,
  className = "",
}: IContentLayoutInputProps) => {
  const { isLoading } = useAppStore();

  return (
    <main className={`${styles.contentLayout} ${className}`}>
      {/* <div style={{ display: isLoading ? "flex" : "none", height: "100%" }}>
        <Loader />
      </div> */}

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
