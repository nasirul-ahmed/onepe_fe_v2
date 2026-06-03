import PlanCard from "@/modules/recharge/components/PlanCard";
import React from "react";
import Button from "../Button";
import { Typography } from "../Typography";
import { useAppStore } from "@/store/app-store";
import { MobileRechargePlan } from "@/lib/interfaces/recharge.interface";
import { IndianRupee } from "lucide-react";

const PlanDetails = () => {
  const sheetData = useAppStore().sheetData;
  console.log({ sheetData });
  const onProceed = () => {
    console.log("proceed with this plan");
  };

  const selectedPlan = sheetData?.planDetails as MobileRechargePlan;
  return (
    <div className="flex flex-col h-full min-h-full justify-between">
      <div className="flex flex-col h-full min-h-full justify-between relative">
        {/* 1. Scrollable Main Content Frame [cite: 89] */}
        <div className="flex-1 overflow-y-auto pb-24 pr-1 modal-scrollbar">
          {/* Pass the sheetData directly to your existing PlanCard component */}
          {/* <PlanCard plan={sheetData} /> */}

          {/* Breakdown Specifications Layout Section */}
          <div className="mt-1 space-y-5">
            {/* Section: Core Summary Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-variant/40 p-4 rounded-xl border border-outline-variant/30">
                <Typography
                  variant="small"
                  className="text-on-surface-variant block mb-1"
                >
                  Validity
                </Typography>
                <Typography variant="h6" className="font-bold text-on-surface">
                  {selectedPlan.validity}
                </Typography>
              </div>
              <div className="bg-surface-variant/40 p-4 rounded-xl border border-outline-variant/30">
                <Typography
                  variant="small"
                  className="text-on-surface-variant block mb-1"
                >
                  Data Balance
                </Typography>
                <Typography variant="h6" className="font-bold text-on-surface">
                  {selectedPlan.data}
                </Typography>
              </div>
            </div>

            {/* Section: Description Text Block */}
            <div className="px-1">
              <Typography
                variant="p"
                className="text-on-surface-variant block mb-1"
              >
                {"Plan Description"}
              </Typography>
              <Typography
                variant="p"
                className="text-on-surface font-medium leading-relaxed"
              >
                {selectedPlan?.description}
              </Typography>
            </div>

            {/* Section: Dynamic Benefits Checklist Container */}
            <div className="border-t border-outline-variant/50 pt-4 px-1">
              <Typography
                variant="small"
                className="font-bold text-on-surface mb-3 block"
              >
                Included Benefits
              </Typography>

              {Object.keys(selectedPlan?.benefits || {}).length > 0 && (
                <ul className="space-y-2.5">
                  {(selectedPlan?.benefits?.unlimitedCalls || false) && (
                    <li className="flex items-center text-sm font-medium text-on-surface">
                      <span className="w-2 h-2 rounded-full bg-blue-600 mr-2.5 flex-shrink-0" />
                      {"Truly Unlimited Voice Calls"}
                    </li>
                  )}
                  <li className="flex items-center text-sm font-medium text-on-surface">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mr-2.5 flex-shrink-0" />
                    <Typography>
                      {(selectedPlan?.benefits?.sms as string) || ""}
                    </Typography>
                  </li>
                </ul>
              )}
            </div>

            {/* Section: OTT / Media Streaming Sub-Layout */}
            {/* {selectedPlan?.benefits?.streamingApps &&
              selectedPlan.benefits.streamingApps?.length > 0 && (
                <div className="border-t border-outline-variant/50 pt-4 px-1">
                  <Typography
                    variant="small"
                    className="text-on-surface-variant font-bold mb-3 block"
                  >
                    Streaming Apps & Subscriptions
                  </Typography>

                  <div className="flex flex-wrap gap-2">
                    {selectedPlan.benefits.streamingApps?.map((app, index) => (
                      <div
                        key={index}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-900 font-semibold text-xs tracking-wide"
                      >
                        {app}
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Button
          onClick={onProceed}
          size="xl"
          className="flex gap-1 w-full rounded-full bg-blue-900 hover:bg-blue-800 text-white font-bold text-lg"
        >
          <Typography variant={"small"}>Proceed with </Typography>

          <Typography variant={"small"} className="flex items-center">
            <IndianRupee size={12} />
            {`${selectedPlan.amount}`}
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default PlanDetails;
