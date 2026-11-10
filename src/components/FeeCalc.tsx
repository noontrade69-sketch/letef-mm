"use client";

import { useState } from "react";

/* Part 4 rules: tag count picker + network picker + a SEPARATE network-fee-row
   picker (standard / with bio tag). Never inferred from the tag count.
   Shows the assumptions next to the numbers. Not a live quote. */

const TAGS = [
  { label: "No tag", n: 0 },
  { label: "One side", n: 1 },
  { label: "Both sides", n: 2 },
];
const RATES = [0.0075, 0.005, 0.0025];
const NETWORKS = [
  { label: "BNB Chain", full: "BNB Smart Chain (BEP-20)", std: 0.2, tag: 0.2 },
  { label: "TRON", full: "TRON (TRC-20)", std: 3.0, tag: 2.0 },
];

export default function FeeCalc() {
  const [amt, setAmt] = useState("100");
  const [tags, setTags] = useState(2);
  const [net, setNet] = useState(0);
  const [row, setRow] = useState<"std" | "tag">("tag");

  const amount = Math.max(0, parseFloat(amt) || 0);
  const service = amount * RATES[tags];
  const networkFee = row === "tag" ? NETWORKS[net].tag : NETWORKS[net].std;
  const netOut = amount - service - networkFee;
  const f = (x: number) => x.toFixed(2);

  return (
    <div className="calc rv">
      <h3>Fee calculator</h3>
      <label className="lbl" htmlFor="calc-amt">Deal size (USDT)</label>
      <input
        id="calc-amt"
        type="text"
        inputMode="decimal"
        value={amt}
        onChange={(e) => setAmt(e.target.value.replace(/[^0-9.]/g, ""))}
      />
      <span className="lbl" id="lbl-tags">@letefmm bio tag</span>
      <div className="seg c3" role="group" aria-labelledby="lbl-tags">
        {TAGS.map((o) => (
          <button key={o.n} type="button" aria-pressed={tags === o.n} onClick={() => setTags(o.n)}>
            {o.label}
          </button>
        ))}
      </div>
      <span className="lbl" id="lbl-net">Network</span>
      <div className="seg c2" role="group" aria-labelledby="lbl-net">
        {NETWORKS.map((n, i) => (
          <button key={n.label} type="button" aria-pressed={net === i} onClick={() => setNet(i)}>
            {n.label}
          </button>
        ))}
      </div>
      <span className="lbl" id="lbl-row">Network fee row</span>
      <div className="seg c2" role="group" aria-labelledby="lbl-row">
        <button type="button" aria-pressed={row === "std"} onClick={() => setRow("std")}>Standard</button>
        <button type="button" aria-pressed={row === "tag"} onClick={() => setRow("tag")}>With bio tag</button>
      </div>
      <div className="calc-out" aria-live="polite">
        <div className="row"><span>Deal size</span><b>{f(amount)} USDT</b></div>
        <div className="row"><span>Service fee ({(RATES[tags] * 100).toFixed(2)}% · {TAGS[tags].label})</span><b>{f(service)} USDT</b></div>
        <div className="row"><span>Network fee ({NETWORKS[net].label} · {row === "tag" ? "with bio tag" : "standard"})</span><b>{f(networkFee)} USDT</b></div>
        <div className="row total"><span>Estimated net</span><b>{f(netOut)} USDT</b></div>
      </div>
      <p className="calc-note">
        Estimates only — not a live transaction quote. Assumptions shown above; the contract
        charges the fee on release or refund.
      </p>
    </div>
  );
}
