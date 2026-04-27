"use client";

import { InputHTMLAttributes, forwardRef, useState, ReactNode } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "@/styles/components/textField.module.css"

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      name,
      label,
      error,
      helperText,
      fullWidth = false,
      startAdornment,
      endAdornment,
      type = "text",
      className,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className={cn(styles.container, fullWidth && styles.fullWidth)}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}

        <div className={cn(styles.inputWrapper, error && styles.wrapperError)}>
          {/* Left Adornment */}
          {startAdornment && (
            <div className={styles.adornment}>{startAdornment}</div>
          )}

          <input
            id={name}
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            className={cn(styles.innerInput, className)}
            {...props}
          />

          {/* Right Adornment & Password Toggle */}
          <div className={styles.rightActions}>
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordBtn}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}

            {endAdornment && !isPassword && <div>{endAdornment}</div>}

            {error && <AlertCircle size={18} className={styles.errorIcon} />}
          </div>
        </div>

        {/* Footer Text */}
        {(error || helperText) && (
          <p
            className={cn(
              styles.helper,
              error ? styles.helperError : styles.helperNormal,
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";
export default TextField;
