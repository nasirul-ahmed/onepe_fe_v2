"use client";

import { Typography } from "@/components/Typography";
import { MobileRechargePlan } from "@/lib/interfaces/recharge.interface";
import { motion } from "framer-motion";

const PlanCard = ({
  plan,
  onSelect,
}: {
  plan: MobileRechargePlan;
  onSelect: (id: string) => void;
}) => {
  console.log(plan.benefits);
  const talktime = plan?.benefits?.["unlimitedCalls"]
    ? "Unlimited Calls"
    : "NA";
    const sms = plan?.benefits?.sms ? ` | ${plan.benefits?.["sms"]}` : "";
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(plan.id)}
      className={`p-4 h-[90px] rounded-xl border cursor-pointer transition-all relative ${"border-border hover:bg-muted/50"}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-on-surface">
            ₹{plan.amount}
          </span>
        </div>
        <span className="text-sm font-medium text-secondary">
          {plan.validity}
        </span>
      </div>
      <div className="flex text-xs justify-between text-secondary">
        <Typography variant={"p"} className="text-[.75rem]">
          Data: {` ${plan.data}`}
        </Typography>
        <Typography variant={"p"} className="text-[.75rem]">
          Benifits: {` ${talktime}${sms}`}
        </Typography>
      </div>
    </motion.div>
  );
};

export default PlanCard;
