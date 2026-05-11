"use client";

import { useSearchParams } from "next/navigation";
import { useNavigation } from "@/hooks/useNavigate";
import { RechargeDetailsView } from "./views/RechargeDetailsView";
import SelectPlanView from "./views/SelectPlanView";

export default function RechargeModule() {
  const searchParams = useSearchParams();
  const { navigate } = useNavigation();

  const step = searchParams.get("step") || "details";
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const operator = searchParams.get("operator") || "";

  // Flow Controller
  const handleContactSelected = (data: {
    name?: string;
    phone: string;
    operator: string;
  }) => {
    const params = new URLSearchParams({ ...data, step: "plans" });
    const route = `/services/recharge?${params.toString()}`;

    console.log({ params: params.toString(), route });
    navigate(route);
  };

  const handlePlanSelected = (planId: string) => {
    navigate(`/services/recharge?step=confirm&phone=${phone}&planId=${planId}`);
  };

  return (
    <div className="w-full">
      {step === "details" && (
        <RechargeDetailsView onNext={handleContactSelected} />
      )}
      {step === "plans" && (
        <SelectPlanView
          data={{ name: name!, phone: phone!, operator }}
          onSelect={handlePlanSelected}
        />
      )}
      {step === "confirm" && <div>Confirmation View...</div>}
    </div>
  );
}
