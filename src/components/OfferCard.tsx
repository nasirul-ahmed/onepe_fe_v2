import { ChevronRight, Gift } from "lucide-react";
import Button from "./Button";

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
      <div className="w-full p-2">
        <div className="flex justify-between items-center gap-3">
          <div className="flex gap-4">
            <Gift className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            <span className="font-semibold text-lg text-orange-800 dark:text-orange-300">
              {`${totalOffers} Offers available`}
            </span>
          </div>
          <ChevronRight />
        </div>
      </div>
    </Button>
  );
}
