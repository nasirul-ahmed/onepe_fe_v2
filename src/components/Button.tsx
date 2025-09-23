"use client";

import { ButtonHTMLAttributes, forwardRef, useMemo } from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      icon: Icon,
      iconPosition = "left",
      fullWidth = false,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    // Memoize class construction to prevent unnecessary recalculations
    const buttonClasses = useMemo(() => {
      const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
      
      const variants = {
        primary: "bg-surface text-on-surface hover:bg-primary-hover focus:ring-primary",
        secondary: "bg-secondary text-on-secondary hover:bg-secondary-hover focus:ring-secondary",
        outline: "border border-border bg-surface text-on-surface hover:bg-surface-hover focus:ring-primary",
        ghost: "bg-transparent text-on-surface hover:bg-surface-hover focus:ring-primary",
        danger: "bg-danger text-on-danger hover:bg-danger-hover focus:ring-danger",
      };
      
      const sizes = {
        xs: "text-xs px-2 py-1",
        sm: "text-sm px-3 py-1.5",
        md: "text-sm px-4 py-2",
        lg: "text-base px-5 py-2.5",
        xl: "text-lg px-6 py-3",
      };
      
      return [
        baseClasses,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      ].filter(Boolean).join(" ");
    }, [variant, size, fullWidth, className]);

    // Determine if we should show left/right icons
    const showLeftIcon = Icon && iconPosition === "left" && !loading;
    const showRightIcon = Icon && iconPosition === "right" && !loading;

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span className="mr-2" aria-hidden="true">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </span>
        )}
        {showLeftIcon && <Icon className="w-4 h-4 mr-2" aria-hidden="true" />}
        {children}
        {showRightIcon && <Icon className="w-4 h-4 ml-2" aria-hidden="true" />}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;