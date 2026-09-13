type IconProps = { className?: string };

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
