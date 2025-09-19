"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {children}
      </div>
    );
  }
);

CarouselItem.displayName = "CarouselItem";

export default CarouselItem;
