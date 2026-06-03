import { ChevronRight, Gift } from "lucide-react";
import Button from "./Button";
import { Typography } from "./Typography";

interface _ComponentProps {
  totalOffers: number;
  onClick?: () => void;
}

export default function OfferCard({ totalOffers, onClick }: _ComponentProps) {
  return (
    <Button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800/30"
    >
      <div className="w-full">
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-4">
            <Gift size={18} className="text-orange-600 dark:text-orange-400" />
            <Typography variant="p" className="font-semibold text-orange-800 dark:text-orange-300">
              {`${totalOffers} Offers available`}
            </Typography>
          </div>
          <ChevronRight size={18} />
        </div>
      </div>
    </Button>
  );
}
