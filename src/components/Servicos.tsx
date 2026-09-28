import { servicos } from "@/lib/content";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

// Seção "Serviços" — lista os 5 serviços empilhados (um embaixo do outro), separados por linhas
// que vão de ponta a ponta. Ao passar o mouse em cima de um item, o texto explicativo aparece
// logo abaixo do título (efeito feito só com CSS: "group" + "group-hover", sem JavaScript).
export function Servicos() {
  return (
    <section id="servicos" className="container-grid py-24 md:py-32 border-t border-line">
      <Reveal>
        <div className="grid grid-cols-12 gap-6">
          {/* Rótulo pequeno à esquerda ("/SERVIÇOS") */}
          <div className="col-span-12 md:col-span-2">
            <SectionLabel>{servicos.label}</SectionLabel>
          </div>

          <div className="col-span-12 md:col-span-9 md:col-start-4">
            {/* Título da seção */}
            <h2 className="text-h2 font-light leading-[1.02] tracking-[-0.025em] mb-12 max-w-[24ch]">
              {servicos.title}
            </h2>

            {/* Lista de serviços — cada <li> é uma linha completa, separada por uma borda no topo */}
            <ol>
              {servicos.items.map((item) => (
                <li key={item.n} className="group py-8 border-t border-line">
                  {/* Número + título grande, lado a lado */}
                  <div className="flex items-baseline gap-4">
                    <span className="text-mono-num tabular-nums tracking-[0.08em] text-ink-muted">
                      {item.n}
                    </span>
                    <h3 className="text-h2 font-medium tracking-[-0.02em] leading-[1.05]">
                      {item.title}
                    </h3>
                  </div>

                  {/* Texto explicativo: fica escondido (altura 0 + invisível) e só aparece
                      quando o mouse passa em cima da linha (".group-hover") */}
                  <div className="max-w-[72ch] max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100 transition-[max-height,opacity,margin-top] duration-300 group-hover:mt-4">
                    <p className="text-body text-ink-muted">{item.body}</p>
                    <p className="text-body text-ink-muted mt-2">{item.deliverables}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
