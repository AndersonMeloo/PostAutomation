import type { Dictionary } from "../types";

export const enUS: Dictionary = {
  auth: {
    backToHome: "Back to Home",
    shared: {
      googleCta: "Continue with Google",
      dividerLabel: "or continue with email",
      emailLabel: "Email",
      emailPlaceholder: "you@email.com",
      passwordLabel: "Password",
      passwordPlaceholder: "Your password",
    },
    login: {
      kicker: "Welcome back",
      title: "Log in to your account",
      subtitle: "Keep automating your video publishing.",
      submitCta: "Log in",
      submitLoadingCta: "Logging in...",
      switchPrompt: "Don't have an account?",
      switchCta: "Create a free account",
      invalidCredentials: "Incorrect email or password.",
      genericError: "Failed to log in. Please try again.",
    },
    signup: {
      kicker: "Getting started",
      title: "Create your free account",
      subtitle: "Set up your automation in just a few minutes.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      submitCta: "Create account",
      submitLoadingCta: "Creating account...",
      switchPrompt: "Already have an account?",
      switchCta: "Log in",
      emailTaken: "This email is already registered.",
      genericError: "Failed to create account. Please try again.",
    },
  },
  header: {
    navFeatures: "Features",
    navHowItWorks: "How it works",
    navPlatforms: "Platforms",
    navHome: "Home",
    navFaq: "FAQ",
    navBlog: "Blog",
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
    badgesCenterLabel: "Your channel, on autopilot",
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
  contentShowcase: {
    kicker: "For every kind of content",
    title: "From podcasts to courses, every video ready to publish",
    categories: [
      { label: "Podcast", handle: "@yourpodcast" },
      { label: "Course", handle: "@yourchannel" },
      { label: "News", handle: "@yourbrand" },
      { label: "Interview", handle: "@yourcontent" },
      { label: "Workout", handle: "@yourprofile" },
    ],
  },
  liveFeed: {
    kicker: "See it in action",
    title: "Your operation, in real time",
    subtitle: "Track every publish and metric update as it happens.",
    centerLabel: "PostAutomation",
    inputLabel: "Input",
    resultLabel: "Result",
    inputs: [
      { id: "youtube", label: "YouTube" },
      { id: "shorts", label: "Short" },
      { id: "longform", label: "Long-form" },
      { id: "upload", label: "New upload" },
      { id: "schedule", label: "Scheduling" },
      { id: "instagram", label: "Instagram", comingSoon: true },
      { id: "tiktok", label: "TikTok", comingSoon: true },
    ],
    stages: [
      { id: "scheduling", label: "Scheduling" },
      { id: "publishing", label: "Publishing" },
      { id: "metrics", label: "Analyzing metrics" },
      { id: "aiClip", label: "AI clipping" },
    ],
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
        id: "schedule",
        title: "New schedule created",
        subtitle: "Publish set for tomorrow",
        time: "8min",
      },
      {
        id: "thumbnail",
        title: "Thumbnail updated",
        subtitle: "New cover selected for the video",
        time: "14min",
      },
      {
        id: "aiClip",
        title: "AI clip generated",
        subtitle: "Coming soon",
        time: "20min",
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
  benefits: {
    kicker: "Benefits",
    title: "Grow on YouTube without showing your face",
    subtitle:
      "Record, edit and publish Shorts anytime — while your channel grows and moves toward monetization on autopilot.",
    chart: {
      caption: "Create a faceless channel and post #shorts",
      segments: [
        { label: "Shorts", percent: 45 },
        { label: "Long-form", percent: 30 },
        { label: "Editing", percent: 25 },
      ],
    },
    anonymity: {
      caption: "Earn without showing your face",
    },
    proof: {
      caption: "Edit your videos and publish whenever you want",
      statValue: "+80K",
      statLabel: "views on a single #shorts",
    },
    monetization: {
      caption: "Monetize your channel",
      channelLabel: "Your channel",
      subscribers: "1,284 subscribers",
      trend: "+312 this month",
      eligibleLabel: "Eligible for monetization",
    },
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
  pricing: {
    kicker: "Pricing",
    title: "Plans for every stage of your channel",
    subtitle: "Start small and grow as your content production scales.",
    popularBadge: "Most popular",
    ctaPrefix: "Subscribe to",
    includesLabel: "This plan includes:",
    detailsSoon: "Full details coming soon",
    period: "/mo",
    plans: [
      {
        id: "basic",
        name: "Basic",
        price: "R$ 33,99",
        description: "For creators just getting started with automation.",
        popular: false,
      },
      {
        id: "plus",
        name: "Plus",
        price: "R$ 49.99",
        description: "For creators publishing more frequently.",
        popular: true,
      },
      {
        id: "pro",
        name: "Pro",
        price: "R$ 79,99",
        description: "For creators scaling production without limits.",
        popular: false,
      },
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
            question: "Who is PostAutomation for?",
            answer:
              "Streamers, faceless channels, content creators, YouTubers, bloggers, and any creator who wants to publish videos automatically without needing to be online all the time.",
          },
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
    backToTop: "Back to top",
    columns: {
      product: "Product",
      company: "Company",
      account: "Account",
    },
    links: {
      home: "Home",
      pricing: "Pricing",
      about: "About us",
      blog: "Blog",
    },
  },
  blog: {
    pageTitle: "The PostAutomation blog",
    intro: [
      "PostAutomation automates the entire video publishing flow for your social channels: upload, basic editing, smart scheduling and automatic publishing, with metrics collected over time so you can track what's working.",
      "Today the integration is available for YouTube, with Instagram and TikTok coming soon. The goal is simple: take the repetitive publishing work off your plate so you can focus on creating.",
      "Here on the blog we gather posts explaining how each part of the product works - from the scheduling flow to the metrics collected automatically. Use the list on the side to browse between them.",
    ],
    sidebarTitle: "Latest posts",
    backLabel: "Back",
    posts: {
      "automatize-publicacao-de-videos": {
        title: "How to automate publishing your videos",
        excerpt:
          "Upload a video once and let us handle the rest: scheduling, publishing and metrics collection, without having to open YouTube every time.",
        content: [
          "Keeping a consistent posting routine is one of the biggest challenges for content creators. PostAutomation was built exactly to solve that friction: you upload the video, pick the niche and time slot, and the platform takes care of the actual publishing when the time comes.",
          "Behind the scenes, a scheduler periodically checks scheduled videos and publishes them directly to your connected YouTube account, with no manual intervention needed. If anything goes wrong along the way, the post status is updated so you know exactly what happened.",
          "The goal isn't to replace your creativity, but to take the repetitive work of uploading files, filling out forms and picking a time slot off your hands every time a video is ready.",
        ],
      },
      "agendamento-inteligente": {
        title: "Understanding smart scheduling",
        excerpt:
          "Every uploaded video becomes a draft you can review, edit and only publish once it's truly ready - on your schedule, not the platform's.",
        content: [
          "Not every uploaded video needs to go live right away. That's why PostAutomation's upload flow first goes through a draft state: you can adjust the title, format (Shorts or standard), thumbnail and a basic trim before deciding when it should be published.",
          "When you prepare the post, the video enters a queue with the chosen niche and time slot. From there, the same mechanism that handles automatic publishing takes over the rest of the process.",
          "This separation between 'uploading' and 'publishing' gives more control to anyone managing several videos at once, without losing automation at the right moment.",
        ],
      },
      "metricas-que-importam": {
        title: "The metrics that actually matter",
        excerpt:
          "Views, likes and comments collected automatically over time, so you can understand each video's evolution without manually refreshing anything.",
        content: [
          "Automating publishing is worthless if you can't track the results. That's why PostAutomation periodically collects each published video's metrics directly from the YouTube API: views, likes and comments.",
          "This data is available both in an aggregate view (the performance of all your videos over time) and in an individual view, showing a specific video's evolution since it was published.",
          "The idea is simple: less time comparing spreadsheets, more time understanding what's actually working on your channel.",
        ],
      },
      "do-rascunho-a-publicacao": {
        title: "From draft to publish: our editing flow",
        excerpt:
          "A modular editor designed to grow step by step: today you can already adjust trim, thumbnail and format; the rest comes in stages.",
        content: [
          "Building a full video editor from scratch is a massive project - and it isn't what actually solves the real problem of publishing faster. That's why we chose to start small and modular.",
          "Today, the editor lets you choose the video format (Shorts or standard), set a basic trim by start and end time, and capture or upload a custom thumbnail. Each of these pieces lives in its own panel, which makes it easier to add new features without rewriting everything.",
          "As the product evolves, this same structure will gain new capabilities - always being careful not to turn a simple tool into something overly complicated to use.",
        ],
      },
    },
  },
};
