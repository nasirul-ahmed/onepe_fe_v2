"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Typography } from "./Typography";
import Button from "./Button";
import { useAppStore, SHEET_TYPES, type SheetType } from "@/store/app-store";
import { SheetContent } from "./sheets/SheetContent";

// let sheetRoot: HTMLDivElement | null = null;

const getSheetRoot = () => {
  let root = document.getElementById("bottom-sheet-root");

  if (!root) {
    root = document.createElement("div");
    root.id = "bottom-sheet-root";

    document.body.appendChild(root);
  }

  return root;
};

interface BottomSheetProps {
  className?: string;
}

export function BottomSheet({ className }: BottomSheetProps) {
  const [mounted, setMounted] = React.useState(false);
  const { activeSheet, closeSheet, sheetData } = useAppStore();
  const isOpen = !!activeSheet;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getSheetConfig = () => {
    switch (activeSheet) {
      case SHEET_TYPES.PLANS_FILTERS:
        return { title: "Filters", height: "50vh" };
      case SHEET_TYPES.PLAN_DETAILS:
        return { title: "Plan Details", height: "50vh" };
      default:
        return { title: "", height: "auto" };
    }
  };

  const { title, height } = getSheetConfig();

  // Prevent body scroll when sheet is open
  React.useEffect(() => {
    if (isOpen && mounted) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, mounted]);

  // Handle escape key
  React.useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSheet();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeSheet]);

  // Don't render during SSR
  if (!mounted || !isOpen) return null;

  const sheetContent = createPortal(
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60  animate-fade-in"
        // className="fixed inset-0 bg-scrim/50 backdrop-blur-[1px] animate-fade-in"
        onClick={closeSheet}
        // style={{ animation: "fade-in 200ms ease forwards" }}
      />

      {/* Bottom Sheet */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center">
        <div
          className={cn(
            "relative w-full bg-surface rounded-t-3xl shadow-elevation-3",
            "animate-slide-up duration-300 ease-standard",
            className,
          )}
          style={{ height: height, maxHeight: "100vh" }}
        >
          {/* Drag Handle */}
          {/* <div className="flex justify-center pt-2 cursor-grab active:cursor-grabbing">
                <div className="w-10 h-1 bg-outline-variant rounded-full" />
              </div> */}

          {/* Header with Title and Close Button */}
          <div className="flex items-center justify-between px-4 pt-4">
            {title && (
              <Typography
                variant="h3"
                className="text-lg font-semibold text-on-surface"
              >
                {title}
              </Typography>
            )}
            <Button
              onClick={closeSheet}
              className={cn(
                "p-2 rounded-full bg-surface-variant text-on-surface-variant",
                "hover:bg-surface-variant/80 active:scale-95 transition-all",
                !title && "ml-auto",
              )}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="divider w-full"></div>

          {/* Content - Dynamically loaded based on activeSheet */}
          <div
            className="px-4 pb-6 overflow-y-auto"
            style={{ maxHeight: `calc(${height} - 80px)` }}
          >
            <SheetContent sheetId={activeSheet} />
          </div>
        </div>
      </div>
    </div>,
    getSheetRoot(),
  );

  return sheetContent;
}
