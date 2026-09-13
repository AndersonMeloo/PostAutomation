import type { Dictionary } from "../types";

export const ptBR: Dictionary = {
  header: {
    navFeatures: "Recursos",
    navHowItWorks: "Como funciona",
    navPlatforms: "Plataformas",
    navFaq: "FAQ",
    login: "Entrar",
    signup: "Criar conta",
  },
  hero: {
    kicker: "Automação de vídeos multi-plataforma",
    titleLine1: "Publique mais.",
    titleAccent: "Analise melhor.",
    subtitle:
      "Agende, publique e acompanhe o desempenho dos seus vídeos em um só lugar — com métricas detalhadas para Shorts e vídeos longos.",
    primaryCta: "Criar conta",
    secondaryCta: "Ver como funciona",
    comingSoon: "Em breve",
    badgesCenterLabel: "Seu canal, no piloto automático",
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
    inputLabel: "Entrada",
    resultLabel: "Resultado",
    inputs: [
      { id: "youtube", label: "YouTube" },
      { id: "shorts", label: "Short" },
      { id: "longform", label: "Vídeo longo" },
      { id: "upload", label: "Novo envio" },
      { id: "schedule", label: "Agendamento" },
      { id: "instagram", label: "Instagram", comingSoon: true },
      { id: "tiktok", label: "TikTok", comingSoon: true },
    ],
    stages: [
      { id: "scheduling", label: "Agendando" },
      { id: "publishing", label: "Publicando" },
      { id: "metrics", label: "Analisando métricas" },
      { id: "aiClip", label: "Cortando com IA" },
    ],
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
        id: "schedule",
        title: "Novo agendamento criado",
        subtitle: "Publicação marcada para amanhã",
        time: "8min",
      },
      {
        id: "thumbnail",
        title: "Miniatura atualizada",
        subtitle: "Nova capa selecionada para o vídeo",
        time: "14min",
      },
      {
        id: "aiClip",
        title: "Corte com IA gerado",
        subtitle: "Em breve",
        time: "20min",
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
  benefits: {
    kicker: "Benefícios",
    title: "Cresça no YouTube sem mostrar o rosto",
    subtitle:
      "Grave, edite e publique Shorts em qualquer horário — enquanto sua conta cresce e caminha para a monetização no piloto automático.",
    chart: {
      caption: "Crie canal dark e faça postagens de #shorts",
      segments: [
        { label: "Shorts", percent: 45 },
        { label: "Vídeo longo", percent: 30 },
        { label: "Edição", percent: 25 },
      ],
    },
    anonymity: {
      caption: "Ganhe sem mostrar o rosto",
    },
    proof: {
      caption: "Edite seus vídeos e publique a hora que quiser",
      statValue: "+80K",
      statLabel: "visualizações em um único #shorts",
    },
    monetization: {
      caption: "Monetize seu canal",
      channelLabel: "Seu canal",
      subscribers: "1.284 inscritos",
      trend: "+312 este mês",
      eligibleLabel: "Elegível para monetização",
    },
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
  pricing: {
    kicker: "Preços",
    title: "Planos para cada fase do seu canal",
    subtitle: "Comece pequeno e evolua conforme sua produção de conteúdo cresce.",
    popularBadge: "Mais popular",
    ctaPrefix: "Assinar",
    includesLabel: "Este plano inclui:",
    detailsSoon: "Detalhamento completo em breve",
    period: "/mês",
    plans: [
      {
        id: "basico",
        name: "Básico",
        price: "R$ 33,99",
        description: "Para quem está começando a automatizar sua publicação.",
        popular: false,
      },
      {
        id: "plus",
        name: "Plus",
        price: "R$ 49,99",
        description: "Para criadores publicando com mais frequência.",
        popular: true,
      },
      {
        id: "pro",
        name: "Pro",
        price: "R$ 79,99",
        description: "Para quem quer escalar a produção sem limites.",
        popular: false,
      },
    ],
  },
  cta: {
    title: "Comece a automatizar seus vídeos hoje",
    subtitle: "Crie sua conta gratuitamente e conecte seu canal do YouTube em minutos.",
    button: "Criar conta",
  },
  faq: {
    kicker: "Dúvidas",
    title: "Perguntas frequentes",
    categories: [
      {
        label: "Primeiros passos",
        items: [
          {
            question: "Para quem é o PostAutomation?",
            answer:
              "Para streamers, canais dark, criadores de conteúdo, YouTubers, blogueiros e qualquer criador que queira publicar vídeos de forma automática, sem precisar estar online o tempo todo.",
          },
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
    backToTop: "Voltar ao topo",
    columns: {
      product: "Produto",
      company: "Empresa",
      account: "Conta",
    },
    links: {
      home: "Início",
      pricing: "Preços",
      about: "Sobre nós",
      blog: "Blog",
    },
  },
};
