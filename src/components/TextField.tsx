"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "@/styles/components/textField.module.css";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: "default" | "outline" | "filled";
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      startIcon,
      endIcon,
      type = "text",
      variant = "default",
      className = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    const getVariantClass = () => {
      switch (variant) {
        case "outline": return styles.inputOutline;
        case "filled": return styles.inputFilled;
        default: return styles.inputDefault;
      }
    };

    return (
      <div className={cn(
        styles.textFieldContainer,
        fullWidth && styles.textFieldFullWidth
      )}>
        {label && (
          <label className={styles.textFieldLabel}>
            {label}
          </label>
        )}

        <div className={styles.inputWrapper}>
          {startIcon && (
            <div className={styles.startIcon}>
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              styles.inputBase,
              getVariantClass(),
              error && styles.inputError,
              (startIcon || isPassword) && styles.inputWithStartIcon,
              (endIcon || isPassword) && styles.inputWithEndIcon,
              className
            )}
            {...props}
          />

          {isPassword && (
            <div className={styles.endIcon}>
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className={styles.passwordToggleIcon} />
                ) : (
                  <Eye className={styles.passwordToggleIcon} />
                )}
              </button>
            </div>
          )}

          {endIcon && !isPassword && (
            <div className={styles.endIcon}>
              {endIcon}
            </div>
          )}

          {error && (
            <div className={styles.endIcon}>
              <AlertCircle className={styles.errorIcon} />
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p className={cn(
            styles.helperText,
            error ? styles.helperTextError : styles.helperTextNormal
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
