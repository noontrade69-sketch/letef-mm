"use client";

import { useState } from "react";
import { FAQ, LINKS } from "@/lib/data";
import { PlusIcon } from "./Icons";

export default function Faq() {
  const [open, setOpen] = useState<number>(-1);
  return (
    <section className="sec sec-dark" id="faq">
      <div className="wrap">
        <div className="sec-head rv" style={{ textAlign: "center", marginInline: "auto" }}>
          <span className="kicker micro">FAQ</span>
          <h2>Asked before you ask.</h2>
        </div>
        <div className="faq">
          {FAQ.map((f, i) => (
            <div className="qa rv" key={f.q} data-open={open === i}>
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <PlusIcon />
              </button>
              <div className="a">
                <div><p>{f.a}</p></div>
              </div>
            </div>
          ))}
        </div>
        <p className="rv" style={{ textAlign: "center", marginTop: 26, fontSize: 14, color: "var(--text-3)" }}>
          Still stuck? Message <a href={LINKS.support} target="_blank" rel="noopener noreferrer" style={{ color: "var(--yellow)" }}>{LINKS.supportHandle}</a> — or check that you joined {LINKS.groupHandle} and {LINKS.channelHandle} first.
        </p>
      </div>
    </section>
  );
}
