# Escopo — Site Beicon MKT

**Data:** 2026-09-16
**Formato:** one-page institucional
**Direção:** Estilo Tipográfico Internacional (suíço), derivado da própria marca
**Status:** escopo aprovado para plano de implementação

---

## 1. Objetivo

A Beicon é uma agência de marketing que atua em duas frentes: **marketing em geral** e
**desenvolvimento de identidade digital**. O site é uma página única cujo trabalho é
transformar visitante em conversa qualificada.

O site não precisa explicar tudo que a agência faz. Precisa fazer três coisas, nesta ordem:

1. Provar competência estética nos primeiros três segundos — uma agência que desenvolve
   identidade digital é julgada pelo próprio site antes de qualquer texto ser lido.
2. Deixar claro o que a Beicon entrega e para quem.
3. Levar ao contato com atrito mínimo.

**Métrica de sucesso:** taxa de contato iniciado (WhatsApp ou formulário) sobre visitantes
únicos. Alvo inicial de referência: 4%.

---

## 2. O conceito, e por que ele governa o design

A logo carrega o conceito inteiro: `be` + `icon` = **seja ícone**. A leitura dupla só
funciona por causa do contraste — `be` em bold com gradiente contra `icon` em regular
neutro. É tipografia fazendo trabalho semântico, não decoração.

Isso define a regra central do site: **contraste tipográfico é o sistema; a cor é o acento.**
A página é preto, branco e cinza; o gradiente da marca aparece poucas vezes, sempre em
tipografia display, sempre carregando significado.

Isso resolve a tensão óbvia entre a marca e a referência: o estilo suíço é rigor
monocromático, e a Beicon tem um gradiente. A resolução não é abandonar nenhum dos dois —
é fazer exatamente o que a logo já faz.

---

## 3. Sistema de design

### 3.1 Tipografia

**Neue Montreal** (arquivo fornecido), quatro pesos:

| Peso | Uso |
|---|---|
| Light (300) | display e headlines — o peso que dá o ar suíço |
| Regular (400) | corpo de texto |
| Medium (500) | rótulos, navegação, números, ênfase |
| Bold (700) | exclusivo da palavra com gradiente e do wordmark |

Itálicos entram apenas em citações e legendas. Não usar itálico em headline.

**Escala modular** (razão 1,26 — quarta menor, mais contida que a terça maior típica; o
estilo suíço prefere saltos claros a saltos dramáticos):

| Token | Tamanho | Peso | Line-height | Tracking |
|---|---|---|---|---|
| `display` | `clamp(3rem, 8.5vw, 7.5rem)` | 300 | 0.94 | -0.035em |
| `h2` | `clamp(2rem, 4.5vw, 3.75rem)` | 300 | 1.02 | -0.025em |
| `h3` | `clamp(1.25rem, 2vw, 1.75rem)` | 500 | 1.2 | -0.01em |
| `lead` | `clamp(1.25rem, 1.9vw, 1.6rem)` | 300 | 1.45 | -0.01em |
| `body` | `1.0625rem` | 400 | 1.62 | 0 |
| `label` | `0.75rem` | 500 | 1.2 | 0.14em, uppercase |
| `mono-num` | `0.8125rem` | 500 | 1 | 0.08em, tabular |

**Regras não negociáveis:**

- Tudo alinhado à esquerda, bandeira à direita. **Nada centralizado**, em nenhum breakpoint.
  Centralizar é o erro que mais rápido destrói uma composição suíça.
- Medida de leitura entre 58 e 72 caracteres. Acima disso, o parágrafo perde o olho.
- Tracking negativo cresce com o tamanho; texto pequeno nunca recebe tracking negativo.
- Rótulos de seção levam barra e caixa alta: `/SERVIÇOS`, `/MÉTODO`, `/CONTATO`. É o
  recurso que dá ritmo à página inteira e vem direto da referência `marcados.me`.

### 3.2 Cor

Tokens extraídos por amostragem do PDF da logo (render a 2400px; o arquivo não expõe a
função de gradiente):

| Token | Hex | Papel |
|---|---|---|
| `--ink` | `#141414` | texto principal. 18,4:1 sobre branco |
| `--ink-muted` | `#4D4D4D` | texto secundário. 8,45:1. Direto da logo |
| `--surface` | `#FFFFFF` | fundo padrão |
| `--surface-dark` | `#343534` | fundo invertido. Direto da logo |
| `--on-dark` | `#FFFFFF` | texto sobre escuro. 12,3:1 |
| `--on-dark-muted` | `#CBCCCB` | secundário sobre escuro. 7,65:1. Direto da logo |
| `--line` | `#E4E4E4` | filetes e divisórias |
| `--accent-from` | `#AF85A9` | início do gradiente |
| `--accent-to` | `#D3718D` | fim do gradiente |
| `--accent-solid` | `#C47B9B` | ponto médio, para casos sem gradiente |

**Gradiente:** `linear-gradient(90deg, #AF85A9 0%, #D3718D 100%)` — horizontal, curto,
dessaturado. Não é rosa neon; a paleta da Beicon é sóbria e o site precisa respeitar isso.

**Regra de acessibilidade, medida e verificada:**

| Par | Contraste | Veredito |
|---|---|---|
| `#AF85A9` sobre branco | 3,11:1 | AA apenas texto grande |
| `#D3718D` sobre branco | 3,22:1 | AA apenas texto grande |
| `#C47B9B` sobre branco | 3,16:1 | AA apenas texto grande |
| `#AF85A9` sobre `#343534` | 3,96:1 | AA apenas texto grande |
| `#D3718D` sobre `#343534` | 3,82:1 | AA apenas texto grande |

Portanto: **o gradiente é display-only.** Permitido em `display` e `h2`. Proibido em corpo
de texto, links inline, rótulos, placeholders, mensagens de erro e ícones que carreguem
informação sozinhos. Onde o acento precisa aparecer em tamanho pequeno, ele vira **filete ou
área de fundo**, nunca texto.

**Orçamento de cor:** no máximo **três** aparições do gradiente na página inteira. Sugestão:
uma palavra no hero, o marcador de seção ativo, e o botão de contato.

### 3.3 Grid

- 12 colunas, gutter `24px`, largura máxima de conteúdo `1560px`.
- Margem externa `clamp(20px, 5vw, 80px)`.
- Ritmo vertical em base `8px`. Espaçamento entre seções: `clamp(96px, 14vh, 200px)`.
- **Composição assimétrica.** Nenhuma seção ocupa as 12 colunas com um bloco centrado.
  Padrão recorrente: rótulo nas colunas 1–2, conteúdo nas 4–11. Esse deslocamento é o que
  produz a tensão suíça.
- Filetes de `1px` em `--line` separando seções — o grid fica parcialmente visível, como
  em Müller-Brockmann.

Breakpoints: `640` (1 coluna), `1024` (6 colunas), `1280+` (12 colunas).

### 3.4 Movimento

Contenção. O estilo suíço não salta.

- Entrada de seção: `opacity 0→1` + `translateY 16px→0`, `420ms`,
  `cubic-bezier(0.16, 1, 0.3, 1)`, disparada uma única vez por `IntersectionObserver`.
- Headlines revelam por máscara (`clip-path` subindo linha a linha) — o único momento com
  alguma ambição.
- Hover em links: sublinhado cresce da esquerda, `180ms`. Sem mudança de cor.
- Sem parallax, sem scroll hijacking, sem contadores animados, sem bounce.
- `prefers-reduced-motion: reduce` desliga tudo e entrega o conteúdo estático. Obrigatório.

### 3.5 O ponto como sistema

A variante empilhada da logo abre com um ponto (`.be`). Esse ponto vira elemento do sistema:
bullet das listas, marcador de seção ativa na navegação, e separador no rodapé. Custa nada e
amarra o site à marca.

---

## 4. Arquitetura da página

Sete blocos, nesta ordem. Cada um com um único trabalho.

### 4.1 Hero

Wordmark no canto superior esquerdo. Navegação âncora à direita, em `label`. Abaixo, a
headline em `display`, ocupando colunas 1–9 (assimetria proposital: a coluna 10–12 fica
vazia, e o vazio é o elemento).

A headline carrega o conceito da marca e **uma** palavra recebe o gradiente. Direção de copy
a validar com o cliente:

> Sua marca não precisa de mais alcance.
> Precisa de ser **reconhecida**.

Abaixo: uma linha de `lead` com o que a Beicon faz, e um link de contato. Sem botão grande,
sem badge, sem "role para baixo".

Altura: `min-height: 88vh` — respira sem forçar viewport cheia.

### 4.2 `/POSICIONAMENTO`

Rótulo nas colunas 1–2, texto nas 4–10. Dois a três parágrafos curtos em `lead`. É onde a
Beicon diz no que acredita — não o que vende. Esse bloco é o que separa agência de
fornecedor.

### 4.3 `/SERVIÇOS`

O núcleo informacional. Lista numerada `01`–`05`, cada item em linha própria separada por
filete, no padrão: número (col 1) · título em `h3` (col 2–5) · descrição em `body` (col 7–11).

| Nº | Serviço | Escopo |
|---|---|---|
| 01 | Identidade digital | Naming, marca, sistema visual, manual de aplicação |
| 02 | Presença e conteúdo | Social, linha editorial, criativos, calendário |
| 03 | Performance | Tráfego pago, funil, otimização de conversão |
| 04 | Web | Sites, landing pages, infraestrutura de captação |
| 05 | Estratégia | Diagnóstico, posicionamento, plano de marketing |

Lista final a confirmar com o cliente. Cada item expande em hover revelando uma linha extra —
progressive disclosure sem acordeão, mantendo a página escaneável.

### 4.4 `/MÉTODO`

Quatro etapas em grid horizontal no desktop, empilhadas no mobile. Numeradas, com uma frase
cada. Proposta: **Diagnóstico → Direção → Execução → Medição**.

Esse bloco existe para responder a pergunta que todo cliente de agência tem e não faz: *como
é trabalhar com vocês?*

### 4.5 `/RESULTADOS`

Bloco em fundo `--surface-dark` — a única inversão da página, e por isso o momento de maior
impacto visual. Três a quatro números grandes em `h2`, com legenda em `label`.

Se ainda não houver dados de cases, este bloco entrega **prova alternativa**: segmentos
atendidos, tempo de mercado, número de marcas desenvolvidas. Um número honesto vale mais que
um depoimento genérico.

*Dependência de conteúdo: precisa de dados reais do cliente. Ver seção 6.*

### 4.6 `/CONTATO`

Formulário mínimo — **nome, e-mail/WhatsApp, mensagem**. Três campos, nada mais. Cada campo
extra custa conversão, e a qualificação acontece na conversa, não no formulário.

Ao lado, contato direto: WhatsApp, e-mail, Instagram. Muita gente não preenche formulário e
vai direto — precisa ter para onde ir.

Headline do bloco em `display`, tratando o contato com o mesmo peso visual do hero.

### 4.7 Rodapé

Wordmark na variante empilhada, âncoras de navegação, redes, CNPJ e cidade. Filete superior.
Discreto.

---

## 5. Stack técnica

| Camada | Escolha | Razão |
|---|---|---|
| Framework | **Next.js 15**, App Router, TypeScript | O repositório já nasceu de `create-next-app`; mantém a convenção do entorno |
| Estilo | **Tailwind CSS v4** com tokens em `@theme` | Os tokens da seção 3 viram uma fonte única de verdade em CSS |
| Fontes | `next/font/local` com os `.otf` do pacote | Autohospedado, sem requisição externa, sem CLS |
| Formulário | Route Handler + **Resend** | Sem backend próprio; e-mail direto para a agência |
| Anti-spam | Honeypot + rate limit por IP | Sem CAPTCHA, que custa conversão |
| Deploy | **Vercel** | Zero config para Next, preview por branch |
| Analytics | Vercel Analytics ou Plausible | Sem cookie banner, sem GA4 |

Alternativa considerada e descartada: **Astro** entregaria menos JavaScript numa página
única, mas o custo de sair da convenção do repositório não se paga num site deste tamanho.

**Orçamento de performance** (alvos, medidos em Lighthouse mobile):

- LCP < 1,8s · CLS < 0,05 · JS inicial < 90KB gzip
- Lighthouse ≥ 95 em Performance, Acessibilidade, Best Practices e SEO

As quatro fontes autohospedadas são o maior peso da página. Mitigação: subsetting para
Latin + Latin Extended-A e `font-display: swap`. Se necessário, cortar os itálicos do
carregamento inicial.

**SEO e compartilhamento:** metadata via API do Next, JSON-LD de `Organization` +
`LocalBusiness`, `sitemap.xml`, `robots.txt`, e imagem OG gerada com a tipografia da marca
(`opengraph-image.tsx`).

**Acessibilidade — alvo WCAG 2.2 AA:**

- Regra do gradiente da seção 3.2 aplicada sem exceção
- Navegação completa por teclado com foco visível (anel de 2px em `--ink`, nunca só cor)
- Landmarks semânticos, um único `h1`, hierarquia de headings sem saltos
- Labels reais nos campos do formulário — placeholder não é label
- Erros de formulário anunciados via `aria-live`
- `prefers-reduced-motion` respeitado

---

## 6. O que precisa vir do cliente

O design está resolvido; o conteúdo é o caminho crítico. Sem estes itens o site não fecha:

| # | Item | Bloqueia |
|---|---|---|
| 1 | Logo em **SVG ou AI** (o PDF serve de referência, não de asset de produção) | Hero, rodapé, favicon |
| 2 | Lista final de serviços com uma frase de descrição cada | `/SERVIÇOS` |
| 3 | Texto de posicionamento, ou entrevista de 30min para eu redigir | `/POSICIONAMENTO` |
| 4 | Números reais de prova social, ou decisão de usar prova alternativa | `/RESULTADOS` |
| 5 | Dados de contato: WhatsApp, e-mail de destino, Instagram, CNPJ, cidade | `/CONTATO`, rodapé |
| 6 | Domínio e acesso ao DNS | Deploy |
| 7 | **Licença web da Neue Montreal** (Pangram Pangram) | Publicação — ver seção 8 |

Itens 1 e 5 bloqueiam o início. Os demais podem ser preenchidos com conteúdo provisório
durante o desenvolvimento.

---

## 7. Fora de escopo

Registrado para evitar ruído depois:

- Blog, CMS ou qualquer área de conteúdo editável pelo cliente
- Páginas internas de case
- Multi-idioma
- Área logada, portal do cliente, integração com CRM
- E-commerce ou checkout
- Produção de fotografia e vídeo
- Redesenho da identidade visual — o site **aplica** a marca existente, não a revisa

Qualquer um destes entra como escopo adicional, com novo prazo.

---

## 8. Riscos e decisões registradas

**Licença da fonte.** O pacote fornecido traz `Befonts-License.txt` com o texto
`License: Demo / Trial`, apontando para befonts.com. Neue Montreal é fonte comercial da
Pangram Pangram. Uma webfont fica publicamente baixável no servidor, o que torna esse o uso
mais exposto possível de um arquivo de avaliação.

Levantei o ponto e o cliente optou por seguir com a Neue Montreal do arquivo. O escopo segue
com ela. **A licença web precisa ser adquirida antes da publicação** — não antes do
desenvolvimento, já que a troca é a substituição de arquivos num único módulo de fonte e não
afeta layout nem cronograma. Fica registrado como pendência de publicação, sob decisão do
cliente.

**Prova social ausente.** Se não houver números reais, `/RESULTADOS` perde força. Mitigação
já prevista em 4.5. Decisão necessária antes de fechar o conteúdo.

**Logo só em PDF.** PDF não é asset de produção para web. Sem o vetor, o wordmark precisa ser
reconstruído em tipografia viva — viável, já que a logo é tipográfica, mas o espacejamento
original se perde. O SVG é o caminho certo.

---

## 9. Sequência de entrega

| Fase | Entrega | Depende de |
|---|---|---|
| 1 | Setup do projeto, tokens de design, carregamento de fontes | Itens 1 e 7 |
| 2 | Sistema tipográfico e grid, validados numa página de estilo | Fase 1 |
| 3 | Hero e rodapé | Fase 2, item 1 |
| 4 | `/POSICIONAMENTO`, `/SERVIÇOS`, `/MÉTODO` | Itens 2 e 3 |
| 5 | `/RESULTADOS`, `/CONTATO` com envio funcionando | Itens 4 e 5 |
| 6 | Motion, responsivo, auditoria de acessibilidade | Fases 3–5 |
| 7 | SEO, imagem OG, orçamento de performance | Fase 6 |
| 8 | Deploy, DNS, analytics | Item 6 |

As fases 3–5 são independentes entre si depois que a fase 2 fecha, e podem ser paralelizadas.

---

## 10. Referências

- `marcados.me` — Neue Haas Grotesk contra Times New Roman, preto sobre branco,
  rótulos com barra. A execução mais direta do estilo aplicado a um site brasileiro.
- Josef Müller-Brockmann, *Grid Systems in Graphic Design* — a fonte do sistema de grid.
- Emil Ruder, *Typographie* — a fonte do tratamento de espaço em branco como elemento ativo.

---

## 11. Adendo — 2026-09-18: briefing do cliente e arquitetura final

O cliente entregou um briefing completo de copy e estrutura (transcrito na íntegra em
`docs/superpowers/specs/2026-09-18-beicon-briefing-cliente.md`) que diverge da arquitetura da
seção 4 em pontos concretos: header fixo com botão, dois CTAs cheios no hero, cards
genéricos, uma seção de dores, uma seção de metodologia (NAVE), uma seção de cases, e um
formulário de 5 campos — contra a lista mínima de 3 campos da seção 4.6.

Decisão do cliente (registrada em conversa): **híbrido**. O conteúdo e a lista de seções do
briefing valem como estão — nada é cortado. O sistema visual da seção 3 (tipografia, cor,
grid, movimento, o ponto) continua valendo sem exceção. Onde os dois colidem, o sistema
visual da seção 3 vence a forma, nunca o conteúdo.

Isso resolve em regras concretas:

- **Sem header fixo.** Wordmark + navegação ficam no topo do hero, como na seção 4.1. A
  âncora ativa ganha o marcador de ponto (seção 3.5) ao invés de sticky bar.
- **CTAs do hero viram links sublinhados**, não botões cheios — mesmo tratamento de hover da
  seção 3.4. O botão cheio (com gradiente, um dos três usos do orçamento de cor da seção 3.2)
  fica reservado para o submit do formulário de contato, que é uma ação transacional real,
  não navegação.
- **Cards genéricos viram lista numerada com filete**, o mesmo padrão de `/SERVIÇOS` na seção
  4.3 — número · título em `h3` · corpo em `body`, expansível em hover. Aplica-se à seção de
  dores e à grade de serviços do briefing.
- **A tabela de metodologia NAVE vira o layout de `/MÉTODO`** da seção 4.4 — grid horizontal
  no desktop, empilhado no mobile, mas com as quatro letras N·A·V·E no lugar dos números.
- **`/RESULTADOS` (seção 4.5) é substituído por `/CASES`.** O briefing não trouxe números de
  prova social; trouxe um pedido explícito de espaço para cases. Sem cases reais ainda, o
  bloco usa o mesmo princípio de "prova alternativa" da seção 4.5: placeholders editoriais,
  claramente marcados como conteúdo a substituir, no fundo invertido `--surface-dark` para
  preservar o único momento de inversão da página.
- **O formulário de contato passa a ter 5 campos** (nome, empresa, e-mail, WhatsApp, e um
  `select` de objetivo) — a regra "três campos, nada mais" da seção 4.6 é superada pelo
  pedido explícito do cliente. Os campos mantêm label real, foco visível e erro em
  `aria-live`, como manda a seção 5.

### Arquitetura final da página (substitui a seção 4)

| # | Bloco | Âncora | Origem |
|---|---|---|---|
| 1 | Hero | — | Briefing (copy) + seção 4.1 (forma) |
| 2 | Dores | `#dores` | Briefing, estilizado como lista numerada 01–03 |
| 3 | Serviços | `#servicos` | Briefing (4 itens), estilizado como lista numerada 01–04 |
| 4 | Método NAVE | `#metodo` | Briefing (tabela → grid de 4 etapas da seção 4.4) |
| 5 | Sobre / Manifesto | `#sobre` | Briefing, estilizado como `/POSICIONAMENTO` (seção 4.2) |
| 6 | Cases | `#cases` | Briefing, fundo invertido, placeholders editoriais |
| 7 | Contato | `#contato` | Briefing (5 campos) + seção 4.6 (acessibilidade, contato direto) |
| 8 | Rodapé | — | Seção 4.7 + copyright do briefing |

Navegação do hero: `Início · Serviços · Sobre · Cases · Contato` (rótulos do briefing,
mapeados às âncoras acima; "Dores" e "Método" não entram na navegação, só no fluxo de
leitura, como o briefing pediu).

---

## 12. Adendo — 2026-09-19: logo real aplicada, cores confirmadas por amostragem

O cliente pediu explicitamente para usar a logo real (não a reconstrução tipográfica da
seção 8) e extrair as cores dela. Sem ferramentas de conversão de PDF no ambiente
(`pdftocairo`/`mutool`/`ghostscript` indisponíveis), o PDF foi rasterizado via Quick Look do
macOS (`qlmanage -t -s 3000`), que usa o mesmo motor de renderização do Preview e produz uma
imagem a 3000px de altura, fiel ao vetor original — muito acima do que a extração manual de
streams `zlib` da sessão anterior havia conseguido.

**Os quatro lockups da marca foram recortados com transparência real** (detecção de
componente conexo + máscara por distância de cor, não apenas *crop* retangular) e ficam em
`public/logo/`:

| Arquivo | Variante | Uso |
|---|---|---|
| `beicon-horizontal-dark-text.png` | Horizontal, texto escuro | Hero (fundo claro) |
| `beicon-horizontal-light-text.png` | Horizontal, texto claro | Reserva para fundo escuro |
| `beicon-stacked-dark-text.png` | Empilhada (com o ponto), texto escuro | Rodapé, conforme seção 4.7 |
| `beicon-stacked-light-text.png` | Empilhada, texto claro | Reserva para fundo escuro |

`Hero.tsx` e `Footer.tsx` foram atualizados para renderizar essas imagens via `next/image`
em vez da wordmark reconstruída em tipografia viva. A reconstrução tipográfica registrada na
seção 8 fica obsoleta a partir deste adendo.

**Cores corrigidas por amostragem direta do asset** (mediana de pixels internos às hastes das
letras, após erosão para descartar anti-aliasing; validado batendo a mesma amostra nas
variantes clara e escura — bateram exatas):

| Token | Valor anterior (seção 3.2) | Valor medido | Nota |
|---|---|---|---|
| `--accent-from` | `#AF85A9` | `#BA82AA` | ~2% de diferença — a extração anterior vinha de um render de baixa resolução |
| `--accent-to` | `#D3718D` | `#DF6D90` | idem |
| `--accent-solid` | `#C47B9B` | `#CC779D` | ponto médio dos dois acima |
| `--ink-muted` | `#4D4D4D` | `#4D4E4C` | confirmado, diferença despre­zível |
| `--on-dark-muted` | `#CBCCCB` | `#CBCCCB` | confirmado, valor exato |
| `--surface-dark` | `#343534` | `#343534` | confirmado, valor exato |

Contraste recalculado com os valores medidos: `#BA82AA` sobre branco 3,06:1; `#DF6D90` sobre
branco 3,12:1; ambos sobre `--surface-dark` acima de 3,9:1. O veredito da seção 3.2 não muda
— **AA apenas para texto grande, gradiente continua display-only**.

`globals.css` foi atualizado com os três tokens de acento corrigidos. Nenhuma outra mudança
de token foi necessária.

---

## 13. Adendo — 2026-09-19: integração do componente shadcn `hero-section-shadcnui`

O cliente pediu para integrar um componente de hero da comunidade (`hero-section-shadcnui`,
via `@21st-dev/cli`, registro shadcn/ui) no lugar do Hero atual. O componente de referência,
como veio, usa layout **centralizado**, **dois botões cheios**, um badge pill ("New Features
Available") e uma fileira de estatísticas fictícias ("10k+ Downloads") — quatro elementos que
colidem com regras não-negociáveis já registradas (seção 3.1: nunca centralizado; adendo da
seção 11: CTAs do hero são links sublinhados, não botões cheios) ou não têm conteúdo real
correspondente no briefing do cliente (badge e estatísticas foram descartados, não
adaptados — não existe dado real para preenchê-los).

**O que foi de fato integrado:**

- `src/lib/utils.ts` (`cn()`) e `src/components/ui/button.tsx` — a estrutura de projeto
  shadcn (`components/ui` como path padrão de primitivos, separado de
  `src/components/*.tsx`, que segue a convenção já estabelecida para as seções de página).
  O `Button` foi restilizado para usar os tokens da seção 3.2 (`--ink`, `--gradient`, etc.)
  em vez da paleta padrão do shadcn (`--primary`, `--background`), que não existe neste
  projeto — não rodei `npx shadcn init`, que reescreveria `globals.css` com o sistema de
  variáveis do shadcn e entraria em conflito direto com os tokens já aprovados.
- `framer-motion` — a animação de entrada em stagger do componente de referência foi trazida
  para o Hero (`tag → headline → lead → CTAs`), com o mesmo timing já definido na seção 3.4
  (`420ms`, `cubic-bezier(0.16,1,0.3,1)`) em vez do `easeOut` genérico do original. Respeita
  `prefers-reduced-motion` via `useReducedMotion()` do framer-motion — a técnica CSS global
  usada pelo `Reveal` não cobre animações orientadas por JS, então esta é tratada à parte.
- `lucide-react` — ícone `ArrowRight` no CTA primário do hero, com leve deslocamento no
  hover. É o único elemento visual novo do componente de referência que não conflita com
  nenhuma regra.
- Os CTAs continuam como links sublinhados, agora renderizados via
  `<Button asChild variant="link">` — o componente Button do shadcn foi genuinamente
  integrado (variant `link`, sem preenchimento), só não do jeito que o componente de
  referência propunha (`variant="default"`/`"outline"`, ambos preenchidos).

**O que não foi copiado:** o arquivo `hero-section-shadcnui.tsx` e o `demo.tsx` fornecidos
não foram salvos como arquivos soltos no repositório. Copiá-los literalmente deixaria código
morto com conteúdo fictício em inglês, sem nenhum lugar que os importasse — o padrão de
interação deles foi absorvido diretamente em `Hero.tsx`, que é o único Hero renderizado pela
página.

**Custo de performance, registrado.** `framer-motion` tem peso real (a API completa `motion`
usada aqui soma dezenas de KB gzip). Isso disputa espaço com o orçamento de **JS inicial
< 90KB gzip** da seção 5. Se o orçamento apertar na auditoria do Lighthouse (fase 7 da seção
9), a mitigação é trocar para o padrão `LazyMotion` + `m` do framer-motion, que carrega só os
recursos de animação usados — troca local, sem mudar a API do componente.

---

## 14. Adendo — 2026-09-19: Hero adotou o estilo centralizado do componente de referência

O cliente pediu explicitamente para usar o estilo do `hero-section-shadcnui` como veio —
centralizado, com badge e botões preenchidos —, não a versão adaptada ao grid assimétrico do
adendo 13. Isso **substitui** a decisão do adendo 13 sobre alinhamento e CTAs: a partir deste
adendo, a regra "nunca centralizado" da seção 3.1 e "CTAs do hero são links sublinhados" do
adendo 11 **não se aplicam ao Hero** — ficam valendo para o restante da página (Dores,
Serviços, Método, Sobre, Cases, Contato continuam com o grid assimétrico e sem botões
cheios).

**O que mudou em `Hero.tsx`:**

- Conteúdo centralizado (`items-center text-center`), com a barra de logo + navegação
  mantida no topo, sem centralizar (não fazia parte do componente de referência, que não
  tinha navegação).
- `hero.tag` virou badge pill (borda + fundo suave + ícone `Sparkles`), estilizado com os
  tokens do projeto (`--line`, `--ink-muted`), não com o `white/10` do original — que
  pressupunha fundo escuro.
- Os dois CTAs viram botões preenchidos de verdade: primário usa a variante `default` do
  `Button` (preenchimento sólido em `--ink`, não gradiente — para não estourar o orçamento de
  3 usos do gradiente da seção 3.2, já ocupado por palavra do hero + letras do NAVE + submit
  do contato), secundário usa `variant="outline"`.
- A fileira de estatísticas fictícias ("10k+ Downloads" etc.) do componente de referência
  **não entrou** — não há números reais da Beicon disponíveis (mesma pendência da seção 6,
  item 4) e inventar valores seria conteúdo falso num site real. Se o cliente quiser essa
  fileira, ela pode entrar com o mesmo tratamento de "prova alternativa" já usado em
  `/CASES`.

---

## 15. Adendo — 2026-09-19: avaliado `hero-3` (AnimatedMarqueeHero), integrada só a animação por palavra

O cliente indicou outro componente do 21st.dev, `ravikatiyar162/hero-3` — um hero em tela
cheia com badge, título animado palavra por palavra, botão vermelho (`bg-red-500`) e um
carrossel infinito de fotos giradas no rodapé do hero.

**O que entrou:** a técnica de stagger por palavra no título (`headlineWords`, split de
`headlinePre` + `headlineAccent` + `headlinePost`), com `staggerChildren: 0.05` por palavra —
mais granular que o stagger por bloco usado até aqui. Mantém a curva de easing já definida
(`cubic-bezier(0.16,1,0.3,1)`, `EASE`), não a física de mola do componente original — a
regra "sem bounce" da seção 3.4 continua valendo.

**O que não entrou, e por quê:**

- **Botão vermelho.** `#EF4444`/`bg-red-500` não existe em nenhum lugar da paleta da Beicon
  (seção 3.2) e não tem relação com o gradiente da marca. Os CTAs continuam com o `Button`
  já reconciliado no adendo 14 (primário sólido em `--ink`, secundário `outline`).
- **Carrossel de fotos.** O componente de referência vem com 16 URLs de imagens de banco
  (`cdn.21st.dev/assets/mirror/...`), sem relação nenhuma com a Beicon. A seção 7 do spec
  já lista "Produção de fotografia e vídeo" como fora de escopo — usar fotos de estoque
  genéricas no hero seria conteúdo fabricado num site real. Se o cliente fornecer fotografia
  própria, esse padrão de carrossel (`marquee` horizontal infinito, `mask-image` nas bordas)
  fica registrado aqui como referência pronta para reaproveitar.

---

## 16. Adendo — 2026-09-19: `hero-3` integrado por completo, a pedido explícito do cliente

O cliente pediu, de forma direta e repetida, para usar o componente inteiro do adendo 15 —
não só a técnica de animação. Isso substitui as ressalvas de estilo daquele adendo:

- **Botão vermelho entrou como pedido** (`bg-red-500`/`hover:bg-red-600`, `rounded-full`,
  `shadow-lg`), aplicado só ao CTA primário do hero. O CTA secundário continua neutro
  (`outline`) — o componente de referência só tinha um botão; mantivemos os dois porque
  ambos têm conteúdo real do briefing (diagnóstico vs. conhecer serviços).
- **O carrossel de imagens entrou como mecanismo** (faixa animada no rodapé do hero, `mask-
  image` de fade nas bordas, loop infinito), mas **sem as fotos do componente original** —
  aquelas eram assets de demonstração do próprio 21st.dev (`cdn.21st.dev/assets/mirror/...`),
  não licenciados para uso comercial da Beicon e haveria o risco de sumirem do ar a qualquer
  momento por não estarmos hospedando cópia própria. No lugar das fotos, os cartões do
  carrossel usam o gradiente da marca (`--gradient`) em opacidades variadas — mantém o efeito
  visual do componente sem fabricar "fotos de cliente" que não existem. Quando o cliente
  enviar fotografia real, é só trocar o `background` desses `div` por `<Image>` apontando
  pros arquivos.

**Bug encontrado e corrigido durante a integração:** mover a classe `.container-grid` para
dentro de um item flex (a barra logo+navegação) expôs que `margin-inline: auto` sem
`width: 100%` explícito faz o item encolher para o tamanho do conteúdo em vez de esticar —
comportamento padrão do flexbox quando margens automáticas estão presentes no eixo cruzado
(suprime o `stretch`). Corrigido na própria classe em `globals.css`, não só no caso local —
protege qualquer uso futuro de `.container-grid` dentro de um contêiner flex.

---

## 17. Adendo — 2026-09-19: Cases/Portfólio virou grid de cards, apresentando os serviços

O cliente pediu para levar o tratamento visual dos cards do carrossel do Hero (adendo 16)
para a seção `/CASES`, usando-a para "passar os serviços" — mostrar as frentes de atuação da
Beicon de forma mais visual que a lista provisória de "Case a confirmar".

`Cases.tsx` passou de uma lista de três placeholders textuais para um grid de cards
(`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`), um por item de `servicos.items` — reaproveita
conteúdo real já existente (título + descrição de cada serviço) em vez de inventar nomes de
case. Cada card: painel `aspect-[4/3]` no gradiente da marca (mesmo padrão dos cartões do
Hero, opacidade variando por índice), número, título e descrição do serviço.

A nota de "conteúdo provisório" continua, reformulada para refletir o que de fato falta —
fotografia real dos projetos, não os nomes/descrições dos serviços, que já são reais:
"Imagens de projetos reais em breve — os cards abaixo representam nossas frentes de atuação."

`/SERVIÇOS` continua existindo como está (lista numerada com entregáveis) — este grid não a
substitui, é a versão visual/resumida da mesma informação, num contexto de prova de
portfólio.

---

## 18. Adendo — 2026-09-19: Hero volta ao estilo `hero-section-shadcnui`, com fileira de estatísticas

O cliente pediu para reverter o Hero ao componente do adendo 13/14 — removendo o botão
vermelho e o carrossel do adendo 16 — e desta vez incluir a fileira de estatísticas que
havia ficado de fora.

Mudanças em `Hero.tsx`:

- Removidos: botão vermelho (`bg-red-500`), carrossel de cards (`marqueeItems`,
  `duplicatedMarquee`, a faixa `absolute bottom-0`).
- CTA primário volta a usar a variante `default` do `Button` (preenchimento sólido em
  `--ink`), CTA secundário continua `outline`. Nenhum dos dois usa gradiente — orçamento de
  cor da seção 3.2 permanece: hero word + letras do NAVE + submit do contato.
- Fileira de estatísticas adicionada abaixo dos CTAs, três itens: Segmentos atendidos,
  Tempo de mercado, Marcas desenvolvidas — exatamente os três itens que a seção 4.5 já havia
  previsto como "prova alternativa" quando não há números reais. Como o item 4 da seção 6
  (números reais de prova social) segue pendente do cliente, os valores aparecem como
  travessão (`—`) com a nota "Números reais em breve" abaixo — mesmo princípio de honestidade
  do placeholder já usado em `/CASES` (adendo 17), não números fabricados.
- Título por palavra (adendo 15) e o `min-h-dvh` com centralização real (correção anterior)
  permanecem — nenhum dos dois veio do componente de referência, mas resolveram problemas
  reais e não têm motivo para sair.

---

## 19. Adendo — 2026-09-19: Cases volta a ser carrossel animado, igual ao do Hero

O cliente pediu para os cards do Portfólio usarem a mesma animação que os cards do Hero
tinham no adendo 16 (removidos do Hero no adendo 18) — loop infinito, não o grid estático do
adendo 17.

`Cases.tsx` virou client component (`"use client"`, `framer-motion`) e usa exatamente o
mesmo mecanismo do carrossel do Hero: array de `servicos.items` duplicado para loop sem
costura, `animate={{ x: ["0%","-50%"] }}` linear, `duration: 40`, `repeat: Infinity`,
`useReducedMotion()` desativando a animação. Uma diferença deliberada: a máscara de fade do
Hero era vertical (`to_bottom`), porque lá o carrossel era decoração atrás do conteúdo
centralizado; aqui os cards **são** o conteúdo principal da seção, então o fade é horizontal
(`to_right`, nas bordas esquerda/direita) — copiar o fade vertical cortaria o texto dos
cards.

Cada card ganhou um scrim (`bg-gradient-to-t from-black/70`) para o número e o título do
serviço ficarem legíveis sobre o gradiente da marca — os cards do Hero eram decorativos, sem
texto, então não precisavam disso.

---

## 20. Adendo — 2026-09-19: nova seção `/PARCEIROS` — BemTV

O cliente pediu para adicionar ao menu uma seção sobre a BemTV, empresa parceira da Beicon
focada em publicidade para televisão.

**Arquivos novos:** `src/components/Parceiros.tsx`, bloco `parceiros` em `content.ts`.
**Arquivos alterados:** `nav` em `content.ts` (novo item entre Sobre e Cases), `page.tsx`
(seção inserida na mesma posição).

Segue exatamente o padrão visual de `/SOBRE` (label col 1–2, texto col 4–10, sem numeração,
sem grade de itens) — é a seção mais próxima em função: contexto institucional, não uma
listagem. Âncora `#parceiros`, item de nav "Parceiros" entre "Sobre" e "Cases".

**Pendente do cliente**, sinalizado com a mesma nota de conteúdo provisório já usada em
`/CASES`: logo da BemTV e link oficial (site ou perfil) — o texto atual descreve a parceria
em termos gerais (Beicon cuida de estratégia/marca/digital, BemTV leva a marca pra TV), sem
detalhes específicos que só o cliente pode fornecer.

---

## 21. Adendo — 2026-09-19: página dedicada `/parceiros` para a BemTV

O cliente pediu para manter a seção da BemTV resumida na home, mas com um link para mais
informações numa página separada.

**Arquivo novo:** `src/app/parceiros/page.tsx` — rota estática própria, fora do fluxo de
uma página. Reaproveita `SectionLabel`, `Reveal` e `Footer` (agora com prop `basePath`, ver
abaixo); cabeçalho próprio e mais simples que o do Hero (sem menu mobile, sem navegação
completa — só a logo linkando para `/` e um "Voltar para a Beicon Mkt").

Estrutura: tag + título em `display` + lead (mesmo tratamento do Hero), depois duas seções em
lista numerada ("O que a BemTV faz", "Como funciona a parceria") no mesmo padrão de
`/SERVIÇOS`, nota de conteúdo pendente, CTA de volta.

**`Footer` ganhou a prop `basePath`** (default `""`, a página inicial passa vazio, esta
página passa `"/"`) — os links de navegação do rodapé são âncoras (`#servicos` etc.) que só
funcionam na própria página inicial; em `/parceiros` eles precisam virar `/#servicos` para
primeiro navegar de volta à home. Sem essa mudança, clicar em "Serviços" no rodapé desta
página não faria nada.

Home: `Parceiros.tsx` ganhou o link "Saiba mais sobre a BemTV →" apontando para `/parceiros`,
via `next/link` (navegação interna, sem reload de página).

Conteúdo da página (`bemtvPage` em `content.ts`) é descritivo e genérico — nenhum dado
específico da BemTV (cases, canais, contato direto) foi inventado; a nota de placeholder
deixa isso explícito, mesmo padrão já usado no resto do site.
