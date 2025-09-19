"use client";
import { ReactNode } from "react";
import Loader from "./Loader";
import { useAppStore } from "@/store/app-store";

interface IContentLayoutInputProps {
  children: ReactNode;
}

const ContentLayout = ({ children }: IContentLayoutInputProps) => {
  const { isLoading } = useAppStore();
  return (
    <div className="h-full w-full overflow-scroll">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex-1 overflow-auto px-6 py-6">{children}</div>
      )}
    </div>
  );
};

export default ContentLayout;
