import type { Metadata } from "next";
import { neueMontreal } from "@/lib/fonts";
import "./globals.css";

// Metadados de SEO/compartilhamento (título e descrição que aparecem no Google e ao colar o link)
export const metadata: Metadata = {
  metadataBase: new URL("https://www.beiconmkt.com.br"),
  title: "Beicon Mkt — Transforme sua marca em máquina previsível de vendas",
  description:
    "Diagnóstico, branding, web e tráfego pago com a metodologia NAVE. A Beicon Mkt conecta identidade forte e performance para escalar o seu negócio.",
};

// Layout raiz — envolve TODAS as páginas do site (aplica a fonte, importa o CSS global e injeta o
// JSON-LD de "Organization" para o Google entender quem é a empresa por trás do site).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={neueMontreal.variable}>
      <body>
        {/* Dado estruturado (schema.org) — não aparece na tela, só ajuda buscadores/IA a identificar a marca */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Beicon Mkt",
              description: "Agência de branding, web e performance com a metodologia NAVE.",
              url: "https://www.beiconmkt.com.br",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
