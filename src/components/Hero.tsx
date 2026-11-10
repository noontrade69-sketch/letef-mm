import { LINKS, HERO, CHAT, VAULTS } from "@/lib/data";
import { TelegramIcon } from "./Icons";

function ChatPanel() {
  return (
    <div>
      <div className="chat">
        <div className="chat-head">
          <span className="dot" aria-hidden />
          <span className="name">Escrow room · deal #1043</span>
          <span className="tagchip">SAMPLE</span>
        </div>
        <div className="chat-body">
          {CHAT.map((m, i) => (
            <div key={i} className={`msg ${m.from === "bot" ? "bot" : "user"}`} style={{ ["--i" as string]: String(i) }}>
              {m.from !== "bot" && <span className="who">{m.from}</span>}
              {m.mono ? <code>{m.mono}</code> : <span>{m.text}</span>}
              {m.link && (
                <a className="blink" href={VAULTS[0].url} target="_blank" rel="noopener noreferrer">
                  {" "}{m.link} ↗
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="chat-foot">
          <div className="input-mock">Message</div>
        </div>
      </div>
      <p className="chat-cap">Sample deal flow — a real room shows the same messages for your deal.</p>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <h1>
              {HERO.h1a}
              <br />
              <span className="acc">{HERO.h1b}</span>
            </h1>
            <p className="sub">{HERO.sub}</p>
            <div className="hero-cta">
              <a className="btn btn-y" href={LINKS.bot} target="_blank" rel="noopener noreferrer">
                <TelegramIcon /> Open the bot
              </a>
              <a className="btn btn-ghost" href="#how-it-works">See how a deal runs</a>
            </div>
            <p className="join-note">
              <b>Before you start:</b>{" "}
              Join both{" "}
              <a href={LINKS.group} target="_blank" rel="noopener noreferrer">@LetefP2p</a>
              {" "}and{" "}
              <a href={LINKS.channel} target="_blank" rel="noopener noreferrer">@LetefMm</a>
              {" "}before opening the bot.
            </p>
          </div>
          <ChatPanel />
        </div>

        <div className="factstrip rv">
          {HERO.facts.map((f) => (
            <div className="cell" key={f.k}>
              <div className="v">{f.v}</div>
              <div className="k">{f.k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
