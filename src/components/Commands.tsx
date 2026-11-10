"use client";

import { useState } from "react";
import { COMMANDS } from "@/lib/data";

function CmdRow({ cmd, desc }: { cmd: string; desc: string }) {
  const [ok, setOk] = useState(false);
  const copy = async () => {
    let done = false;
    try {
      await navigator.clipboard.writeText(cmd);
      done = true;
    } catch {
      /* fall through */
    }
    if (!done) {
      try {
        const ta = document.createElement("textarea");
        ta.value = cmd;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        done = document.execCommand("copy");
        ta.remove();
      } catch {
        done = false;
      }
    }
    if (done) {
      setOk(true);
      setTimeout(() => setOk(false), 1400);
    }
  };
  return (
    <div className="cmd-row">
      <code>{cmd}</code>
      <p>{desc}</p>
      <button className={`copy-btn${ok ? " ok" : ""}`} onClick={copy} aria-label={`Copy ${cmd}`}>
        {ok ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export default function Commands() {
  return (
    <section className="sec commands" id="commands">
      <div className="wrap">
        <p className="kicker rv" style={{ color: "var(--green)" }}>Commands</p>
        <h2 className="rv">Everything the bot answers to.</h2>
        <p className="lede rv">Scope depends on where you type it — main group, escrow room, or private chat.</p>
        <div className="cmd-cols rv">
          {COMMANDS.map((g) => (
            <div className="cmd-col" key={g.group}>
              <p className="g">{g.group}</p>
              {g.items.map((it) => (
                <CmdRow key={it.cmd} {...it} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
