import { PersonFigure } from "./Icons";

export default function Problem() {
  return (
    <section className="sec" id="problem">
      <div className="wrap">
        <p className="kicker rv" style={{ color: "var(--fiat)" }}>The problem</p>
        <h2 className="rv">In a direct trade, someone has to move first.</h2>
        <div className="problem-grid">
          <div>
            <ul className="problem-list rv">
              <li><b>A.</b> The buyer pays first and trusts the seller to release the crypto.</li>
              <li><b>B.</b> The seller sends crypto first and trusts the buyer to pay.</li>
              <li><b>C.</b> Both hesitate — the deal dies before it starts.</li>
            </ul>
            <div className="promise-box rv">
              <b>The promise:</b> Letef Mm puts both sides in a shared Telegram escrow room.
              The seller&rsquo;s crypto is locked in a public smart-contract vault before the
              buyer moves a single unit of local currency. Nobody has to go first alone.
            </div>
          </div>
          <div className="figure-row rv" aria-hidden>
            <PersonFigure accent="#F0B90B" facing="right" className="fig" />
            <span className="figure-q">?</span>
            <PersonFigure accent="#cfc7b4" facing="left" className="fig" />
          </div>
        </div>
      </div>
    </section>
  );
}
