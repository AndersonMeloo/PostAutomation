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
    items: [
      { name: "YouTube", status: "live" },
      { name: "Instagram", status: "soon" },
      { name: "TikTok", status: "soon" },
    ],
  },
  contentShowcase: {
    kicker: "Videos ready for social media, powered by AI",
    title: "Turn long content into clips ready for every platform",
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
    period: "/mo",
    sectionLabels: {
      forWho: "Who it's for",
      features: "Features",
      limits: "Limits",
      differentiators: "What sets it apart",
      usage: "Billing and usage",
      faq: "Questions about this plan",
    },
    plans: {
      basic: {
        name: "Basic",
        tagline: "For creators just getting started with automation.",
        forWho:
          "For anyone publishing to a single channel who wants to stop manually uploading, filling in titles, and scheduling every video by hand.",
        highlights: [
          "1 connected YouTube channel",
          "Up to 15 scheduled videos per month",
          "Basic editing: trim, thumbnail and format",
          "Essential metrics per video",
        ],
        features: [
          "Connect 1 YouTube channel with Google login",
          "Upload the video, pick the format (Shorts or standard) and schedule the time",
          "Editor with start/end time trim and a custom thumbnail",
          "Automatic publishing at the chosen time, no need to open the dashboard",
          "Automatic collection of views, likes, comments and subscribers gained",
          "Email support",
        ],
        limits: [
          "1 connected channel at a time",
          "Up to 15 scheduled videos per month",
          "90-day metrics history",
        ],
        differentiators: [
          "No setup fee - start scheduling the same day",
          "Cancel anytime, no penalty",
        ],
        usageNotes: [
          "Recurring monthly billing on the card on file, with an automatic invoice.",
          "If you go over 15 videos in a month, the extra ones stay as drafts until the next cycle or until you upgrade.",
        ],
        faq: [
          {
            question: "Can I switch plans later?",
            answer:
              "Yes. You can upgrade to Pro or Premium at any time right from the dashboard, and billing is prorated for what's already been used in the cycle.",
          },
          {
            question: "Do I need a card to try it out?",
            answer:
              "Creating an account is free. A card is only requested once you decide to subscribe to a plan to unlock automatic publishing.",
          },
        ],
      },
      pro: {
        name: "Pro",
        tagline: "For creators publishing more frequently.",
        forWho:
          "For anyone already managing more than one channel or niche who needs higher publishing volume without losing sight of what's working.",
        highlights: [
          "Up to 3 connected channels",
          "Unlimited scheduled videos",
          "Aggregate and per-video metrics",
          "Priority support",
        ],
        features: [
          "Everything in the Basic plan",
          "Connect up to 3 YouTube channels on the same account",
          "No monthly limit on scheduled videos",
          "Aggregate metrics dashboard: compare performance across channels and formats",
          "Full metrics history, no 90-day cap",
          "Early access to AI-powered auto-clipping once it leaves beta",
          "Priority support over email and chat",
        ],
        limits: ["Up to 3 connected channels", "No monthly limit on scheduled videos"],
        differentiators: [
          "Aggregate metrics across channels, to compare what performs best",
          "Priority support queue over the Basic plan",
        ],
        usageNotes: [
          "Recurring monthly billing, with the option to switch plans at any time.",
          "Every extra channel shares the same unlimited video quota - there's no per-channel fee.",
        ],
        faq: [
          {
            question: "What changes compared to Basic?",
            answer:
              "Mainly the number of channels (up to 3, instead of 1), the monthly video limit (which goes away), and full metrics history instead of the 90-day cap.",
          },
          {
            question: "Can the 3 channels be in different niches?",
            answer:
              "Yes. You can connect channels in completely different niches and track each one's performance separately in the same dashboard.",
          },
        ],
      },
      premium: {
        name: "Premium",
        tagline: "For creators scaling production without limits.",
        forWho:
          "For larger operations - agencies, content teams, or creators running several channels - that need scale, data export, and hands-on support.",
        highlights: [
          "Unlimited connected channels",
          "Metrics export",
          "Guided onboarding",
          "Priority support with fast response",
        ],
        features: [
          "Everything in the Pro plan",
          "Unlimited connected channels, no per-channel fee",
          "Export metrics to CSV to use in other tools",
          "Guided onboarding to set up your channels and niches",
          "Early access to every new capability (Instagram, TikTok, AI clipping) as soon as it leaves beta",
          "Priority support, with a first-response target of 4 business hours",
        ],
        limits: ["Unlimited connected channels", "No monthly limit on scheduled videos"],
        differentiators: [
          "The only plan with metrics export and guided onboarding",
          "Top priority in the support queue and for new beta features",
        ],
        usageNotes: [
          "Recurring monthly billing; larger teams can request annual invoicing by contacting support.",
          "Guided onboarding happens once, when the plan is activated.",
        ],
        faq: [
          {
            question: "How does guided onboarding work?",
            answer:
              "After you subscribe, our team reaches out to help connect your channels, organize your niches, and set up your first batch of scheduled posts.",
          },
          {
            question: "Is there a discount for annual billing?",
            answer:
              "Yes, for Premium accounts on annual billing. Just contact support after subscribing to the monthly plan to migrate.",
          },
        ],
      },
    },
    paymentMethods: {
      kicker: "Payment",
      title: "Pay your way",
      subtitle: "Card, boleto or Pix - you choose how to pay, no hassle.",
      methods: [
        {
          id: "visa",
          label: "Visa",
          description: "Credit card, recurring monthly billing",
        },
        {
          id: "mastercard",
          label: "Mastercard",
          description: "Credit card, recurring monthly billing",
        },
        {
          id: "pix",
          label: "Pix",
          description: "Confirmed within minutes, no extra fee",
        },
        {
          id: "boleto",
          label: "Boleto",
          description: "Due within 3 business days",
        },
      ],
    },
    faqSection: {
      title: "Frequently asked questions",
      items: [
        {
          question: "How does billing work?",
          answer:
            "Billing is monthly and recurring, on the card, boleto or Pix on file. You can track every invoice in the dashboard, with an automatic invoice issued for each charge.",
        },
        {
          question: "Do you issue an invoice?",
          answer:
            "Yes, every charge automatically generates an invoice, available to download from the dashboard right after payment is confirmed.",
        },
        {
          question: "Can I cancel anytime?",
          answer:
            "Yes, no penalty. You can cancel at any time from the dashboard, and your access stays active until the end of the period you already paid for.",
        },
        {
          question: "Is there a setup fee or extra monthly charge?",
          answer:
            "No. You only pay the monthly fee for the plan you choose - no setup fee, no extra cost per channel on the Pro and Premium plans.",
        },
        {
          question: "Do you offer a discount for annual billing?",
          answer:
            "Yes, for Premium accounts. After subscribing to the monthly plan, just contact support to migrate to discounted annual billing.",
        },
      ],
    },
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
    // Fixed copy for the Blog index page (same for every post).
    intro: [
      "PostAutomation automates the entire video publishing flow for your social channels: upload, basic editing, smart scheduling and automatic publishing, with metrics collected over time so you can track what's working.",
      "Today the integration is available for YouTube, with Instagram and TikTok coming soon. The goal is simple: take the repetitive publishing work off your plate so you can focus on creating.",
      "Here on the blog we gather posts explaining how each part of the product works - from the scheduling flow to the metrics collected automatically. Use the list on the side to browse between them.",
    ],
    sidebarTitle: "Latest posts",
    backLabel: "Back",
    tocTitle: "In this article",
    // One post per key, and the key MUST match the "slug" registered in
    // app/blog/posts-data.ts (that's how the page finds the right text).
    // To add a new post: copy a block below, swap the key for the new
    // slug, and write title/excerpt/content (one section per item, with
    // heading + paragraphs). Keep the same number of sections as
    // pt-BR.ts.
    posts: {
      "automatize-publicacao-de-videos": {
        title: "How to automate publishing your videos",
        excerpt:
          "Upload a video once and let us handle the rest: scheduling, publishing and metrics collection, without having to open YouTube every time.",
        content: [
          {
            heading: "The problem with manual routines",
            paragraphs: [
              "Keeping a consistent posting routine is one of the biggest challenges for content creators. Every week it's the same sequence: export the right file, open YouTube Studio, fill in the title and description, pick a thumbnail and remember to publish at the time your audience is actually online.",
              "On its own, each of these steps takes a few minutes. Multiplied by several videos a week, it turns into operational work that steals time from what you should be doing - filming and editing, not managing a scheduling spreadsheet.",
              "PostAutomation was built exactly to solve that friction: you upload the video, pick the niche and time slot, and the platform takes care of the actual publishing when the time comes.",
            ],
          },
          {
            heading: "How it works behind the scenes",
            paragraphs: [
              "Behind the scenes, a scheduler periodically checks scheduled videos and publishes them directly to your connected YouTube account, with no manual intervention needed. The connection uses the official YouTube API, so the process is the same you'd do by hand - just automatic.",
              "Every scheduled video carries its format (Shorts or standard), the trim set in the editor and the chosen thumbnail. When the time comes, all of it is sent at once, with no rework on your end.",
            ],
          },
          {
            heading: "What happens when something fails",
            paragraphs: [
              "No automation is foolproof, and being upfront about that matters more than pretending it never fails. If anything goes wrong along the way - an expired token, an API quota hit - the post status is updated so you know exactly what happened and can reschedule in a couple of clicks.",
              "That visibility lives right in the dashboard, alongside the attempt history, so you never have to guess whether a video actually went live.",
            ],
          },
          {
            heading: "What doesn't change",
            paragraphs: [
              "The goal isn't to replace your creativity, but to take the repetitive work of uploading files, filling out forms and picking a time slot off your hands every time a video is ready.",
              "The decision on what to publish, when and in what tone is still entirely yours. Automation starts exactly where that decision ends.",
            ],
          },
        ],
      },
      "agendamento-inteligente": {
        title: "Understanding smart scheduling",
        excerpt:
          "Every uploaded video becomes a draft you can review, edit and only publish once it's truly ready - on your schedule, not the platform's.",
        content: [
          {
            heading: "Why not everything should go live right away",
            paragraphs: [
              "Not every uploaded video needs to go live right away. Sometimes you want to test a title first, tweak the thumbnail after seeing how it looks, or simply wait for the right day of the week to publish.",
              "That's why PostAutomation's upload flow first goes through a draft state, instead of forcing a publishing decision the moment you upload.",
            ],
          },
          {
            heading: "From upload to draft",
            paragraphs: [
              "As soon as the video is uploaded, it becomes a draft you can review at your own pace: adjust the title, choose the format (Shorts or standard), set the thumbnail and apply a basic trim before deciding when it should be published.",
              "None of it is final until you confirm it. A draft can sit untouched for as long as needed, and you can even delete it if you decide not to publish - with the matching file automatically cleaned up from storage.",
            ],
          },
          {
            heading: "From the queue to automatic publishing",
            paragraphs: [
              "When you prepare the post, the video enters a queue with the chosen niche and time slot. From there, the same mechanism that handles automatic publishing takes over the rest of the process, with no need to reopen the dashboard at that exact time.",
              "If you want to reschedule, just change the time before it's sent - the video stays in the queue, just with a new date.",
            ],
          },
          {
            heading: "Why this matters if you manage several videos",
            paragraphs: [
              "This separation between 'uploading' and 'publishing' gives more control to anyone managing several videos at once, without losing automation at the right moment.",
              "In practice, you can spend an entire afternoon just uploading and organizing drafts, and let the actual publishing happen on its own, spread across whichever days and times make the most sense for your channel.",
            ],
          },
        ],
      },
      "metricas-que-importam": {
        title: "The metrics that actually matter",
        excerpt:
          "Views, likes and comments collected automatically over time, so you can understand each video's evolution without manually refreshing anything.",
        content: [
          {
            heading: "Publishing without measuring is pointless",
            paragraphs: [
              "Automating publishing is worthless if you can't track the results. Without data, every decision about timing, format or topic turns into a guess - and guesses don't scale.",
              "That's why PostAutomation periodically collects each published video's metrics directly from the YouTube API: views, likes, comments and subscribers gained.",
            ],
          },
          {
            heading: "What's collected and where it comes from",
            paragraphs: [
              "The numbers come straight from the source - the same API that powers YouTube Studio - so there's no estimating and no artificial delay: what you see on the dashboard reflects what's actually happening on your channel.",
              "Collection happens in the background, at regular intervals, with no need to manually open a video just to refresh a number.",
            ],
          },
          {
            heading: "Aggregate view vs. individual view",
            paragraphs: [
              "This data is available both in an aggregate view (the performance of all your videos over time) and in an individual view, showing a specific video's evolution since it was published.",
              "The aggregate view helps spot patterns - which day of the week, format or niche performs best. The individual one helps you understand a specific video's life cycle: when it takes off, when it settles.",
            ],
          },
          {
            heading: "Less spreadsheet, more decision",
            paragraphs: [
              "The idea is simple: less time comparing spreadsheets, more time understanding what's actually working on your channel.",
              "With history organized automatically, it's easier to repeat what works and drop what doesn't faster, instead of only finding out months later.",
            ],
          },
        ],
      },
      "do-rascunho-a-publicacao": {
        title: "From draft to publish: our editing flow",
        excerpt:
          "A modular editor designed to grow step by step: today you can already adjust trim, thumbnail and format; the rest comes in stages.",
        content: [
          {
            heading: "Why we didn't build a full editor from scratch",
            paragraphs: [
              "Building a full video editor from scratch is a massive project - and it isn't what actually solves the real problem of publishing faster. That's why we chose to start small and modular, prioritizing the adjustments most videos actually need before going live.",
            ],
          },
          {
            heading: "What you can already do today",
            paragraphs: [
              "Today, the editor lets you choose the video format (Shorts or standard), set a basic trim by start and end time, and capture or upload a custom thumbnail right from the browser.",
              "Every adjustment is applied on top of the draft, so you can change the trim or swap the thumbnail as many times as you want before confirming the publish - without generating a new file on every attempt.",
            ],
          },
          {
            heading: "Why each piece lives in its own panel",
            paragraphs: [
              "Each of these pieces lives in its own panel, which makes it easier to add new features without rewriting everything. Trim, thumbnail and format are independent modules that all talk to the same draft.",
              "This separation is also what lets the product evolve in visible stages, instead of promising a complete editor all at once and taking months to ship anything.",
            ],
          },
          {
            heading: "What's next",
            paragraphs: [
              "As the product evolves, this same structure will gain new capabilities - like the AI-powered auto-clipping that already shows up as 'coming soon' in the dashboard - always being careful not to turn a simple tool into something overly complicated to use.",
            ],
          },
        ],
      },
    },
  },
};
