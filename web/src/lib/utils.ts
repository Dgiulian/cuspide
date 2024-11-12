import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: string, currency: "ars" | "usd") {
  return parseInt(price).toLocaleString("es-ES", {
    style: "currency",
    currency: currency ?? "ARS",
  });
}
