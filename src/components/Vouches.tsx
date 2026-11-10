import { VOUCH_POINTS, LINKS } from "@/lib/data";
import { CheckIcon } from "./Icons";

/* Part 9.2 H — monochrome section, ONE accent (the amber proof card) */
export default function Vouches() {
  return (
    <section className="sec vouches" id="vouches">
      <div className="wrap">
        <p className="kicker rv">Proof / vouches</p>
        <h2 className="rv">Every finished deal leaves a receipt.</h2>
        <div className="vouch-grid">
          <div>
            <ul className="vlist rv">
              {VOUCH_POINTS.map((v) => (
                <li key={v.slice(0, 26)}>
                  <CheckIcon />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
            <div className="vouch-cta rv">
              <a className="btn btn-amber" href={LINKS.vouch} target="_blank" rel="noopener noreferrer">
                See real vouches in {LINKS.vouchHandle}
              </a>
            </div>
          </div>
          <div className="rv">
            <div className="proof">
              <div className="ph">
                <span className="t">VOUCH PROOF</span>
                <span className="chip">ILLUSTRATIVE</span>
              </div>
              {["Deal ID", "Amount", "Network", "Rate", "Date"].map((k) => (
                <div className="row" key={k}>
                  <span>{k}</span>
                  <b>—</b>
                </div>
              ))}
            </div>
            <p className="proof-cap">Illustrative layout — not a real trade. Real proof cards live in {LINKS.vouchHandle}.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
