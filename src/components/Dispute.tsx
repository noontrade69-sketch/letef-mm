import { DISPUTE, SAFETY_LINE } from "@/lib/data";

export default function Dispute() {
  return (
    <section className="sec dispute" id="dispute">
      <div className="wrap">
        <p className="kicker rv" style={{ color: "var(--fiat)" }}>The other branch</p>
        <h2 className="rv">If a deal goes sideways, nothing moves on its own.</h2>
        <div className="dispute-grid">
          <div>
            {DISPUTE.map((d) => (
              <div className="dispute-item rv" key={d.cmd}>
                <code>{d.cmd}</code>
                <p>{d.body}</p>
              </div>
            ))}
            <p className="neverline rv">{SAFETY_LINE}</p>
          </div>
          <div className="rv" aria-hidden>
            <svg viewBox="0 0 460 330" style={{ width: "100%", height: "auto" }}>
              <polygon points="230,30 320,82 320,178 230,230 140,178 140,82" fill="#241e12" stroke="#F0B90B" strokeWidth="5" />
              <circle cx="230" cy="130" r="22" fill="#F0B90B" />
              <text x="230" y="262" textAnchor="middle" fontFamily="var(--mono)" fontSize="13" fontWeight="600" fill="#17130B">FUNDS STAY LOCKED</text>
              <path d="M 140 100 C 90 90, 60 60, 46 34" stroke="#8b8574" strokeWidth="4" fill="none" strokeDasharray="3 10" strokeLinecap="round" />
              <rect x="6" y="0" width="150" height="34" rx="8" fill="#17130B" />
              <text x="81" y="22" textAnchor="middle" fontSize="13" fontWeight="600" fill="#F5EFE2">admins join the room</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
