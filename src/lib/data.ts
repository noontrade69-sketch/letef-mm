/* Single source of truth. Every value verbatim from LETEF_MM_REDESIGN_PROMPT.txt.
   Do not invent data. Part references in comments map to the prompt file. */

export const LINKS = {
  bot: "https://t.me/LetefP2pAgent",
  group: "https://t.me/LetefP2p",
  groupHandle: "@LetefP2p",
  channel: "https://t.me/LetefMm",
  channelHandle: "@LetefMm",
  vouch: "https://t.me/LetefVouch",
  vouchHandle: "@LetefVouch",
  support: "https://t.me/Crypeti",
  supportHandle: "@Crypeti",
  line1: "https://t.me/zvaku",
  line2: "https://t.me/letef",
  developer: "https://t.me/letef",
};

export const JOIN_NOTE = "Join both @LetefP2p and @LetefMm before opening the bot.";

export const VAULTS = [
  {
    tier: "0.25% tier",
    address: "0xa91ffF1E9eb8d0621560cdcf0f6BbE60b7182BF8",
    url: "https://bscscan.com/address/0xa91ffF1E9eb8d0621560cdcf0f6BbE60b7182BF8",
  },
  {
    tier: "0.50% tier",
    address: "0xF101df779D9dA44cF1C44F8CA0E750277E4A14D5",
    url: "https://bscscan.com/address/0xF101df779D9dA44cF1C44F8CA0E750277E4A14D5",
  },
  {
    tier: "0.75% tier",
    address: "0x4198c2b639703d86D80beA498a0BE905671495Ae",
    url: "https://bscscan.com/address/0x4198c2b639703d86D80beA498a0BE905671495Ae",
  },
];

export const VAULT_LEAD =
  "Your crypto is deposited into a public smart-contract vault, not a staff member's personal wallet.";

/* Part 3 — exactly six steps (condensed from the approved wording) */
export const STEPS = [
  {
    id: "deal",
    n: "01",
    label: "STEP 1 · OPEN THE DEAL",
    title: "Open the deal",
    body: "Run /deal in the main group. The bot creates a private escrow room for the two traders and the bot, then collects the details step by step: amount, network, coin, rate, payment method, and each side's wallet address.",
    short: "Open /deal in @LetefP2p",
  },
  {
    id: "deposit",
    n: "02",
    label: "STEP 2 · SELLER DEPOSITS",
    title: "Seller deposits",
    body: "The seller sends crypto to the escrow vault contract on-chain. The bot shows a QR code and the contract address; the sender submits the transaction hash and the bot verifies it on-chain.",
    short: "Crypto goes to the vault contract",
  },
  {
    id: "locked",
    n: "03",
    label: "STEP 3 · LOCKED IN CONTRACT",
    title: "Locked in the contract",
    body: "The vault holds the seller's crypto for the whole deal. Your crypto is deposited into a public smart-contract vault, not a staff member's personal wallet.",
    short: "EscrowVaultV2 holds it",
  },
  {
    id: "local",
    n: "04",
    label: "STEP 4 · LOCAL PAYMENT — OUTSIDE THE CONTRACT",
    title: "Buyer pays local currency",
    body: "The buyer pays the seller in local currency directly between themselves and confirms in the room. Local currency is paid directly between traders — it is not held in the crypto escrow contract.",
    short: "Straight to the seller — never into the vault",
  },
  {
    id: "release",
    n: "05",
    label: "STEP 5 · CONFIRMATION / RELEASE",
    title: "Confirm and release",
    body: "The bot coordinates the release flow; the release itself is a contract call to the buyer's wallet. Only confirm release after the payment has actually arrived.",
    short: "Release only after payment arrives",
  },
  {
    id: "vouch",
    n: "06",
    label: "STEP 6 · PUBLIC VOUCH",
    title: "Public vouch",
    body: "The deal closes and a public vouch proof card is generated and posted to the vouch channel. /vouch re-issues a trader's latest proof at any time.",
    short: "Receipts in @LetefVouch",
  },
];

export const FIAT_LINE =
  "Local currency is paid directly between traders — it is not held in the crypto escrow contract.";

export const SAFETY_LINE = "Only confirm release after the payment has actually arrived.";

export const MARQUEE = [
  "Crypto locked in a smart contract",
  "Pay the seller directly",
  "Release only after payment arrives",
  "Public vouches",
];

export const TRUST_STRIP = [
  { i: "01", t: "On-chain escrow" },
  { i: "02", t: "Published vault contracts" },
  { i: "03", t: "Public trade vouches" },
  { i: "04", t: "Human dispute support" },
];

export const STICKERS = [
  { t: "Crypto locked on-chain", s: "Smart contract" },
  { t: "Pay the seller directly", s: "Local currency" },
  { t: "Public vouches", s: "@LetefVouch" },
];

/* Part 3 — refund / dispute branch */
export const DISPUTE = [
  {
    cmd: "/refund",
    body: "returns the funds to the seller's address through the contract flow.",
  },
  {
    cmd: "/dispute",
    body: "alerts admins and brings them into the room before anything moves. Funds stay locked while a dispute is open.",
  },
];

/* Part 4 — fees */
export const FEES = {
  tiers: [
    { pct: "0.75%", cond: "Neither side has the bio tag", vaultIdx: 2 },
    { pct: "0.50%", cond: "One side has the bio tag", vaultIdx: 1 },
    { pct: "0.25%", cond: "Both sides have the bio tag", vaultIdx: 0, best: true },
  ],
  network: [
    { chain: "BNB Smart Chain (BEP-20)", standard: "0.20 USDT", tagged: "0.20 USDT" },
    { chain: "TRON (TRC-20)", standard: "3.00 USDT", tagged: "2.00 USDT" },
  ],
  chips: [
    "3 USDT minimum deal",
    "No fee to open a deal",
    "No fee to cancel unfunded",
    "No subscription",
    "No hidden charges",
  ],
  bioTagBox:
    "Add @letefmm to your Telegram bio. It is free and lowers the service fee. When both traders carry the tag, the lowest published service fee is 0.25%.",
};

/* Part 5 — security mechanisms */
export const MECHS = [
  "EscrowVaultV2 on BNB Smart Chain supports deposit, release(to, amount), refund(to, amount), fee accounting and fee withdrawal.",
  "Release and refund are callable only by the contract owner role. That operator power is part of the published design.",
  "Fee percentage changes must be queued and wait 24 hours before activation; they can be cancelled in that window.",
  "The vault can be paused in an emergency, which blocks release and refund.",
  "Reentrancy protection exists on fund-moving functions.",
  "Every release and refund emits an on-chain event with gross amount, net amount and fee.",
  "Payment addresses are shown back to participants for confirmation before funds move.",
  "Disputes notify admins, post to the dispute channel and pull an admin into the deal room. Funds stay locked while a dispute is open.",
];

/* Part 5 — risk disclosure, shown prominently */
export const RISKS = [
  "Escrow protects the crypto side of the trade from the counterparty taking it without paying.",
  "It does not protect against a buyer sending a wrong or reversed bank transfer.",
  "It does not remove price or market risk.",
  "Letef Mm is not a bank, not a custodian of local currency and not an investment product.",
  "Users must never release funds before they have actually received payment.",
];

/* Part 7 — commands */
export const COMMANDS = [
  {
    group: "Main group",
    items: [{ cmd: "/deal", desc: "open a new escrow deal" }],
  },
  {
    group: "Escrow room",
    items: [
      { cmd: "/balance", desc: "show what is currently locked in escrow" },
      { cmd: "/release", desc: "release the locked crypto to the buyer's wallet" },
      { cmd: "/refund", desc: "return the funds to the seller" },
      { cmd: "/cancel", desc: "cancel an unfunded deal (both sides confirm)" },
      { cmd: "/dispute", desc: "raise a dispute and bring admins into the room" },
      { cmd: "/restart", desc: "reset trade details of an unfinished deal" },
      { cmd: "/verify", desc: "confirm a participant is who they claim to be" },
      { cmd: "/add", desc: "add a participant between deposit and release" },
      { cmd: "/stats", desc: "show your volume and completed deal count" },
      { cmd: "/leaderboard", desc: "show top traders" },
    ],
  },
  {
    group: "Private chat",
    items: [
      { cmd: "/start", desc: "verify channel membership and open the menu" },
      { cmd: "/help", desc: "full command list" },
      { cmd: "/calc", desc: "fee calculator, e.g. /calc 100*0.9925" },
      { cmd: "/support", desc: "reach a human" },
      { cmd: "/vouch", desc: "re-send your latest proof" },
    ],
  },
];

/* Part 6 — vouches */
export const VOUCH_POINTS = [
  "Each completed deal produces a gold proof card: deal ID, amount, network, rate, date.",
  "Three vouches per deal: one for the buyer, one for the seller, one public record.",
  "Vouches can be copied and reused.",
  "/vouch re-issues the trader's latest proof.",
  "Proofs are rebuilt from the database, do not expire, and are backed by an on-chain transaction.",
];

/* Part 8 — FAQ */
export const FAQ = [
  {
    q: "What happens if the seller never sends the crypto?",
    a: "Nothing is released; the deal does not fund, and cancelling an unfunded deal costs nothing.",
  },
  {
    q: "What if the buyer does not pay?",
    a: "The seller raises a dispute instead of releasing; admins step into the room and funds stay locked until resolution.",
  },
  {
    q: "Can Letef Mm take my funds?",
    a: "The published contract rules are public: release and refund are callable only by the contract owner role, the vault can be paused in an emergency, and any fee change requires a 24-hour timelock that can be cancelled in that window. All three vault addresses are public on BscScan — verify them yourself rather than trusting this page.",
  },
  { q: "Do I need to install anything?", a: "No. Telegram and a wallet address." },
  {
    q: "How is the fee charged?",
    a: "By the contract on completion, at the tier set by bio-tag status.",
  },
  {
    q: "Why is there a minimum?",
    a: "Below 3 USDT, network costs outweigh the trade.",
  },
  {
    q: "What if I send to the wrong network?",
    a: "Always match the network and address shown on the deposit screen before sending.",
  },
  {
    q: "How do I prove I traded here?",
    a: "/vouch re-issues the latest proof, and completed deals are published in the vouch channel.",
  },
  {
    q: "Why does the bot not respond?",
    a: "You must join both the main group and the channel first: @LetefP2p and @LetefMm.",
  },
];

/* Part 10 — market reference */
export const MARKET = {
  disclaimer:
    "Market reference only — not a trade quote or price guarantee. Prices move; escrow does not remove market risk.",
  coins: [
    { id: "tether", sym: "USDT", name: "Tether USD", peg: true },
    { id: "binancecoin", sym: "BNB", name: "BNB · fee coin on BNB Chain", peg: false },
    { id: "tron", sym: "TRX", name: "TRON · fee coin on TRC-20", peg: false },
  ],
};
