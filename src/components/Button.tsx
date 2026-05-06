"use client";

import React, { ButtonHTMLAttributes, forwardRef, useMemo } from "react";
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
  showLoader?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant,
      size = "md",
      loading: buttonLoading = false,
      icon: Icon,
      iconPosition = "left",
      fullWidth = false,
      className = "",
      disabled,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [isLoading, setIsLoading] = React.useState(buttonLoading);
    // Memoize class construction value to prevent unnecessary recalculations
    const buttonClasses = useMemo(() => {
      const getVariantClass = () => {
        switch (variant) {
          case "primary":
            return styles.buttonPrimary;
          case "secondary":
            return styles.buttonSecondary;
          case "outline":
            return styles.buttonOutline;
          case "ghost":
            return styles.buttonGhost;
          case "danger":
            return styles.buttonDanger;
          default:
            return null;
        }
      };

      const getSizeClass = () => {
        switch (size) {
          case "xs":
            return styles.sizeXs;
          case "sm":
            return styles.sizeSm;
          case "lg":
            return styles.sizeLg;
          case "xl":
            return styles.sizeXl;
          default:
            return styles.sizeMd;
        }
      };

      const classes = cn(
        styles.buttonBase,
        getVariantClass(),
        getSizeClass(),
        fullWidth && styles.fullWidth,
        className,
      );
      return classes;
    }, [variant, size, fullWidth, className]);

    const loading = isLoading || buttonLoading;

    // Determine if we should show left/right icons
    const showLeftIcon = Icon && iconPosition === "left" && !loading;
    const showRightIcon = Icon && iconPosition === "right" && !loading;

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();
      e?.stopPropagation();

      if (loading || disabled) return;
      setIsLoading(true)
      await onClick?.(e);
      setTimeout(() => setIsLoading(false), 500);
    };

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        aria-busy={loading}
        onClick={handleClick}
        {...props}
      >
        {loading && props?.showLoader && (
          <span className={styles.loadingSpinner} aria-hidden="true" />
        )}
        {showLeftIcon && (
          <Icon className={styles.iconLeft} aria-hidden="true" />
        )}
        {children}
        {showRightIcon && (
          <Icon className={styles.iconRight} aria-hidden="true" />
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
