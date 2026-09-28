import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Todas as variações visuais do botão (cor/estilo) e tamanho, num só lugar.
// Para criar um novo estilo de botão, adicione uma chave dentro de `variant` ou `size`.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-label uppercase tracking-[0.14em] transition-colors disabled:pointer-events-none disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
  {
    variants: {
      variant: {
        default: "bg-ink text-surface hover:bg-ink/90 px-6 py-3",
        // "gradient" recebe o fundo de verdade (var(--gradient)) mais abaixo, via `style`
        gradient: "text-on-dark px-6 py-3",
        outline: "border border-line text-ink hover:border-ink px-6 py-3",
        ghost: "text-ink hover:bg-line/40 px-6 py-3",
        link: "text-ink underline-offset-4 decoration-2 hover:underline p-0",
      },
      size: {
        default: "",
        sm: "text-[0.7rem] px-4 py-2",
        lg: "px-8 py-4",
        icon: "p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    // Quando true, o botão "empresta" seu estilo para o elemento filho (ex: um <a>) em vez de
    // renderizar um <button> — é assim que os CTAs do Hero viram links com aparência de botão.
    asChild?: boolean;
  };

function Button({ className, variant, size, asChild = false, style, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  // Só a variante "gradient" ganha o degradê da marca como background inline
  const gradientStyle = variant === "gradient" ? { background: "var(--gradient)", ...style } : style;
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      style={gradientStyle}
      {...props}
    />
  );
}

export { Button, buttonVariants };
