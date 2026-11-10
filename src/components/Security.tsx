"use client";

import { useState } from "react";
import { VAULTS, VAULT_LEAD, MECHS, RISKS } from "@/lib/data";
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
      <button className={`copy-btn${ok ? " ok" : ""}`} onClick={copy} aria-label={`Copy ${tier} vault address`}>
        {ok ? <CheckIcon /> : <CopyIcon />}
      </button>
      <a className="ext" href={url} target="_blank" rel="noopener noreferrer">
        BscScan <ExternalIcon />
      </a>
    </div>
  );
}

export default function Security() {
  return (
    <section className="sec security" id="security">
      <div className="wrap">
        <p className="kicker rv" style={{ color: "var(--green)" }}>Security</p>
        <h2 className="rv">Read the contract. That is the whole trick.</h2>
        <p className="lede rv">{VAULT_LEAD} Everything below is published — including the operator powers.</p>

        <div className="vault-rows rv">
          {VAULTS.map((v) => (
            <AddrRow key={v.address} {...v} />
          ))}
        </div>
        <p className="rv" style={{ marginTop: 12, fontSize: 13, color: "#6d6553" }}>
          EscrowVaultV2 · BNB Smart Chain. One vault per fee tier — the deal picks the tier.
          Contract status is not shown live on this page; verify it on BscScan.
        </p>

        <div className="mechs rv">
          {MECHS.map((m) => (
            <div className="mech" key={m.slice(0, 30)}>
              <LockIcon />
              <span>{m}</span>
            </div>
          ))}
        </div>

        <div className="risk-box rv">
          <h3>Risk disclosure — read this part</h3>
          <ul>
            {RISKS.map((r) => (
              <li key={r.slice(0, 30)}>{r}</li>
            ))}
          </ul>
          <p className="scope">
            Escrow secures the crypto leg of the deal only. It is not a guarantee of the local
            payment, and it is not price protection.
          </p>
        </div>
      </div>
    </section>
  );
}
