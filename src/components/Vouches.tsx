import { VOUCH_POINTS, LINKS } from "@/lib/data";
import { CheckIcon, ExternalIcon } from "./Icons";

export default function Vouches() {
  return (
    <section className="sec" id="vouches">
      <div className="wrap">
        <div className="sec-head rv">
          <h2>Finished deals leave receipts.</h2>
          <p className="sub">
            Vouches are public, copyable, and re-issued on demand. See them where they land:{" "}
            <a href={LINKS.vouch} target="_blank" rel="noopener noreferrer">{LINKS.vouchHandle}</a>
          </p>
        </div>

        <div className="vouch-grid">
          <ul className="vlist rv">
            {VOUCH_POINTS.map((v) => (
              <li key={v.slice(0, 26)}>
                <CheckIcon />
                <span>{v}</span>
              </li>
            ))}
          </ul>

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
