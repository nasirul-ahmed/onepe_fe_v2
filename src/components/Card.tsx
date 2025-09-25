"use client";
import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import styles from "@/styles/components/card.module.css";

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
    /* Get CSS classes based on variant */
    const getVariantClass = () => {
      if (variant === "premium") {
        switch (color) {
          case "blue": return styles.cardPremiumBlue;
          case "purple": return styles.cardPremiumPurple;
          case "teal": return styles.cardPremiumTeal;
          case "gray": return styles.cardPremiumGray;
          case "white": return styles.cardPremiumWhite;
          default: return styles.cardPremiumBlue;
        }
      }
      
      switch (variant) {
        case "elevated": return styles.cardElevated;
        case "outline": return styles.cardOutline;
        case "filled": return styles.cardFilled;
        default: return styles.cardDefault;
      }
    };

    /* Get padding class */
    const getPaddingClass = () => {
      switch (padding) {
        case "none": return styles.paddingNone;
        case "sm": return styles.paddingSm;
        case "lg": return styles.paddingLg;
        default: return styles.paddingMd;
      }
    };

    return (
      <div 
        ref={ref} 
        className={cn(
          styles.cardBase,
          getVariantClass(),
          getPaddingClass(),
          hover && styles.cardHover,
          className
        )} 
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
