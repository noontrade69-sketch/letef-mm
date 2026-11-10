import { LINKS } from "@/lib/data";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/letef-mark.svg" alt="Letef Mm logo" width={34} height={34} />
              <p className="fb-name">Letef Mm</p>
              <p className="fb-sub">Trusted P2P Escrow · Telegram-native</p>
            </div>
            <div>
              <h3>Site</h3>
              <ul>
                <li><a href="#how-it-works">How it works</a></li>
                <li><a href="#fees">Fees</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#market">Market reference</a></li>
                <li><a href="#terms">Terms &amp; risk</a></li>
              </ul>
            </div>
            <div>
              <h3>Community</h3>
              <ul>
                <li><a href={LINKS.group} target="_blank" rel="noopener noreferrer">Main group {LINKS.groupHandle}</a></li>
                <li><a href={LINKS.channel} target="_blank" rel="noopener noreferrer">Channel {LINKS.channelHandle}</a></li>
                <li><a href={LINKS.vouch} target="_blank" rel="noopener noreferrer">Vouches {LINKS.vouchHandle}</a></li>
                <li><a href={LINKS.bot} target="_blank" rel="noopener noreferrer">Escrow bot</a></li>
              </ul>
            </div>
            <div>
              <h3>Support</h3>
              <ul>
                <li><a href={LINKS.support} target="_blank" rel="noopener noreferrer">{LINKS.supportHandle}</a></li>
                <li><a href={LINKS.line1} target="_blank" rel="noopener noreferrer">@zvaku</a></li>
                <li><a href={LINKS.developer} target="_blank" rel="noopener noreferrer">@letef (dev)</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-base">
            <span>© {new Date().getFullYear()} Letef Mm — Trusted P2P Escrow</span>
            <span>
              Crypto trading carries risk. Escrow secures the crypto leg only — see{" "}
              <a href="#terms">Terms &amp; risk</a>.
            </span>
          </div>
        </div>
      </footer>
      <div className="sticky-cta">
        <a href={LINKS.bot} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M21.9 4.6 18.8 19c-.2 1-.8 1.2-1.7.8l-4.6-3.4-2.2 2.1c-.3.3-.5.5-.9.5l.3-4.6L18.2 6.9c.4-.3-.1-.5-.6-.2L7.1 13.2l-4.5-1.4c-1-.3-1-1 .2-1.4L20.4 3.2c.8-.3 1.5.2 1.5 1.4Z" />
          </svg>
          Open Telegram Bot
        </a>
      </div>
    </>
  );
}
