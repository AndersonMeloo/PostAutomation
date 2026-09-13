import type { Dictionary } from "../types";

export const enUS: Dictionary = {
  header: {
    navFeatures: "Features",
    navHowItWorks: "How it works",
    navPlatforms: "Platforms",
    navFaq: "FAQ",
    login: "Log in",
    signup: "Start for free",
  },
  hero: {
    kicker: "Multi-platform video automation",
    titleLine1: "Publish more.",
    titleAccent: "Analyze better.",
    subtitle:
      "Schedule, publish and track your video performance in one place — with detailed metrics for Shorts and long-form videos.",
    primaryCta: "Start for free",
    secondaryCta: "See how it works",
    comingSoon: "Coming soon",
    badges: [
      { id: "youtube", label: "YouTube", comingSoon: false },
      { id: "instagram", label: "Instagram", comingSoon: true },
      { id: "tiktok", label: "TikTok", comingSoon: true },
      { id: "scheduling", label: "Smart scheduling", comingSoon: false },
      { id: "metrics", label: "Real-time metrics", comingSoon: false },
      { id: "aiClip", label: "AI clipping", comingSoon: true },
    ],
  },
  platforms: {
    kicker: "Publish on",
    title: "One platform, every network",
    items: [
      { name: "YouTube", status: "live" },
      { name: "Instagram", status: "soon" },
      { name: "TikTok", status: "soon" },
    ],
  },
  liveFeed: {
    kicker: "See it in action",
    title: "Your operation, in real time",
    subtitle: "Track every publish and metric update as it happens.",
    centerLabel: "PostAutomation",
    items: [
      {
        id: "publish",
        title: "Video published on YouTube",
        subtitle: "Short scheduled for 9:00 AM",
        time: "now",
      },
      {
        id: "metrics",
        title: "Metrics updated",
        subtitle: "+1,240 views in the last hour",
        time: "2min",
      },
      {
        id: "aiClip",
        title: "AI clip generated",
        subtitle: "Coming soon",
        time: "5min",
      },
    ],
  },
  howItWorks: {
    kicker: "How it works",
    title: "Three steps to publish anywhere",
    steps: [
      {
        number: "01",
        title: "Upload and schedule",
        description:
          "Upload your video, choose the format (Shorts or long-form) and set the publish date and time.",
      },
      {
        number: "02",
        title: "We publish it for you",
        description: "At the right time, your video is automatically published to the chosen platform.",
      },
      {
        number: "03",
        title: "Track the results",
        description: "Views, likes, comments and subscribers, organized into metrics that are easy to read.",
      },
    ],
  },
  pillars: {
    kicker: "Inside the platform",
    title: "Everything you need to grow your channel",
    centerLabel: "How it works inside",
    items: [
      {
        number: "01",
        title: "Multi-platform",
        description:
          "Start with YouTube today and bring the same workflow to Instagram and TikTok once they're available.",
        bullets: ["YouTube available", "Instagram — coming soon", "TikTok — coming soon"],
      },
      {
        number: "02",
        title: "Scheduling and publishing",
        description: "Set a date and time and let publishing happen on its own, without needing to be online.",
        bullets: ["Publishing queue", "Shorts and long-form", "Automatic retry"],
      },
      {
        number: "03",
        title: "Basic editing",
        description: "Trim duration, cut segments and pick a thumbnail before publishing, right on the platform.",
        bullets: ["Duration trimming", "Custom thumbnail", "Preview before publishing"],
      },
      {
        number: "04",
        title: "Metrics and analytics",
        description: "Compare performance across videos and formats, viewed daily, weekly, monthly or by period.",
        bullets: ["Views, likes and comments", "Shorts vs long-form comparison", "Custom date ranges"],
      },
    ],
  },
  metrics: {
    kicker: "Metrics",
    title: "Decisions guided by data, not guesswork",
    subtitle:
      "See what's working and where to invest more time, with per-video metrics and a channel-wide overview.",
    stats: [
      { label: "Views", value: "12,480" },
      { label: "Likes", value: "3,902" },
      { label: "Comments", value: "614" },
      { label: "Subscribers gained", value: "287" },
    ],
  },
  cta: {
    title: "Start automating your videos today",
    subtitle: "Create your free account and connect your YouTube channel in minutes.",
    button: "Start for free",
  },
  faq: {
    kicker: "Questions",
    title: "Frequently asked questions",
    categories: [
      {
        label: "Getting started",
        items: [
          {
            question: "How long does it take to set up?",
            answer: "Just a few minutes: create your account, connect your YouTube channel and schedule your first publish.",
          },
          {
            question: "Do I need to install anything?",
            answer: "No. PostAutomation runs entirely in the browser, no installation required.",
          },
        ],
      },
      {
        label: "Platforms",
        items: [
          {
            question: "Which platforms are supported today?",
            answer: "YouTube is available today. Instagram and TikTok are under development.",
          },
          {
            question: "When are Instagram and TikTok coming?",
            answer: "We're working on these integrations. You'll be notified inside the platform once they're ready.",
          },
        ],
      },
    ],
  },
  support: {
    label: "Online support",
    chatButton: "Chat with support",
  },
  footer: {
    tagline: "Video publishing automation and analytics for creators.",
    rights: "All rights reserved.",
  },
};
