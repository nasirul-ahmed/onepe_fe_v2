"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import styles from "@/styles/components/carouselItem.module.css";

interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(styles.carouselItem, className)} {...props}>
        {children}
      </div>
    );
  }
);

CarouselItem.displayName = "CarouselItem";

export default CarouselItem;
