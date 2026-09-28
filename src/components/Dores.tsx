import { dores } from "@/lib/content";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

// Seção "Dores" — lista os problemas comuns do cliente, em 4 cards lado a lado.
// Todo o texto (título, cards, frase final) vem de src/lib/content.ts (objeto `dores`).
export function Dores() {
  return (
    <section id="dores" className="container-grid py-24 md:py-32 border-t border-line">
      <Reveal>
        <div className="grid grid-cols-12 gap-6">
          {/* Rótulo pequeno à esquerda ("/DORES") */}
          <div className="col-span-12 md:col-span-2">
            <SectionLabel>{dores.label}</SectionLabel>
          </div>

          <div className="col-span-12 md:col-span-9 md:col-start-4">
            {/* Título da seção */}
            <h2 className="text-h2 font-light leading-[1.02] tracking-[-0.025em] mb-12 max-w-[20ch]">
              {dores.title}
            </h2>

            {/* Grade de cards: 3 colunas no desktop (o 4º item cai para a linha de baixo) */}
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dores.items.map((item) => (
                <li key={item.n} className="flex flex-col gap-4 p-6 border border-line">
                  <span className="text-mono-num tabular-nums tracking-[0.08em] text-ink-muted">
                    {item.n}
                  </span>
                  <h3 className="text-h3 font-medium tracking-[-0.01em]">{item.title}</h3>
                  <p className="text-body text-ink-muted">{item.body}</p>
                </li>
              ))}
            </ol>

            {/* Frase de fechamento, abaixo dos cards */}
            <p className="text-lead font-light leading-[1.45] mt-12 max-w-[62ch]">{dores.closing}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
