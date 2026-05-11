"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      description: "text-sm text-muted-foreground",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    weight: {
      thin: "font-thin",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
    transform: {
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
      normalcase: "normal-case",
    },
    textColor: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-[var(--color-primary)]",
      secondary: "text-[var(--color-secondary)]",
      destructive: "text-destructive",
      accent: "text-accent-foreground",
      success: "text-green-600 dark:text-green-500",
      warning: "text-yellow-600 dark:text-yellow-500",
    },
  },
  defaultVariants: {
    variant: "p",
    align: "left",
    weight: "normal",
    transform: "normalcase",
    textColor: "default",
  },
});

export interface TypographyProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
  color?: VariantProps<typeof typographyVariants>["textColor"];
  children?: React.ReactNode;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant,
      align,
      weight,
      transform,
      color,
      textColor,
      as,
      asChild,
      children,
      ...props
    },
    ref,
  ) => {
    let Component: keyof React.JSX.IntrinsicElements;

    if (as) {
      Component = as;
    } else {
      switch (variant) {
        case "h1":
          Component = "h1";
          break;
        case "h2":
          Component = "h2";
          break;
        case "h3":
          Component = "h3";
          break;
        case "h4":
          Component = "h4";
          break;
        case "h5":
          Component = "h5";
          break;
        case "h6":
          Component = "h6";
          break;
        case "lead":
        case "large":
        case "small":
        case "muted":
        case "description":
          Component = "p";
          break;
        case "code":
        case "inlineCode":
          Component = "code";
          break;
        case "blockquote":
          Component = "blockquote";
          break;
        case "list":
          Component = "ul";
          break;
        default:
          Component = "p";
      }
    }

    if (asChild) {
      Component = "div";
    }

    const finalTextColor = color || textColor;

    return React.createElement(
      Component,
      {
        className: cn(
          typographyVariants({
            variant,
            align,
            weight,
            transform,
            textColor: finalTextColor,
          }),
          className,
        ),
        ref,
        ...props,
      },
      children,
    );
  },
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
