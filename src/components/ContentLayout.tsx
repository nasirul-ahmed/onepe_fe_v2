"use client";
import { ReactNode } from "react";
import Loader from "./Loader";
import { useAppStore } from "@/store/app-store";

interface IContentLayoutInputProps {
  children: ReactNode;
  className?: string;
}

const ContentLayout = ({ children, className = "" }: IContentLayoutInputProps) => {
  const { isLoading } = useAppStore();
  
  return (
    <main className={`h-full w-full overflow-auto bg-background ${className}`}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex-1 overflow-auto px-4 py-4 pb-20 max-w-md mx-auto">
          {children}
        </div>
      )}
    </main>
  );
};

export default ContentLayout;
