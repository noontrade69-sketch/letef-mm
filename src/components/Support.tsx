import { LINKS } from "@/lib/data";
import { ExtIcon } from "./Icons";

const CARDS = [
  { t: "Human support", d: "Fastest route for account or deal questions.", handle: LINKS.supportHandle, href: LINKS.support },
  { t: "Support line 1", d: "Direct line for deal assistance.", handle: "@zvaku", href: LINKS.line1 },
  { t: "Support line 2 / Developer", d: "Second line and the developer contact.", handle: "@letef", href: LINKS.line2 },
];

export default function Support() {
  return (
    <section className="sec sec-panel" id="support">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="kicker micro">Support</span>
          <h2>Humans, reachable.</h2>
          <p>
            For a stuck deal: open <b style={{ color: "var(--text-2)" }}>/dispute</b> inside the deal
            room first, then message support with the deal ID.
          </p>
        </div>
        <div className="sup-grid">
          {CARDS.map((c) => (
            <a className="sup rv" key={c.t} href={c.href} target="_blank" rel="noopener noreferrer">
              <b>{c.t}</b>
              <span>{c.d}</span>
              <span className="handle">{c.handle}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "var(--text-3)", marginTop: 10 }}>
                Open in Telegram <ExtIcon width={13} height={13} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
