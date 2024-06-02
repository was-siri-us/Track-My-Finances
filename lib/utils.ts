import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertAmountFromMiliUnits(amount: number) {
  return amount / 1000
}


export function convertAmountToMiliUnits(amount: number) {
  return amount * 1000
}

