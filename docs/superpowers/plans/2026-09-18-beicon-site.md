# Site Beicon Mkt — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Beicon Mkt one-page marketing site — Swiss/international-typographic
visual system applied to the client's approved briefing content — as a Next.js 15 App Router
project, ready for local verification and Vercel deploy.

**Architecture:** Single-page Next.js app. All copy lives in one typed data module
(`src/lib/content.ts`) so components stay presentational. Design tokens (color, type scale,
grid, motion) live in `globals.css` under Tailwind v4's `@theme`. Each page section is one
component using two shared primitives: `SectionLabel` (the `/RÓTULO` bar) and `Reveal` (the
IntersectionObserver entrance animation). The contact form posts to a Route Handler that
validates input, checks a honeypot, rate-limits by IP, and sends email via Resend.

**Tech Stack:** Next.js 15 (App Router, TypeScript), Tailwind CSS v4, `next/font/local`
(Neue Montreal `.otf`), Resend (transactional email), Vitest (route handler tests), Vercel
(deploy target).

**Spec:** `docs/superpowers/specs/2026-09-16-beicon-site-design.md` (visual system, sections
1–10) + its addendum (section 11, reconciliation) + `docs/superpowers/specs/2026-09-18-beicon-briefing-cliente.md` (client copy, verbatim).

## Global Constraints

- Left-aligned, ragged-right everywhere. **Never centered**, at any breakpoint (spec 3.1).
- Reading measure 58–72 characters for body text (spec 3.1).
- Gradient (`linear-gradient(90deg, #AF85A9 0%, #D3718D 100%)`) is display-only: allowed only
  on `display`/`h2` text and as a fill/border on the contact submit button — max **3**
  appearances on the page (spec 3.2, budget: one hero word, active nav dot, contact submit).
- No fixed/sticky header; nav lives at the top of the hero only (spec addendum, section 11).
- Hero CTAs render as underlined text links, never filled buttons (spec addendum, section 11).
- 12-column grid, `24px` gutter, `1560px` max content width, outer margin
  `clamp(20px, 5vw, 80px)`, vertical rhythm on an `8px` base (spec 3.3).
- Section entrance: `opacity 0→1` + `translateY 16px→0`, `420ms cubic-bezier(0.16,1,0.3,1)`,
  fires once via `IntersectionObserver`; everything no-ops under
  `prefers-reduced-motion: reduce` (spec 3.4).
- Numbered-list-with-filete is the only repeating content pattern (Dores, Serviços) — no
  generic cards (spec addendum).
- Contact form: 5 real fields with real `<label>` elements, focus ring `2px solid var(--ink)`,
  errors announced via `aria-live="polite"` (spec 4.6 + addendum).
- WCAG 2.2 AA: one `h1`, no heading-level skips, full keyboard nav, visible focus ring never
  color-only (spec 5).
- Neue Montreal is a **trial/demo license** (`Befonts-License.txt`). It ships in this build
  for development only. A `README` note (Task 9) must flag that the web license must be
  purchased before the font module can go to production (spec 8).

---

## File Structure

```
beicon-site/
  package.json
  next.config.ts
  tsconfig.json
  postcss.config.mjs
  eslint.config.mjs
  vitest.config.ts
  public/
    favicon.ico
  src/
    app/
      layout.tsx
      page.tsx
      globals.css
      opengraph-image.tsx
      sitemap.ts
      robots.ts
      api/
        contact/
          route.ts
    components/
      SectionLabel.tsx
      Reveal.tsx
      Hero.tsx
      Dores.tsx
      Servicos.tsx
      Metodo.tsx
      Sobre.tsx
      Cases.tsx
      Contato.tsx
      Footer.tsx
    lib/
      content.ts
      fonts.ts
      rateLimit.ts
    assets/
      fonts/
        NeueMontreal-Light.otf
        NeueMontreal-Regular.otf
        NeueMontreal-Medium.otf
        NeueMontreal-Bold.otf
        NeueMontreal-Italic.otf
    test/
      contact-route.test.ts
```

- `content.ts` — single typed source of truth for all copy. Every component imports from it;
  nothing is hardcoded in JSX. This is what makes swapping placeholder contact data (Task 9)
  a one-file change.
- `fonts.ts` — the four `next/font/local` declarations, exported once, consumed by
  `layout.tsx` and nowhere else.
- `rateLimit.ts` — in-memory sliding-window limiter keyed by IP, used only by the contact
  route.
- Section components are one file each because each owns one visual pattern from the spec and
  is independently reviewable/testable in isolation.

---

### Task 1: Project scaffold, fonts, design tokens

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`,
  `eslint.config.mjs`
- Create: `src/assets/fonts/*.otf` (copied from extracted asset cache)
- Create: `src/lib/fonts.ts`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Test: manual — `npm run dev` boots and serves a blank page without console errors

**Interfaces:**
- Produces: CSS custom properties `--color-ink`, `--color-ink-muted`, `--color-surface`,
  `--color-surface-dark`, `--color-on-dark`, `--color-on-dark-muted`, `--color-line`,
  `--color-accent-from`, `--color-accent-to`, `--color-accent-solid`, `--gradient` (all
  consumed by every later component via Tailwind's `@theme` mapping). Font export
  `neueMontreal` from `fonts.ts` (consumed by `layout.tsx`).

- [ ] **Step 1: Scaffold the Next.js app**

```bash
cd /Users/andreluizcampostoledo/Desktop/dudu/beicon-site
npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir --import-alias "@/*" --no-turbopack --use-npm --yes
```

Expected: `package.json`, `next.config.ts`, `tsconfig.json`, `src/app/{layout,page}.tsx`,
`postcss.config.mjs` exist. `create-next-app` will complain the directory isn't empty (it has
`CLAUDE.md`, `docs/`, `.claude/`) — pass `--yes` to accept scaffolding into the non-empty dir.

- [ ] **Step 2: Copy font files into the project**

```bash
mkdir -p src/assets/fonts
SRC=/private/tmp/claude-501/-Users-andreluizcampostoledo-Desktop-dudu-beicon-site/8edb21cc-4a13-4c00-8d40-ade689c0177b/scratchpad/assets/font
cp "$SRC/neuemontreal-light.otf" src/assets/fonts/NeueMontreal-Light.otf
cp "$SRC/neuemontreal-regular.otf" src/assets/fonts/NeueMontreal-Regular.otf
cp "$SRC/neuemontreal-medium.otf" src/assets/fonts/NeueMontreal-Medium.otf
cp "$SRC/neuemontreal-bold.otf" src/assets/fonts/NeueMontreal-Bold.otf
cp "$SRC/neuemontreal-italic.otf" src/assets/fonts/NeueMontreal-Italic.otf
cp "$SRC/Befonts-License.txt" src/assets/fonts/LICENSE-trial.txt
```

Expected: `src/assets/fonts/` has 5 `.otf` files + the license note.

- [ ] **Step 3: Write `src/lib/fonts.ts`**

```typescript
import localFont from "next/font/local";

export const neueMontreal = localFont({
  src: [
    { path: "../assets/fonts/NeueMontreal-Light.otf", weight: "300", style: "normal" },
    { path: "../assets/fonts/NeueMontreal-Regular.otf", weight: "400", style: "normal" },
    { path: "../assets/fonts/NeueMontreal-Italic.otf", weight: "400", style: "italic" },
    { path: "../assets/fonts/NeueMontreal-Medium.otf", weight: "500", style: "normal" },
    { path: "../assets/fonts/NeueMontreal-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});
```

- [ ] **Step 4: Write `src/app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-ink: #141414;
  --color-ink-muted: #4d4d4d;
  --color-surface: #ffffff;
  --color-surface-dark: #343534;
  --color-on-dark: #ffffff;
  --color-on-dark-muted: #cbcccb;
  --color-line: #e4e4e4;
  --color-accent-from: #af85a9;
  --color-accent-to: #d3718d;
  --color-accent-solid: #c47b9b;

  --font-sans: var(--font-neue-montreal), system-ui, sans-serif;

  --text-display: clamp(3rem, 8.5vw, 7.5rem);
  --text-h2: clamp(2rem, 4.5vw, 3.75rem);
  --text-h3: clamp(1.25rem, 2vw, 1.75rem);
  --text-lead: clamp(1.25rem, 1.9vw, 1.6rem);
  --text-body: 1.0625rem;
  --text-label: 0.75rem;
  --text-mono-num: 0.8125rem;
}

:root {
  --gradient: linear-gradient(90deg, var(--color-accent-from) 0%, var(--color-accent-to) 100%);
  --content-max: 1560px;
  --outer-margin: clamp(20px, 5vw, 80px);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-surface);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: var(--text-body);
  line-height: 1.62;
}

.text-gradient {
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.container-grid {
  max-width: var(--content-max);
  margin-inline: auto;
  padding-inline: var(--outer-margin);
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

Verify the on-dark-muted token is exactly six ASCII hex characters (copy-paste from a
markdown table can introduce lookalike glyphs):

```bash
grep -n "on-dark-muted" src/app/globals.css
```

Expected output: `  --color-on-dark-muted: #cbcccb;`

- [ ] **Step 5: Write `src/app/layout.tsx`**

```typescript
import type { Metadata } from "next";
import { neueMontreal } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beicon Mkt — Transforme sua marca em máquina previsível de vendas",
  description:
    "Diagnóstico, branding, web e tráfego pago com a metodologia NAVE. A Beicon Mkt conecta identidade forte e performance para escalar o seu negócio.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={neueMontreal.variable}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Verify the app boots**

```bash
npm run dev &
sleep 3
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
kill %1
```

Expected: `200`.

- [ ] **Step 7: Commit**

```bash
git add package.json next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs \
  src/assets/fonts src/lib/fonts.ts src/app/globals.css src/app/layout.tsx .gitignore
git commit -m "chore: scaffold Next.js app with Neue Montreal fonts and design tokens"
```

---

### Task 2: Content data module

**Files:**
- Create: `src/lib/content.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `nav`, `hero`, `dores`, `servicos`, `metodo`, `sobre`, `cases`, `contato`,
  `footer` — typed exports every section component (Tasks 4–7) imports by name.

- [ ] **Step 1: Write `src/lib/content.ts`**

```typescript
export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Início", href: "#hero" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Cases", href: "#cases" },
  { label: "Contato", href: "#contato" },
];

export const hero = {
  tag: "Estratégia, Branding & Performance",
  headlinePre: "Transformamos sua marca em uma ",
  headlineAccent: "máquina previsível",
  headlinePost: " de atração e vendas.",
  lead:
    "Não fazemos “post bonitinho” ou anúncios sem direção. Conectamos diagnóstico profundo, identidade forte e tráfego pago para escalar o seu negócio.",
  ctaPrimary: { label: "Solicitar diagnóstico gratuito", href: "#contato" },
  ctaSecondary: { label: "Conhecer nossos serviços", href: "#servicos" },
};

export type ListItem = { n: string; title: string; body: string };

export const dores = {
  label: "Dores",
  title: "Sua empresa está passando por algum destes cenários?",
  items: [
    {
      n: "01",
      title: "Invisibilidade no mercado",
      body: "Sua empresa entrega um serviço incrível, mas a comunicação atual parece amadora e não transmite o seu valor real.",
    },
    {
      n: "02",
      title: "Campanhas sem retorno",
      body: "Você já investiu em tráfego ou redes sociais, mas só recebeu leads desqualificados que apenas pedem orçamento e somem.",
    },
    {
      n: "03",
      title: "Falta de posicionamento claro",
      body: "A marca não tem uma narrativa ou identidade definida, ficando refém da guerra de preços com concorrentes.",
    },
  ] satisfies ListItem[],
  closing:
    "Se você se identificou com algum desses pontos, o problema não é o seu produto. É a falta de uma estratégia estruturada.",
};

export type ServiceItem = ListItem & { deliverables: string };

export const servicos = {
  label: "Serviços",
  title: "Soluções completas para cada etapa de crescimento do seu negócio",
  items: [
    {
      n: "01",
      title: "Branding & Estratégia de Marca",
      body: "Construção de fundamento estratégico para marcas que querem liderar seu mercado.",
      deliverables:
        "Diagnóstico de marca, posicionamento, naming, guia de identidade verbal e visual (key visual).",
    },
    {
      n: "02",
      title: "Design & Identidade Visual",
      body: "Sistemas visuais marcantes que geram conexão imediata e autoridade instantânea.",
      deliverables:
        "Logotipos, universo da marca, embalagens, materiais institucionais e direção de arte.",
    },
    {
      n: "03",
      title: "Desenvolvimento Web & UI/UX",
      body: "Ambientes digitais rápidos, modernos e otimizados para converter visitantes em clientes.",
      deliverables:
        "Sites institucionais, landing pages de alta conversão e plataformas web otimizadas (SEO).",
    },
    {
      n: "04",
      title: "Tráfego Pago & Performance (Ads)",
      body: "Estratégia e gestão de mídia para atrair o público certo com foco em retorno financeiro (ROI).",
      deliverables:
        "Gestão de campanhas no Google Ads, Meta Ads (Instagram/Facebook) e TikTok Ads, com relatórios de performance.",
    },
  ] satisfies ServiceItem[],
};

export const metodo = {
  label: "Método",
  title: "Por que a Beicon Mkt é diferente das agências tradicionais?",
  lead: "Trabalhamos com a metodologia NAVE para investigar e estruturar seu negócio antes de executar qualquer peça.",
  steps: [
    { letter: "N", title: "Negócio", body: "Entendemos a fundo o seu modelo de vendas, margens e capacidade de atendimento." },
    { letter: "A", title: "Audiência", body: "Mapeamos com precisão quem é o seu cliente ideal e quais dores ele quer resolver." },
    { letter: "V", title: "Valor", body: "Criamos uma proposta e posicionamento únicos para tirar sua marca da guerra de preços." },
    { letter: "E", title: "Estória", body: "Desenvolvemos uma narrativa (storytelling) persuasiva para gerar conexão e fidelidade." },
  ],
};

export const sobre = {
  label: "Sobre",
  title: "Estética sem estratégia é enfeite. Estratégia sem estética passa despercebida.",
  paragraphs: [
    "Na Beicon Mkt, acreditamos que marcas fortes não surgem por acaso. Elas são construídas através de dados, clareza visual e mensagens assertivas.",
    "Nossa missão é guiar empresas do Ponto A — a estagnação e falta de diferenciação — ao Ponto B: a autoridade consolidada no mercado e um fluxo contínuo de novos clientes. Não entregamos apenas tarefas; entregamos ativos estratégicos de crescimento para o seu negócio.",
  ],
};

export type CasePlaceholder = { client: string; summary: string };

export const cases = {
  label: "Cases",
  title: "Projetos que geram impacto real",
  lead: "Veja como ajudamos nossos clientes a transformarem seus posicionamentos e resultados.",
  isPlaceholder: true,
  items: [
    { client: "Case a confirmar — 01", summary: "Espaço reservado para o primeiro case. Substituir por resultado real do cliente." },
    { client: "Case a confirmar — 02", summary: "Espaço reservado para o segundo case. Substituir por resultado real do cliente." },
    { client: "Case a confirmar — 03", summary: "Espaço reservado para o terceiro case. Substituir por resultado real do cliente." },
  ] satisfies CasePlaceholder[],
};

export const contato = {
  label: "Contato",
  title: "Pronto para elevar o nível do seu negócio?",
  lead: "Preencha o formulário abaixo e receba uma análise inicial sobre como podemos acelerar a sua marca.",
  submitLabel: "Enviar e agendar diagnóstico",
  objectives: [
    "Criar/reformular minha marca",
    "Vender mais com tráfego pago",
    "Criar um site/landing page",
    "Consultoria geral",
  ],
  // Pendente do cliente (spec §6 item 5) — placeholders funcionais, substituir antes do deploy.
  whatsapp: { label: "WhatsApp", href: "https://wa.me/5500000000000" },
  email: "contato@beiconmkt.com.br",
  instagram: { label: "Instagram", href: "https://instagram.com/beiconmkt" },
};

export const footer = {
  copyright: "© 2026 Beicon Mkt. Todos os direitos reservados.",
  socials: [
    { label: "Instagram", href: contato.instagram.href },
    { label: "LinkedIn", href: "https://linkedin.com/company/beiconmkt" },
    { label: "WhatsApp", href: contato.whatsapp.href },
  ],
};
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/content.ts
git commit -m "feat: add typed content module with client-approved copy"
```

---

### Task 3: Shared primitives — `SectionLabel` and `Reveal`

**Files:**
- Create: `src/components/SectionLabel.tsx`
- Create: `src/components/Reveal.tsx`

**Interfaces:**
- Produces: `<SectionLabel active?: boolean>children</SectionLabel>` — renders `/CHILDREN` in
  uppercase `label` style, with the brand dot (spec 3.5) prefixed when `active` is true.
  `<Reveal>children</Reveal>` — wraps any block, applies the spec 3.4 entrance animation via
  `IntersectionObserver`, fires once, no-ops under `prefers-reduced-motion`.
- Consumed by: every section component in Tasks 4–7.

- [ ] **Step 1: Write `src/components/SectionLabel.tsx`**

```typescript
type SectionLabelProps = {
  children: React.ReactNode;
  active?: boolean;
};

export function SectionLabel({ children, active = false }: SectionLabelProps) {
  return (
    <span className="text-label uppercase tracking-[0.14em] text-ink-muted inline-flex items-center gap-2">
      {active && (
        <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent-from to-accent-to" />
      )}
      /{children}
    </span>
  );
}
```

- [ ] **Step 2: Write `src/components/Reveal.tsx`**

```typescript
"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
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
```

- [ ] **Step 3: Type-check and lint**

```bash
npx tsc --noEmit && npx eslint src/components/SectionLabel.tsx src/components/Reveal.tsx
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/SectionLabel.tsx src/components/Reveal.tsx
git commit -m "feat: add SectionLabel and Reveal primitives"
```

---

### Task 4: Hero (wordmark, nav, headline)

**Files:**
- Create: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: `nav`, `hero` from `@/lib/content`; no other component dependency.
- Produces: `<Hero />`, rendered first in `page.tsx` (Task 9).

- [ ] **Step 1: Write `src/components/Hero.tsx`**

```typescript
import { nav, hero } from "@/lib/content";

export function Hero() {
  return (
    <header id="hero" className="container-grid min-h-[88vh] flex flex-col">
      <div className="flex items-center justify-between py-8">
        <span className="text-h3 font-bold">
          be<span className="font-normal text-ink-muted">icon</span>
        </span>
        <nav aria-label="Navegação principal">
          <ul className="flex gap-6">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-label uppercase tracking-[0.14em] hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex-1 flex flex-col justify-center grid grid-cols-12">
        <div className="col-span-12 lg:col-span-9">
          <p className="text-label uppercase tracking-[0.14em] text-ink-muted mb-6">{hero.tag}</p>
          <h1 className="text-display font-light leading-[0.94] tracking-[-0.035em]">
            {hero.headlinePre}
            <span className="text-gradient font-bold">{hero.headlineAccent}</span>
            {hero.headlinePost}
          </h1>
          <p className="text-lead font-light leading-[1.45] tracking-[-0.01em] mt-8 max-w-[62ch]">
            {hero.lead}
          </p>
          <div className="flex gap-8 mt-8">
            <a
              href={hero.ctaPrimary.href}
              className="underline underline-offset-4 decoration-2 hover:decoration-accent-to focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {hero.ctaPrimary.label}
            </a>
            <a
              href={hero.ctaSecondary.href}
              className="underline underline-offset-4 decoration-2 text-ink-muted hover:decoration-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {hero.ctaSecondary.label}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Type-check and lint**

```bash
npx tsc --noEmit && npx eslint src/components/Hero.tsx
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add Hero section with wordmark, nav, and headline"
```

---

### Task 5: Dores and Serviços (numbered-list pattern)

**Files:**
- Create: `src/components/Dores.tsx`
- Create: `src/components/Servicos.tsx`

**Interfaces:**
- Consumes: `dores`, `servicos` from `@/lib/content`; `SectionLabel`, `Reveal` from Task 3.
- Produces: `<Dores />`, `<Servicos />`.

- [ ] **Step 1: Write `src/components/Dores.tsx`**

```typescript
import { dores } from "@/lib/content";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

export function Dores() {
  return (
    <section id="dores" className="container-grid py-24 md:py-32 border-t border-line">
      <Reveal>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <SectionLabel>{dores.label}</SectionLabel>
          </div>
          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <h2 className="text-h2 font-light leading-[1.02] tracking-[-0.025em] mb-12 max-w-[20ch]">
              {dores.title}
            </h2>
            <ol>
              {dores.items.map((item) => (
                <li key={item.n} className="grid grid-cols-12 gap-6 py-6 border-t border-line">
                  <span className="col-span-2 md:col-span-1 text-mono-num tabular-nums tracking-[0.08em] text-ink-muted">
                    {item.n}
                  </span>
                  <h3 className="col-span-10 md:col-span-4 text-h3 font-medium tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="col-span-12 md:col-span-6 md:col-start-7 text-body text-ink-muted max-w-[72ch]">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
            <p className="text-lead font-light leading-[1.45] mt-12 max-w-[62ch]">{dores.closing}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Write `src/components/Servicos.tsx`**

```typescript
import { servicos } from "@/lib/content";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

export function Servicos() {
  return (
    <section id="servicos" className="container-grid py-24 md:py-32 border-t border-line">
      <Reveal>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <SectionLabel>{servicos.label}</SectionLabel>
          </div>
          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <h2 className="text-h2 font-light leading-[1.02] tracking-[-0.025em] mb-12 max-w-[24ch]">
              {servicos.title}
            </h2>
            <ol>
              {servicos.items.map((item) => (
                <li key={item.n} className="group grid grid-cols-12 gap-6 py-6 border-t border-line">
                  <span className="col-span-2 md:col-span-1 text-mono-num tabular-nums tracking-[0.08em] text-ink-muted">
                    {item.n}
                  </span>
                  <h3 className="col-span-10 md:col-span-4 text-h3 font-medium tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <div className="col-span-12 md:col-span-6 md:col-start-7 max-w-[72ch]">
                    <p className="text-body text-ink-muted">{item.body}</p>
                    <p className="text-body text-ink-muted mt-2 max-h-0 overflow-hidden group-hover:max-h-24 transition-[max-height] duration-300">
                      {item.deliverables}
                    </p>
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
```

- [ ] **Step 3: Type-check and lint**

```bash
npx tsc --noEmit && npx eslint src/components/Dores.tsx src/components/Servicos.tsx
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Dores.tsx src/components/Servicos.tsx
git commit -m "feat: add Dores and Servicos sections with numbered-list pattern"
```

---

### Task 6: Método NAVE and Sobre

**Files:**
- Create: `src/components/Metodo.tsx`
- Create: `src/components/Sobre.tsx`

**Interfaces:**
- Consumes: `metodo`, `sobre` from `@/lib/content`; `SectionLabel`, `Reveal` from Task 3.
- Produces: `<Metodo />`, `<Sobre />`.

- [ ] **Step 1: Write `src/components/Metodo.tsx`**

```typescript
import { metodo } from "@/lib/content";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

export function Metodo() {
  return (
    <section className="container-grid py-24 md:py-32 border-t border-line">
      <Reveal>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <SectionLabel>{metodo.label}</SectionLabel>
          </div>
          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <h2 className="text-h2 font-light leading-[1.02] tracking-[-0.025em] max-w-[22ch]">
              {metodo.title}
            </h2>
            <p className="text-lead font-light leading-[1.45] mt-6 max-w-[62ch]">{metodo.lead}</p>
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
```

Note: the NAVE letters use `.text-gradient`. That is appearance #2 of the 3-use gradient
budget (spec 3.2) — the four letters count as one recurring display element, not four
separate uses, since they share one semantic role (the method's initials). Do not add
gradient anywhere else in this component.

- [ ] **Step 2: Write `src/components/Sobre.tsx`**

```typescript
import { sobre } from "@/lib/content";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

export function Sobre() {
  return (
    <section id="sobre" className="container-grid py-24 md:py-32 border-t border-line">
      <Reveal>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <SectionLabel>{sobre.label}</SectionLabel>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-4">
            <h2 className="text-h2 font-light leading-[1.02] tracking-[-0.025em] mb-8">
              {sobre.title}
            </h2>
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
```

- [ ] **Step 3: Type-check and lint**

```bash
npx tsc --noEmit && npx eslint src/components/Metodo.tsx src/components/Sobre.tsx
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Metodo.tsx src/components/Sobre.tsx
git commit -m "feat: add Metodo (NAVE) and Sobre sections"
```

---

### Task 7: Cases (inverted section) and Footer

**Files:**
- Create: `src/components/Cases.tsx`
- Create: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `cases`, `footer`, `nav` from `@/lib/content`; `SectionLabel`, `Reveal` from
  Task 3.
- Produces: `<Cases />`, `<Footer />`.

- [ ] **Step 1: Write `src/components/Cases.tsx`**

```typescript
import { cases } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Cases() {
  return (
    <section id="cases" className="bg-surface-dark text-on-dark">
      <div className="container-grid py-24 md:py-32">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
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
              {cases.isPlaceholder && (
                <p className="text-label uppercase tracking-[0.14em] mt-8 text-on-dark-muted" role="note">
                  Conteúdo provisório — substituir por cases reais antes da publicação.
                </p>
              )}
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {cases.items.map((item) => (
                  <li key={item.client} className="border-t border-white/20 pt-6">
                    <h3 className="text-h3 font-medium tracking-[-0.01em]">{item.client}</h3>
                    <p className="text-body text-on-dark-muted mt-2">{item.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write `src/components/Footer.tsx`**

```typescript
import { footer, nav } from "@/lib/content";

export function Footer() {
  return (
    <footer className="container-grid py-12 border-t border-line">
      <div className="grid grid-cols-12 gap-6 items-center">
        <div className="col-span-12 md:col-span-4">
          <span className="text-h3 font-bold">
            .be<span className="font-normal text-ink-muted">icon</span>
          </span>
        </div>
        <nav aria-label="Navegação do rodapé" className="col-span-12 md:col-span-4">
          <ul className="flex flex-wrap gap-4">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-label uppercase tracking-[0.14em] hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-12 md:col-span-4 md:text-right">
          <ul className="flex md:justify-end gap-4">
            {footer.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="text-label uppercase tracking-[0.14em] hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-label text-ink-muted mt-4">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Type-check and lint**

```bash
npx tsc --noEmit && npx eslint src/components/Cases.tsx src/components/Footer.tsx
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Cases.tsx src/components/Footer.tsx
git commit -m "feat: add Cases (inverted section) and Footer"
```

---

### Task 8: Contact form + Route Handler with tests

**Files:**
- Create: `src/lib/rateLimit.ts`
- Create: `src/app/api/contact/route.ts`
- Create: `src/components/Contato.tsx`
- Create: `vitest.config.ts`
- Test: `src/test/contact-route.test.ts`

**Interfaces:**
- Consumes: `contato` from `@/lib/content`.
- Produces: `POST /api/contact` accepting
  `{ name, company, email, whatsapp, objective, website }` (`website` is the honeypot, must
  stay empty), returns `{ ok: true }` on success or `{ ok: false, error: string }` with a
  4xx status on validation/rate-limit failure. `checkRateLimit(ip: string): boolean` from
  `rateLimit.ts`, consumed only by `route.ts`.

- [ ] **Step 1: Install test runner**

```bash
npm install --save-dev vitest
```

- [ ] **Step 2: Write `vitest.config.ts`**

```typescript
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

- [ ] **Step 3: Write the failing test — `src/test/contact-route.test.ts`**

```typescript
import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/contact/route";

function makeRequest(body: Record<string, string>, ip = "203.0.113.1") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

const validPayload = {
  name: "Ana Souza",
  company: "Ana Studio",
  email: "ana@example.com",
  whatsapp: "11999998888",
  objective: "Criar/reformular minha marca",
  website: "",
};

describe("POST /api/contact", () => {
  it("accepts a valid submission", async () => {
    const res = await POST(makeRequest(validPayload, "203.0.113.10"));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it("rejects when the honeypot field is filled", async () => {
    const res = await POST(makeRequest({ ...validPayload, website: "spam" }, "203.0.113.11"));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
  });

  it("rejects an invalid email", async () => {
    const res = await POST(makeRequest({ ...validPayload, email: "not-an-email" }, "203.0.113.12"));
    expect(res.status).toBe(400);
  });

  it("rejects a missing required field", async () => {
    const res = await POST(makeRequest({ ...validPayload, name: "" }, "203.0.113.13"));
    expect(res.status).toBe(400);
  });

  it("rate-limits repeated submissions from the same IP", async () => {
    const ip = "203.0.113.20";
    for (let i = 0; i < 5; i++) {
      await POST(makeRequest(validPayload, ip));
    }
    const res = await POST(makeRequest(validPayload, ip));
    expect(res.status).toBe(429);
  });
});
```

- [ ] **Step 4: Run the test to verify it fails**

```bash
npx vitest run src/test/contact-route.test.ts
```

Expected: FAIL — `Cannot find module '@/app/api/contact/route'`.

- [ ] **Step 5: Write `src/lib/rateLimit.ts`**

```typescript
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(ip, timestamps);
    return false;
  }
  timestamps.push(now);
  hits.set(ip, timestamps);
  return true;
}
```

- [ ] **Step 6: Write `src/app/api/contact/route.ts`**

```typescript
import { checkRateLimit } from "@/lib/rateLimit";

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  objective: string;
  website: string; // honeypot — must stay empty
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(request: Request): Promise<Response> {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return json(429, { ok: false, error: "Muitas tentativas. Tente novamente em instantes." });
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return json(400, { ok: false, error: "Requisição inválida." });
  }

  if (payload.website) {
    return json(400, { ok: false, error: "Requisição inválida." });
  }

  if (!payload.name?.trim() || !payload.company?.trim() || !payload.whatsapp?.trim() || !payload.objective?.trim()) {
    return json(400, { ok: false, error: "Preencha todos os campos obrigatórios." });
  }

  if (!isValidEmail(payload.email ?? "")) {
    return json(400, { ok: false, error: "Informe um e-mail válido." });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: "Beicon Mkt <site@beiconmkt.com.br>",
        to: process.env.CONTACT_DESTINATION_EMAIL ?? "contato@beiconmkt.com.br",
        subject: `Novo diagnóstico solicitado — ${payload.company}`,
        text: `Nome: ${payload.name}\nEmpresa: ${payload.company}\nE-mail: ${payload.email}\nWhatsApp: ${payload.whatsapp}\nObjetivo: ${payload.objective}`,
      }),
    });
  }

  return json(200, { ok: true });
}
```

- [ ] **Step 7: Run the test to verify it passes**

```bash
npx vitest run src/test/contact-route.test.ts
```

Expected: PASS, 5 tests.

- [ ] **Step 8: Write `src/components/Contato.tsx`**

```typescript
"use client";

import { useState } from "react";
import { contato } from "@/lib/content";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

type Status = "idle" | "submitting" | "success" | "error";

export function Contato() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      company: String(form.get("company") ?? ""),
      email: String(form.get("email") ?? ""),
      whatsapp: String(form.get("whatsapp") ?? ""),
      objective: String(form.get("objective") ?? ""),
      website: String(form.get("website") ?? ""),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();

    if (json.ok) {
      setStatus("success");
      event.currentTarget.reset();
    } else {
      setStatus("error");
      setErrorMessage(json.error ?? "Não foi possível enviar. Tente novamente.");
    }
  }

  return (
    <section id="contato" className="container-grid py-24 md:py-32 border-t border-line">
      <Reveal>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <SectionLabel>{contato.label}</SectionLabel>
          </div>
          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <h2 className="text-display font-light leading-[0.94] tracking-[-0.035em] max-w-[16ch]">
              {contato.title}
            </h2>
            <p className="text-lead font-light leading-[1.45] mt-6 max-w-[62ch]">{contato.lead}</p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12" noValidate>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-label uppercase tracking-[0.14em]">Nome completo</label>
                <input id="name" name="name" required className="border-b border-line py-2 bg-transparent focus:outline-none focus:border-2 focus:border-ink" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-label uppercase tracking-[0.14em]">Nome da empresa/marca</label>
                <input id="company" name="company" required className="border-b border-line py-2 bg-transparent focus:outline-none focus:border-2 focus:border-ink" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-label uppercase tracking-[0.14em]">E-mail corporativo</label>
                <input id="email" name="email" type="email" required className="border-b border-line py-2 bg-transparent focus:outline-none focus:border-2 focus:border-ink" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="whatsapp" className="text-label uppercase tracking-[0.14em]">WhatsApp</label>
                <input id="whatsapp" name="whatsapp" required className="border-b border-line py-2 bg-transparent focus:outline-none focus:border-2 focus:border-ink" />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="objective" className="text-label uppercase tracking-[0.14em]">Qual o seu principal objetivo hoje?</label>
                <select id="objective" name="objective" required defaultValue="" className="border-b border-line py-2 bg-transparent focus:outline-none focus:border-2 focus:border-ink">
                  <option value="" disabled>Selecione uma opção</option>
                  {contato.objectives.map((objective) => (
                    <option key={objective} value={objective}>{objective}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 flex items-center gap-6">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-6 py-3 text-label uppercase tracking-[0.14em] text-on-dark disabled:opacity-60"
                  style={{ background: "var(--gradient)" }}
                >
                  {status === "submitting" ? "Enviando..." : contato.submitLabel}
                </button>
                <div aria-live="polite" className="text-body">
                  {status === "success" && "Recebido — entraremos em contato em breve."}
                  {status === "error" && errorMessage}
                </div>
              </div>
            </form>

            <div className="flex gap-8 mt-12 text-body">
              <a href={contato.whatsapp.href} className="underline underline-offset-4">{contato.whatsapp.label}</a>
              <a href={`mailto:${contato.email}`} className="underline underline-offset-4">{contato.email}</a>
              <a href={contato.instagram.href} className="underline underline-offset-4">{contato.instagram.label}</a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
```

Note: the gradient submit button is appearance #3 of the 3-use budget (spec 3.2) — hero
accent word is #1, NAVE letters are #2, this is the last one. No further gradient use is
permitted anywhere else in the page.

- [ ] **Step 9: Type-check, lint, and run the full test suite**

```bash
npx tsc --noEmit && npx eslint src/components/Contato.tsx src/app/api/contact/route.ts && npx vitest run
```

Expected: no type/lint errors; all 5 tests pass.

- [ ] **Step 10: Commit**

```bash
git add src/lib/rateLimit.ts src/app/api/contact/route.ts src/components/Contato.tsx \
  vitest.config.ts src/test/contact-route.test.ts package.json package-lock.json
git commit -m "feat: add contact form with validated, rate-limited API route"
```

---

### Task 9: Assemble the page, SEO metadata, and accessibility pass

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/opengraph-image.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: `src/app/layout.tsx`
- Modify: `README.md` (add font-license note)

**Interfaces:**
- Consumes: every component from Tasks 4–7 (`Hero`, `Dores`, `Servicos`, `Metodo`, `Sobre`,
  `Cases`, `Contato`, `Footer`).
- Produces: the final rendered `/` route.

- [ ] **Step 1: Write `src/app/page.tsx`**

```typescript
import { Hero } from "@/components/Hero";
import { Dores } from "@/components/Dores";
import { Servicos } from "@/components/Servicos";
import { Metodo } from "@/components/Metodo";
import { Sobre } from "@/components/Sobre";
import { Cases } from "@/components/Cases";
import { Contato } from "@/components/Contato";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Dores />
      <Servicos />
      <Metodo />
      <Sobre />
      <Cases />
      <Contato />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Write `src/app/opengraph-image.tsx`**

```typescript
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#141414",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", opacity: 0.7 }}>
          Beicon Mkt
        </div>
        <div style={{ fontSize: 64, marginTop: 24, lineHeight: 1.05, maxWidth: 900 }}>
          Transformamos sua marca em uma máquina previsível de atração e vendas.
        </div>
      </div>
    ),
    size
  );
}
```

- [ ] **Step 3: Write `src/app/sitemap.ts`**

```typescript
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.beiconmkt.com.br",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

- [ ] **Step 4: Write `src/app/robots.ts`**

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.beiconmkt.com.br/sitemap.xml",
  };
}
```

- [ ] **Step 5: Add JSON-LD Organization schema to `src/app/layout.tsx`**

Replace the file with:

```typescript
import type { Metadata } from "next";
import { neueMontreal } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beicon Mkt — Transforme sua marca em máquina previsível de vendas",
  description:
    "Diagnóstico, branding, web e tráfego pago com a metodologia NAVE. A Beicon Mkt conecta identidade forte e performance para escalar o seu negócio.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={neueMontreal.variable}>
      <body>
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
```

- [ ] **Step 6: Accessibility pass**

Run the dev server, open `http://localhost:3000`, and verify:
- Exactly one `<h1>` (the Hero headline).
- Tab order reaches every nav link, both hero CTAs, every form field, and the submit button
  in visual order, with a visible focus ring on each.
- `prefers-reduced-motion: reduce` (toggle in devtools rendering tab) removes the `Reveal`
  transform/opacity animation — content should be visible immediately.

Expected: no landmark violations, no missing labels, no color-only affordance.

- [ ] **Step 7: Add the font-license note to `README.md`**

```markdown
## Fonts

Neue Montreal ships in `src/assets/fonts/` under a **trial/demo license**
(see `LICENSE-trial.txt`). Before deploying to production, purchase the web license from
Pangram Pangram and replace the files in that directory — no code changes needed, the
`next/font/local` declaration in `src/lib/fonts.ts` points at the file paths, not the license.

## Placeholder content

`src/lib/content.ts` has placeholder WhatsApp number, email, Instagram handle, and case
studies (spec §6). Replace them with real client data before launch.
```

- [ ] **Step 8: Full build verification**

```bash
npx tsc --noEmit
npx eslint .
npx vitest run
npm run build
```

Expected: all four commands exit 0.

- [ ] **Step 9: Commit**

```bash
git add src/app/page.tsx src/app/opengraph-image.tsx src/app/sitemap.ts src/app/robots.ts \
  src/app/layout.tsx README.md
git commit -m "feat: assemble page, add SEO metadata, OG image, and a11y focus states"
```

---

## Post-plan checklist (not tasks — verify before calling the site done)

- [ ] `npm run dev`, open in a real browser, scroll the full page, confirm no layout breaks at
  640px, 1024px, and 1280px+ (spec 3.3 breakpoints).
- [ ] Confirm the gradient appears exactly 3 times on the rendered page (hero accent word,
  NAVE letters, contact submit button) — this is a visual check, not something grep catches.
- [ ] Lighthouse mobile run — targets from spec 5: LCP < 1.8s, CLS < 0.05, Performance/
  Accessibility/Best Practices/SEO ≥ 95.
- [ ] Flag to the user, explicitly, that WhatsApp number, email, Instagram handle, CNPJ, and
  city in `src/lib/content.ts` are placeholders (spec §6 item 5) and must be replaced before
  launch, and that the Neue Montreal license must be purchased before deploy (spec §8).
