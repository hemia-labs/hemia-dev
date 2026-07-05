import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// ponytail: tw-merge no conoce clases custom del @theme; sin esto, rounded-card pierde contra rounded-none
const twMerge = extendTailwindMerge({
  extend: { classGroups: { rounded: [{ rounded: ["card"] }] } },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
