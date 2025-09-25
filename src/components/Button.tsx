"use client";

import { ButtonHTMLAttributes, forwardRef, useMemo } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "@/styles/components/button.module.css";

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
      const getVariantClass = () => {
        switch (variant) {
          case "secondary": return styles.buttonSecondary;
          case "outline": return styles.buttonOutline;
          case "ghost": return styles.buttonGhost;
          case "danger": return styles.buttonDanger;
          default: return styles.buttonPrimary;
        }
      };

      const getSizeClass = () => {
        switch (size) {
          case "xs": return styles.sizeXs;
          case "sm": return styles.sizeSm;
          case "lg": return styles.sizeLg;
          case "xl": return styles.sizeXl;
          default: return styles.sizeMd;
        }
      };

      return cn(
        styles.buttonBase,
        getVariantClass(),
        getSizeClass(),
        fullWidth && styles.fullWidth,
        className
      );
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
          <span className={styles.loadingSpinner} aria-hidden="true" />
        )}
        {showLeftIcon && <Icon className={styles.iconLeft} aria-hidden="true" />}
        {children}
        {showRightIcon && <Icon className={styles.iconRight} aria-hidden="true" />}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;