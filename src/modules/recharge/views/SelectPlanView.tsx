"use client";

import SectionHeader from "@/components/SectionHeader";
import { Typography } from "@/components/Typography";
import { useNavigation } from "@/hooks/useNavigate";
import { IndianRupee, Phone } from "lucide-react";

interface SelectPlanViewProps {
  data: { name?: string; phone: string; operator?: string };
  onSelect: (planId: string) => void;
}

async function SelectPlanView(props: SelectPlanViewProps) {
  const { name = "Nasir", phone, operator } = props.data;
  const { goBack } = useNavigation();

  return (
    <div className="animate-in slide-in-from-right duration-300 p-4">
      {/* Select Number card and basic details  */}
      <div className="bg-[var(--color-secondary)] p-4 rounded-xl">
        <div className="flex justify-between">
          <div className="flex items-center gap-6">
            <Phone />
            <div className="flex flex-col">
              <Typography variant={"h5"}>{name}</Typography>
              <Typography variant={"h6"}>{phone}</Typography>{" "}
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <Typography variant={"small"}>{operator} circle</Typography>
            <Typography
              onClick={undefined}
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
          <span className="flex items-center">
            <IndianRupee />
            <Typography weight={"bold"} variant={"h2"}>
              {349}
            </Typography>
          </span>
          {/* plan duration */}
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default SelectPlanView;
