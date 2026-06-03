"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { Typography } from "@/components/Typography";
import Button from "@/components/Button";
import { useUserProfile } from "@/hooks/useAuth";
import { useRechargeStore } from "@/store/recharge-store";
import { useNavigation } from "@/hooks/useNavigate";
import { cleanPhoneNumber } from "@/lib/utils";
import OfferCard from "@/components/OfferCard";
import { SHEET_TYPES, useAppStore } from "@/store/app-store";

interface _PageProps {
  onProceed?: () => void;
  onBack: () => void;
}

export function ConfirmPlanView({ onProceed, onBack }: _PageProps) {
  const { navigate } = useNavigation();
  const { data: user } = useUserProfile();

  const openSheet = useAppStore().openSheet;
  const selectedContact = useRechargeStore().selectedContact;
  const selectedPlan = useRechargeStore().selectedPlan;

  const isUser = selectedContact?.phone === cleanPhoneNumber(user?.phone || "");
  const userFullName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : "User";

  const openPlanDetailsSheet = () => {
    openSheet(SHEET_TYPES.PLAN_DETAILS, { planDetails: selectedPlan });
  };

  React.useLayoutEffect(() => {
    if (!selectedContact && !selectedPlan) {
      navigate("/services/recharge?step=details");
    }
    if (selectedContact && !selectedPlan) {
      navigate("/services/recharge?step=plans");
    }
  }, [selectedContact, selectedPlan]);

  if (!selectedContact || !selectedPlan) return null;

  return (
    <div className="flex-1 flex flex-col h-full bg-surface-variant/30">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-surface rounded-3xl p-5 shadow-sm border border-outline-variant">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
              {selectedContact?.operator?.charAt(0).toUpperCase() ?? ""}
            </div>
            <div className="flex flex-col items-start">
              {isUser && (
                <Typography variant="p" weight="bold">
                  {`${userFullName}`}
                </Typography>
              )}
              <Typography
                variant="p"
                weight={"bold"}
                className="text-on-surface-variant"
              >
                {isUser
                  ? cleanPhoneNumber(user?.phone || "")
                  : selectedContact?.phone}
              </Typography>
              <Typography variant="p" className="text-on-surface-variant/80">
                {selectedContact?.operator || ""} -{" "}
                {selectedContact?.circle || ""}
              </Typography>
            </div>
          </div>

          <div className="divider mb-4" />

          {/* Plan Details Section */}
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h5" weight="bold">
              Plan Info
            </Typography>
            <Button
              onClick={onBack}
              className="text-primary text-sm font-semibold"
            >
              Change Plan
            </Button>
          </div>

          <div className="flex items-center justify-around gap-6 mb-3">
            <Typography variant="h4" weight="bold">
              ₹{selectedPlan?.amount}
            </Typography>
            <div className="flex flex-col">
              <Typography variant="p" className="text-on-surface-variant">
                Validity
              </Typography>
              <Typography variant="p" weight="bold">
                {selectedPlan?.validity}
              </Typography>
            </div>
            <div className="flex flex-col">
              <Typography variant="p" className="text-on-surface-variant">
                Data
              </Typography>
              <Typography variant="p" weight="bold">
                {selectedPlan?.data}
              </Typography>
            </div>
          </div>

          <Typography
            variant="p"
            className="text-on-surface-variant leading-relaxed block mb-4"
          >
            {selectedPlan?.description}
          </Typography>

          {/* Collapsible Details Trigger */}
          <button
            onClick={openPlanDetailsSheet}
            className="w-full py-2 bg-surface-variant/50 rounded-xl flex items-center justify-center gap-2 text-sm font-medium"
          >
            View Plan Details <ChevronDown size={16} />
          </button>
        </div>

        <OfferCard
          totalOffers={23}
          onClick={() => openSheet(SHEET_TYPES.RECHARGE_OFFERS, { offers: [] })}
        />
      </div>

      {/* Fixed Bottom Action Section */}
      <div className="sticky bottom-44 m-4">
        <Button
          onClick={onProceed}
          size="xl"
          className="w-full py-6 px-6 rounded-full bg-blue-900 hover:bg-blue-800 text-white font-bold text-lg"
        >
          <Typography variant={"small"}>Proceed to Recharge</Typography>
        </Button>
      </div>
    </div>
  );
}
