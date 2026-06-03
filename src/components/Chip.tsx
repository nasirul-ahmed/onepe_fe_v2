"use client";

import React from "react";
import { cn } from "@/lib/utils";
import styles from "@/styles/components/chip.module.css";

interface ChipProps {
  label: string;
  badge?: string;
  onClick?: () => void;
  className?: string;
  labelClasses?: string;
}

export const Chip = ({ label, badge, onClick, className, labelClasses }: ChipProps) => (
  <button className={cn(styles.chip, className)} onClick={onClick}>
    {badge && <span className={styles.badge}>{badge}</span>}
    <span className={cn(styles.label, "text-xs", labelClasses)}>{label}</span>
  </button>
);
