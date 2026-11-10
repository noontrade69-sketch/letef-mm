import { LINKS, JOIN_NOTE } from "@/lib/data";
import { TelegramIcon, VaultGlyph } from "./Icons";

export default function FinalCta() {
  return (
    <section className="final">
      <div className="wrap">
        <VaultGlyph className="vault-still" />
        <h2>Follow the deal.</h2>
        <p>The crypto goes into the vault. The local payment goes straight to the seller. The contract does the rest.</p>
        <a className="btn btn-amber" href={LINKS.bot} target="_blank" rel="noopener noreferrer">
          <TelegramIcon /> Open Telegram Bot
        </a>
        <p className="join">{JOIN_NOTE}</p>
      </div>
    </section>
  );
}
