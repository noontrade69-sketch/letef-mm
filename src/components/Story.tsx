"use client";

import { useEffect, useRef, useState } from "react";
import type { gsap } from "gsap";
import { STEPS, FIAT_LINE, SAFETY_LINE, LINKS } from "@/lib/data";

/* ONE pinned scroll story (Part 9.2 B):
   phase 0 — the camera dives into the vault core,
   then six color-blocked steps with the deal path drawn on scroll.
   The local-currency line is a separate branch (different color) that
   NEVER enters the vault (Part 9.2 D). Native scroll, no snapping.
   Mobile / reduced motion: a full static stepper with the same colors. */

const PH = ["ph-a", "ph-b", "ph-c", "ph-d", "ph-e", "ph-f"];

function StageSVG() {
  /* 1440×810 layer: deal path seller→vault→buyer + separate fiat arc below.
     Stops sit in the upper band; the step card owns the lower left,
     the fiat label the top right — no collisions. */
  return (
    <svg className="story-svg" viewBox="0 0 1440 810" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {/* crypto path: seller → vault → buyer (amber) */}
      <path className="crypto-line crypto-l1" d="M 170 300 C 380 170, 560 160, 706 184" strokeDasharray="620" strokeDashoffset="620" />
      <path className="crypto-line crypto-l2" d="M 734 196 C 920 170, 1120 180, 1270 300" strokeDasharray="620" strokeDashoffset="620" />
      {/* fiat arc: seller → buyer, directly, dipping low. NEVER near the vault. */}
      <path className="fiat-line" d="M 170 330 C 400 660, 1040 660, 1270 330" strokeDasharray="1250" strokeDashoffset="1250" />
      {/* stops */}
      <g className="stop st-seller">
        <circle cx="170" cy="300" r="13" fill="#F0B90B" stroke="#17130B" strokeWidth="4" />
        <text x="170" y="348" textAnchor="middle">SELLER</text>
      </g>
      <g className="stop st-vault">
        <circle cx="720" cy="190" r="15" fill="#F0B90B" stroke="#17130B" strokeWidth="4" />
        <text x="720" y="238" textAnchor="middle">VAULT · LOCKED</text>
      </g>
      <g className="stop st-buyer">
        <circle cx="1270" cy="300" r="13" fill="#F0B90B" stroke="#17130B" strokeWidth="4" />
        <text x="1270" y="348" textAnchor="middle">BUYER</text>
      </g>
      <g className="stop st-vouch" transform="translate(1270,300)">
        <rect x="-66" y="-116" width="132" height="44" rx="8" fill="#17130B" stroke="#F0B90B" strokeWidth="3" />
        <text x="0" y="-88" textAnchor="middle" fill="#F0B90B">PROOF ✓</text>
      </g>
      <g className="fiat-label-box">
        <rect className="fiat-label-bg" x="712" y="76" width="640" height="62" rx="8" />
        <text className="fiat-label-text" x="1032" y="102" textAnchor="middle">Local currency is paid directly between traders —</text>
        <text className="fiat-label-text" x="1032" y="124" textAnchor="middle">it is not held in the crypto escrow contract.</text>
      </g>
    </svg>
  );
}

function DiveVault() {
  return (
    <svg className="dive-vault" viewBox="0 0 240 230" aria-hidden>
      <polygon points="120,8 226,68 226,162 120,222 14,162 14,68" fill="#241e12" stroke="#F0B90B" strokeWidth="5" />
      <circle className="core-halo" cx="120" cy="115" r="44" fill="#F0B90B" opacity="0.18" />
      <circle className="core" cx="120" cy="115" r="27" fill="#F0B90B" />
      <polygon className="door door-l" points="120,30 14,90 14,140 120,200" fill="#17130b" stroke="#F0B90B" strokeWidth="3" />
      <polygon className="door door-r" points="120,30 226,90 226,140 120,200" fill="#17130b" stroke="#F0B90B" strokeWidth="3" />
    </svg>
  );
}

export default function Story() {
  const secRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<"static" | "pinned">("static");

  /* Decide capability first; the timeline builds in a second effect,
     AFTER React has flushed the pinned DOM (no query race). */
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1081px)").matches;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (desktop && !rm) setMode("pinned");
  }, []);

  useEffect(() => {
    if (mode !== "pinned") return;
    let cancelled = false;
    let tl: gsap.core.Timeline | null = null;
    let st: import("gsap/ScrollTrigger").ScrollTrigger | null = null;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;

      const el = secRef.current;
      const stage = el?.querySelector<HTMLElement>(".story-stage");
      if (!el || !stage) return;

      tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          pin: stage,
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            const idx = p < 0.13 ? -1 : Math.min(5, Math.floor((p - 0.13) / 0.145));
            PH.forEach((c, i) => stage.classList.toggle(c, i === idx));
            const rail = el.querySelectorAll<HTMLElement>(".rail i");
            rail.forEach((r, i) => r.classList.toggle("on", i === idx));
          },
        },
      });
      st = tl.scrollTrigger ?? null;

      /* — dive (0 → 1.3) — */
      tl.fromTo(".dive-vault", { scale: 1 }, { scale: 7.5, transformOrigin: "50% 48.5%", duration: 1.3 }, 0)
        .to(".door-l", { x: -150, duration: 0.9 }, 0.25)
        .to(".door-r", { x: 150, duration: 0.9 }, 0.25)
        .to(".core-halo", { scale: 2.6, opacity: 0.55, transformOrigin: "50% 50%", duration: 1.0 }, 0.3)
        .to(".dive-hint", { autoAlpha: 0, duration: 0.25 }, 0.1)
        .to(".dive", { autoAlpha: 0, duration: 0.28 }, 1.02)
        /* — cards — */
        .fromTo(".sc-0", { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.22 }, 1.3)
        .to(".sc-0", { autoAlpha: 0, y: -26, duration: 0.2 }, 2.5)
        .fromTo(".sc-1", { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.22 }, 2.72)
        .to(".sc-1", { autoAlpha: 0, y: -26, duration: 0.2 }, 3.92)
        .fromTo(".sc-2", { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.22 }, 4.14)
        .to(".sc-2", { autoAlpha: 0, y: -26, duration: 0.2 }, 5.34)
        .fromTo(".sc-3", { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.22 }, 5.56)
        .to(".sc-3", { autoAlpha: 0, y: -26, duration: 0.2 }, 6.76)
        .fromTo(".sc-4", { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.22 }, 6.98)
        .to(".sc-4", { autoAlpha: 0, y: -26, duration: 0.2 }, 8.18)
        .fromTo(".sc-5", { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.22 }, 8.4)
        /* — path drawing — */
        .to(".story-svg", { autoAlpha: 1, duration: 0.3 }, 1.3)
        .to(".story-svg .crypto-l1", { strokeDashoffset: 0, duration: 1.2 }, 2.72)
        .to(".st-seller", { opacity: 1, duration: 0.18 }, 2.85)
        .to(".story-svg .crypto-l2", { strokeDashoffset: 0, duration: 1.2 }, 6.98)
        .to(".st-vault", { opacity: 1, duration: 0.18 }, 4.3)
        .to(".st-buyer", { opacity: 1, duration: 0.18 }, 7.6)
        .to(".st-vouch", { opacity: 1, duration: 0.22 }, 8.7)
        /* — fiat branch: draws in phase D only — */
        .to(".story-svg .fiat-line", { strokeDashoffset: 0, duration: 1.1 }, 5.56)
        .to(".story-svg .fiat-label-box", { opacity: 1, duration: 0.3 }, 6.1)
        .to({}, { duration: 0.5 }); // settle tail

      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      tl?.scrollTrigger?.kill();
      tl?.kill();
      st?.kill();
    };
  }, [mode]);

  return (
    <section className="story" id="how-it-works" ref={secRef} style={mode === "pinned" ? { height: "700vh" } : undefined}>
      {mode === "pinned" ? (
        <div className="story-stage">
          <div className="story-bg" />
          <StageSVG />
          <div className="dive">
            <DiveVault />
            <p className="dive-hint">Scroll — into the vault</p>
          </div>
          {STEPS.map((s, i) => (
            <div className={`stepcard sc-${i}`} key={s.id} style={{ opacity: 0 }}>
              <div className="in">
                <div>
                  <p className="num">{s.label}</p>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
                <p className="tagline">{s.short}</p>
              </div>
            </div>
          ))}
          <div className="rail" aria-hidden>
            {["A", "B", "C", "D", "E", "F"].map((l) => (
              <i key={l}>{l}</i>
            ))}
          </div>
        </div>
      ) : (
        <div className="story-static">
          <div className="diagram" aria-hidden>
            <svg viewBox="0 0 860 460">
              <path d="M 150 320 C 300 180, 420 180, 430 190" stroke="#c99700" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M 434 200 C 480 220, 580 240, 710 320" stroke="#c99700" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M 150 330 C 320 470, 560 470, 710 330" stroke="#E04E1B" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray="2 16" />
              <polygon points="430,120 512,166 512,240 430,286 348,240 348,166" fill="#241e12" stroke="#F0B90B" strokeWidth="5" />
              <circle cx="430" cy="203" r="22" fill="#F0B90B" />
              <circle cx="150" cy="320" r="16" fill="#F0B90B" stroke="#17130B" strokeWidth="4" />
              <circle cx="710" cy="320" r="16" fill="#F0B90B" stroke="#17130B" strokeWidth="4" />
              <text x="150" y="368" textAnchor="middle" fontFamily="var(--mono)" fontSize="15" fontWeight="600">SELLER</text>
              <text x="430" y="96" textAnchor="middle" fontFamily="var(--mono)" fontSize="15" fontWeight="600" fill="#17130B">VAULT · LOCKED</text>
              <text x="710" y="368" textAnchor="middle" fontFamily="var(--mono)" fontSize="15" fontWeight="600">BUYER</text>
              <rect x="120" y="408" width="620" height="46" rx="8" fill="#E04E1B" />
              <text x="430" y="428" textAnchor="middle" fontSize="13.5" fontWeight="600" fill="#fff">Local currency is paid directly between traders —</text>
              <text x="430" y="445" textAnchor="middle" fontSize="13.5" fontWeight="600" fill="#fff">it is not held in the crypto escrow contract.</text>
            </svg>
          </div>
          {STEPS.map((s) => (
            <div className={`sstep ${PH[STEPS.indexOf(s)]}`} key={s.id}>
              <div className="in">
                <p className="num">{s.label}</p>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
          <div className="sstep ph-d">
            <div className="in">
              <p className="num">SAFETY</p>
              <h3>Never release early</h3>
              <p>{SAFETY_LINE} If something looks wrong, /dispute keeps funds locked while admins join the room.</p>
              <p style={{ marginTop: 12 }}>
                <a className="btn btn-ink" href={LINKS.bot} target="_blank" rel="noopener noreferrer">Open Telegram Bot</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
