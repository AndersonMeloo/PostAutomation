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
    period: "/mês",
    sectionLabels: {
      forWho: "Pra quem é",
      features: "Recursos",
      limits: "Limites",
      differentiators: "Diferenciais",
      usage: "Cobrança e uso",
      faq: "Perguntas sobre esse plano",
    },
    plans: {
      basic: {
        name: "Básico",
        tagline: "Para quem está começando a automatizar sua publicação.",
        forWho:
          "Pra quem publica em um canal só e quer parar de fazer manualmente o upload, o preenchimento de título e o agendamento de cada vídeo.",
        highlights: [
          "1 canal do YouTube conectado",
          "Até 15 vídeos agendados por mês",
          "Edição básica: corte, thumbnail e formato",
          "Métricas essenciais por vídeo",
        ],
        features: [
          "Conecte 1 canal do YouTube com login Google",
          "Envie o vídeo, escolha o formato (Shorts ou padrão) e agende o horário",
          "Editor com corte por tempo de início/fim e thumbnail personalizada",
          "Publicação automática no horário escolhido, sem precisar abrir o painel",
          "Coleta automática de visualizações, curtidas, comentários e inscritos ganhos",
          "Suporte por e-mail",
        ],
        limits: [
          "1 canal conectado por vez",
          "Até 15 vídeos agendados por mês",
          "Histórico de métricas dos últimos 90 dias",
        ],
        differentiators: [
          "Sem taxa de configuração - comece a agendar no mesmo dia",
          "Cancele quando quiser, sem multa",
        ],
        usageNotes: [
          "Cobrança mensal recorrente no cartão cadastrado, com nota fiscal emitida automaticamente.",
          "Se você ultrapassar os 15 vídeos no mês, o excedente fica em rascunho até o próximo ciclo ou até você fazer upgrade.",
        ],
        faq: [
          {
            question: "Dá pra trocar de plano depois?",
            answer:
              "Sim. Você pode fazer upgrade pro Pro ou Premium a qualquer momento direto no painel, e a cobrança é ajustada proporcionalmente ao que já foi usado no ciclo.",
          },
          {
            question: "Preciso conectar cartão pra testar?",
            answer:
              "A criação da conta é gratuita. O cartão só é pedido quando você decide assinar um dos planos pra liberar a publicação automática.",
          },
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Para criadores publicando com mais frequência.",
        forWho:
          "Pra quem já gerencia mais de um canal ou nicho e precisa de volume maior de publicações sem perder a visão do que está funcionando.",
        highlights: [
          "Até 3 canais conectados",
          "Vídeos agendados ilimitados",
          "Métricas agregadas e por vídeo",
          "Suporte prioritário",
        ],
        features: [
          "Tudo do plano Básico",
          "Conecte até 3 canais do YouTube na mesma conta",
          "Agendamento de vídeos sem limite mensal",
          "Painel de métricas agregadas: compare o desempenho entre canais e formatos",
          "Histórico completo de métricas, sem limite de 90 dias",
          "Acesso antecipado ao corte automático com IA assim que sair do beta",
          "Suporte prioritário por e-mail e chat",
        ],
        limits: ["Até 3 canais conectados", "Sem limite de vídeos agendados por mês"],
        differentiators: [
          "Métricas agregadas entre canais, pra comparar o que performa melhor",
          "Fila de suporte prioritária em relação ao plano Básico",
        ],
        usageNotes: [
          "Cobrança mensal recorrente, com a opção de trocar de plano a qualquer momento.",
          "Cada canal extra usa a mesma cota de vídeos ilimitados - não há cobrança por canal.",
        ],
        faq: [
          {
            question: "O que muda em relação ao Básico?",
            answer:
              "Principalmente o número de canais (até 3, em vez de 1), o limite de vídeos por mês (que deixa de existir) e o histórico completo de métricas, sem o corte de 90 dias.",
          },
          {
            question: "Os 3 canais podem ser de nichos diferentes?",
            answer:
              "Sim. Você pode conectar canais de nichos completamente diferentes e acompanhar o desempenho de cada um separadamente no mesmo painel.",
          },
        ],
      },
      premium: {
        name: "Premium",
        tagline: "Para quem quer escalar a produção sem limites.",
        forWho:
          "Pra operações maiores - agências, times de conteúdo ou criadores com vários canais - que precisam de escala, exportação de dados e atendimento próximo.",
        highlights: [
          "Canais conectados ilimitados",
          "Exportação de métricas",
          "Onboarding assistido",
          "Suporte prioritário com resposta rápida",
        ],
        features: [
          "Tudo do plano Pro",
          "Canais conectados ilimitados, sem custo por canal extra",
          "Exportação de métricas em CSV pra usar em outras ferramentas",
          "Onboarding assistido na configuração inicial dos canais e nichos",
          "Acesso antecipado a todas as novidades (Instagram, TikTok, corte com IA) assim que saírem do beta",
          "Suporte prioritário, com meta de primeira resposta em até 4 horas úteis",
        ],
        limits: ["Canais conectados ilimitados", "Sem limite de vídeos agendados por mês"],
        differentiators: [
          "Único plano com exportação de métricas e onboarding assistido",
          "Prioridade máxima na fila de suporte e nos novos recursos em beta",
        ],
        usageNotes: [
          "Cobrança mensal recorrente; times maiores podem pedir faturamento anual falando com o suporte.",
          "O onboarding assistido acontece uma vez, na ativação do plano.",
        ],
        faq: [
          {
            question: "Como funciona o onboarding assistido?",
            answer:
              "Depois de assinar, nosso time entra em contato pra ajudar a conectar seus canais, organizar os nichos e configurar o primeiro lote de agendamentos.",
          },
          {
            question: "Existe desconto pra pagamento anual?",
            answer:
              "Sim, pra contas Premium com faturamento anual. É só falar com o suporte depois de assinar o plano mensal pra fazer a migração.",
          },
        ],
      },
    },
    paymentMethods: {
      kicker: "Pagamento",
      title: "Pague do seu jeito",
      subtitle: "Cartão, boleto ou Pix - você escolhe como pagar, sem burocracia.",
      methods: [
        {
          id: "visa",
          label: "Visa",
          description: "Cartão de crédito, cobrança recorrente mensal",
        },
        {
          id: "mastercard",
          label: "Mastercard",
          description: "Cartão de crédito, cobrança recorrente mensal",
        },
        {
          id: "pix",
          label: "Pix",
          description: "Confirmação em minutos, sem taxa extra",
        },
        {
          id: "boleto",
          label: "Boleto",
          description: "Vencimento em até 3 dias úteis",
        },
      ],
    },
    faqSection: {
      title: "Perguntas frequentes",
      items: [
        {
          question: "Como funciona a cobrança?",
          answer:
            "A cobrança é mensal e recorrente, no cartão, boleto ou Pix cadastrado. Você pode acompanhar cada fatura no painel, com nota fiscal emitida automaticamente.",
        },
        {
          question: "Emitem nota fiscal?",
          answer:
            "Sim, toda cobrança gera uma nota fiscal automaticamente, disponível pra download no painel logo depois do pagamento ser confirmado.",
        },
        {
          question: "Posso cancelar quando quiser?",
          answer:
            "Sim, sem multa. O cancelamento pode ser feito a qualquer momento no painel, e seu acesso continua ativo até o fim do período já pago.",
        },
        {
          question: "Há taxa de configuração ou mensalidade extra?",
          answer:
            "Não. Você paga só a mensalidade do plano escolhido - sem taxa de adesão, sem custo por canal extra nos planos Pro e Premium.",
        },
        {
          question: "Vocês oferecem desconto pra pagamento anual?",
          answer:
            "Sim, pra contas Premium. Depois de assinar o plano mensal, é só falar com o suporte pra migrar pro faturamento anual com desconto.",
        },
      ],
    },
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
    tocTitle: "Neste artigo",
    // Um post por chave, e a chave TEM que ser igual ao "slug" cadastrado em
    // app/blog/posts-data.ts (é assim que a página encontra o texto certo).
    // Pra criar um post novo: copie um bloco abaixo, troque a chave pelo
    // slug novo e escreva title/excerpt/content (uma seção por item, com
    // heading + parágrafos). Depois faça o mesmo em en-US.ts, mantendo o
    // mesmo número de seções nos dois idiomas.
    posts: {
      "automatize-publicacao-de-videos": {
        title: "Como automatizar a publicação dos seus vídeos",
        excerpt:
          "Envie um vídeo uma vez e deixe o resto do trabalho com a gente: agendamento, publicação e coleta de métricas, sem precisar abrir o YouTube toda vez.",
        content: [
          {
            heading: "O problema da rotina manual",
            paragraphs: [
              "Manter uma rotina de postagens consistente é um dos maiores desafios de quem cria conteúdo. Toda semana é a mesma sequência: exportar o arquivo certo, abrir o YouTube Studio, preencher título e descrição, escolher a thumbnail e lembrar de publicar no horário em que o seu público está online.",
              "Sozinha, cada uma dessas etapas leva poucos minutos. Multiplicada por vários vídeos por semana, ela vira um trabalho operacional que rouba tempo de quem deveria estar gravando e editando - não gerenciando planilha de agenda.",
              "O PostAutomation nasceu justamente pra resolver essa fricção: você envia o vídeo, escolhe o nicho e o horário, e a plataforma cuida da publicação de verdade quando chegar a hora.",
            ],
          },
          {
            heading: "Como funciona por trás dos panos",
            paragraphs: [
              "Por trás dos panos, um scheduler verifica periodicamente os vídeos agendados e os publica diretamente na sua conta do YouTube conectada, sem precisar de intervenção manual. A conexão usa a API oficial do YouTube, então o processo é o mesmo que você faria manualmente - só que automático.",
              "Cada vídeo agendado carrega consigo o formato (Shorts ou padrão), o corte definido no editor e a thumbnail escolhida. Quando o horário chega, tudo isso é enviado de uma vez só, sem retrabalho da sua parte.",
            ],
          },
          {
            heading: "O que acontece quando algo dá errado",
            paragraphs: [
              "Nenhuma automação é infalível, e ser transparente sobre isso importa mais do que fingir que nunca falha. Se alguma coisa der errado no meio do caminho - um token expirado, uma cota da API estourada -, o status do post é atualizado pra você entender exatamente o que aconteceu e reagendar em poucos cliques.",
              "Essa visibilidade fica disponível direto no painel, junto com o histórico de tentativas, pra você nunca precisar adivinhar se um vídeo foi ao ar ou não.",
            ],
          },
          {
            heading: "O que não muda",
            paragraphs: [
              "O objetivo não é substituir sua criatividade, e sim tirar do seu caminho o trabalho repetitivo de subir arquivo, preencher formulário e escolher horário toda vez que um vídeo fica pronto.",
              "A decisão sobre o que publicar, quando e em qual tom continua inteiramente sua. A automação começa exatamente no ponto em que essa decisão termina.",
            ],
          },
        ],
      },
      "agendamento-inteligente": {
        title: "Entendendo o agendamento inteligente",
        excerpt:
          "Cada vídeo enviado vira um rascunho que você pode revisar, editar e só publicar quando estiver realmente pronto - no seu tempo, não no da plataforma.",
        content: [
          {
            heading: "Por que nem tudo deveria ir direto ao ar",
            paragraphs: [
              "Nem todo vídeo enviado precisa ir direto para o ar. Às vezes você quer testar um título antes, ajustar a thumbnail depois de ver como ficou, ou simplesmente esperar o dia certo da semana pra publicar.",
              "Por isso, o fluxo de envio do PostAutomation passa primeiro por um estado de rascunho, em vez de forçar uma decisão de publicação no momento do upload.",
            ],
          },
          {
            heading: "Do envio ao rascunho",
            paragraphs: [
              "Assim que o vídeo é enviado, ele vira um rascunho que você pode revisar com calma: ajustar título, escolher o formato (Shorts ou padrão), definir a thumbnail e aplicar um corte básico antes de decidir quando ele deve ser publicado.",
              "Nada disso é definitivo até você confirmar. O rascunho pode ficar parado o tempo que for preciso, e você pode até excluí-lo se decidir não publicar - com a limpeza do arquivo correspondente no armazenamento feita automaticamente.",
            ],
          },
          {
            heading: "Da fila à publicação automática",
            paragraphs: [
              "Quando você prepara a publicação, o vídeo entra numa fila com o nicho e o horário escolhidos. A partir daí, o mesmo mecanismo que cuida da publicação automática assume o restante do processo, sem exigir que você volte a abrir o painel naquele exato horário.",
              "Se quiser reagendar, basta alterar o horário antes do envio acontecer - o vídeo continua na fila, só que com a nova data.",
            ],
          },
          {
            heading: "Por que isso importa pra quem gerencia vários vídeos",
            paragraphs: [
              "Essa separação entre 'enviar' e 'publicar' dá mais controle pra quem gerencia vários vídeos ao mesmo tempo, sem perder a automação no momento certo.",
              "Na prática, você pode passar uma tarde inteira só enviando e organizando rascunhos, e deixar que a publicação em si aconteça sozinha, espalhada pelos dias e horários que fizerem mais sentido pro seu canal.",
            ],
          },
        ],
      },
      "metricas-que-importam": {
        title: "Métricas que realmente importam",
        excerpt:
          "Visualizações, curtidas e comentários coletados automaticamente ao longo do tempo, pra você entender a evolução de cada vídeo sem precisar ficar atualizando manualmente.",
        content: [
          {
            heading: "De nada adianta publicar sem medir",
            paragraphs: [
              "De nada adianta automatizar a publicação se você não consegue acompanhar o resultado. Sem dados, cada decisão sobre horário, formato ou tema vira palpite - e palpite não escala.",
              "Por isso, o PostAutomation coleta periodicamente as métricas de cada vídeo publicado diretamente da API do YouTube: visualizações, curtidas, comentários e inscritos ganhos.",
            ],
          },
          {
            heading: "O que é coletado e de onde vem",
            paragraphs: [
              "Os números vêm direto da fonte - a mesma API que alimenta o YouTube Studio -, então não há estimativa nem atraso artificial: o que você vê no painel reflete o que está acontecendo no seu canal.",
              "A coleta acontece em segundo plano, em intervalos regulares, sem exigir que você abra o vídeo manualmente pra atualizar o número.",
            ],
          },
          {
            heading: "Visão agregada vs. visão individual",
            paragraphs: [
              "Esses dados ficam disponíveis tanto numa visão agregada (o desempenho de todos os seus vídeos ao longo do tempo) quanto numa visão individual, mostrando a evolução de um vídeo específico desde a publicação.",
              "A visão agregada ajuda a identificar padrões - que dia da semana, formato ou nicho performa melhor. A individual ajuda a entender o ciclo de vida de um vídeo específico: quando ele decola, quando estabiliza.",
            ],
          },
          {
            heading: "Menos planilha, mais decisão",
            paragraphs: [
              "A ideia é simples: menos tempo comparando planilhas, mais tempo entendendo o que está funcionando de verdade no seu canal.",
              "Com o histórico organizado automaticamente, fica mais fácil repetir o que dá certo e abandonar mais rápido o que não dá, em vez de descobrir isso só meses depois.",
            ],
          },
        ],
      },
      "do-rascunho-a-publicacao": {
        title: "Do rascunho à publicação: nosso fluxo de edição",
        excerpt:
          "Um editor modular pensado pra crescer aos poucos: hoje já dá pra ajustar corte, thumbnail e formato; o resto vem por etapas.",
        content: [
          {
            heading: "Por que não construímos um editor completo do zero",
            paragraphs: [
              "Construir um editor de vídeo completo do zero é um projeto enorme - e não é isso que resolve o problema real de quem só quer publicar mais rápido. Por isso, escolhemos começar pequeno e modular, priorizando os ajustes que a maioria dos vídeos realmente precisa antes de ir ao ar.",
            ],
          },
          {
            heading: "O que já dá pra fazer hoje",
            paragraphs: [
              "Hoje, o editor permite escolher o formato do vídeo (Shorts ou padrão), definir um corte básico por tempo de início e fim, e capturar ou enviar uma thumbnail personalizada direto no navegador.",
              "Cada ajuste é aplicado sobre o rascunho, então você pode alterar o corte ou trocar a thumbnail quantas vezes quiser antes de confirmar a publicação - sem gerar um arquivo novo a cada tentativa.",
            ],
          },
          {
            heading: "Por que cada peça vive no seu próprio painel",
            paragraphs: [
              "Cada uma dessas peças vive no seu próprio painel, o que facilita adicionar novas funcionalidades sem reescrever tudo. Corte, thumbnail e formato são módulos independentes que conversam com o mesmo rascunho.",
              "Essa separação também é o que permite evoluir o produto em etapas visíveis, em vez de prometer um editor completo de uma vez e demorar meses pra entregar qualquer coisa.",
            ],
          },
          {
            heading: "O que vem a seguir",
            paragraphs: [
              "Conforme o produto evolui, essa mesma estrutura vai ganhar novos recursos - como o corte automático com inteligência artificial que já aparece como 'em breve' no painel - sempre com o cuidado de não transformar uma ferramenta simples em algo complicado demais de usar.",
            ],
          },
        ],
      },
    },
  },
};
