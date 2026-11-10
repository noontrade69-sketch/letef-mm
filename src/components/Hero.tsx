"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { LINKS, TRUST_STRIP, STICKERS } from "@/lib/data";
import { TelegramIcon } from "./Icons";

const VaultScene = dynamic(() => import("./VaultScene"), { ssr: false });

function Poster() {
  /* SVG poster fallback — same composition, shown until WebGL mounts (and forever if unavailable) */
  return (
    <svg viewBox="0 0 640 520" className="hero-poster-fallback" aria-hidden style={{ width: "min(88vw, 560px)", height: "auto" }}>
      <g transform="translate(320,250)">
        <polygon points="0,-150 130,-75 130,75 0,150 -130,75 -130,-75" fill="#241e12" stroke="#F0B90B" strokeWidth="5" />
        <polygon points="0,-105 91,-52 91,52 0,105 -91,52 -91,-52" fill="none" stroke="#1d6650" strokeWidth="5" />
        <circle cx="0" cy="0" r="34" fill="#F0B90B" />
        <circle cx="-215" cy="-66" r="22" fill="#cfc7b4" />
        <circle cx="215" cy="52" r="22" fill="#1d6650" />
        <path d="M-193 -60 C -120 -120, -60 -90, -24 -30" stroke="#F0B90B" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="2 14" />
        <circle cx="-60" cy="-88" r="13" fill="#F0B90B" />
      </g>
    </svg>
  );
}

export default function Hero() {
  const [mount3d, setMount3d] = useState(false);
  const [running, setRunning] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  /* Lazy-mount WebGL only AFTER the page fully loads + browser is idle, so the
     scene download never competes with the hero render (Part 12 performance).
     Mobile keeps the poster — text and CTA immediately, no scene weight. */
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1081px)").matches;
    if (rm || !desktop) return;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
      if (idle) idle(() => setMount3d(true));
      else setTimeout(() => setMount3d(true), 200);
    };
    if (document.readyState === "complete") {
      const t = setTimeout(go, 400);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", go, { once: true });
    return () => window.removeEventListener("load", go);
  }, []);

  /* Pause rendering when hero is off-screen or tab hidden (Part 12) */
  useEffect(() => {
    if (!mount3d) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting && !document.hidden), { threshold: 0.05 });
    if (stageRef.current) io.observe(stageRef.current);
    const vis = () => setRunning(document.hidden ? false : true);
    document.addEventListener("visibilitychange", vis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, [mount3d]);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-grid-lines" aria-hidden />
      <div className="wrap">
        <div className="hero-inner">
          <p className="kicker hero-kicker">Letef Mm · Trusted P2P Escrow</p>
          <div className="hero-stage" ref={stageRef}>
            <h1 className="display hero-type">
              <span className="l1">P2P trades.</span>
              <br />
              <span className="l2">Crypto secured</span>
              <br />
              <span className="l1">by a smart contract.</span>
            </h1>
            <div className="hero-canvas" aria-hidden>
              {mount3d ? <VaultScene running={running} /> : <Poster />}
            </div>
            <div className="stickers" aria-label="Key facts">
              <span className="sticker st-1">{STICKERS[0].t}<small>{STICKERS[0].s}</small></span>
              <span className="sticker st-2">{STICKERS[1].t}<small>{STICKERS[1].s}</small></span>
              <span className="sticker st-3">{STICKERS[2].t}<small>{STICKERS[2].s}</small></span>
            </div>
          </div>
          <p className="hero-copy">
            Letef Mm gives buyers and sellers a Telegram-native escrow room. The seller&rsquo;s
            crypto is locked on-chain while the buyer pays local currency directly to the seller.
          </p>
          <div className="hero-cta">
            <a className="btn btn-amber" href={LINKS.bot} target="_blank" rel="noopener noreferrer">
              <TelegramIcon /> Open Telegram Bot
            </a>
            <a className="btn btn-out" href={LINKS.group} target="_blank" rel="noopener noreferrer">Join the community</a>
          </div>
          <p className="join-note">
            <b>Before you start:</b> Join both{" "}
            <a href={LINKS.group} target="_blank" rel="noopener noreferrer">@LetefP2p</a> and{" "}
            <a href={LINKS.channel} target="_blank" rel="noopener noreferrer">@LetefMm</a>{" "}
            before opening the bot.
          </p>
        </div>
        <div className="trust">
          {TRUST_STRIP.map((t) => (
            <div className="cell" key={t.i}>
              <i>{t.i}</i> {t.t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
