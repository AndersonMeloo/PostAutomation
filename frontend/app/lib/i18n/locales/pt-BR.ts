import type { Dictionary } from "../types";

export const ptBR: Dictionary = {
  auth: {
    backToHome: "Voltar para a Home",
    shared: {
      googleCta: "Continuar com Google",
      dividerLabel: "ou continue com e-mail",
      emailLabel: "E-mail",
      emailPlaceholder: "seu@email.com",
      passwordLabel: "Senha",
      passwordPlaceholder: "Sua senha",
    },
    login: {
      kicker: "Bem-vindo de volta",
      title: "Entre na sua conta",
      subtitle: "Continue automatizando a publicação dos seus vídeos.",
      submitCta: "Entrar",
      submitLoadingCta: "Entrando...",
      switchPrompt: "Não tem conta?",
      switchCta: "Criar conta grátis",
      invalidCredentials: "E-mail ou senha incorretos.",
      genericError: "Falha ao realizar login. Tente novamente.",
    },
    signup: {
      kicker: "Primeiros passos",
      title: "Crie sua conta grátis",
      subtitle: "Configure sua automação em poucos minutos.",
      nameLabel: "Nome",
      namePlaceholder: "Seu nome",
      submitCta: "Criar conta",
      submitLoadingCta: "Criando conta...",
      switchPrompt: "Já tem conta?",
      switchCta: "Entrar",
      emailTaken: "Este e-mail já está cadastrado.",
      genericError: "Falha ao criar cadastro. Tente novamente.",
    },
  },
  header: {
    navFeatures: "Recursos",
    navHowItWorks: "Como funciona",
    navPlatforms: "Plataformas",
    navHome: "Home",
    navFaq: "FAQ",
    navBlog: "Blog",
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
    badgesCenterLabel: "Sua rede, no piloto automático",
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
    items: [
      { name: "YouTube", status: "live" },
      { name: "Instagram", status: "soon" },
      { name: "TikTok", status: "soon" },
    ],
  },
  contentShowcase: {
    kicker: "Vídeos prontos para redes sociais com inteligência artificial",
    title: "Transforme conteúdo longo em clipes prontos pra cada plataforma",
    categories: [
      { label: "Podcast", handle: "@seupodcast" },
      { label: "Curso", handle: "@seucanal" },
      { label: "Notícias", handle: "@suamarca" },
      { label: "Entrevista", handle: "@seuconteudo" },
      { label: "Treino", handle: "@seuperfil" },
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
        bullets: ["Views, curtidas e comentários", "Comparação Shorts e vídeos longos", "Períodos personalizados"],
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
  blog: {
    pageTitle: "Blog do PostAutomation",
    // Textos fixos da página de índice do Blog (não mudam por post).
    intro: [
      "O PostAutomation automatiza o fluxo completo de publicação de vídeos nas suas redes sociais: envio, edição básica, agendamento inteligente e publicação automática, com coleta de métricas ao longo do tempo pra você acompanhar o que funciona.",
      "Hoje a integração está disponível pro YouTube, com Instagram e TikTok chegando em breve. O objetivo é simples: tirar do seu caminho o trabalho repetitivo de publicar, pra você focar em criar.",
      "Aqui no blog reunimos posts explicando como cada parte do produto funciona - desde o fluxo de agendamento até as métricas coletadas automaticamente. Use a lista ao lado pra navegar entre eles.",
    ],
    sidebarTitle: "Últimos posts",
    backLabel: "Voltar",
    // Um post por chave, e a chave TEM que ser igual ao "slug" cadastrado em
    // app/blog/posts-data.ts (é assim que a página encontra o texto certo).
    // Pra criar um post novo: copie um bloco abaixo, troque a chave pelo
    // slug novo e escreva title/excerpt/content (um item da lista por
    // parágrafo). Depois faça o mesmo em en-US.ts.
    posts: {
      "automatize-publicacao-de-videos": {
        title: "Como automatizar a publicação dos seus vídeos",
        excerpt:
          "Envie um vídeo uma vez e deixe o resto do trabalho com a gente: agendamento, publicação e coleta de métricas, sem precisar abrir o YouTube toda vez.",
        content: [
          "Manter uma rotina de postagens consistente é um dos maiores desafios de quem cria conteúdo. O PostAutomation nasceu justamente pra resolver essa fricção: você envia o vídeo, escolhe o nicho e o horário, e a plataforma cuida da publicação de verdade quando chegar a hora.",
          "Por trás dos panos, um scheduler verifica periodicamente os vídeos agendados e os publica diretamente na sua conta do YouTube conectada, sem precisar de intervenção manual. Se alguma coisa der errado no meio do caminho, o status do post é atualizado pra você entender exatamente o que aconteceu.",
          "O objetivo não é substituir sua criatividade, e sim tirar do seu caminho o trabalho repetitivo de subir arquivo, preencher formulário e escolher horário toda vez que um vídeo fica pronto.",
        ],
      },
      "agendamento-inteligente": {
        title: "Entendendo o agendamento inteligente",
        excerpt:
          "Cada vídeo enviado vira um rascunho que você pode revisar, editar e só publicar quando estiver realmente pronto - no seu tempo, não no da plataforma.",
        content: [
          "Nem todo vídeo enviado precisa ir direto para o ar. Por isso, o fluxo de envio do PostAutomation passa primeiro por um estado de rascunho: você pode ajustar título, formato (Shorts ou padrão), thumbnail e um corte básico antes de decidir quando ele deve ser publicado.",
          "Quando você prepara a publicação, o vídeo entra numa fila com o nicho e o horário escolhidos. A partir daí, o mesmo mecanismo que cuida da publicação automática assume o restante do processo.",
          "Essa separação entre 'enviar' e 'publicar' dá mais controle pra quem gerencia vários vídeos ao mesmo tempo, sem perder a automação no momento certo.",
        ],
      },
      "metricas-que-importam": {
        title: "Métricas que realmente importam",
        excerpt:
          "Visualizações, curtidas e comentários coletados automaticamente ao longo do tempo, pra você entender a evolução de cada vídeo sem precisar ficar atualizando manualmente.",
        content: [
          "De nada adianta automatizar a publicação se você não consegue acompanhar o resultado. Por isso, o PostAutomation coleta periodicamente as métricas de cada vídeo publicado diretamente da API do YouTube: views, curtidas e comentários.",
          "Esses dados ficam disponíveis tanto numa visão agregada (o desempenho de todos os seus vídeos ao longo do tempo) quanto numa visão individual, mostrando a evolução de um vídeo específico desde a publicação.",
          "A ideia é simples: menos tempo comparando planilhas, mais tempo entendendo o que está funcionando de verdade no seu canal.",
        ],
      },
      "do-rascunho-a-publicacao": {
        title: "Do rascunho à publicação: nosso fluxo de edição",
        excerpt:
          "Um editor modular pensado pra crescer aos poucos: hoje já dá pra ajustar corte, thumbnail e formato; o resto vem por etapas.",
        content: [
          "Construir um editor de vídeo completo do zero é um projeto enorme - e não é isso que resolve o problema real de quem só quer publicar mais rápido. Por isso, escolhemos começar pequeno e modular.",
          "Hoje, o editor permite escolher o formato do vídeo (Shorts ou padrão), definir um corte básico por tempo de início e fim, e capturar ou enviar uma thumbnail personalizada. Cada uma dessas peças vive no seu próprio painel, o que facilita adicionar novas funcionalidades sem reescrever tudo.",
          "Conforme o produto evolui, essa mesma estrutura vai ganhar novos recursos - sempre com o cuidado de não transformar uma ferramenta simples em algo complicado demais de usar.",
        ],
      },
    },
  },
};
