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
import { useRechargeStore } from "@/store/recharge-store";
import { useNavigation } from "@/hooks/useNavigate";
import { capitalize } from "@/lib/utils";
import { useMobilePlans } from "@/hooks/useRecharge";

interface SelectPlanViewProps {
  onSelect: (planId: string) => void;
}

// const FILTER_CHIPS = [
//   "Unlimited 5G + 2 GB/day Data",
//   "28 Days Validity",
//   "1.5 GB/day Data",
//   "84 Days Validity",
// ];

const TABS = ["Popular", "Data Packs", "True 5G Unlimited", "Entertainment"];

function SelectPlanView({ onSelect }: SelectPlanViewProps) {
  const { navigate, goBack } = useNavigation();

  const [search, setSearch] = React.useState("");
  const [activeTab, setActiveTab] = React.useState(0);
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);

  const { openSheet } = useAppStore();
  const { selectedContact, selectedPlan, setSelectedPlan, reset } =
    useRechargeStore();

  const { data: plans = [], isLoading } = useMobilePlans({
    operatorId: selectedContact?.operator,
    circleId: selectedContact?.circle,
  });

  React.useEffect(() => {
    if (!selectedContact) {
      reset();
      navigate("/services/recharge?step=details"); // back to start
    }
  }, [selectedContact]);

  const toggleFilter = (f: string) =>
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );

  const filteredPlans = React.useMemo(() => {
    return plans.filter((p) => {
      if (!search) return true;

      const q = search.toLowerCase();

      return (
        p.amount.toString().includes(q) ||
        p.data?.toLowerCase().includes(q) ||
        p.validity?.toLowerCase().includes(q)
      );
    });
  }, [plans, search]);

  const recommendedPlan = React.useMemo(() => {
    return plans.find((p) => [349, 399].includes(p.amount));
  }, [plans]);

  const quickRecharges = React.useMemo(() => {
    return plans.filter((p) => {
      return p.badge?.includes("Add-on");
    });
  }, [plans]);

  const onSelectPlan = (planId: string) => {
    const _plan = filteredPlans.find((plan) => plan.id === planId);

    if (!_plan) {
      console.log("No plan found for id - ", planId);
      return;
    }

    setSelectedPlan(_plan);

    onSelect(planId);
  };

  const openPlanDetailSheet = () => {
    openSheet(SHEET_TYPES.PLAN_DETAILS, { planDetails: recommendedPlan });
  };

  if (!selectedContact) return null;

  return (
    <div className="flex-1 flex flex-col relative min-h-0 h-full w-full animate-in slide-in-from-right duration-300">
      {/* <div className="flex-1 flex flex-col min-h-0 w-full relative"> */}
      {/* Select Number card and basic details  */}
      <div className="flex-none">
        <div className="bg-on-secondary p-4 mx-4 my-2 rounded-xl">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Phone size={18} />
              <div className="flex flex-col">
                {selectedContact?.name && (
                  <Typography variant={"p"}>
                    {selectedContact?.name || ""}
                  </Typography>
                )}
                <Typography variant={"small"}>
                  {selectedContact?.phone}
                </Typography>{" "}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex gap-1 justify-end items-end">
                {selectedContact.operator && (
                  <Typography variant={"p"}>
                    {selectedContact?.operator}
                  </Typography>
                )}
                {selectedContact.circle && (
                  <Typography variant={"p"}>
                    {`(${capitalize(
                      selectedContact?.circle?.replace("_", " ") || "",
                    )
                      .join()
                      ?.replace(",", " ")})`}
                  </Typography>
                )}
              </div>
              <Typography
                onClick={goBack}
                variant={"p"}
                textColor={"primary"}
                className="text-right"
              >
                {"Change"}
              </Typography>
            </div>
          </div>

          {/* Recommanded Plan details */}
          {recommendedPlan && (
            <div>
              <div className="divider" />
              <SectionHeader hideLeadingBar={true} title="Recommended Plan:" />
              <span className="flex justify-between items-center">
                <div className="flex items-center">
                  <IndianRupee size={16} />
                  <Typography weight={"bold"} variant={"h5"}>
                    {recommendedPlan.amount}
                  </Typography>
                </div>
                <Button
                  onClick={() => onSelectPlan(recommendedPlan.id)}
                  className="bg-surface-1 rounded-full p-2"
                >
                  <Typography variant={"medium"}>Recharge</Typography>
                </Button>
              </span>
              {/* plan duration */}
              <div className="flex flex-col min-w-0 mt-[4px]">
                <Typography variant={"p"} className="block truncate">
                  {recommendedPlan?.description || ""}
                </Typography>
                <Typography
                  onClick={openPlanDetailSheet}
                  variant={"p"}
                  textColor={"primary"}
                >
                  Plan Details
                </Typography>
              </div>
              <div></div>
            </div>
          )}
        </div>

        {/* Quick Data Recharges */}
        <div className="flex flex-col gap-1 mt-2 px-4">
          <Typography variant={"p"} weight={"medium"} className="">
            Quick Recharges
          </Typography>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {quickRecharges.map((qr) => (
              <button
                key={qr.id}
                onClick={() => onSelectPlan(qr.id)}
                className="shrink-0 flex items-center gap-1 border border-[var(--color-border)] rounded-full px-2 py-1 text-sm text-on-surface bg-surface active:bg-surface-variant transition-colors"
              >
                <Typography variant={"p"} className="text-[.7rem]">
                  {qr.data} {" | " + qr.validity}
                </Typography>
                <ChevronRight size={14} className="text-on-surface-variant" />
              </button>
            ))}
          </div>
        </div>

        {/* Search plans */}
        <div className="flex-1 flex items-center gap-2 w-full mt-2 mx-2 px-2">
          <div className="flex-1 flex gap-1 items-center bg-surface rounded-full">
            <TextField
              type="text"
              placeholder="Search e.g. 299 or 28 days"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              startAdornment={
                <Search
                  size={14}
                  className="text-on-surface-variant shrink-0 mr-2"
                />
              }
              className="bg-transparent text-on-surface placeholder:text-on-surface-variant outline-none"
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

        {/* Category Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide border-b border-[var(--color-border)]">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={[
                "shrink-0 px-4 py-2.5 text-xs font-semibold transition-colors relative",
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
      <div className="flex-1 overflow-y-auto scrollbar-hide mt-2 px-4 bg-surface pb-48 space-y-2">
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
