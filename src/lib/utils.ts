import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidNumber(value: unknown): value is string {
  return Number.isInteger(Number(value)) && Number(value) > 0;
}

export function getSearchFilters(params: URLSearchParams) {
  const keys = [
    "name",
    "team",
    "category",
    "universe",
    "status",
    "strength",
  ] as const;
  return Object.fromEntries(
    keys.map((k) => [k, params.get(k) || undefined]),
  ) as Record<(typeof keys)[number], string>;
}
