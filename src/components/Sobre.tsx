import { sobre } from "@/lib/content";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

// Seção "Sobre" — título + uma sequência de parágrafos. Simples: só percorre
// sobre.paragraphs (src/lib/content.ts) e renderiza um <p> para cada string do array.
export function Sobre() {
  return (
    <section id="sobre" className="container-grid py-24 md:py-32 border-t border-line">
      <Reveal>
        <div className="grid grid-cols-12 gap-6">
          {/* Rótulo pequeno à esquerda ("/SOBRE") */}
          <div className="col-span-12 md:col-span-2">
            <SectionLabel>{sobre.label}</SectionLabel>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-4">
            <h2 className="text-h2 font-light leading-[1.02] tracking-[-0.025em] mb-8">
              {sobre.title}
            </h2>
            {/* Um parágrafo por item do array — para adicionar/remover texto, edite content.ts */}
            {sobre.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-lead font-light leading-[1.45] max-w-[62ch] mt-6 first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
