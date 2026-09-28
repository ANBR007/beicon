"use client";

import { useEffect, useRef, useState } from "react";

// Envolve qualquer conteúdo e faz ele aparecer suavemente (fade + subir um pouco) quando
// a seção entra na tela ao rolar a página. Usado em quase todas as seções do site.
export function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // IntersectionObserver avisa quando o elemento fica visível na tela (15% dele já visível)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Só precisa acontecer uma vez — depois de revelado, para de observar
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 420ms cubic-bezier(0.16,1,0.3,1), transform 420ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </div>
  );
}
