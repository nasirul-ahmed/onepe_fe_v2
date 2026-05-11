import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export interface Plan {
  amount: number;
  validity: string;
  data?: string;
  talktime?: string;
  sms?: string;
  type: "popular" | "talktime" | "data";
}

const PlanCard = ({
  plan,
  isSelected,
  onClick,
  badge,
}: {
  plan: Plan;
  isSelected: boolean;
  onClick: () => void;
  badge?: string | null;
}) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`p-4 rounded-xl border cursor-pointer transition-all relative ${
      isSelected
        ? "border-primary bg-primary/5 ring-1 ring-primary"
        : "border-border hover:bg-muted/50"
    }`}
  >
    {badge && (
      <div className="absolute -top-2 right-2 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
        {badge}
      </div>
    )}
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-on-surface">
          ₹{plan.amount}
        </span>
        {isSelected && (
          <CheckCircle
            // className="w-5 h-5 text-primary"
            fill="currentColor"
            className="text-white fill-primary"
          />
        )}
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
