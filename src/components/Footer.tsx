import { LINKS } from "@/lib/data";
import { TgIcon, UsersIcon } from "./Icons";

export default function Footer() {
  return (
    <>
      <section className="final sec-dark">
        <div className="wrap rv">
          <h2>Ready to trade with the contract between you?</h2>
          <p>
            Open the bot, join the room, and let the vault hold the crypto while you settle the
            local leg.
          </p>
          <div className="hero-ctas" style={{ justifyContent: "center" }}>
            <a className="btn btn-y" href={LINKS.bot} target="_blank" rel="noopener noreferrer">
              <TgIcon /> Open Telegram Bot
            </a>
            <a className="btn btn-ghost" href={LINKS.vouch} target="_blank" rel="noopener noreferrer">
              Read public vouches
            </a>
          </div>
          <p className="join-note" style={{ justifyContent: "center" }}>
            <UsersIcon />
            <span>
              Both memberships are required before the bot responds: <b>{LINKS.groupHandle}</b> and <b>{LINKS.channelHandle}</b>.
            </span>
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <a href="#top" className="brand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/letef-mark.svg" alt="" width={34} height={34} />
                <span>
                  Letef Mm
                  <small>Trusted P2P Escrow</small>
                </span>
              </a>
              <p>
                A Telegram-native P2P escrow service for stablecoin trades. Funds are locked in a
                public smart contract and released only when both sides confirm.
              </p>
            </div>
            <div>
              <h3>Product</h3>
              <a href="#how-it-works">How it works</a>
              <a href="#fees">Fees</a>
              <a href="#security">Security</a>
              <a href="#commands">Commands</a>
            </div>
            <div>
              <h3>Community</h3>
              <a href={LINKS.group} target="_blank" rel="noopener noreferrer">Main group {LINKS.groupHandle}</a>
              <a href={LINKS.channel} target="_blank" rel="noopener noreferrer">Channel {LINKS.channelHandle}</a>
              <a href={LINKS.vouch} target="_blank" rel="noopener noreferrer">Vouches {LINKS.vouchHandle}</a>
              <a href={LINKS.bot} target="_blank" rel="noopener noreferrer">Escrow bot</a>
            </div>
            <div>
              <h3>Support</h3>
              <a href={LINKS.support} target="_blank" rel="noopener noreferrer">{LINKS.supportHandle}</a>
              <a href={LINKS.line1} target="_blank" rel="noopener noreferrer">@zvaku</a>
              <a href={LINKS.line2} target="_blank" rel="noopener noreferrer">@letef</a>
            </div>
          </div>
          <div className="foot-base">
            <span>© {new Date().getFullYear()} Letef Mm — Trusted P2P Escrow</span>
            <span>
              Crypto trading carries risk. Escrow secures the crypto leg only — see{" "}
              <a href="#security" style={{ color: "var(--yellow)" }}>Security &amp; risk disclosure</a>.
            </span>
          </div>
        </div>
      </footer>

      <div className="sticky-cta">
        <a className="btn btn-y" href={LINKS.bot} target="_blank" rel="noopener noreferrer">
          <TgIcon /> Open Telegram Bot
        </a>
      </div>
    </>
  );
}
