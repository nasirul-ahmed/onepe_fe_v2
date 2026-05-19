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

export function cleanPhoneNumber(phone: string): string {
  const sanitized = phone.replace(/[\s\-\(\)]/g, "");
  const cleaned = sanitized.replace(/^(\+91|91|0)/, "");
  return cleaned.length > 10 ? cleaned.slice(-10) : cleaned;
}

export function convertObjectToQuery(object: Record<string, unknown>) {
  const params = new URLSearchParams();
  Object.entries(object).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      if (Array.isArray(value)) {
        params.append(key, value.join(","));
      } else {
        params.append(key, String(value));
      }
    }
  });

  return params;
}

export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
