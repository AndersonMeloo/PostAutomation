export type Locale = "pt-BR" | "en-US";

export type PlatformStatus = "live" | "soon";

export type Dictionary = {
  header: {
    navFeatures: string;
    navHowItWorks: string;
    navPlatforms: string;
    navFaq: string;
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
    badges: {
      id: "youtube" | "instagram" | "tiktok" | "scheduling" | "metrics" | "aiClip";
      label: string;
      comingSoon: boolean;
    }[];
  };
  platforms: {
    kicker: string;
    title: string;
    items: { name: string; status: PlatformStatus }[];
  };
  liveFeed: {
    kicker: string;
    title: string;
    subtitle: string;
    centerLabel: string;
    items: { id: "publish" | "metrics" | "aiClip"; title: string; subtitle: string; time: string }[];
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
  metrics: {
    kicker: string;
    title: string;
    subtitle: string;
    stats: { label: string; value: string }[];
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
  };
};
