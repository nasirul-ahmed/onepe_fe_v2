"use client";

import { useAppStore } from "@/store/app-store";
import { PlansFilterSheet } from "./RechargeSheets";
import { lazy } from "react";

const sheetComponents = {
  // "plans-filters": lazy(() =>
  //   import("./RechargeSheets").then((module) => ({
  //     default: module.PlansFilterSheet,
  //   })),
  // ),

  "plans-filters": PlansFilterSheet,
} as const;

interface SheetContentProps {
  sheetId: string | null;
}

export function SheetContent({ sheetId }: SheetContentProps) {
  const { sheetData } = useAppStore();

  if (!sheetId) return null;

  const SheetComponent =
    sheetComponents[sheetId as keyof typeof sheetComponents];

  if (!SheetComponent) return null;

  return <SheetComponent {...(sheetData?.props ?? {})} />;
}
