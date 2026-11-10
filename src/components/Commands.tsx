"use client";

import { useState } from "react";
import { COMMANDS } from "@/lib/data";
import { CopyIcon, CheckIcon } from "./Icons";

function CopyRow({ cmd, desc }: { cmd: string; desc: string }) {
  const [ok, setOk] = useState(false);
  const copy = async () => {
    let done = false;
    try {
      await navigator.clipboard.writeText(cmd);
      done = true;
    } catch {
      /* clipboard API unavailable — fall through to execCommand */
    }
    if (!done) {
      try {
        const ta = document.createElement("textarea");
        ta.value = cmd;
        ta.setAttribute("readonly", "");
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
        {ok ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export default function Commands() {
  return (
    <section className="sec sec-panel" id="commands">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="kicker micro">Commands</span>
          <h2>Everything the bot can do, on one page.</h2>
          <p>Where a command works depends on where you use it — main group, escrow room, or private chat.</p>
        </div>
        <div className="cmd-groups">
          {COMMANDS.map((g) => (
            <div className="cmd-group rv" key={g.group}>
              <h3>{g.group}</h3>
              {g.items.map((it) => (
                <CopyRow key={it.cmd} cmd={it.cmd} desc={it.desc} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
