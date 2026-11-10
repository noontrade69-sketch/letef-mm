import { FEES, VAULTS } from "@/lib/data";
import { ExternalIcon } from "./Icons";
import FeeCalc from "./FeeCalc";

export default function Fees() {
  return (
    <section className="sec fees" id="fees">
      <div className="wrap">
        <p className="kicker rv" style={{ color: "var(--amber)" }}>Fees</p>
        <h2 className="rv">Three tiers. The contract picks yours.</h2>
        <p className="lede rv">
          The service fee is charged by the smart contract on release or refund. The tier is set
          by how many sides of the trade carry the @letefmm bio tag. Each tier has its own
          published vault on BscScan.
        </p>

        <div className="tiers">
          {FEES.tiers.map((t) => {
            const v = VAULTS[t.vaultIdx];
            return (
              <div className={`tier-card rv${t.best ? " best" : ""}`} key={t.pct}>
                <div className="pct tnum">{t.pct}</div>
                <div className="cond">{t.cond}</div>
                <a className="scan" href={v.url} target="_blank" rel="noopener noreferrer">
                  {v.address.slice(0, 10)}…{v.address.slice(-6)} <ExternalIcon />
                </a>
              </div>
            );
          })}
        </div>

        <div className="fees-low">
          <div className="rv">
            <table className="net-table">
              <thead>
                <tr>
                  <th scope="col">Network fee</th>
                  <th scope="col" className="num">Standard</th>
                  <th scope="col" className="num">With bio tag</th>
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
