"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface _ComponentProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  icon?: React.ReactNode;
}

export function CollapsibleSimple(props: _ComponentProps) {
  const {
    title,
    children,
    defaultOpen = false,
    className,
    titleClassName,
    contentClassName,
    icon,
  } = props;
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("border rounded-lg", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between px-4 py-3 text-left font-medium transition-all hover:bg-muted/50",
          titleClassName,
        )}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 transition-transform" />
        ) : (
          <ChevronRight className="h-4 w-4 transition-transform" />
        )}
      </button>
      {isOpen && (
        <div className={cn("px-4 pb-4 pt-0", contentClassName)}>{children}</div>
      )}
    </div>
  );
}
