"use client";

import { SHEET_TYPES, useAppStore } from "@/store/app-store";
import { PlansFilterSheet } from "./RechargeSheets";
import { lazy } from "react";
import ContactDetailsOption from "./ContactDetailsOption";

const sheetComponents = {
  // "plans-filters": lazy(() =>
  //   import("./RechargeSheets").then((module) => ({
  //     default: module.PlansFilterSheet,
  //   })),
  // ),

  [SHEET_TYPES.PLANS_FILTERS]: PlansFilterSheet,
  [SHEET_TYPES.CONTACT_OPTIONS]: ContactDetailsOption,
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

  return <SheetComponent data={sheetData || {}} />;
}
