"use client";

import { useEffect, useState } from "react";

/* Designed loader (Part 9.2 G): logo + line that draws into a vault hex.
   ≤1.2s, skippable, never blocks content — overlay only, removed from DOM.
   Skipped entirely for reduced motion and repeat views in the same session. */
export default function Loader() {
  const [state, setState] = useState<"hidden" | "show" | "done">("hidden");

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm || sessionStorage.getItem("letef-loader")) return;
    sessionStorage.setItem("letef-loader", "1");
    setState("show");
    const t = setTimeout(() => setState("done"), 1150);
    const skip = () => setState("done");
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  useEffect(() => {
    if (state !== "done") return;
    const t = setTimeout(() => setState("hidden"), 380);
    return () => clearTimeout(t);
  }, [state]);

  if (state === "hidden") return null;

  return (
    <div className={`loader${state === "done" ? " done" : ""}`} aria-hidden>
      <div className="loader-in">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/letef-mark.svg" alt="" width={64} height={64} />
        <svg viewBox="0 0 130 122">
          <polygon className="hexline" points="65,6 122,38 122,84 65,116 8,84 8,38" />
        </svg>
        <p className="cap">Trusted P2P Escrow</p>
      </div>
    </div>
  );
}
