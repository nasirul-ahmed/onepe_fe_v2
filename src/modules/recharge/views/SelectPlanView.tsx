"use client";

import React from "react";
import Button from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";
import TextField from "@/components/TextField";
import { Typography } from "@/components/Typography";
import { SHEET_TYPES, useAppStore } from "@/store/app-store";
import {
  ChevronRight,
  IndianRupee,
  Phone,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import PlanCard from "../components/PlanCard";
import { MobileRechargePlan } from "@/lib/interfaces/recharge.interface";
import { useRechargeStore } from "@/store/recharge-store";
import { useNavigation } from "@/hooks/useNavigate";

interface SelectPlanViewProps {
  // data: { name?: string; phone: string; operator?: string };
  onSelect: (planId: string) => void;
}

const QUICK_RECHARGES = [
  { label: "1 GB for ₹19", id: "qr1" },
  { label: "2 GB for ₹29", id: "qr2" },
  { label: "25 GB for ₹49", id: "qr3" },
];

const FILTER_CHIPS = [
  "Unlimited 5G + 2 GB/day Data",
  "28 Days Validity",
  "1.5 GB/day Data",
  "84 Days Validity",
];

const PLANS: MobileRechargePlan[] = [
  {
    id: "plan-39",
    amount: 39,
    validity: "3 Days",
    data: "3 GB/day",
    badge: "Special Data Pack · 3GB/Day",
    badgeColor: "green",
  },
  {
    id: "plan-349",
    amount: 349,
    validity: "28 Days",
    data: "Unlimited 5G + 2 GB/day",
    badge: "Free JioHotstar + AI Benefits",
    badgeColor: "blue",
    benefits: ["5G", "✦", "✦", "▶", "☁"],
    description: "28 Days · Unlimited 5G + 2GB/day Jio Special",
  },
  {
    id: "plan-209",
    amount: 209,
    validity: "28 Days",
    data: "2 GB/day",
    badge: "Extra Data",
    badgeColor: "green",
  },
  {
    id: "plan-449",
    amount: 449,
    validity: "56 Days",
    data: "2 GB/day",
    badge: "Free JioHotstar",
    badgeColor: "blue",
  },
  {
    id: "plan-899",
    amount: 899,
    validity: "84 Days",
    data: "2 GB/day",
    badge: "Free JioHotstar",
    badgeColor: "blue",
  },
  {
    id: "plan-3499",
    amount: 3499,
    validity: "365 Days",
    data: "2 GB/day",
    badge: "Free JioHotstar",
    badgeColor: "blue",
  },
];

const RECOMMENDED_PLAN = PLANS[1];

const TABS = ["Popular", "Data Packs", "True 5G Unlimited", "Entertainment"];

function SelectPlanView({ onSelect }: SelectPlanViewProps) {
  const { navigate, goBack } = useNavigation();

  const [search, setSearch] = React.useState("");
  const [activeTab, setActiveTab] = React.useState(0);
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);

  const { openSheet } = useAppStore();
  const { selectedContact, selectedPlan, setSelectedPlan, reset } =
    useRechargeStore();

  React.useEffect(() => {
    if (!selectedContact) {
      reset();
      navigate("/services/recharge?step=details"); // back to start
    }
  }, [selectedContact]);

  if (!selectedContact) return null;

  const toggleFilter = (f: string) =>
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );

  const filteredPlans = PLANS.filter((p) => {
    return search
      ? p.amount.toString().includes(search) ||
          p.data.toLowerCase().includes(search.toLowerCase()) ||
          p.validity.toLowerCase().includes(search.toLowerCase())
      : true;
  });

  const onSelectPlan = (planId: string) => {
    const _plan = filteredPlans.find((plan) => plan.id === planId);

    if (!_plan) {
      console.log("No plan found for id - ", planId);
      return;
    }

    setSelectedPlan(_plan);

    onSelect(planId);
  };

  return (
    <div className="flex-1 flex flex-col relative min-h-0 h-full w-full animate-in slide-in-from-right duration-300">
      {/* <div className="flex-1 flex flex-col min-h-0 w-full relative"> */}
      {/* Select Number card and basic details  */}
      <div className="flex-none">
        <div className="bg-on-secondary p-4 m-4 rounded-xl">
          <div className="flex justify-between">
            <div className="flex items-center gap-6">
              <Phone />
              <div className="flex flex-col">
                {selectedContact?.name && (
                  <Typography variant={"h5"}>
                    {selectedContact?.name || ""}
                  </Typography>
                )}
                <Typography variant={"h4"}>
                  {selectedContact?.phone}
                </Typography>{" "}
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <Typography variant={"small"}>
                {selectedContact?.operator} circle
              </Typography>
              <Typography
                onClick={goBack}
                variant={"small"}
                textColor={"primary"}
              >
                {"Change"}
              </Typography>
            </div>
          </div>

          {/* Recommanded Plan details */}

          <div className="divider" />
          <div>
            <SectionHeader hideLeadingBar={true} title="Recommended Plan:" />
            <span className="flex justify-between items-center">
              <div className="flex items-center">
                <IndianRupee />
                <Typography weight={"bold"} variant={"h2"}>
                  {349}
                </Typography>
              </div>
              <Button
                onClick={undefined}
                className="bg-surface-1 rounded-full p-4"
              >
                <Typography variant={"h4"}>Recharge</Typography>
              </Button>
            </span>
            {/* plan duration */}
            <div className="flex flex-col gap-2 min-w-0 mt-2">
              <Typography variant={"small"} className="block truncate">
                {" "}
                28 Days - unlimited 5G + 2GB/day Jio Special
              </Typography>
              <Typography variant={"small"} textColor={"primary"}>
                Plan Details
              </Typography>
            </div>
            <div></div>
          </div>
        </div>

        {/* Quick Data Recharges */}
        <div className="mt-2 px-3">
          <p className="text-sm font-semibold text-on-surface mb-2.5">
            Quick Data Recharges
          </p>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {QUICK_RECHARGES.map((qr) => (
              <button
                key={qr.id}
                onClick={() => onSelect(qr.id)}
                className="shrink-0 flex items-center gap-1 border border-[var(--color-border)] rounded-full px-4 py-2 text-sm text-on-surface bg-surface active:bg-surface-variant transition-colors"
              >
                {qr.label}
                <ChevronRight size={14} className="text-on-surface-variant" />
              </button>
            ))}
          </div>
        </div>

        {/* Search plans */}
        <div className="flex items-center w-full">
          <div className="flex-1 flex items-center gap-2 bg-surface rounded-full px-4 py-2">
            <TextField
              type="text"
              placeholder="Search e.g. 299 or 28 days"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              startAdornment={
                <Search
                  size={16}
                  className="text-on-surface-variant shrink-0"
                />
              }
              className="bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant outline-none"
            />
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openSheet(SHEET_TYPES.PLANS_FILTERS);
            }}
            className="p-4 flex items-center justify-center rounded-full bg-surface active:bg-surface-variant transition-colors"
          >
            <SlidersHorizontal size={22} className="text-on-surface-variant" />
          </Button>
        </div>

        {/* Quick filters */}
        <div className="px-3 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {FILTER_CHIPS.map((f) => {
            const active = activeFilters.includes(f);
            return (
              <button
                key={f}
                onClick={() => toggleFilter(f)}
                className={[
                  "shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors",
                  active
                    ? "bg-primary-container text-on-primary-container border-primary"
                    : "bg-surface text-on-surface border-[var(--color-border)]",
                ].join(" ")}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide border-b border-[var(--color-border)]">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={[
                "shrink-0 px-4 py-2.5 text-sm font-semibold transition-colors relative",
                activeTab === i ? "text-primary" : "text-on-surface-variant",
              ].join(" ")}
            >
              {tab}
              {activeTab === i && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Plan list ── */}
      <div className="flex-1 overflow-y-auto scrollbar-hide mt-2 px-4 bg-surface pb-44 space-y-2">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onSelect={onSelectPlan} />
          ))
        ) : (
          <div className="py-12 text-center text-on-surface-variant text-sm">
            {`No plans found for ${search}`}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(SelectPlanView);
