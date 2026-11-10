import { LINKS } from "@/lib/data";
import { LockIcon, BoltIcon, CardIcon, ChatIcon, TgIcon } from "./Icons";

const CARDS = [
  {
    ic: <LockIcon />,
    t: "On-chain escrow",
    d: "Crypto goes into a publicly deployed vault contract. The address is public, so you can verify what holds your funds.",
  },
  {
    ic: <BoltIcon />,
    t: "Guided Telegram flow",
    d: "The bot guides the trade through buttons and room steps — details, deposit, confirmation, release.",
  },
  {
    ic: <CardIcon />,
    t: "Public vouch",
    d: "Completed deals produce a copyable proof card, published to the public vouch channel.",
  },
  {
    ic: <ChatIcon />,
    t: "Human dispute escalation",
    d: "/dispute brings admins into the room while funds stay locked. Real people, real process.",
  },
];

export default function Highlights() {
  return (
    <section className="sec sec-dark">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="kicker micro">What you get</span>
          <h2>Built for trades where trust has to be verifiable.</h2>
        </div>
        <div className="cards4">
          {CARDS.map((c) => (
            <article className="hcard rv" key={c.t}>
              <div className="ic">{c.ic}</div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </article>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 44 }} className="rv">
          <a className="btn btn-y" href={LINKS.bot} target="_blank" rel="noopener noreferrer">
            <TgIcon /> Open Telegram Bot
          </a>
        </div>
      </div>
    </section>
  );
}
