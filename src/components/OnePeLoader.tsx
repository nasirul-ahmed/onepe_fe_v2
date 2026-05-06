"use client";
import { cn } from "@/lib/utils";

const OnepeLiquidLoader = () => {
  const text = "onepe";
  const brandColor = "rgb(13, 120, 208)";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative">
        {/* Background Outline Layer */}
        <span
          className={cn(
            "font-rocky absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[24px] tracking-[4px] text-transparent",
          )}
          style={{ WebkitTextStroke: `0.8px ${brandColor}` }}
        >
          {text}
        </span>

        {/* Foreground Liquid Layer */}
        <span
          className="font-rocky absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[24px] tracking-[4px] animate-liquid"
          style={{
            color: brandColor,
            WebkitTextStroke: `1px ${brandColor}`,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default OnepeLiquidLoader;
