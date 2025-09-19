"use client";

import {
  type ThemeProviderProps,
  ThemeProvider as NextThemesProvider,
} from "next-themes";

export function ThemeProvider({ children }: ThemeProviderProps) {
  const defaultProps: Partial<ThemeProviderProps> = {
    attribute: "class",
    defaultTheme: "light",
    enableSystem: true,
  };

  return <NextThemesProvider {...defaultProps}>{children}</NextThemesProvider>;
}
