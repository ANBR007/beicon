"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { nav, hero } from "@/lib/content";
import { Button } from "@/components/ui/button";
import FloatingMenu from "@/components/ui/liquid-morph-floating-menu";

// Curva de easing usada em todas as animações de entrada desta seção
const EASE = [0.16, 1, 0.3, 1] as const;

// Números mostrados embaixo dos botões (edite aqui para atualizar as estatísticas do Hero)
const stats = [
  { value: "23", label: "Segmentos atendidos" },
  { value: "7 anos", label: "Tempo de mercado" },
  { value: "60", label: "Marcas desenvolvidas" },
];

export function Hero() {
  // Se o usuário pediu "reduzir movimento" no sistema, desliga as animações (acessibilidade)
  const prefersReducedMotion = useReducedMotion();

  // Transforma o menu de navegação (content.ts) em itens clicáveis para o menu flutuante
  const menuItems = nav.map((item) => ({
    label: item.label,
    onClick: () => {
      window.location.href = item.href;
    },
  }));

  // --- Configurações de animação (framer-motion) ---
  // Anima os filhos diretos em sequência (tag, título, texto, botões, stats)
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  // Fade + leve deslocamento para cima, usado em cada bloco (tag/texto/botões/stats)
  const itemVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: EASE },
    },
  };

  // Orquestra a animação palavra-por-palavra do título
  const titleContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: prefersReducedMotion ? { duration: 0 } : { staggerChildren: 0.05 },
    },
  };

  // Animação de cada palavra individual do título
  const wordVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: EASE },
    },
  };

  // Quebra o título (hero.headlinePre + headlineAccent + headlinePost) em palavras individuais,
  // marcando quais pertencem ao trecho de destaque (accent: true = ganha o gradiente da marca)
  const headlineWords = [
    ...hero.headlinePre.trim().split(" ").map((text) => ({ text, accent: false })),
    ...hero.headlineAccent.trim().split(" ").map((text) => ({ text, accent: true })),
    ...hero.headlinePost.trim().split(" ").map((text) => ({ text, accent: false })),
  ];

  // Agrupa palavras vizinhas que têm o mesmo "accent" em um só bloco. Isso garante que o
  // gradiente do destaque (ex: "caminho certo") flua continuamente entre as palavras do grupo,
  // em vez de reiniciar do zero em cada palavra.
  const headlineSegments = headlineWords.reduce<{ accent: boolean; words: string[] }[]>(
    (segments, word) => {
      const last = segments[segments.length - 1];
      if (last && last.accent === word.accent) {
        last.words.push(word.text);
      } else {
        segments.push({ accent: word.accent, words: [word.text] });
      }
      return segments;
    },
    []
  );

  return (
    <header id="hero" className="relative min-h-dvh flex flex-col">
      {/* Logo no topo da página */}
      <div className="container-grid flex items-center justify-between py-8 relative z-10">
        <Image
          src="/logo/beicon-horizontal-dark-text.png"
          alt="Beicon Mkt"
          width={638}
          height={255}
          priority
          className="h-7 w-auto md:h-8"
        />
      </div>

      {/* Menu flutuante (canto superior direito) — mesmo em telas pequenas */}
      <FloatingMenu items={menuItems} />

      {/* Bloco central: tag + título + texto + botões + estatísticas */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-10 sm:py-12 md:py-16"
      >
        {/* Selo pequeno acima do título ("Estratégia, Design & Execução Completa") */}
        <motion.div variants={itemVariants} className="mb-4 max-w-full">
          <span className="inline-flex items-center gap-2 rounded-lg border border-line bg-line/30 px-3 py-1.5 sm:px-4 text-[0.65rem] sm:text-label uppercase tracking-[0.1em] sm:tracking-[0.14em] text-ink-muted">
            <Sparkles className="h-4 w-4 shrink-0" />
            {hero.tag}
          </span>
        </motion.div>

        {/* Título principal — renderizado palavra por palavra para permitir a animação em cascata */}
        <motion.h1
          variants={titleContainerVariants}
          className="text-display font-light leading-[0.94] tracking-[-0.035em] max-w-4xl"
        >
          {headlineSegments.map((segment, segIndex) => {
            const words = segment.words.map((text, wordIndex) => (
              <motion.span
                key={`${segIndex}-${wordIndex}`}
                variants={wordVariants}
                className="inline-block"
              >
                {text}&nbsp;
              </motion.span>
            ));

            // Trecho de destaque: envolve o grupo inteiro em um único span com o gradiente,
            // para o degradê ir de uma ponta a outra do trecho (não repetir por palavra)
            return segment.accent ? (
              <span key={`accent-${segIndex}`} className="text-gradient font-bold">
                {words}
              </span>
            ) : (
              words
            );
          })}
        </motion.h1>

        {/* Parágrafo de apoio abaixo do título */}
        <motion.p
          variants={itemVariants}
          className="text-lead font-light leading-[1.45] tracking-[-0.01em] mt-8 max-w-2xl"
        >
          {hero.lead}
        </motion.p>

        {/* Botões de ação (CTA primário sólido + CTA secundário com borda) */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mt-10">
          <Button asChild size="lg" className="gap-2 normal-case tracking-normal text-base">
            <a href={hero.ctaPrimary.href}>
              {hero.ctaPrimary.label}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="normal-case tracking-normal text-base">
            <a href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</a>
          </Button>
        </motion.div>

        {/* Linha de estatísticas (23 segmentos / 7 anos / 60 marcas), separadas por uma barra vertical */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex items-center gap-6 sm:gap-8 text-body text-ink-muted"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6 sm:gap-8">
              {i > 0 && <div className="h-8 w-px bg-line" aria-hidden="true" />}
              <div>
                <div className="text-h3 font-medium text-ink">{stat.value}</div>
                <div className="text-label uppercase tracking-[0.1em]">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </header>
  );
}
