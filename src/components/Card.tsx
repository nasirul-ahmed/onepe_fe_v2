// components/ui/Card.tsx
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
    const baseClasses = "rounded-xl transition-all duration-200";

    const variants = {
      default: "bg-white dark:bg-gray-800 shadow-sm",
      elevated: "bg-white dark:bg-gray-800 shadow-lg",
      outline: "border border-gray-200 dark:border-gray-700 bg-transparent",
      filled: "bg-gray-50 dark:bg-gray-900",
      premium: "",
    };

    const premiumColors = {
      blue: "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
      purple: "bg-gradient-to-br from-purple-500 to-purple-600 text-white",
      teal: "bg-gradient-to-br from-teal-500 to-cyan-600 text-white",
      gray: "bg-gradient-to-br from-gray-600 to-gray-700 text-white",
      white: "bg-gradient-to-br from-white to-gray-100 text-gray-900",
    };

    const paddings = {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const hoverEffect = hover ? "hover:shadow-md hover:-translate-y-0.5" : "";

    const classes = [
      baseClasses,
      variant === "premium" ? premiumColors[color] : variants[variant],
      paddings[padding],
      hoverEffect,
      className,
    ]
      // .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
