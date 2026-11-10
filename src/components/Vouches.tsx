import { LINKS } from "@/lib/data";
import { CardIcon, CheckIcon, ExtIcon } from "./Icons";

const POINTS = [
  "Each completed deal produces a gold proof card containing deal ID, amount, network, rate, and date.",
  "Three vouches per deal: one for the buyer, one for the seller, and one public record.",
  "Vouches can be copied and reused.",
  "/vouch re-issues the trader's latest proof.",
  "Proofs are rebuilt from the database, do not expire, and are backed by an on-chain transaction.",
];

export default function Vouches() {
  return (
    <section className="sec sec-dark" id="vouches">
      <div className="wrap vouch-grid">
        <div className="rv">
          <span className="kicker micro" style={{ color: "var(--yellow)" }}>Proof / vouches</span>
          <h2 style={{ fontSize: "clamp(28px,3.2vw,44px)", marginTop: 14, lineHeight: 1.12 }}>
            Every completed deal leaves a public trail.
          </h2>
          <ul className="vouch-list">
            {POINTS.map((p) => (
              <li key={p.slice(0, 24)}>
                <CheckIcon />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <a className="btn btn-ghost" style={{ marginTop: 30 }} href={LINKS.vouch} target="_blank" rel="noopener noreferrer">
            <ExtIcon /> See real vouches in {LINKS.vouchHandle}
          </a>
        </div>
        <div className="rv">
          <div className="proof-card" role="img" aria-label="Illustrative vouch proof card layout with placeholder field labels only">
            <div className="pc-head">
              <span className="micro">Vouch proof</span>
              <span className="pc-badge">ILLUSTRATIVE</span>
            </div>
            <div className="pc-row"><span>Deal ID</span><b>—</b></div>
            <div className="pc-row"><span>Amount</span><b>—</b></div>
            <div className="pc-row"><span>Network</span><b>—</b></div>
            <div className="pc-row"><span>Rate</span><b>—</b></div>
            <div className="pc-row"><span>Date</span><b>—</b></div>
          </div>
          <p className="proof-illu">Illustrative layout — not a real trade. Real proof cards live in {LINKS.vouchHandle}.</p>
        </div>
      </div>
    </section>
  );
}
