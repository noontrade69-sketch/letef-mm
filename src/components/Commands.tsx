"use client";

import { useState } from "react";
import { COMMANDS } from "@/lib/data";
import { CopyIcon, CheckIcon } from "./Icons";

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
        {ok ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  );
}

export default function Commands() {
  return (
    <section className="sec" id="commands">
      <div className="wrap">
        <div className="sec-head rv">
          <h2>The bot&rsquo;s whole vocabulary.</h2>
          <p className="sub">
            Scope depends on where you type it — main group, escrow room, or private chat.
          </p>
        </div>

        <div className="term rv">
          <div className="term-bar" aria-hidden>
            <i /><i /><i />
            <span className="path">letef@bot ~ commands</span>
          </div>
          <div className="term-cols">
            {COMMANDS.map((g) => (
              <div className="term-col" key={g.group}>
                <p className="g">{g.group}</p>
                {g.items.map((it) => (
                  <CmdRow key={it.cmd} {...it} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
