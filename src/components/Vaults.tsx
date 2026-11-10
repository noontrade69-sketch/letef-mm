"use client";

import { useState } from "react";
import { VAULTS, VAULT_LEAD, MECHS, RISK_LINE } from "@/lib/data";
import { CopyIcon, CheckIcon, ExternalIcon, LockIcon } from "./Icons";

function AddrRow({ tier, address, url }: { tier: string; address: string; url: string }) {
  const [ok, setOk] = useState(false);
  const copy = async () => {
    let done = false;
    try {
      await navigator.clipboard.writeText(address);
      done = true;
    } catch {
      /* fall through */
    }
    if (!done) {
      try {
        const ta = document.createElement("textarea");
        ta.value = address;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        done = document.execCommand("copy");
        ta.remove();
      } catch {
        done = false;
      }
    }
    if (done) {
      setOk(true);
      setTimeout(() => setOk(false), 1400);
    }
  };
  return (
    <div className="vrow">
      <span className="tier">{tier}</span>
      <span className="addr">{address}</span>
      <button
        className={`copy-btn${ok ? " ok" : ""}`}
        onClick={copy}
        aria-label={`Copy ${tier} vault address`}
      >
        {ok ? <CheckIcon width={14} height={14} /> : <CopyIcon width={14} height={14} />}
      </button>
      <a className="ext" href={url} target="_blank" rel="noopener noreferrer">
        BscScan <ExternalIcon />
      </a>
    </div>
  );
}

export default function Vaults() {
  return (
    <section className="sec" id="vaults">
      <div className="wrap">
        <div className="sec-head rv">
          <h2>The contract is the product.</h2>
          <p className="sub">{VAULT_LEAD} Read the functions, check the addresses, verify every event on BscScan.</p>
        </div>

        <div className="rv">
          {VAULTS.map((v) => (
            <AddrRow key={v.address} {...v} />
          ))}
          <p className="vcap">EscrowVaultV2 · BNB Smart Chain. One vault per fee tier; the deal picks the tier.</p>
        </div>

        <div className="mechs rv">
          {MECHS.map((m) => (
            <div className="mech" key={m.slice(0, 28)}>
              <LockIcon />
              <span>{m}</span>
            </div>
          ))}
        </div>

        <p className="risk rv">{RISK_LINE}</p>
      </div>
    </section>
  );
}
