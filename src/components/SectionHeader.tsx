"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  barColor?: string;
  classes?: string;
  // Icon settings
  hideLeadingBar?: boolean;
  leadingIcon?: LucideIcon;
  iconSize?: number;
  iconClasses?: string;
  // Trailing customization
  trailing?: React.ReactNode;
  trailingClasses?: string;
  containerClasses?: string; // To handle the wrapper div
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  level: Tag = "h6",
  hideLeadingBar = false,
  barColor = "bg-sky-600 dark:bg-sky-500",
  classes = "",
  leadingIcon: Icon,
  iconSize = 24,
  iconClasses,
  trailing,
  trailingClasses,
  containerClasses,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between w-full",
        containerClasses,
      )}
    >
      <Tag
        className={cn(
          "text-md font-bold text-[var(--color-on-background)] flex items-center gap-3",
          classes,
        )}
      >
        {Icon ? (
          <span className="flex items-center justify-center text-sky-600 dark:text-sky-400">
            <Icon size={iconSize} className={cn(iconClasses)} />
          </span>
        ) : (
          <span
            className={cn(
              "w-1 h-5 rounded-full",
              barColor,
              hideLeadingBar && "hidden",
            )}
            aria-hidden="true"
          />
        )}
        {title}
      </Tag>

      {trailing && (
        <div className={cn("flex items-center", trailingClasses)}>
          {trailing}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
