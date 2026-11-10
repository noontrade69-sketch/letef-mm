"use client";

import { useState } from "react";
import { FAQ } from "@/lib/data";
import { ChevronIcon } from "./Icons";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="sec" id="faq">
      <div className="wrap">
        <div className="sec-head rv">
          <h2>Questions traders actually ask.</h2>
        </div>
        <div className="qa rv">
          {FAQ.map((f, i) => (
            <div className="qa-item" key={i} data-open={open === i}>
              <button
                className="q"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {f.q}
                <ChevronIcon className="chev" />
              </button>
              <div className="a">
                <div><p>{f.a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
