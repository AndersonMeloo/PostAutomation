type IconProps = { className?: string };

export function GoogleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.94-2.92l-3.88-3c-1.08.72-2.46 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.94H1.28v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.28a12 12 0 0 0 0 10.78l4.01-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.61l4.01 3.1C6.23 6.87 8.88 4.75 12 4.75Z"
      />
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82c-.86-.93-1.34-2.14-1.34-3.42h-3.13v13.4c0 1.55-1.26 2.82-2.82 2.82a2.82 2.82 0 0 1-2.82-2.82 2.82 2.82 0 0 1 2.82-2.82c.28 0 .55.04.8.11V9.94a6.02 6.02 0 0 0-.8-.05 5.97 5.97 0 0 0-5.97 5.97A5.97 5.97 0 0 0 9.31 21.83a5.97 5.97 0 0 0 5.97-5.97V9.4a8.35 8.35 0 0 0 4.87 1.56V7.83a4.85 4.85 0 0 1-3.55-2.01Z" />
    </svg>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.6 7.2a2.9 2.9 0 0 0-2.05-2.05C17.9 4.7 12 4.7 12 4.7s-5.9 0-7.55.45A2.9 2.9 0 0 0 2.4 7.2C2 8.86 2 12 2 12s0 3.14.4 4.8a2.9 2.9 0 0 0 2.05 2.05c1.65.45 7.55.45 7.55.45s5.9 0 7.55-.45a2.9 2.9 0 0 0 2.05-2.05c.4-1.66.4-4.8.4-4.8s0-3.14-.4-4.8ZM10 15V9l5.2 3-5.2 3Z"
      />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Versão com o gradiente oficial da marca, usada sobre fundos brancos/neutros. */
export function InstagramColorIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="instagram-brand-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#405de6" />
          <stop offset="15%" stopColor="#5b51d8" />
          <stop offset="30%" stopColor="#833ab4" />
          <stop offset="45%" stopColor="#c13584" />
          <stop offset="60%" stopColor="#e1306c" />
          <stop offset="70%" stopColor="#fd1d1d" />
          <stop offset="80%" stopColor="#f56040" />
          <stop offset="90%" stopColor="#f77737" />
          <stop offset="100%" stopColor="#fcaf45" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#instagram-brand-gradient)" strokeWidth={1.8} />
      <circle cx="12" cy="12" r="4.2" stroke="url(#instagram-brand-gradient)" strokeWidth={1.8} />
      <circle cx="17.2" cy="6.8" r="1" fill="url(#instagram-brand-gradient)" />
    </svg>
  );
}

/** Badges de método de pagamento - marcas simplificadas, só pra identificação visual. */
export function VisaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 26" className={className} aria-hidden="true">
      <rect x="0.5" y="0.5" width="39" height="25" rx="4" fill="#1A1F71" stroke="#E2E8F0" />
      <text
        x="20"
        y="17.5"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="11"
        fontStyle="italic"
        fontWeight="700"
        fill="#FFFFFF"
      >
        VISA
      </text>
    </svg>
  );
}

export function MastercardIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 26" className={className} aria-hidden="true">
      <rect x="0.5" y="0.5" width="39" height="25" rx="4" fill="#F4F4F5" stroke="#E2E8F0" />
      <circle cx="16.5" cy="13" r="7" fill="#EB001B" />
      <circle cx="23.5" cy="13" r="7" fill="#F79E1B" />
      <path
        d="M20 7.5a7 7 0 0 1 0 11 7 7 0 0 1 0-11Z"
        fill="#FF5F00"
      />
    </svg>
  );
}

export function PixIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 26" className={className} aria-hidden="true">
      <rect x="0.5" y="0.5" width="39" height="25" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
      <g transform="translate(20 13) rotate(45)" fill="none" stroke="#32BCAD" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="-5" y="-5" width="10" height="10" rx="3" />
      </g>
      <circle cx="20" cy="13" r="2" fill="#32BCAD" />
    </svg>
  );
}

export function BoletoIcon({ className }: IconProps) {
  const bars = [2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2];
  let x = 5;
  return (
    <svg viewBox="0 0 40 26" className={className} aria-hidden="true">
      <rect x="0.5" y="0.5" width="39" height="25" rx="4" fill="#FFFFFF" stroke="#E2E8F0" />
      {bars.map((width, index) => {
        const bar = <rect key={index} x={x} y="6" width={width} height="14" fill="#0F172A" />;
        x += width + 1.3;
        return bar;
      })}
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M14.4 22v-8.6h2.9l.4-3.4h-3.3V7.8c0-1 .27-1.63 1.67-1.63H18V3.14C17.7 3.1 16.68 3 15.5 3c-2.46 0-4.15 1.5-4.15 4.27v2.73H8.4v3.4h2.95V22h3.05Z" />
    </svg>
  );
}

export function BrazilFlagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <clipPath id="br-circle">
        <circle cx="30" cy="30" r="30" />
      </clipPath>
      <g clipPath="url(#br-circle)">
        <rect width="60" height="60" fill="#009c3b" />
        <polygon points="30,7 56,30 30,53 4,30" fill="#ffdf00" />
        <circle cx="30" cy="30" r="12" fill="#002776" />
        <path
          d="M19 26a17 17 0 0 1 22 0"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.6"
        />
      </g>
    </svg>
  );
}

export function UnitedStatesFlagIcon({ className }: IconProps) {
  const stripeHeight = 60 / 13;
  const stripes = Array.from({ length: 13 }, (_, index) => index);

  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <clipPath id="us-circle">
        <circle cx="30" cy="30" r="30" />
      </clipPath>
      <g clipPath="url(#us-circle)">
        <rect width="60" height="60" fill="#ffffff" />
        {stripes.map((index) =>
          index % 2 === 0 ? (
            <rect
              key={index}
              x="0"
              y={index * stripeHeight}
              width="60"
              height={stripeHeight}
              fill="#b22234"
            />
          ) : null
        )}
        <rect x="0" y="0" width="27" height="27.7" fill="#3c3b6e" />
      </g>
    </svg>
  );
}
