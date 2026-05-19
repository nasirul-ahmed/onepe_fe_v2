"use client";

import { useSearchParams } from "next/navigation";
import { useNavigation } from "@/hooks/useNavigate";
import { RechargeDetailsView } from "./views/RechargeDetailsView";
import SelectPlanView from "./views/SelectPlanView";
import { ConfirmPlanView } from "./views/ConfirmPlanView";
import { useRechargeStore } from "@/store/recharge-store";
import { Contact } from "@/store/recharge-store";
import React from "react";
import { initiateMobileRecharge } from "@/services/mobileRecharge.service";
import { RechargeStatusView } from "./views/RechargeStatusView";

export default function RechargeModule() {
  const searchParams = useSearchParams();
  const { navigate } = useNavigation();
  const { reset, resetPlan } = useRechargeStore();

  const step = searchParams.get("step") || "details";

  const { selectedContact, selectedPlan } = useRechargeStore();

  const handleContactSelected = (data: Partial<Contact>) => {
    navigate(`/services/recharge?step=plans`);
  };

  const handlePlanSelected = () => {
    navigate(`/services/recharge?step=confirm`);
  };

  const handleProceed = async () => {
    if (!selectedContact?.phone && !selectedPlan?.id) {
      return;
    }

    const res = await initiateMobileRecharge({
      planId: selectedPlan?.id,
      mobileNumber: selectedContact?.phone || "",

      // TODO: remove below details after plan api integrated.
      operatorId: selectedContact?.operator || "",
      circleId: selectedContact?.circle || "",
      amount: selectedPlan?.amount || 0,
    });

    if (res.orderId) {
      navigate(
        `/services/recharge?step=recharge-status&orderId=${res.orderId}`,
      );
    }
  };

  const handleReset = () => {
    resetPlan();
    navigate(`/services/recharge?step=plans`);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative w-full">
      {step === "details" && (
        <RechargeDetailsView onNext={handleContactSelected} />
      )}
      {step === "plans" && <SelectPlanView onSelect={handlePlanSelected} />}
      {step === "confirm" && (
        <ConfirmPlanView onProceed={handleProceed} onBack={handleReset} />
      )}
      {step === "recharge-status" && (
        <RechargeStatusView onDone={() => navigate("/home")} />
      )}
    </div>
  );
}
