export const TelegramIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M21.9 4.6 18.8 19c-.2 1-.8 1.2-1.7.8l-4.6-3.4-2.2 2.1c-.3.3-.5.5-.9.5l.3-4.6L18.2 6.9c.4-.3-.1-.5-.6-.2L7.1 13.2l-4.5-1.4c-1-.3-1-1 .2-1.4L20.4 3.2c.8-.3 1.5.2 1.5 1.4Z" />
  </svg>
);

export const CopyIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </svg>
);

export const CheckIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const ExternalIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...p}>
    <path d="M14 4h6v6M20 4 10 14M9 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3" />
  </svg>
);

export const ChevronIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const LockIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...p}>
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

export const MenuIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

/* Vault mark used in the dive + final CTA (original, geometric) */
export const VaultGlyph = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 120 116" fill="none" aria-hidden {...p}>
    <polygon points="60,4 112,33 112,83 60,112 8,83 8,33" stroke="currentColor" strokeWidth="4" fill="none" />
    <polygon points="60,26 93,45 93,71 60,90 27,71 27,45" stroke="#F0B90B" strokeWidth="4" fill="none" />
    <circle cx="60" cy="58" r="12" fill="#F0B90B" />
  </svg>
);

/* Original flat characters (geometric, palette colors) */
export function PersonFigure({
  accent,
  facing = "right",
  className,
}: {
  accent: string;
  facing?: "left" | "right";
  className?: string;
}) {
  return (
    <svg viewBox="0 0 120 170" className={className} aria-hidden style={facing === "left" ? { transform: "scaleX(-1)" } : undefined}>
      <circle cx="60" cy="30" r="20" fill="#F5EFE2" stroke="#17130B" strokeWidth="4" />
      <path d="M28 96c0-18 14-32 32-32s32 14 32 32v14H28Z" fill={accent} stroke="#17130B" strokeWidth="4" />
      <path d="M36 84 16 118" stroke="#17130B" strokeWidth="4" strokeLinecap="round" />
      <path d="M84 84l20 34" stroke="#17130B" strokeWidth="4" strokeLinecap="round" />
      <path d="M44 112v44M76 112v44" stroke="#17130B" strokeWidth="4" strokeLinecap="round" />
      <circle cx="53" cy="28" r="2.6" fill="#17130B" />
      <circle cx="67" cy="28" r="2.6" fill="#17130B" />
      <path d="M54 37q6 5 12 0" stroke="#17130B" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}
