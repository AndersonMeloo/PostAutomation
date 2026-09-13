import type { Dictionary } from "../types";

export const ptBR: Dictionary = {
  header: {
    navFeatures: "Recursos",
    navHowItWorks: "Como funciona",
    navPlatforms: "Plataformas",
    navFaq: "FAQ",
    login: "Entrar",
    signup: "Criar conta grátis",
  },
  hero: {
    kicker: "Automação de vídeos multi-plataforma",
    titleLine1: "Publique mais.",
    titleAccent: "Analise melhor.",
    subtitle:
      "Agende, publique e acompanhe o desempenho dos seus vídeos em um só lugar — com métricas detalhadas para Shorts e vídeos longos.",
    primaryCta: "Começar grátis",
    secondaryCta: "Ver como funciona",
    comingSoon: "Em breve",
    badges: [
      { id: "youtube", label: "YouTube", comingSoon: false },
      { id: "instagram", label: "Instagram", comingSoon: true },
      { id: "tiktok", label: "TikTok", comingSoon: true },
      { id: "scheduling", label: "Agendamento inteligente", comingSoon: false },
      { id: "metrics", label: "Métricas em tempo real", comingSoon: false },
      { id: "aiClip", label: "Cortes com IA", comingSoon: true },
    ],
  },
  platforms: {
    kicker: "Publique em",
    title: "Uma plataforma, todas as suas redes",
    items: [
      { name: "YouTube", status: "live" },
      { name: "Instagram", status: "soon" },
      { name: "TikTok", status: "soon" },
    ],
  },
  liveFeed: {
    kicker: "Veja funcionando",
    title: "Sua operação, em tempo real",
    subtitle:
      "Acompanhe cada publicação e atualização de métrica assim que ela acontece.",
    centerLabel: "PostAutomation",
    items: [
      {
        id: "publish",
        title: "Vídeo publicado no YouTube",
        subtitle: "Short agendado às 09:00",
        time: "agora",
      },
      {
        id: "metrics",
        title: "Métricas atualizadas",
        subtitle: "+1.240 visualizações na última hora",
        time: "2min",
      },
      {
        id: "aiClip",
        title: "Corte com IA gerado",
        subtitle: "Em breve",
        time: "5min",
      },
    ],
  },
  howItWorks: {
    kicker: "Como funciona",
    title: "Três passos para publicar em qualquer lugar",
    steps: [
      {
        number: "01",
        title: "Envie e agende",
        description:
          "Envie seu vídeo, escolha o formato (Shorts ou longo) e defina data e horário de publicação.",
      },
      {
        number: "02",
        title: "Publicamos por você",
        description:
          "No horário certo, seu vídeo é publicado automaticamente na plataforma escolhida.",
      },
      {
        number: "03",
        title: "Acompanhe o resultado",
        description:
          "Visualizações, curtidas, comentários e inscritos organizados em métricas fáceis de entender.",
      },
    ],
  },
  pillars: {
    kicker: "Dentro da plataforma",
    title: "Tudo o que você precisa para escalar seu canal",
    centerLabel: "Como funciona por dentro",
    items: [
      {
        number: "01",
        title: "Multi-plataforma",
        description:
          "Comece pelo YouTube hoje e leve o mesmo fluxo para Instagram e TikTok assim que estiverem disponíveis.",
        bullets: ["YouTube disponível", "Instagram — em breve", "TikTok — em breve"],
      },
      {
        number: "02",
        title: "Agendamento e publicação",
        description:
          "Defina data e horário e deixe a publicação acontecer sozinha, sem depender de você estar online.",
        bullets: ["Fila de publicação", "Shorts e vídeos longos", "Retentativa automática"],
      },
      {
        number: "03",
        title: "Edição básica",
        description:
          "Ajuste duração, corte trechos e escolha a thumbnail antes de publicar, direto na plataforma.",
        bullets: ["Corte de duração", "Thumbnail personalizada", "Prévia antes de publicar"],
      },
      {
        number: "04",
        title: "Métricas e análise",
        description:
          "Compare o desempenho entre vídeos e formatos, com visão diária, semanal, mensal ou por período.",
        bullets: ["Views, curtidas e comentários", "Comparação Shorts x vídeos longos", "Períodos personalizados"],
      },
    ],
  },
  metrics: {
    kicker: "Métricas",
    title: "Decisões guiadas por dados, não por achismo",
    subtitle:
      "Veja o que está funcionando e onde investir mais tempo, com métricas por vídeo e visão geral do canal.",
    stats: [
      { label: "Visualizações", value: "12.480" },
      { label: "Curtidas", value: "3.902" },
      { label: "Comentários", value: "614" },
      { label: "Inscritos ganhos", value: "287" },
    ],
  },
  cta: {
    title: "Comece a automatizar seus vídeos hoje",
    subtitle: "Crie sua conta gratuitamente e conecte seu canal do YouTube em minutos.",
    button: "Criar conta grátis",
  },
  faq: {
    kicker: "Dúvidas",
    title: "Perguntas frequentes",
    categories: [
      {
        label: "Primeiros passos",
        items: [
          {
            question: "Quanto tempo leva para configurar?",
            answer:
              "Poucos minutos: crie sua conta, conecte seu canal do YouTube e já pode agendar sua primeira publicação.",
          },
          {
            question: "Preciso instalar alguma coisa?",
            answer: "Não. O PostAutomation funciona direto no navegador, sem instalação.",
          },
        ],
      },
      {
        label: "Plataformas",
        items: [
          {
            question: "Quais plataformas são suportadas hoje?",
            answer: "O YouTube já está disponível. Instagram e TikTok estão em desenvolvimento.",
          },
          {
            question: "Quando Instagram e TikTok chegam?",
            answer:
              "Estamos trabalhando nas integrações. Assim que estiverem prontas, você será avisado dentro da plataforma.",
          },
        ],
      },
    ],
  },
  support: {
    label: "Suporte online",
    chatButton: "Falar com o suporte",
  },
  footer: {
    tagline: "Automação de publicação e análise de vídeos para criadores.",
    rights: "Todos os direitos reservados.",
  },
};
