"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Efeito "nome gigante que revela cor ao passar o mouse", usado no rodapé (Footer.tsx).
// É feito com 3 camadas de texto SVG sobrepostas:
//  1) um contorno cinza bem fraco (sempre visível de leve, aparece mais forte no hover)
//  2) um contorno rosa que "se desenha" sozinho ao carregar a página (efeito de assinatura)
//  3) um contorno com o degradê da marca, só visível dentro de um círculo que segue o mouse
export const TextHoverEffect = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  // Posição (em %) do círculo que revela o degradê — segue o mouse
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  // Quanto maior o texto, mais largo o viewBox precisa ser para não cortar/espremer as letras
  const viewBoxWidth = Math.max(300, text.length * 60);

  // Toda vez que o mouse se move (evento abaixo), recalcula a posição do círculo de revelação
  // em porcentagem relativa ao próprio SVG (não à tela inteira)
  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${viewBoxWidth} 100`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        {/* Degradê da marca usado no texto revelado pelo círculo do mouse.
            Só ganha as cores quando `hovered` é true — sem hover, fica sem stop-color (invisível). */}
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#ba82aa" />
              <stop offset="50%" stopColor="#cc779d" />
              <stop offset="100%" stopColor="#df6d90" />
            </>
          )}
        </linearGradient>

        {/* Círculo branco-para-preto que segue o mouse (maskPosition) — vira a "lanterna"
            usada logo abaixo para revelar o texto com degradê só perto do cursor.
            É um <radialGradient> comum (sem framer-motion): a "animação" sempre foi instantânea
            aqui, então movê-lo via state evita o loop de re-render que existia antes. */}
        <radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          cx={maskPosition.cx}
          cy={maskPosition.cy}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>

      {/* Camada 1: contorno cinza fraco — só fica bem visível (opacity 0.7) durante o hover */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-800 font-[helvetica] text-7xl font-bold"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>

      {/* Camada 2: "assinatura" rosa que se desenha sozinha ao carregar a página (dash-offset
          animando de 1000 até 0), independente do mouse */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        stroke="#cc779d99"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>

      {/* Camada 3: contorno com o degradê da marca, só aparece dentro do círculo que segue
          o mouse (mask="url(#textMask)") */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};

// Brilho suave atrás de todo o rodapé — um radial-gradient escuro no topo, com um toque
// da cor da marca (rosa) se espalhando para as bordas.
export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #00000066 50%, #cc779d33 100%)",
      }}
    />
  );
};
