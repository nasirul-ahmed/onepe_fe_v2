"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";
import { capitalize, cn } from "@/lib/utils";

export interface HistoryItemData {
  id: string;
  title?: string | null;
  description?: string | null;
  status: string;
  amount: number;
  currency?: string;
  createdAt: Date | string;
  icon?: React.ReactElement<{ size?: number }>;
}

interface TransactionListItemProps {
  item: HistoryItemData;
  index: number;
  fallbackIcon: React.ReactElement<{ size?: number }>;
  onClick?: (item: HistoryItemData) => void;
}

const getSemanticStatus = (
  status: string,
): "success" | "failed" | "pending" | "unknown" => {
  const s = status.toLowerCase();

  if (s === "success" || s === "completed") return "success";
  if (s === "failed" || s === "cancelled" || s === "refunded") return "failed";
  if (s === "pending" || s === "processing") return "pending";
  return "unknown";
};

export default function HistoryListItem({
  item,
  index,
  fallbackIcon,
  onClick,
}: TransactionListItemProps) {
  const semanticStatus = getSemanticStatus(item.status);

  const statusConfig = {
    success: {
      bg: "bg-success-container text-on-success-container",
      text: "text-success",
      iconBg: "bg-surface-4 text-success",
    },
    failed: {
      bg: "bg-error-container text-on-error-container",
      text: "text-error",
      iconBg: "bg-error-container text-error",
    },
    pending: {
      bg: "bg-warning-container text-on-warning-container",
      text: "text-warning",
      iconBg: "bg-warning-container text-warning",
    },
    unknown: {
      bg: "bg-surface-variant text-on-surface-variant",
      text: "text-on-surface-variant",
      iconBg: "bg-surface-variant text-on-surface",
    },
  }[semanticStatus];

  const isFailed = item.status === "failed";
  const displayTitle = item.title || item.description || "Wallet Transaction";

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.05, 0.24),
        ease: "easeOut",
      }}
      onClick={() => onClick?.(item)}
      className="flex items-center justify-between p-4 bg-surface border border-outline-variant rounded-2xl shadow-[var(--shadow-elevation-1)] hover:shadow-[var(--shadow-elevation-2)] active:scale-[0.99] transition-all duration-200 cursor-pointer group"
    >
      {/* Left Column: Icon and Core Text */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={cn(
            "flex items-center justify-center w-11 h-11 rounded-full transition-colors shrink-0",
            statusConfig.iconBg,
          )}
        >
          {item.icon
            ? React.cloneElement(item.icon, { size: 20 })
            : React.cloneElement(fallbackIcon, { size: 20 })}
        </div>

        <div className="flex flex-col min-w-0 gap-1">
          <h3 className="text-sm font-semibold tracking-wide truncate text-on-surface group-hover:text-primary transition-colors">
            {displayTitle}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "px-2 py-0.5 text-[10px] font-bold tracking-wider rounded-md uppercase",
                statusConfig.bg,
              )}
            >
              {capitalize(item.status)}
            </span>
            <span className="text-[11px] font-medium text-on-surface-variant/70">
              {new Date(item.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Direction Arrow + Financial Figure */}
      <div className="flex flex-col items-end shrink-0 pl-2">
        <div
          className={cn(
            "flex items-center gap-0.5 text-base font-bold font-mono tracking-tight",
            isFailed
              ? "text-on-surface-variant line-through opacity-60"
              : statusConfig.text,
          )}
        >
          {!isFailed &&
            (item.amount > 0 ? (
              <ArrowDownRight size={16} className="text-success" />
            ) : (
              <ArrowUpRight size={16} className="text-error" />
            ))}
          ₹{Math.abs(item.amount).toLocaleString("en-IN")}
        </div>
        <span className="text-[10px] font-medium text-on-surface-variant/50 tracking-wider">
          {item.currency || "INR"}
        </span>
      </div>
    </motion.div>
  );
}
