"use client";

import { SHEET_TYPES, useAppStore } from "@/store/app-store";
import { PlansFilterSheet } from "./RechargeSheets";
import ContactDetailsOption from "./ContactDetailsOption";
import RechargeOffers from "./RechargeOffers";
import PlanDetails from "./PlanDetails";

const sheetComponents = {
  [SHEET_TYPES.PLANS_FILTERS]: PlansFilterSheet,
  [SHEET_TYPES.CONTACT_OPTIONS]: ContactDetailsOption,
  [SHEET_TYPES.RECHARGE_OFFERS]: RechargeOffers,
  [SHEET_TYPES.PLAN_DETAILS]: PlanDetails,
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
