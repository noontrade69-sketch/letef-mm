import { FEES } from "@/lib/data";
import FeeCalc from "./FeeCalc";

export default function Fees() {
  return (
    <section className="sec" id="fees">
      <div className="wrap">
        <div className="sec-head rv">
          <h2>0.25% to 0.75%. That is the whole price list.</h2>
          <p className="sub">
            The contract charges the service fee on release or refund. The tier is set by how many
            sides of the trade carry the @letefmm bio tag.
          </p>
        </div>

        <div className="fees-grid">
          <div className="rv">
            <div className="tiers">
              {FEES.service.map((s, i) => (
                <div className={`tier${i === 2 ? " hot" : ""}`} key={s.pct}>
                  <div className="pct">{s.pct}</div>
                  <div className="cond">{s.cond}</div>
                </div>
              ))}
            </div>

            <table className="fee-table">
              <thead>
                <tr>
                  <th scope="col">Network fee</th>
                  <th scope="col" className="num">Standard</th>
                  <th scope="col" className="num">Both tagged</th>
                </tr>
              </thead>
              <tbody>
                {FEES.network.map((n) => (
                  <tr key={n.chain}>
                    <td>{n.chain}</td>
                    <td className="num">{n.standard}</td>
                    <td className="num">{n.tagged}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="chips">
              {FEES.chips.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>

            <div className="biobox">
              <p className="bt">Lower your fee — @letefmm</p>
              {FEES.bioTagBox}
            </div>
          </div>

          <FeeCalc />
        </div>
      </div>
    </section>
  );
}
