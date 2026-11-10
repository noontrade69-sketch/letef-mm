"use client";

import { useEffect, useRef, useState } from "react";
import { MARKET } from "@/lib/data";

/* Part 10 — small live market-reference section. Clearly secondary.
   Free CoinGecko endpoints, no key. Cached 5 min in sessionStorage.
   Lazy-loaded when the section approaches the viewport.
   Loading skeleton + graceful error state + mandated label. */

type Quote = { usd: number; chg: number | null };
type Spark = Record<string, number[]>;
type Cache = { t: number; quotes: Record<string, Quote>; sparks: Spark };

const KEY = "letef-mkt-v1";
const TTL = 5 * 60 * 1000;

function sparkPath(points: number[], w = 220, h = 44): string {
  if (points.length < 2) return "";
  const min = Math.min(...points);
  const max = Math.max(...points);
  const rng = max - min || 1;
  const step = w / (points.length - 1);
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(i * step).toFixed(1)} ${(h - 3 - ((p - min) / rng) * (h - 6)).toFixed(1)}`)
    .join(" ");
}

export default function Market() {
  const [data, setData] = useState<Cache | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();
        void load();
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) {
        const c: Cache = JSON.parse(raw);
        if (Date.now() - c.t < TTL) {
          setData(c);
          setState("ok");
          return;
        }
      }
    } catch {
      /* ignore cache errors */
    }
    setState("loading");
    try {
      const ids = MARKET.coins.map((c) => c.id).join(",");
      const r = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
        { headers: { accept: "application/json" } }
      );
      if (!r.ok) throw new Error(String(r.status));
      const j = await r.json();
      const quotes: Record<string, Quote> = {};
      for (const c of MARKET.coins) {
        quotes[c.id] = { usd: j[c.id]?.usd ?? 0, chg: j[c.id]?.usd_24h_change ?? null };
      }
      const sparks: Spark = {};
      await Promise.all(
        MARKET.coins.map(async (c) => {
          try {
            const r2 = await fetch(`https://api.coingecko.com/api/v3/coins/${c.id}/market_chart?vs_currency=usd&days=1`, {
              headers: { accept: "application/json" },
            });
            if (!r2.ok) return;
            const j2 = await r2.json();
            const prices: number[] = (j2.prices || []).map((p: [number, number]) => p[1]);
            const thin = prices.filter((_, i) => i % Math.max(1, Math.floor(prices.length / 60)) === 0);
            if (thin.length > 1) sparks[c.id] = thin;
          } catch {
            /* sparkline optional */
          }
        })
      );
      const c: Cache = { t: Date.now(), quotes, sparks };
      try {
        sessionStorage.setItem(KEY, JSON.stringify(c));
      } catch {
        /* storage may be full — fine */
      }
      setData(c);
      setState("ok");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="sec market" id="market" ref={ref}>
      <div className="wrap">
        <p className="kicker rv" style={{ color: "var(--green)" }}>Market reference</p>
        <h2 className="rv">What the fee coins are doing.</h2>
        <p className="lede rv">
          USDT is the asset escrowed; BNB and TRX pay network fees on the two supported chains.
        </p>

        <div className="mk-grid">
          {MARKET.coins.map((c) => {
            const q = data?.quotes[c.id];
            const spark = data?.sparks?.[c.id];
            return (
              <div className="mk-card" key={c.id}>
                <span className="sym">{c.sym}</span>
                <span className="name" style={{ display: "block" }}>{c.name}</span>
                {state === "ok" && q ? (
                  <>
                    <div className="px tnum">
                      ${q.usd < 0.99 || q.usd > 1.01 ? q.usd.toFixed(q.usd >= 10 ? 2 : 4) : q.usd.toFixed(3)}
                    </div>
                    <div className={`chg tnum ${((q.chg ?? 0) >= 0) ? "up" : "down"}`}>
                      {q.chg === null ? "—" : `${q.chg >= 0 ? "▲" : "▼"} ${Math.abs(q.chg).toFixed(2)}% · 24 h`}
                    </div>
                    {spark ? (
                      <svg className="spark" viewBox="0 0 220 44" preserveAspectRatio="none" role="img" aria-label={`${c.sym} price, last 24 hours`}>
                        <path d={sparkPath(spark)} fill="none" stroke={c.peg ? "#16513F" : "#17130B"} strokeWidth="2.5" />
                      </svg>
                    ) : (
                      <div className="err">Chart unavailable — price shown is current.</div>
                    )}
                    {c.peg && <div className="err">Peg reference — USDT targets $1.00.</div>}
                  </>
                ) : state === "error" ? (
                  <div className="err">Prices unavailable right now.</div>
                ) : (
                  <>
                    <div className="px" aria-hidden>—</div>
                    <div className="skl" aria-hidden />
                  </>
                )}
              </div>
            );
          })}
        </div>
        <p className="mk-note rv">{MARKET.disclaimer}</p>
      </div>
    </section>
  );
}
