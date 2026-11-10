import { FEES } from "@/lib/data";
import { CheckIcon, ShieldIcon } from "./Icons";
import FeeCalc from "./FeeCalc";

export default function Fees() {
  return (
    <section className="sec sec-dark" id="fees">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="kicker micro">Fees</span>
          <h2>Exact numbers. Nothing hidden.</h2>
          <p>
            The service fee is charged by the smart contract on release or refund. The tier is set
            by how many sides of the trade carry the @letefmm bio tag.
          </p>
        </div>
        <div className="fee-grid">
          <div className="rv">
            <table className="fee-table">
              <thead>
                <tr><th scope="col">Bio tag status</th><th scope="col">Service fee</th></tr>
              </thead>
              <tbody>
                {FEES.service.map((r) => (
                  <tr key={r.tag}>
                    <td>{r.tag}</td>
                    <td className="pct">{r.pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="fee-table" style={{ marginTop: 16 }}>
              <thead>
                <tr><th scope="col">Network</th><th scope="col">Standard</th><th scope="col">With bio tag</th></tr>
              </thead>
              <tbody>
                {FEES.network.map((r) => (
                  <tr key={r.chain}>
                    <td>{r.chain}</td>
                    <td>{r.standard}</td>
                    <td>{r.tagged}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="fee-terms">
              <li><CheckIcon /> Minimum deal size: 3 USDT</li>
              <li><CheckIcon /> No fee to open a deal</li>
              <li><CheckIcon /> No fee to cancel an unfunded deal</li>
              <li><CheckIcon /> No monthly or subscription charge</li>
              <li><CheckIcon /> No hidden charges, spread mark-up, or withdrawal fee</li>
              <li><CheckIcon /> Fee changes require a 24-hour timelock, cancellable in that window</li>
            </ul>
          </div>
          <div className="rv">
            <div className="biobox">
              <h3>Lower your fee with <code>{FEES.bioTag}</code></h3>
              <p>
                Add {FEES.bioTag} to your Telegram bio. It is free and lowers the service fee.
                When both traders carry the tag, the lowest published service fee is 0.25%.
              </p>
            </div>
            <FeeCalc />
          </div>
        </div>
      </div>
    </section>
  );
}
