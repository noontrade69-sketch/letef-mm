# Letef Mm — Design Brief (v3 rebuild)

## Brief
Letef Mm is a Telegram-native P2P USDT escrow service: a bot opens a private escrow
room per deal, a public smart-contract vault (EscrowVaultV2, BNB Smart Chain) holds the
seller's crypto, the buyer pays local currency directly to the seller, and the contract
releases only on confirmation. Completed deals are publicly vouched.

**The visitor:** a P2P trader (often new to on-chain escrow) deciding in seconds whether
this is safe and how it works.

**The one thing they must understand:**
"The crypto goes into the public vault contract. The local payment goes straight to the
seller. It never enters the contract."

## Moodboard notes (reference frames → feel)
- 3D showcase reel: camera-motion · one-object-hero · confident
- Donut/plant sites: full-screen color ownership · playful scale
- Studio site: one thick drawn line · labeled stops · warm paper
- Marquee strips: bold type as texture · energy without imagery
- Designed loader: logo-first · sets mood in seconds
- Monochrome crowd + one color: restraint as a punchline
Feel targets: poster-loud, editorial, tactile, warm — never neon, never generic dark SaaS.

## Palette (small, repeated everywhere)
| Role | Color | Use |
|---|---|---|
| Dark ink | `#17130B` | Base dark sections, text on paper |
| Light surface | `#F5EFE2` | Base light sections, text on ink |
| Main accent | `#F0B90B` | CTAs, crypto path, highlights (logo gold) |
| Second accent | `#16513F` | Contract / "locked" state, security |
| Branch only | `#E04E1B` | Local-currency payment line ONLY — never decor |

Six story steps own full-bleed backgrounds from this family (paper → ink → green →
paper+fiat → amber → ink). Color never carries meaning alone; every block pairs with a
text label. Contrast checked for body copy on every background.

## Type
- Display: **Archivo Black** — huge poster headlines, tight leading.
- Body/UI: **Archivo** — clean grotesque, 400–700.
- Numerals in tables/fees: tabular (`font-variant-numeric: tabular-nums`).
- Mono: **IBM Plex Mono** — addresses, commands, hashes only.
All self-hosted via next/font. No external font requests.

## Sitemap (per reference pack)
1. Hero (3D vault, giant type, bot + community CTAs, join-both note, trust strip)
2. Problem / Promise
3. How it works — ONE pinned story: camera into the vault, then six color-blocked steps
4. Refund / Dispute branch
5. Fees (three tiers + BscScan links + network fees + calculator)
6. Security (mechanisms, owner role, pause, timelock, prominent risk limits)
7. Market reference (live USDT / BNB / TRX, clearly secondary, loading + error states)
8. Vouches (monochrome + one accent, proof-card shape, link to @LetefVouch)
9. Commands (copyable)
10. FAQ / Support / Terms & Risk
11. Final CTA (vault resolves to a calm still, Open Telegram Bot)

## Motion rules (hard)
Native scroll; no hijack; one pinned story only. Every large movement explains the
transaction. The fiat line never enters the vault. Disputes never animate as automatic
refunds. Reduced motion: full static story, marquee static, loader skipped, 3D replaced
by the poster fallback. Loader ≤1.2 s, skippable, never blocks headline or CTA.
