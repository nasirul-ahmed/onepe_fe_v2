"use client";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outline" | "filled" | "premium";
  color?: "blue" | "purple" | "teal" | "gray" | "white";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      color = "white",
      padding = "md",
      hover = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    /* 🎨 Base (theme tokens) */
    const baseClasses =
      "bg-surface text-on-surface border border-border rounded-xl transition-all duration-200";

    /* 📦 Variants */
    const variants: Record<Exclude<CardProps["variant"], undefined>, string> = {
      default: "shadow-sm", // simple surface card
      elevated: "shadow-lg", // more depth
      outline: "border border-border bg-transparent", // transparent but outlined
      filled: "bg-muted text-on-surface", // filled surface tone
      premium: "", // handled below
    };

    /* 🌈 Premium Gradient Variants */
    const premiumColors: Record<NonNullable<CardProps["color"]>, string> = {
      blue: "bg-card-premium text-white",
      purple: "bg-card-premium-purple text-white",
      teal: "bg-card-premium-teal text-white",
      gray: "bg-gradient-to-br from-gray-600 to-gray-700 text-on-surface",
      white: "bg-gradient-to-br from-white to-gray-100 text-on-background",
    };

    /* 📏 Padding scale */
    const paddings: Record<NonNullable<CardProps["padding"]>, string> = {
      none: "p-0",
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
    };

    /* ✨ Hover interaction */
    const hoverEffect = hover ? "hover:shadow-md hover:-translate-y-0.5" : "";

    /* 🏗️ Final class string */
    const classes = [
      baseClasses,
      variant === "premium" ? premiumColors[color] : variants[variant],
      paddings[padding],
      hoverEffect,
      className,
    ].join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
