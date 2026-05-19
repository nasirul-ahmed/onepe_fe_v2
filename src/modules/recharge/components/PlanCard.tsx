"use client";

import { MobileRechargePlan } from "@/lib/interfaces/recharge.interface";
import { motion } from "framer-motion";

const PlanCard = ({
  plan,
  onSelect,
}: {
  plan: MobileRechargePlan;
  onSelect: (id: string) => void;
}) => (
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
    <div className="grid grid-cols-2 gap-2 text-xs text-secondary">
      <p>
        Data: <span className="text-on-surface font-medium">{plan.data}</span>
      </p>
      <p>
        Talk:{" "}
        <span className="text-on-surface font-medium">{plan.talktime}</span>
      </p>
    </div>
  </motion.div>
);

export default PlanCard;
