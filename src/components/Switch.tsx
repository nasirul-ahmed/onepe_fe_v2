"use client";

import { forwardRef } from "react";

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
    const sizeClasses = {
      sm: "w-8 h-4",
      md: "w-12 h-6",
      lg: "w-16 h-8",
    };

    const dotSizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-6 h-6",
    };

    const dotTransform = {
      sm: checked ? "translate-x-4" : "translate-x-1",
      md: checked ? "translate-x-6" : "translate-x-2",
      lg: checked ? "translate-x-8" : "translate-x-2",
    };

    const baseClasses =
      "relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

    const classes = [
      baseClasses,
      sizeClasses[size],
      checked ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600",
      disabled && "opacity-50 cursor-not-allowed",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <label className="inline-flex items-center cursor-pointer">
        <button
          ref={ref}
          type="button"
          className={classes}
          onClick={() => !disabled && onChange(!checked)}
          disabled={disabled}
          role="switch"
          aria-checked={checked}
        >
          <span
            className={`${dotSizeClasses[size]} transform ${dotTransform[size]} transition-transform duration-200 inline-block bg-white rounded-full`}
          />
        </button>
        {label && (
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
