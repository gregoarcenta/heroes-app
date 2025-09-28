import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidNumber(value: unknown): value is string {
  return Number.isInteger(Number(value)) && Number(value) > 0;
}
