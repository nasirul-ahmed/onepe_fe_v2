"use client";
import { ReactNode } from "react";
import Loader from "./Loader";
import { useAppStore } from "@/store/app-store";
import styles from "@/styles/components/contentLayout.module.css";

interface IContentLayoutInputProps {
  children: ReactNode;
  className?: string;
}

const ContentLayout = ({ children, className = "" }: IContentLayoutInputProps) => {
  const { isLoading } = useAppStore();
  
  return (
    <main className={`${styles.contentLayout} ${className}`}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.contentContainer}>
          {children}
        </div>
      )}
    </main>
  );
};

export default ContentLayout;
