"use client";

import { useMemo, useState } from "react";

/* Fee calculator — implements ONLY the exact published fee logic:
   service 0.75 / 0.50 / 0.25 % by bio-tag count, network fee row chosen
   explicitly by the visitor (standard / with bio tag). Nothing inferred.
   Estimates only — not a live transaction quote. */

type TagCount = 0 | 1 | 2;
const SERVICE: Record<TagCount, number> = { 0: 0.0075, 1: 0.005, 2: 0.0025 };
const NETWORK = {
  bep: { label: "BNB Smart Chain (BEP-20)", standard: 0.2, tagged: 0.2 },
  tron: { label: "TRON (TRC-20)", standard: 3.0, tagged: 2.0 },
} as const;

const fmt = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function FeeCalc() {
  const [amount, setAmount] = useState("100");
  const [tags, setTags] = useState<TagCount>(2);
  const [chain, setChain] = useState<keyof typeof NETWORK>("bep");
  const [netRow, setNetRow] = useState<"standard" | "tagged">("standard");

  const out = useMemo(() => {
    const amt = Math.max(0, Number(amount) || 0);
    const servicePct = SERVICE[tags];
    const service = amt * servicePct;
    const net = NETWORK[chain][netRow];
    const netAmount = Math.max(0, amt - service - net);
    return { amt, servicePct, service, net, netAmount };
  }, [amount, tags, chain, netRow]);

  const seg = (pressed: boolean) => ({ "aria-pressed": pressed }) as { "aria-pressed": boolean };

  return (
    <div className="calc">
      <h3>Fee calculator</h3>
      <div className="row">
        <label htmlFor="calc-amt">Deal size (USDT)</label>
        <input
          id="calc-amt" type="number" inputMode="decimal" min={0} step="1"
          value={amount} onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="row">
        <label>How many sides carry the @letefmm bio tag?</label>
        <div className="seg" role="group" aria-label="Bio tag count">
          {([0, 1, 2] as TagCount[]).map((n) => (
            <button key={n} type="button" {...seg(tags === n)} onClick={() => setTags(n)}>
              {["Neither", "One side", "Both"][n]}
            </button>
          ))}
        </div>
      </div>
      <div className="row">
        <label>Network</label>
        <div className="seg" role="group" aria-label="Network">
          <button type="button" {...seg(chain === "bep")} onClick={() => setChain("bep")}>BEP-20</button>
          <button type="button" {...seg(chain === "tron")} onClick={() => setChain("tron")}>TRC-20</button>
        </div>
      </div>
      <div className="row">
        <label>Network fee row</label>
        <div className="seg" role="group" aria-label="Network fee row">
          <button type="button" {...seg(netRow === "standard")} onClick={() => setNetRow("standard")}>Standard</button>
          <button type="button" {...seg(netRow === "tagged")} onClick={() => setNetRow("tagged")}>With bio tag</button>
        </div>
      </div>

      <div className="calc-out" aria-live="polite">
        <div className="line"><span>Deal size</span><b>{fmt(out.amt)} USDT</b></div>
        <div className="line"><span>Service fee ({(out.servicePct * 100).toFixed(2)}%)</span><b>{fmt(out.service)} USDT</b></div>
        <div className="line"><span>Network fee — {NETWORK[chain].label}</span><b>{fmt(out.net)} USDT</b></div>
        <div className="net line"><span>Estimated net amount</span><b>{fmt(out.netAmount)} USDT</b></div>
      </div>
      <p className="calc-disc">
        Estimates only — the contract charges the published fee on completion. Selected assumptions
        are shown above; this is not a live transaction quote. Minimum deal size: 3 USDT.
      </p>
    </div>
  );
}
