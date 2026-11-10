import { LINKS } from "@/lib/data";
import EscrowCore from "./EscrowCore";
import { TgIcon, UsersIcon, ShieldIcon, CardIcon, ChatIcon } from "./Icons";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1>
            P2P trades. Crypto secured by <em>a smart contract.</em>
          </h1>
          <p className="hero-sub">
            Letef Mm gives buyers and sellers a Telegram-native escrow room. The seller&rsquo;s crypto
            is locked on-chain while the buyer pays local currency directly to the seller.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-y" href={LINKS.bot} target="_blank" rel="noopener noreferrer">
              <TgIcon /> Open Telegram Bot
            </a>
            <a className="btn btn-ghost" href={LINKS.group} target="_blank" rel="noopener noreferrer">
              <UsersIcon /> Join the community
            </a>
          </div>
          <p className="join-note">
            <UsersIcon />
            <span>
              Join both <b>{LINKS.groupHandle}</b> and <b>{LINKS.channelHandle}</b> before opening the bot.
            </span>
          </p>
          <div className="trust-strip">
            <div><ShieldIcon /> On-chain escrow</div>
            <div><CardIcon /> Published vault contracts</div>
            <div><ChatIcon /> Public trade vouches</div>
            <div><UsersIcon /> Human dispute support</div>
          </div>
        </div>
        <EscrowCore />
      </div>
    </section>
  );
}
