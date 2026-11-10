import { VAULTS, LINKS } from "@/lib/data";
import { ShieldIcon, ExtIcon, LockIcon, AlertIcon } from "./Icons";

const MECHS = [
  "EscrowVaultV2 on BNB Smart Chain supports deposit, release(to, amount), refund(to, amount), fee accounting, and fee withdrawal.",
  "Release and refund are callable only by the contract owner role — this operator power is part of the published design.",
  "Fee percentage changes must be queued and wait 24 hours before activation; they can be cancelled in that window.",
  "The vault can be paused in an emergency, blocking release and refund.",
  "Reentrancy protection exists on fund-moving functions.",
  "Every release and refund emits an on-chain event with gross amount, net amount, and fee.",
  "Payment addresses are shown back to participants for confirmation before funds move.",
  "Disputes notify admins, post to the dispute channel, and pull an admin into the deal room. Funds stay locked while a dispute is open.",
];

const RISKS = [
  "Escrow protects the crypto side of the trade from the counterparty taking it without paying.",
  "It does not protect against a buyer sending a wrong or reversed bank transfer.",
  "It does not remove price or market risk.",
  "Letef Mm is not a bank, not a custodian of local currency, and not an investment product.",
  "Users must never release funds before they have actually received payment. The release action confirms real money received; it is not a formality.",
];

export default function Security() {
  return (
    <section className="sec sec-panel" id="security">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="kicker micro">Security</span>
          <h2>Your crypto is deposited into a public smart-contract vault, not a staff member's personal wallet.</h2>
          <p>
            Read the functions, check the addresses, verify events on-chain. Everything below is
            published — including the operator powers. Trust the contract, not the marketing.
          </p>
        </div>

        <div className="mech rv">
          {MECHS.map((m) => (
            <div key={m.slice(0, 24)}>
              <LockIcon />
              <span>{m}</span>
            </div>
          ))}
        </div>

        <h3 className="rv" style={{ fontSize: 20, marginTop: 56 }}>
          Public BNB Smart Chain vaults — verify on BscScan
        </h3>
        <div className="vaults">
          {VAULTS.map((v) => (
            <article className="vault rv" key={v.address}>
              <span className="tier micro">{v.tier}</span>
              <code>{v.address}</code>
              <a href={v.url} target="_blank" rel="noopener noreferrer">
                View on BscScan <ExtIcon />
              </a>
            </article>
          ))}
        </div>

        <div className="risk rv">
          <h3><AlertIcon /> What escrow does — and does not — protect</h3>
          <ul>
            {RISKS.map((r) => <li key={r.slice(0, 24)}>{r}</li>)}
          </ul>
        </div>

        <div className="rv" style={{ marginTop: 28, fontSize: 14, color: "var(--text-3)" }}>
          Questions about a specific contract? Message <a href={LINKS.support} target="_blank" rel="noopener noreferrer" style={{ color: "var(--yellow)" }}>{LINKS.supportHandle}</a> or open <b style={{ color: "var(--text-2)" }}>/dispute</b> inside your deal room.
        </div>
      </div>
    </section>
  );
}
