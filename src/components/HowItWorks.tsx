"use client";

import { useEffect, useRef, useState } from "react";
import { STEPS, DISPUTES, LINKS } from "@/lib/data";
import { AlertIcon, TgIcon } from "./Icons";

/* Scene 2 — pinned transaction story. A sticky diagram evolves through the six
   stages as the step list scrolls past. One gsap.timeline, scrubbed by seeking
   to each stage; every stage keeps its readable text so the sequence stays
   factual with animations disabled (static stack renders <=1080px and under
   reduced motion, where GSAP is never loaded). */

const VIEW = "0 0 460 520";

export default function HowItWorks() {
  const root = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth <= 1080) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const el = root.current;
      if (!el) return;
      setAnimated(true);

      const q = gsap.utils.selector(el);
      /* initial states (stage 0: nothing but the two traders) */
      gsap.set(q(".d-room, .d-roomline, .d-path-dep, .d-depflow, .d-lockring, .d-locklabel, .d-path-local, .d-locallabel, .d-path-rel, .d-relflow, .d-rellabel, .d-branch, .d-refundlabel, .d-disputelabel, .d-vouch, .d-voucline, .d-vouchlabel"), { opacity: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "none", duration: 1 } });
      /* A — deal created */
      tl.to(q(".d-room"), { opacity: 1, duration: 0.4 }, 0)
        .to(q(".d-roomline"), { opacity: 1, duration: 0.5, stagger: 0.12 }, 0.15)
        /* B — crypto deposited */
        .fromTo(q(".d-path-dep"), { strokeDasharray: 240, strokeDashoffset: 240 }, { strokeDashoffset: 0, duration: 0.6 }, 1)
        .to(q(".d-depflow"), { opacity: 1, duration: 0.2 }, 1.55)
        /* C — contract locked */
        .fromTo(q(".d-lockring"), { strokeDasharray: 380, strokeDashoffset: 380, opacity: 1 }, { strokeDashoffset: 0, duration: 0.6 }, 2)
        .to(q(".d-locklabel"), { opacity: 1, duration: 0.3 }, 2.4)
        /* D — local payment, outside the contract */
        .fromTo(q(".d-path-local"), { strokeDasharray: 300, strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 0.6 }, 3)
        .to(q(".d-locallabel"), { opacity: 1, duration: 0.3 }, 3.4)
        /* E — release to buyer */
        .fromTo(q(".d-path-rel"), { strokeDasharray: 240, strokeDashoffset: 240 }, { strokeDashoffset: 0, duration: 0.6 }, 4)
        .to(q(".d-relflow"), { opacity: 1, duration: 0.2 }, 4.55)
        .to(q(".d-rellabel"), { opacity: 1, duration: 0.3 }, 4.6)
        /* F — refund / dispute branch + vouch */
        .to(q(".d-branch"), { opacity: 1, duration: 0.5 }, 5)
        .to(q(".d-refundlabel, .d-disputelabel"), { opacity: 1, duration: 0.3, stagger: 0.1 }, 5.2)
        .fromTo(q(".d-voucline"), { strokeDasharray: 160, strokeDashoffset: 160 }, { strokeDashoffset: 0, duration: 0.4 }, 5.35)
        .to(q(".d-vouch, .d-vouchlabel"), { opacity: 1, duration: 0.35, stagger: 0.1 }, 5.5)
        .to({}, { duration: 0.3 }); /* tail so stage 6 has room */

      const seek = (i: number) => tl.tweenTo(Math.min(i + 1, 6.3), { duration: 0.8 });
      const stepEl = (i: number) => el.querySelector<HTMLElement>(`.hstep-${i}`);
      STEPS.forEach((_, i) => {
        const node = stepEl(i);
        if (!node) return;
        ScrollTrigger.create({
          trigger: node,
          start: "top 62%",
          end: "bottom 38%",
          onEnter: () => { node.classList.add("on"); seek(i); },
          onEnterBack: () => { node.classList.add("on"); seek(i); },
          onLeave: () => node.classList.remove("on"),
          onLeaveBack: () => node.classList.remove("on"),
        });
      });
      ctx = gsap.context(() => {}, el);
    })();
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <section className="sec sec-panel how" id="how-it-works" ref={root}>
      <div className="wrap">
        <div className="how-head rv">
          <span className="kicker micro">How it works</span>
          <h2>Six steps, from /deal to public proof.</h2>
          <p>Follow the money: crypto leg on-chain, local leg between the traders. Nothing is hidden.</p>
        </div>

        <div className="how-pin">
          {/* sticky diagram */}
          <div className="how-visual" aria-hidden="true">
            <svg viewBox={VIEW}>
              <defs>
                <linearGradient id="hmetal" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2B3139" />
                  <stop offset="100%" stopColor="#12161B" />
                </linearGradient>
                <linearGradient id="hgold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFD84D" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
              </defs>
              {/* trader nodes */}
              <g>
                <circle cx="64" cy="96" r="24" fill="url(#hmetal)" stroke="#F0B90B" strokeWidth="1.5" />
                <text className="node-label" x="64" y="56" textAnchor="middle">SELLER</text>
              </g>
              <g>
                <circle cx="396" cy="96" r="24" fill="url(#hmetal)" stroke="#2B3139" strokeWidth="1.5" />
                <text className="node-label" x="396" y="56" textAnchor="middle">BUYER</text>
              </g>

              {/* A — escrow room */}
              <line className="d-roomline" x1="86" y1="112" x2="196" y2="150" stroke="#2B3139" strokeWidth="1.4" />
              <line className="d-roomline" x1="374" y1="112" x2="264" y2="150" stroke="#2B3139" strokeWidth="1.4" />
              <g className="d-room">
                <rect x="160" y="150" width="140" height="58" rx="12" fill="#1E2329" stroke="#2B3139" />
                <text className="node-label" x="230" y="175" textAnchor="middle" fill="#EAECEF" fontSize="10.5">ESCROW ROOM</text>
                <text className="node-label" x="230" y="192" textAnchor="middle" fontSize="9" fill="#848E9C">Telegram · private</text>
              </g>

              {/* B — deposit path */}
              <path className="d-path-dep" d="M 78 118 Q 140 210 208 292" fill="none" stroke="#F0B90B" strokeWidth="2" />
              <g className="d-depflow">
                <circle cx="150" cy="212" r="9" fill="url(#hgold)" />
                <text className="tok" x="150" y="215" textAnchor="middle" fontSize="6">USDT</text>
              </g>

              {/* C — the vault core */}
              <g>
                <polygon points="230,268 300,308 300,388 230,428 160,388 160,308" fill="#12161B" stroke="#2B3139" strokeWidth="2" />
                <polygon className="d-lockring" points="230,282 288,316 288,380 230,414 172,380 172,316"
                  fill="none" stroke="#F0B90B" strokeWidth="2" />
                <circle cx="230" cy="348" r="15" fill="url(#hgold)" />
                <text className="d-locklabel stage-label" x="230" y="456" textAnchor="middle">LOCKED IN CONTRACT</text>
                <text className="node-label" x="230" y="474" textAnchor="middle" fontSize="9" fill="#848E9C">EscrowVaultV2 · BscScan public</text>
              </g>

              {/* D — local payment arc (top, direct) */}
              <path className="d-path-local" d="M 88 74 Q 230 8 372 74" fill="none" stroke="#EAECEF" strokeWidth="1.6" strokeDasharray="6 7" />
              <g className="d-locallabel">
                <text className="node-label" x="230" y="118" textAnchor="middle" fill="#EAECEF">LOCAL CURRENCY · DIRECT</text>
                <text className="node-label" x="230" y="134" textAnchor="middle" fontSize="8.5" fill="#848E9C">outside the contract</text>
              </g>

              {/* E — release path */}
              <path className="d-path-rel" d="M 292 300 Q 356 220 386 128" fill="none" stroke="#F0B90B" strokeWidth="2" />
              <g className="d-relflow">
                <circle cx="352" cy="216" r="9" fill="url(#hgold)" />
                <text className="tok" x="352" y="219" textAnchor="middle" fontSize="6">USDT</text>
              </g>
              <text className="d-rellabel node-label" x="404" y="230" fontSize="9" fill="#F0B90B">release()</text>

              {/* F — refund / dispute branch */}
              <path className="d-branch" d="M 168 300 Q 104 220 74 128" fill="none" stroke="#848E9C" strokeWidth="1.5" strokeDasharray="4 6" />
              <text className="d-refundlabel node-label" x="12" y="230" fontSize="9" fill="#B7BDC6">/refund → seller</text>
              <g className="d-disputelabel">
                <rect x="30" y="248" width="118" height="34" rx="8" fill="#1E2329" stroke="#F0B90B" strokeOpacity="0.6" />
                <text className="node-label" x="89" y="262" textAnchor="middle" fontSize="8.5" fill="#F0B90B">/dispute</text>
                <text className="node-label" x="89" y="275" textAnchor="middle" fontSize="7.5" fill="#848E9C">funds stay locked</text>
              </g>

              {/* vouch */}
              <line className="d-voucline" x1="230" y1="428" x2="230" y2="462" stroke="#F0B90B" strokeWidth="1.5" strokeDasharray="3 5" />
              <g className="d-vouch">
                <rect x="168" y="462" width="124" height="44" rx="10" fill="#17130A" stroke="#F0B90B" strokeOpacity="0.55" />
                <text className="node-label" x="230" y="482" textAnchor="middle" fontSize="9" fill="#F0B90B">PROOF CARD</text>
                <text className="node-label" x="230" y="497" textAnchor="middle" fontSize="7.5" fill="#848E9C">public vouch channel</text>
              </g>
              <text className="d-vouchlabel stage-label" x="230" y="30" textAnchor="middle" opacity="0">F · PUBLIC VOUCH</text>
            </svg>
          </div>

          {/* steps */}
          <div className="how-steps">
            {STEPS.map((s, i) => (
              <div className={`hstep hstep-${i}`} key={s.id}>
                <span className="num">{s.n}</span>
                <span className="tag micro">{s.tag}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* static fallback for mobile / reduced motion */}
        <div className="how-static">
          {STEPS.map((s) => (
            <div className="hstep" key={s.id}>
              <span className="num">{s.n}</span>
              <span className="tag micro">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>

        <div className="how-note rv">
          <h3><AlertIcon /> If something goes wrong</h3>
          <ul>
            {DISPUTES.map((d) => (
              <li key={d.cmd}>
                <b>{d.cmd}</b>
                <span>{d.body}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }} className="rv">
          <a className="btn btn-y" href={LINKS.bot} target="_blank" rel="noopener noreferrer">
            <TgIcon /> Open Telegram Bot
          </a>
        </div>
      </div>
    </section>
  );
}
