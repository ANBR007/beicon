import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combina classes do Tailwind com segurança: junta várias strings/condições (clsx) e,
// quando duas classes conflitam (ex: "text-red-500" e depois "text-blue-500"), mantém
// só a última (twMerge) em vez de deixar as duas na tag e o navegador escolher.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
