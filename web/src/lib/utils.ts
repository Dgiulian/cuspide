import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: string, currency: "ars" | "usd" | string) {
  const numPrice = parseInt(price) || 0;
  return numPrice.toLocaleString("es-ES", {
    style: "currency",
    currency: currency?.toUpperCase() ?? "ARS",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
}
