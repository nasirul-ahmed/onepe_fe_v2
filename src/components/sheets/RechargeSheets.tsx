"use client";

import { useState } from "react";
import { useAppStore } from "@/store/app-store";

interface PlansFilterSheetProps {
  onApply?: (filters: Record<string, unknown>) => void;
}

export function PlansFilterSheet({ onApply }: PlansFilterSheetProps) {
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [selectedData, setSelectedData] = useState<string>("");
  const { closeSheet } = useAppStore();

  const handleApply = () => {
    onApply?.({ price: selectedPrice, data: selectedData });
    closeSheet();
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-3">
        <h3 className="font-semibold text-on-surface">Price Range</h3>
        <div className="flex gap-2 flex-wrap">
          {["Under ₹200", "₹200-₹500", "₹500+"].map((price) => (
            <button
              key={price}
              onClick={() => setSelectedPrice(price)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedPrice === price
                  ? "bg-primary text-on-primary"
                  : "bg-surface-variant text-on-surface-variant"
              }`}
            >
              {price}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-on-surface">Data Benefits</h3>
        <div className="flex gap-2 flex-wrap">
          {["1GB/day", "2GB/day", "3GB/day", "Unlimited"].map((data) => (
            <button
              key={data}
              onClick={() => setSelectedData(data)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedData === data
                  ? "bg-primary text-on-primary"
                  : "bg-surface-variant text-on-surface-variant"
              }`}
            >
              {data}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={handleApply}
          className="flex-1 px-4 py-2 bg-primary text-on-primary rounded-lg"
        >
          Apply Filters
        </button>
        <button
          onClick={closeSheet}
          className="px-4 py-2 bg-surface-variant text-on-surface-variant rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
