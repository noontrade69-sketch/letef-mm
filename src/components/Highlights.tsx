const HLS = [
  {
    n: "01",
    t: "On-chain escrow",
    d: "Funds sit in EscrowVaultV2, a public smart contract on BNB Smart Chain — not in a person's wallet.",
  },
  {
    n: "02",
    t: "Guided Telegram flow",
    d: "The bot walks both sides through every step: details, deposit, payment, release.",
  },
  {
    n: "03",
    t: "Public vouch",
    d: "Completed deals produce proof cards published in the vouch channel.",
  },
  {
    n: "04",
    t: "Human dispute escalation",
    d: "/dispute brings admins into the room while funds stay locked.",
  },
];

export default function Highlights() {
  return (
    <section className="sec" id="highlights" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="hl-grid rv">
          {HLS.map((h) => (
            <div className="hl" key={h.n}>
              <span className="n">{h.n}</span>
              <h3>{h.t}</h3>
              <p>{h.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
