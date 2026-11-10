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

export const FEES = {
  service: [
    { tag: "Neither side has the bio tag", pct: "0.75%" },
    { tag: "One side has the bio tag", pct: "0.50%" },
    { tag: "Both sides have the bio tag", pct: "0.25%" },
  ],
  network: [
    { chain: "BNB Smart Chain (BEP-20)", standard: "0.20 USDT", tagged: "0.20 USDT" },
    { chain: "TRON (TRC-20)", standard: "3.00 USDT", tagged: "2.00 USDT" },
  ],
  minDeal: 3,
  bioTag: "@letefmm",
};

export const STEPS = [
  {
    id: "deal",
    n: "01",
    tag: "A · DEAL CREATED",
    title: "Deal created",
    body: "Open /deal in the main group. The bot creates a private escrow room for the two traders and the bot, then collects details step by step: amount, network, coin, rate, payment method, and each side's wallet address.",
  },
  {
    id: "deposit",
    n: "02",
    tag: "B · CRYPTO DEPOSITED",
    title: "Crypto deposited",
    body: "The seller sends crypto to the escrow vault contract on-chain. The bot displays a QR code and contract address; the sender submits the transaction hash and the bot verifies it on-chain.",
  },
  {
    id: "locked",
    n: "03",
    tag: "C · CONTRACT LOCKED",
    title: "Contract locked",
    body: "The vault holds the seller's crypto. The contract emits an on-chain event, and the room shows the deal as funded. Nothing moves without the contract's release or refund functions.",
  },
  {
    id: "local",
    n: "04",
    tag: "D · LOCAL PAYMENT — OUTSIDE THE CONTRACT",
    title: "Local payment",
    body: "The buyer pays the seller in local currency directly between themselves and confirms in the room. Local currency is paid directly between traders — it is not held in the crypto escrow contract.",
  },
  {
    id: "release",
    n: "05",
    tag: "E · CONFIRMATION / RELEASE",
    title: "Confirmation / release",
    body: "The bot coordinates the release flow; the release itself is a contract call to the buyer's wallet. Only confirm release after the payment has actually arrived.",
  },
  {
    id: "vouch",
    n: "06",
    tag: "F · PUBLIC VOUCH",
    title: "Public vouch",
    body: "The deal closes and a public vouch proof card is generated and posted to the vouch channel. /vouch re-issues the trader's latest proof at any time.",
  },
];

export const DISPUTES = [
  { cmd: "/refund", body: "returns the funds to the seller's address through the contract flow." },
  { cmd: "/dispute", body: "alerts admins and brings them into the room before anything moves; funds stay locked while the dispute is open." },
  { cmd: "Never release early", body: "users must never release funds before they have actually received the local-currency payment." },
];

export const COMMANDS = [
  {
    group: "In the main group",
    items: [{ cmd: "/deal", desc: "Open a new escrow deal." }],
  },
  {
    group: "Inside an escrow room",
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
    group: "In private chat",
    items: [
      { cmd: "/start", desc: "Verify channel membership and open the menu." },
      { cmd: "/help", desc: "Full command list." },
      { cmd: "/calc", desc: "Fee calculator, e.g. /calc 100*0.9925." },
      { cmd: "/support", desc: "Reach a human." },
      { cmd: "/vouch", desc: "Re-send your latest proof." },
    ],
  },
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
