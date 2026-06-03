import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AppService } from "./interfaces/services";

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
  // keep only digits
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10) {
    return digits;
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }

  if (digits.length === 11 && digits.startsWith("0")) {
    return digits.slice(1);
  }

  return digits.slice(-10);
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

export function capitalize(str: string) {
  const words = str.split(" ");

  if(words.length === 1) {
    return  words[0].charAt(0).toUpperCase() + words[0].slice(1)
  }

  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLocaleLowerCase();
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words;
}

export function groupByCategory(services: AppService[]) {
  const groupedByCategory = services.reduce(
    (acc, service) => {
      const key = service.category;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(service);
      return acc;
    },
    {} as { [key: string]: AppService[] },
  );
  return Object.entries(groupedByCategory).map(([category, items]) => ({
    category,
    items,
  }));
}
