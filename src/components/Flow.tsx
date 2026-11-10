import { STEPS, DISPUTE } from "@/lib/data";

export default function Flow() {
  return (
    <section className="sec" id="how-it-works">
      <div className="wrap">
        <div className="sec-head rv">
          <h2>Six steps, one contract.</h2>
          <p className="sub">
            Every deal runs the same route. The bot coordinates; the contract moves the money.
          </p>
        </div>

        <div className="flow-grid rv">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <span className="badge" aria-hidden>{s.n}</span>
              <div>
                <span className="scope">{s.scope}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dispute rv">
          <p className="t">{DISPUTE.title}</p>
          <ul>
            {DISPUTE.items.map((d) => (
              <li key={d.cmd}>
                <code>{d.cmd}</code> {d.body}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
