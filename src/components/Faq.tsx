"use client";

import { useState } from "react";
import { FAQ, LINKS, JOIN_NOTE } from "@/lib/data";
import { ChevronIcon } from "./Icons";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="sec faq" id="faq">
      <div className="wrap">
        <p className="kicker rv" style={{ color: "var(--green)" }}>FAQ</p>
        <h2 className="rv">Asked before every first deal.</h2>
        <div className="qa rv">
          {FAQ.map((f, i) => (
            <div className="qa-item" key={i} data-open={open === i}>
              <button className="q" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                {f.q}
                <ChevronIcon className="chev" />
              </button>
              <div className="a">
                <div><p>{f.a}</p></div>
              </div>
            </div>
          ))}
          <div className="qa-item" data-open={open === 9}>
            <button className="q" aria-expanded={open === 9} onClick={() => setOpen(open === 9 ? null : 9)}>
              The bot does not respond — what now?
              <ChevronIcon className="chev" />
            </button>
            <div className="a">
              <div>
                <p>
                  {JOIN_NOTE} If a deal is stuck after that, open <code>/dispute</code> inside the
                  deal room, then message <a href={LINKS.support} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>support</a> with the deal ID.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
