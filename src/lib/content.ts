// Menu de navegação — usado no rodapé e no menu flutuante (Hero → liquid-morph-floating-menu)
export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Início", href: "#hero" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Cases", href: "#cases" },
  { label: "Contato", href: "#contato" },
];

// Seção Hero (topo do site) — tag, título com trecho em destaque (gradiente) e os 2 botões
export const hero = {
  tag: "Estratégia, Design & Execução Completa",
  // O título final é montado em Hero.tsx juntando headlinePre + headlineAccent + headlinePost.
  // Só o texto de headlineAccent recebe o gradiente rosa/roxo da marca.
  headlinePre: "Ajudamos a sua empresa a organizar a comunicação e a encontrar o ",
  headlineAccent: "caminho certo",
  headlinePost: " para crescer.",
  lead:
    "Sabemos como pode ser desgastante tentar alinhar estratégia, visual, redes sociais e anúncios sem ter uma equipe dedicada. Na Beicon Mkt, caminhamos ao seu lado: do diagnóstico inicial até a execução diária do seu projeto.",
  ctaPrimary: { label: "Solicitar diagnóstico gratuito", href: "#contato" },
  ctaSecondary: { label: "Conhecer nossos serviços", href: "#servicos" },
};

// Formato genérico "número + título + texto" usado pela seção Dores
export type ListItem = { n: string; title: string; body: string };

// Seção "Dores" — os problemas/cenários que a empresa-cliente pode estar vivendo
export const dores = {
  label: "Dores",
  title: "Gerir um negócio já é complexo. A sua comunicação não precisa ser mais um problema.",
  // Cada item vira um card em Dores.tsx (grid de 3 colunas, o 4º item quebra para a linha de baixo)
  items: [
    {
      n: "01",
      title: "Desconexão na equipe",
      body: "A empresa contrata profissionais diferentes — designers, gestores de tráfego, criadores de conteúdo — mas ninguém conversa entre si ou entende profundamente o produto e os objetivos do negócio.",
    },
    {
      n: "02",
      title: "Presença digital sem direção",
      body: "A empresa publica constantemente, mas sente que está apenas \"postando por postar\", sem uma estratégia clara e sem conteúdos que realmente representem o valor da marca.",
    },
    {
      n: "03",
      title: "Comunicação abaixo da qualidade real",
      body: "O produto ou serviço é excelente, mas a imagem apresentada no ambiente digital ainda não transmite o mesmo nível de qualidade.",
    },
    {
      n: "04",
      title: "Anúncios sem retorno claro",
      body: "A empresa investe em tráfego pago, mas recebe contatos desqualificados, pessoas interessadas apenas em preço e clientes que não percebem o verdadeiro valor da solução.",
    },
  ] satisfies ListItem[],
  // Frase de fechamento mostrada depois dos 4 cards
  closing:
    "Se você se identificou com algum desses pontos, o problema não é o seu produto. É a falta de uma estratégia estruturada.",
};

// ListItem + o texto que só aparece no hover (o que está incluso na entrega)
export type ServiceItem = ListItem & { deliverables: string };

// Seção "Serviços" — lista de 5 serviços; body = frase curta, deliverables = detalhe que abre no hover
export const servicos = {
  label: "Serviços",
  title: "Estratégia + Execução: tudo o que a marca precisa em um só lugar",
  items: [
    {
      n: "01",
      title: "Diagnóstico & Estratégia de Marca",
      body: "Para empresas que precisam de clareza antes de investir.",
      deliverables:
        "Realizamos um diagnóstico aprofundado da empresa utilizando o Método NAVE, definindo posicionamento, direcionamento estratégico e comunicação.",
    },
    {
      n: "02",
      title: "Identidade Visual & Design",
      body: "Para empresas que precisam transmitir profissionalismo e consistência.",
      deliverables:
        "Desenvolvemos logotipos, universos visuais, materiais corporativos e direção de arte para construir uma identidade visual alinhada à essência e ao posicionamento da marca.",
    },
    {
      n: "03",
      title: "Gestão de Redes Sociais & Mídia Social",
      body: "Para empresas que querem manter uma presença digital relevante e consistente.",
      deliverables:
        "Desenvolvemos planejamento editorial, textos, peças visuais e organização do calendário de conteúdo.",
    },
    {
      n: "04",
      title: "Desenvolvimento Web & UI/UX",
      body: "Para empresas que precisam de uma presença digital própria, rápida e organizada.",
      deliverables:
        "Criamos sites institucionais e landing pages com foco em clareza, experiência do usuário e apresentação profissional da marca.",
    },
    {
      // Atenção: este número ("05") também é usado em Cases.tsx (photoByServiceNumber)
      // para escolher a foto do carrossel — se adicionar/remover um serviço, atualize os dois arquivos.
      n: "05",
      title: "Tráfego Pago & Campanhas",
      body: "Para empresas que querem ampliar o alcance da sua comunicação.",
      deliverables:
        "Realizamos configuração, gerenciamento e acompanhamento de campanhas de anúncios em plataformas como Google Ads, Meta Ads e TikTok Ads.",
    },
  ] satisfies ServiceItem[],
};

// Seção "Método NAVE" — as 4 letras (Negócio, Audiência, Valor, Estória) viram colunas em Metodo.tsx
export const metodo = {
  label: "Método",
  title: "Um processo investigativo e organizado para não trabalharmos no escuro.",
  lead: "Antes de desenvolver qualquer peça visual, conteúdo ou campanha, a Beicon Mkt utiliza o Método NAVE para compreender a base estratégica da marca.",
  steps: [
    { letter: "N", title: "Negócio", body: "Analisamos profundamente a estrutura da empresa, seus objetivos, desafios, modelo de negócio e necessidades reais de crescimento." },
    { letter: "A", title: "Audiência", body: "Mapeamos o cliente ideal, suas necessidades, desejos, dificuldades e os fatores que influenciam sua decisão." },
    { letter: "V", title: "Valor", body: "Identificamos e estruturamos a Proposta Única de Valor da empresa, buscando posicionar a marca com clareza e evitar uma comunicação baseada apenas em preço." },
    { letter: "E", title: "Estória", body: "Construímos a narrativa, a identidade e a comunicação capazes de gerar identificação e criar relações de confiança com o público." },
  ],
};

// Seção "Sobre" — cada string do array vira um parágrafo (Sobre.tsx apenas faz .map)
export const sobre = {
  label: "Sobre",
  title: "Da estratégia ao operacional. Sem complicações.",
  paragraphs: [
    "Acreditamos que uma boa parceria de comunicação se constrói com escuta ativa, clareza e compromisso com aquilo que é feito.",
    "Não nos limitamos a entregar relatórios teóricos ou produzir peças isoladas sem contexto.",
    "A Beicon Mkt existe para ser o braço direito da empresa: entender o negócio, estruturar a estratégia através do Método NAVE e transformar essa estratégia em execução.",
    "Trabalhamos em diferentes frentes da comunicação, do design ao desenvolvimento web, do conteúdo aos anúncios, sempre buscando manter uma visão integrada da marca.",
    "Nosso objetivo é proporcionar segurança, clareza e consistência em cada etapa do caminho.",
  ],
};

export type CasePlaceholder = { client: string; summary: string };

// Seção "Cases" — carrossel com fotos de banco de imagens (isPlaceholder: true = ainda não são cases reais)
export const cases = {
  label: "Cases",
  title: "Projetos e marcas que ajudamos a estruturar",
  lead: "Veja como ajudamos nossos clientes a transformarem seus posicionamentos e resultados.",
  isPlaceholder: true,
  // Estes 3 itens hoje não são usados no carrossel (Cases.tsx usa servicos.items) —
  // ficam aqui prontos para quando houver cases reais de clientes para mostrar.
  items: [
    { client: "Case a confirmar — 01", summary: "Espaço reservado para o primeiro case. Substituir por resultado real do cliente." },
    { client: "Case a confirmar — 02", summary: "Espaço reservado para o segundo case. Substituir por resultado real do cliente." },
    { client: "Case a confirmar — 03", summary: "Espaço reservado para o terceiro case. Substituir por resultado real do cliente." },
  ] satisfies CasePlaceholder[],
};

// Seção "Contato" — textos do formulário + os 3 contatos diretos mostrados embaixo dele
export const contato = {
  label: "Contato",
  title: "Pronto para elevar o nível do seu negócio?",
  lead: "Preencha o formulário abaixo e receba uma análise inicial sobre como podemos acelerar a sua marca.",
  submitLabel: "Enviar e agendar diagnóstico",
  // Opções do <select> "Qual o seu principal objetivo hoje?"
  objectives: [
    "Criar/reformular minha marca",
    "Vender mais com tráfego pago",
    "Criar um site/landing page",
    "Consultoria geral",
  ],
  // Pendente do cliente (spec §6 item 5) — placeholders funcionais, substituir antes do deploy.
  whatsapp: { label: "WhatsApp", href: "https://wa.me/5512997491373" },
  email: "contato@beiconmkt.com.br",
  instagram: { label: "Instagram", href: "https://instagram.com/beiconmkt" },
};

// Rodapé — links de contato/redes (reaproveita contato.*), copyright e crédito do desenvolvedor
export const footer = {
  copyright: "© 2026 Beicon Mkt. Todos os direitos reservados.",
  socials: [
    { label: "Instagram", href: contato.instagram.href },
    { label: "LinkedIn", href: "https://linkedin.com/company/beiconmkt" },
    { label: "WhatsApp", href: contato.whatsapp.href },
  ],
  dev: [
    { label: "Desenvolvido por alccode", href: "https://alccode.com.br" },
  ],
};
