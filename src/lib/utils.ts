import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timer(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export function isValidUrl(urlString: string): boolean {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
}
