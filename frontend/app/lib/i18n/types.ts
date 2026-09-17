export type Locale = "pt-BR" | "en-US";

export type PlatformStatus = "live" | "soon";

export type Dictionary = {
  auth: {
    backToHome: string;
    shared: {
      googleCta: string;
      dividerLabel: string;
      emailLabel: string;
      emailPlaceholder: string;
      passwordLabel: string;
      passwordPlaceholder: string;
    };
    login: {
      kicker: string;
      title: string;
      subtitle: string;
      submitCta: string;
      submitLoadingCta: string;
      switchPrompt: string;
      switchCta: string;
      invalidCredentials: string;
      genericError: string;
    };
    signup: {
      kicker: string;
      title: string;
      subtitle: string;
      nameLabel: string;
      namePlaceholder: string;
      submitCta: string;
      submitLoadingCta: string;
      switchPrompt: string;
      switchCta: string;
      emailTaken: string;
      genericError: string;
    };
  };
  header: {
    navHome: string;
    navFeatures: string;
    navHowItWorks: string;
    navPlatforms: string;
    navFaq: string;
    navBlog: string;
    login: string;
    signup: string;
  };
  hero: {
    kicker: string;
    titleLine1: string;
    titleAccent: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    comingSoon: string;
    badgesCenterLabel: string;
    badges: {
      id: "youtube" | "instagram" | "tiktok" | "scheduling" | "metrics" | "aiClip";
      label: string;
      comingSoon: boolean;
    }[];
  };
  platforms: {
    items: { name: string; status: PlatformStatus }[];
  };
  contentShowcase: {
    kicker: string;
    title: string;
    categories: { label: string; handle: string }[];
  };
  liveFeed: {
    kicker: string;
    title: string;
    subtitle: string;
    centerLabel: string;
    inputLabel: string;
    resultLabel: string;
    inputs: {
      id: "youtube" | "shorts" | "longform" | "instagram" | "tiktok" | "upload" | "schedule";
      label: string;
      comingSoon?: boolean;
    }[];
    stages: { id: "scheduling" | "publishing" | "metrics" | "aiClip"; label: string }[];
    items: {
      id: "publish" | "metrics" | "aiClip" | "schedule" | "thumbnail";
      title: string;
      subtitle: string;
      time: string;
    }[];
  };
  howItWorks: {
    kicker: string;
    title: string;
    steps: { number: string; title: string; description: string }[];
  };
  pillars: {
    kicker: string;
    title: string;
    centerLabel: string;
    items: {
      number: string;
      title: string;
      description: string;
      bullets: string[];
    }[];
  };
  benefits: {
    kicker: string;
    title: string;
    subtitle: string;
    chart: {
      caption: string;
      segments: { label: string; percent: number }[];
    };
    anonymity: {
      caption: string;
    };
    proof: {
      caption: string;
      statValue: string;
      statLabel: string;
    };
    monetization: {
      caption: string;
      channelLabel: string;
      subscribers: string;
      trend: string;
      eligibleLabel: string;
    };
  };
  metrics: {
    kicker: string;
    title: string;
    subtitle: string;
    stats: { label: string; value: string }[];
  };
  pricing: {
    kicker: string;
    title: string;
    subtitle: string;
    popularBadge: string;
    ctaPrefix: string;
    includesLabel: string;
    detailsSoon: string;
    period: string;
    plans: {
      id: string;
      name: string;
      price: string;
      description: string;
      popular: boolean;
    }[];
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  faq: {
    kicker: string;
    title: string;
    categories: {
      label: string;
      items: { question: string; answer: string }[];
    }[];
  };
  support: {
    label: string;
    chatButton: string;
  };
  footer: {
    tagline: string;
    rights: string;
    backToTop: string;
    columns: {
      product: string;
      company: string;
      account: string;
    };
    links: {
      home: string;
      pricing: string;
      about: string;
      blog: string;
    };
  };
  blog: {
    pageTitle: string;
    intro: string[];
    sidebarTitle: string;
    backLabel: string;
    posts: Record<string, { title: string; excerpt: string; content: string[] }>;
  };
};
