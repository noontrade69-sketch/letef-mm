/* Single source of truth for every fact on the site.
   All values come verbatim from the approved project brief. Do not invent data. */

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

export const VAULTS = [
  {
    tier: "0.25%",
    address: "0xa91ffF1E9eb8d0621560cdcf0f6BbE60b7182BF8",
    url: "https://bscscan.com/address/0xa91ffF1E9eb8d0621560cdcf0f6BbE60b7182BF8",
  },
  {
    tier: "0.50%",
    address: "0xF101df779D9dA44cF1C44F8CA0E750277E4A14D5",
    url: "https://bscscan.com/address/0xF101df779D9dA44cF1C44F8CA0E750277E4A14D5",
  },
  {
    tier: "0.75%",
    address: "0x4198c2b639703d86D80beA498a0BE905671495Ae",
    url: "https://bscscan.com/address/0x4198c2b639703d86D80beA498a0BE905671495Ae",
  },
];

export const HERO = {
  h1a: "Telegram escrow,",
  h1b: "settled on-chain.",
  sub: "Letef Mm runs escrow rooms for P2P deals. The seller's USDT is locked in a public smart-contract vault, the buyer pays local currency directly, and the contract releases only when both sides confirm.",
  join: "Join both @LetefP2p and @LetefMm before opening the bot.",
  facts: [
    { v: "0.25–0.75%", k: "Service fee per deal" },
    { v: "3 USDT", k: "Minimum deal size" },
    { v: "BSC + TRON", k: "Supported networks" },
    { v: "24 h", k: "Notice on any fee change" },
    { v: "Public", k: "Vaults, readable on BscScan" },
  ],
};

/* Sample escrow-room conversation. Numbers are illustrative and labeled as such on the page. */
export const CHAT = [
  { from: "buyer", mono: "/deal 100 USDT" },
  { from: "bot", text: "Deal #1043 opened. Private room · 2 traders + bot. Seller: send 100 USDT to the vault address shown below." },
  { from: "bot", text: "Deposit confirmed — 100 USDT locked in EscrowVaultV2.", link: "View on BscScan" },
  { from: "seller", text: "Deposit is in. @buyer, send the payment." },
  { from: "buyer", text: "Paid. Receiving now." },
  { from: "buyer", mono: "/release" },
  { from: "bot", text: "Both sides confirmed. 99.75 USDT released to the buyer's wallet · fee 0.25 USDT (0.25%). Deal complete." },
  { from: "bot", text: "Vouch posted in @LetefVouch." },
];

export const STEPS = [
  {
    n: "A",
    scope: "GROUP",
    title: "Open the deal",
    body: "Run /deal in @LetefP2p. The bot opens a private escrow room, then collects amount, network, coin, rate, payment method, and each side's wallet address.",
  },
  {
    n: "B",
    scope: "ON-CHAIN",
    title: "Seller deposits",
    body: "USDT goes straight to the vault contract. The bot shows the address, takes the transaction hash, and verifies the deposit on-chain before the room turns funded.",
  },
  {
    n: "C",
    scope: "CONTRACT",
    title: "The contract holds it",
    body: "EscrowVaultV2 keeps the amount locked for the whole deal. Your crypto is deposited into a public smart-contract vault, not a staff member's personal wallet.",
  },
  {
    n: "D",
    scope: "OFF-CHAIN",
    title: "Buyer pays local currency",
    body: "Local currency is paid directly between traders — it is not held in the crypto escrow contract. The contract never touches this leg.",
  },
  {
    n: "E",
    scope: "CONTRACT",
    title: "Confirm and release",
    body: "The release is a contract call to the buyer's wallet, coordinated by the bot. Only confirm release after the payment has actually arrived.",
  },
  {
    n: "F",
    scope: "PUBLIC",
    title: "Receipts for everyone",
    body: "Closing generates proof cards for buyer and seller and posts a public record in @LetefVouch. /vouch re-issues a trader's latest proof at any time.",
  },
];

export const DISPUTE = {
  title: "If a deal goes sideways",
  items: [
    { cmd: "/dispute", body: "alerts admins, pulls them into the room, and funds stay locked while it is open." },
    { cmd: "/refund", body: "returns the funds to the seller's address through the contract flow." },
    { cmd: "Never release early", body: "— release only after the local payment has actually arrived." },
  ],
};

export const FEES = {
  service: [
    { pct: "0.75%", cond: "No bio tag on the deal" },
    { pct: "0.50%", cond: "One side carries @letefmm" },
    { pct: "0.25%", cond: "Both sides carry @letefmm" },
  ],
  network: [
    { chain: "BNB Smart Chain (BEP-20)", standard: "0.20 USDT", tagged: "0.20 USDT" },
    { chain: "TRON (TRC-20)", standard: "3.00 USDT", tagged: "2.00 USDT" },
  ],
  chips: ["3 USDT minimum deal", "No fee to open a deal", "No fee to cancel unfunded", "No subscription"],
  bioTagBox:
    "Add @letefmm to your Telegram bio. It is free and lowers the service fee. When both traders carry the tag, the lowest published service fee is 0.25%.",
};

export const VAULT_LEAD =
  "Your crypto is deposited into a public smart-contract vault, not a staff member's personal wallet.";

export const MECHS = [
  "release() and refund() are owner-role calls. That operator power is part of the published design.",
  "Fee changes queue for 24 hours before they activate, and can be cancelled inside that window.",
  "The vault can be paused in an emergency, which blocks both release and refund.",
  "Reentrancy protection exists on every function that moves funds.",
  "Each release and refund emits an on-chain event with gross amount, net amount, and fee.",
  "Payment addresses are shown back to both participants for confirmation before the trade starts.",
  "Disputes notify admins, post to the dispute channel, and pull an admin into the room.",
  "Fee accounting lives on-chain: the contract takes its cut, events show the rest.",
];

export const RISK_LINE =
  "Escrow covers the crypto leg only. Admins mediate local-currency disputes; the contract executes the outcome.";

export const COMMANDS = [
  {
    group: "Main group",
    items: [{ cmd: "/deal", desc: "Open a new escrow deal." }],
  },
  {
    group: "Escrow room",
    items: [
      { cmd: "/balance", desc: "Show what is currently locked in escrow." },
      { cmd: "/release", desc: "Release the locked crypto to the buyer's wallet." },
      { cmd: "/refund", desc: "Return the funds to the seller." },
      { cmd: "/cancel", desc: "Cancel an unfunded deal (both sides confirm)." },
      { cmd: "/dispute", desc: "Raise a dispute and bring admins into the room." },
      { cmd: "/restart", desc: "Reset trade details of an unfinished deal." },
      { cmd: "/verify", desc: "Confirm a participant is who they claim to be." },
      { cmd: "/add", desc: "Add a participant between deposit and release." },
      { cmd: "/stats", desc: "Show your volume and completed deal count." },
      { cmd: "/leaderboard", desc: "Show top traders." },
    ],
  },
  {
    group: "Private chat",
    items: [
      { cmd: "/start", desc: "Verify channel membership and open the menu." },
      { cmd: "/help", desc: "Full command list." },
      { cmd: "/calc", desc: "Fee calculator, e.g. /calc 100*0.9925." },
      { cmd: "/support", desc: "Reach a human." },
      { cmd: "/vouch", desc: "Re-send your latest proof." },
    ],
  },
];

export const VOUCH_POINTS = [
  "Every completed deal produces a proof card: deal ID, amount, network, rate, date.",
  "Three vouches per deal — one for the buyer, one for the seller, one public record.",
  "Vouches can be copied and reused anywhere.",
  "/vouch re-issues a trader's latest proof at any time.",
  "Proofs are rebuilt from the database, do not expire, and are backed by an on-chain transaction.",
];

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
    a: "By the contract on completion, at the tier determined by the bio-tag status.",
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
