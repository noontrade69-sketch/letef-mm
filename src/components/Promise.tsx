import { AlertIcon, ShieldIcon } from "./Icons";

export default function Promise() {
  return (
    <section className="sec sec-panel">
      <div className="wrap promise">
        <div className="rv">
          <span className="kicker micro" style={{ color: "var(--yellow)" }}>The problem</span>
          <h2>In a direct trade, one party always has to move first.</h2>
          <p style={{ marginTop: 16, color: "var(--text-2)", fontSize: 15.5 }}>
            Seller sends crypto and hopes the buyer pays. Buyer pays first and hopes the crypto
            arrives. That first move is the counterparty risk every P2P trader carries.
          </p>
        </div>
        <div className="con rv">
          <h3><ShieldIcon /> The Letef Mm answer</h3>
          <p>
            A shared Telegram room and a contract-based crypto escrow process. The seller&rsquo;s
            crypto is deposited into a public vault contract — not to a stranger, not to a staff
            wallet — and it only moves through the contract&rsquo;s release or refund functions.
            The local-currency payment goes directly between the two traders, outside the contract.
          </p>
        </div>
      </div>
    </section>
  );
}
