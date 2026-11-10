"use client";

import { useEffect, useRef } from "react";
import { LINKS } from "@/lib/data";

/* Signature hero visual: the escrow core — engineered dark-metal vault with a
   yellow contract heart, seller/contract/buyer nodes, and a USDT token that
   travels into the core and stays locked. Pure SVG + CSS motion (no WebGL),
   pointer parallax via rAF-throttled transform. Reduced motion: CSS disables
   all keyframes; parallax is not attached. */

export default function EscrowCore() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 14;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 10;
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--px", cx.toFixed(2) + "px");
      el.style.setProperty("--py", cy.toFixed(2) + "px");
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="core-scene" ref={ref} role="img"
      aria-label="Diagram: the seller's USDT travels into the escrow vault smart contract and is locked there; the buyer and seller connect through a Telegram escrow room.">
      <svg viewBox="0 0 600 600" aria-hidden="true">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F0B90B" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#F0B90B" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#F0B90B" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2B3139" />
            <stop offset="55%" stopColor="#1E2329" />
            <stop offset="100%" stopColor="#12161B" />
          </linearGradient>
          <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD84D" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E2329" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0B0E11" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* orbit rings */}
        <circle cx="300" cy="300" r="228" fill="none" stroke="#2B3139" strokeWidth="1" strokeDasharray="2 7" opacity="0.8" />
        <circle cx="300" cy="300" r="164" fill="none" stroke="#2B3139" strokeWidth="1" opacity="0.5" />

        <g className="core-parallax" style={{ transform: "translate(var(--px, 0px), var(--py, 0px))" }}>
          {/* orbiting satellite particles */}
          <g className="orbit-a">
            <circle cx="300" cy="72" r="3" fill="#F0B90B" opacity="0.75" />
            <circle cx="490" cy="380" r="2" fill="#848E9C" opacity="0.7" />
            <circle cx="140" cy="430" r="2" fill="#848E9C" opacity="0.55" />
          </g>
          <g className="orbit-b">
            <circle cx="136" cy="240" r="2.5" fill="#F0B90B" opacity="0.5" />
            <circle cx="428" cy="176" r="2" fill="#848E9C" opacity="0.6" />
          </g>

          {/* seller -> contract deposit path */}
          <path d="M 78 152 Q 190 210 282 288" fill="none" stroke="#2B3139" strokeWidth="1.4" />
          <path className="flow" d="M 78 152 Q 190 210 282 288" fill="none" stroke="#F0B90B" strokeWidth="1.6" />
          {/* contract -> buyer release path (dashed, passive) */}
          <path d="M 322 284 Q 420 208 522 152" fill="none" stroke="#2B3139" strokeWidth="1.4" strokeDasharray="3 6" />

          {/* travelling USDT token */}
          <g className="token-run">
            <circle cx="0" cy="0" r="13" fill="url(#gold)" stroke="#0B0E11" strokeWidth="1.5" />
            <text className="tok" x="0" y="3" textAnchor="middle">USDT</text>
          </g>

          {/* central escrow core */}
          <g className="core-heart">
            <circle cx="300" cy="300" r="118" fill="url(#glow)" />
            <polygon points="300,196 391,248 391,352 300,404 209,352 209,248"
              fill="url(#glass)" stroke="#2B3139" strokeWidth="2" />
            <polygon points="300,216 374,258 374,342 300,384 226,342 226,258"
              fill="none" stroke="#F0B90B" strokeWidth="1.4" opacity="0.65" strokeDasharray="40 14" />
            <polygon points="300,244 350,272 350,328 300,356 250,328 250,272"
              fill="url(#metal)" stroke="#2B3139" strokeWidth="1.5" />
            <circle cx="300" cy="300" r="21" fill="url(#gold)" />
            <circle cx="300" cy="300" r="21" fill="none" stroke="#FFD84D" strokeWidth="6" opacity="0.25" />
            <path d="M293 300l5 5 10-11" fill="none" stroke="#0B0E11" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* seller node */}
          <g>
            <circle cx="78" cy="152" r="26" fill="url(#metal)" stroke="#F0B90B" strokeWidth="1.6" />
            <circle cx="78" cy="146" r="7" fill="none" stroke="#B7BDC6" strokeWidth="2" />
            <path d="M67 160c2.5-5 6-7.5 11-7.5s8.5 2.5 11 7.5" fill="none" stroke="#B7BDC6" strokeWidth="2" strokeLinecap="round" />
            <text className="node-label" x="78" y="108" textAnchor="middle">SELLER</text>
          </g>
          {/* buyer node */}
          <g>
            <circle cx="522" cy="152" r="26" fill="url(#metal)" stroke="#2B3139" strokeWidth="1.6" />
            <circle cx="522" cy="146" r="7" fill="none" stroke="#B7BDC6" strokeWidth="2" />
            <path d="M511 160c2.5-5 6-7.5 11-7.5s8.5 2.5 11 7.5" fill="none" stroke="#B7BDC6" strokeWidth="2" strokeLinecap="round" />
            <text className="node-label" x="522" y="108" textAnchor="middle">BUYER</text>
          </g>

          {/* labels */}
          <text className="node-label" x="300" y="446" textAnchor="middle" fill="#F0B90B">SMART CONTRACT</text>
          <text className="node-label" x="300" y="466" textAnchor="middle" fontSize="10" fill="#848E9C" style={{ letterSpacing: "0.08em" }}>
            EscrowVault · public on-chain
          </text>
          <text className="node-label" x="150" y="205" fontSize="9.5" fill="#848E9C">deposit · verified on-chain</text>
          <text className="node-label" x="360" y="205" fontSize="9.5" fill="#848E9C">release() on confirmation</text>
        </g>
      </svg>
    </div>
  );
}
