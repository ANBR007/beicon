import Image from "next/image";
import { contato, footer } from "@/lib/content";
import { FooterBackgroundGradient, TextHoverEffect } from "./ui/hover-footer";

// Rodapé do site — contato à esquerda, logo/tagline à direita, linha de copyright/crédito embaixo,
// e por fim o nome "beicon-mkt" gigante que só se revela em cores ao passar o mouse (TextHoverEffect).
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface-dark">
      <div className="container-grid relative z-10 py-14 md:py-20">
        <div className="grid grid-cols-12 gap-6">
          {/* Coluna "Contato": e-mail, WhatsApp e redes sociais (footer.socials em content.ts) */}
          <div className="col-span-12 md:col-span-6">
            <h4 className="text-label uppercase tracking-[0.14em] text-ink-muted mb-4">Contato</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${contato.email}`}
                  className="text-body hover:text-accent-solid transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink break-words"
                >
                  {contato.email}
                </a>
              </li>
              <li>
                <a
                  href={contato.whatsapp.href}
                  className="text-body hover:text-accent-solid transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {contato.whatsapp.label}
                </a>
              </li>
              {footer.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="text-body hover:text-accent-solid transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna da direita: logo empilhada + frase curta sobre a marca */}
          <div className="col-span-12 flex flex-col gap-4 md:col-span-6">
            <Image
              src="/logo/beicon-stacked-dark-text.png"
              alt="Beicon Mkt"
              width={394}
              height={381}
              className="h-16 w-auto"
            />
            <p className="text-body text-ink-muted max-w-[36ch]">
              Estratégia, branding e performance para marcas que querem liderar seu mercado.
            </p>
          </div>
        </div>

        {/* Linha final: copyright à esquerda, crédito do desenvolvedor à direita */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-label text-ink-muted text-center md:text-left">{footer.copyright}</p>
          <ul className="flex flex-wrap justify-center gap-4">
            {footer.dev.map((dev) => (
              <li key={dev.label}>
                <a
                  href={dev.href}
                  className="text-label uppercase tracking-[0.14em] hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {dev.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="border-t border-line my-20" />

      {/* Nome gigante em contorno — só aparece "colorido" seguindo o mouse (efeito em ui/hover-footer.tsx).
          Escondido em telas menores que "lg" pra não ocupar espaço demais no mobile. */}
      <div className="hidden h-[18rem] -mt-24 -mb-16 lg:flex">
        <TextHoverEffect text="beicon-mkt" className="z-10 lowercase" />
      </div>

      {/* Brilho degradê no fundo, atrás de tudo (ver ui/hover-footer.tsx) */}
      <FooterBackgroundGradient />
    </footer>
  );
}
