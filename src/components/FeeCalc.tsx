"use client";

import { useState } from "react";

const TAG_OPTIONS = [
  { label: "No tag", n: 0 },
  { label: "One side", n: 1 },
  { label: "Both sides", n: 2 },
];
const NETWORKS = [
  { label: "BNB Chain (BEP-20)", fee: 0.2, taggedFee: 0.2 },
  { label: "TRON (TRC-20)", fee: 3.0, taggedFee: 2.0 },
];
const RATES = [0.0075, 0.005, 0.0025];

export default function FeeCalc() {
  const [amt, setAmt] = useState("100");
  const [tags, setTags] = useState(2);
  const [net, setNet] = useState(0);

  const amount = Math.max(0, parseFloat(amt) || 0);
  const service = amount * RATES[tags];
  const network = tags === 2 ? NETWORKS[net].taggedFee : NETWORKS[net].fee;
  const total = amount - service - network;
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
      <span className="lbl" id="calc-tags-lbl">@letefmm bio tag</span>
      <div className="seg" role="group" aria-labelledby="calc-tags-lbl">
        {TAG_OPTIONS.map((o) => (
          <button key={o.n} type="button" aria-pressed={tags === o.n} onClick={() => setTags(o.n)}>
            {o.label}
          </button>
        ))}
      </div>
      <span className="lbl" id="calc-net-lbl">Network</span>
      <div className="seg two" role="group" aria-labelledby="calc-net-lbl">
        {NETWORKS.map((n, i) => (
          <button key={n.label} type="button" aria-pressed={net === i} onClick={() => setNet(i)}>
            {n.label}
          </button>
        ))}
      </div>
      <div className="calc-out" aria-live="polite">
        <div className="row"><span>Deal size</span><b>{f(amount)} USDT</b></div>
        <div className="row"><span>Service fee ({(RATES[tags] * 100).toFixed(2)}%)</span><b>{f(service)} USDT</b></div>
        <div className="row"><span>Network fee — {NETWORKS[net].label}</span><b>{f(network)} USDT</b></div>
        <div className="row total"><span>Estimated net</span><b>{f(total)} USDT</b></div>
      </div>
      <p className="calc-note">Estimates only. The contract charges the fee on release or refund.</p>
    </div>
  );
}
