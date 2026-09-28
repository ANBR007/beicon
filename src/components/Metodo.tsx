import { metodo } from "@/lib/content";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

// Seção "Método NAVE" — mostra as 4 letras (N-A-V-E) lado a lado, uma para cada etapa do método.
// Todo o texto vem de src/lib/content.ts (objeto `metodo`, array `steps`).
export function Metodo() {
  return (
    <section className="container-grid py-24 md:py-32 border-t border-line">
      <Reveal>
        <div className="grid grid-cols-12 gap-6">
          {/* Rótulo pequeno à esquerda ("/MÉTODO") */}
          <div className="col-span-12 md:col-span-2">
            <SectionLabel>{metodo.label}</SectionLabel>
          </div>

          <div className="col-span-12 md:col-span-9 md:col-start-4">
            {/* Título + texto de apoio */}
            <h2 className="text-h2 font-light leading-[1.02] tracking-[-0.025em] max-w-[22ch]">
              {metodo.title}
            </h2>
            <p className="text-lead font-light leading-[1.45] mt-6 max-w-[62ch]">{metodo.lead}</p>

            {/* As 4 colunas: letra grande em degradê + nome da etapa + explicação */}
            <ol className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              {metodo.steps.map((step) => (
                <li key={step.letter} className="border-t border-line pt-6">
                  <span className="text-h2 font-light text-gradient">{step.letter}</span>
                  <h3 className="text-h3 font-medium tracking-[-0.01em] mt-2">{step.title}</h3>
                  <p className="text-body text-ink-muted mt-2">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
