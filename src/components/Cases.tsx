"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cases, servicos } from "@/lib/content";
import { Reveal } from "./Reveal";

// Qual foto usar no carrossel para cada serviço (a chave é o "n" do serviço em content.ts,
// ex: "01"). Se um serviço for adicionado/removido em `servicos.items`, atualize esta lista
// também — senão a foto daquele item fica em branco/quebrada.
const photoByServiceNumber: Record<string, string> = {
  "01": "/cases/branding.jpg",
  "02": "/cases/design.jpg",
  "03": "/cases/design.jpg",
  "04": "/cases/web.jpg",
  "05": "/cases/ads.jpg",
};

// Seção "Cases" — fundo escuro com um carrossel horizontal que rola sozinho, sem parar,
// mostrando os serviços com foto (ainda são fotos de banco de imagens, ver cases.isPlaceholder).
export function Cases() {
  const prefersReducedMotion = useReducedMotion();
  // Duplica a lista de serviços para o carrossel poder "dar a volta" sem deixar um espaço vazio no fim
  const duplicatedItems = [...servicos.items, ...servicos.items];

  return (
    <section id="cases" className="bg-surface-dark text-on-dark">
      <div className="container-grid py-24 md:py-32">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            {/* Rótulo pequeno à esquerda ("/CASES") */}
            <div className="col-span-12 md:col-span-2">
              <span className="text-label uppercase tracking-[0.14em] text-on-dark-muted">/{cases.label}</span>
            </div>
            <div className="col-span-12 md:col-span-9 md:col-start-4">
              <h2 className="text-h2 font-light leading-[1.02] tracking-[-0.025em] max-w-[20ch]">
                {cases.title}
              </h2>
              <p className="text-lead font-light leading-[1.45] mt-6 max-w-[62ch] text-on-dark-muted">
                {cases.lead}
              </p>
              {/* Aviso visível só enquanto as fotos forem de banco de imagens (cases.isPlaceholder = true) */}
              {cases.isPlaceholder && (
                <p className="text-label uppercase tracking-[0.14em] mt-8 text-on-dark-muted" role="note">
                  Fotos ilustrativas de banco de imagens — substituir por projetos reais assim que disponíveis.
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Carrossel: uma faixa de imagens que desliza da direita para a esquerda infinitamente.
          A máscara (mask-image) esmaece as bordas esquerda/direita para a rolagem parecer suave. */}
      <div className="w-full h-72 md:h-80 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] overflow-hidden">
        <motion.div
          className="flex gap-6 h-full items-center pl-[var(--outer-margin)]"
          // anima de 0% a -50% (metade da lista duplicada) e repete — dá a ilusão de loop infinito
          animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className="relative w-56 sm:w-64 h-56 sm:h-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-md"
            >
              <Image
                src={photoByServiceNumber[item.n]}
                alt=""
                fill
                sizes="256px"
                className="object-cover"
              />
              {/* Sombra escura por trás do texto, para o número/título ficarem legíveis sobre a foto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1">
                <span className="text-mono-num tabular-nums tracking-[0.08em] text-white/80">{item.n}</span>
                <h3 className="text-h3 font-medium tracking-[-0.01em] text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
