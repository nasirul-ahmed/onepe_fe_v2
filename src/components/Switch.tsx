"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import styles from "@/styles/components/switch.module.css";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    { checked, onChange, disabled = false, size = "md", label, className = "" },
    ref
  ) => {
    const getSizeClass = () => {
      switch (size) {
        case "sm": return styles.sizeSm;
        case "lg": return styles.sizeLg;
        default: return styles.sizeMd;
      }
    };

    const getDotSizeClass = () => {
      switch (size) {
        case "sm": return styles.dotSizeSm;
        case "lg": return styles.dotSizeLg;
        default: return styles.dotSizeMd;
      }
    };

    const getDotPositionClass = () => {
      if (checked) {
        switch (size) {
          case "sm": return styles.dotOnSm;
          case "lg": return styles.dotOnLg;
          default: return styles.dotOnMd;
        }
      } else {
        switch (size) {
          case "sm": return styles.dotOffSm;
          case "lg": return styles.dotOffLg;
          default: return styles.dotOffMd;
        }
      }
    };

    const getLabelSizeClass = () => {
      switch (size) {
        case "sm": return styles.labelSizeSm;
        case "lg": return styles.labelSizeLg;
        default: return styles.labelSizeMd;
      }
    };

    return (
      <label className={cn(
        styles.container,
        disabled && styles.containerDisabled,
        className
      )}>
        <button
          ref={ref}
          type="button"
          className={cn(
            styles.switchBase,
            getSizeClass(),
            checked ? styles.switchOn : styles.switchOff,
            disabled && styles.containerDisabled,
          )}
          onClick={() => !disabled && onChange(!checked)}
          disabled={disabled}
          role="switch"
          aria-checked={checked}
          aria-label={label || "Toggle switch"}
        >
          <span
            className={cn(
              styles.switchDot,
              getDotSizeClass(),
              getDotPositionClass()
            )}
          />
        </button>
        
        {label && (
          <span className={cn(
            styles.switchLabel,
            getLabelSizeClass(),
            disabled && styles.switchLabelDisabled
          )}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;