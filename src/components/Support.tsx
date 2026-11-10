import { LINKS } from "@/lib/data";

export default function Support() {
  return (
    <section className="sec" id="support" style={{ background: "var(--paper)" }}>
      <div className="wrap">
        <p className="kicker rv" style={{ color: "var(--green)" }}>Support</p>
        <h2 className="rv">Humans, in Telegram.</h2>
        <div className="sup-grid rv">
          <a className="sup-cell" href={LINKS.support} target="_blank" rel="noopener noreferrer">
            <span className="role">Support</span>
            <span className="handle">{LINKS.supportHandle}</span>
            <span className="note">Deals, disputes, account access</span>
          </a>
          <a className="sup-cell" href={LINKS.line1} target="_blank" rel="noopener noreferrer">
            <span className="role">Support line 1</span>
            <span className="handle">@zvaku</span>
            <span className="note">Backup contact</span>
          </a>
          <a className="sup-cell" href={LINKS.developer} target="_blank" rel="noopener noreferrer">
            <span className="role">Developer</span>
            <span className="handle">@letef</span>
            <span className="note">Same person behind the bot</span>
          </a>
        </div>
        <p className="stuck rv">
          For a stuck deal: open <code>/dispute</code> inside the deal room first, then message
          support with the deal ID.
        </p>
      </div>
    </section>
  );
}

export function Terms() {
  return (
    <section className="sec terms" id="terms">
      <div className="wrap">
        <p className="kicker rv" style={{ color: "var(--amber)" }}>Terms &amp; risk</p>
        <h2 className="rv">What escrow does. What it does not.</h2>
        <div className="terms-grid">
          <div className="rv">
            <h3>The deal, in plain terms</h3>
            <ul>
              <li>Escrow rooms are opened with /deal in the main group; both community memberships are required before the bot responds.</li>
              <li>The seller&rsquo;s crypto is locked in a public smart-contract vault; the buyer pays local currency directly to the seller.</li>
              <li>Release and refund execute through the contract; the fee is charged by the contract at the published tier.</li>
              <li>Completed deals are published as vouches; proofs can be re-issued with /vouch.</li>
            </ul>
          </div>
          <div className="rv">
            <h3>Limits — stated plainly</h3>
            <ul>
              <li>Letef Mm is not an exchange, broker, bank, wallet, custodian of local currency, or investment product.</li>
              <li>Escrow does not remove price or market risk, and does not protect against a wrong or reversed local transfer.</li>
              <li>No guaranteed profit, no insured funds, no independent audit is claimed.</li>
              <li>Never release before the local payment has actually arrived.</li>
            </ul>
          </div>
        </div>
        <p className="fine rv">
          Fee changes require a 24-hour timelock and can be cancelled during that window. Verify
          every vault address on BscScan before sending funds.
        </p>
      </div>
    </section>
  );
}
