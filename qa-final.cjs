const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const out = {};
  /* axe stability: 3 mobile passes */
  out.mobileAxe = [];
  for (let i = 0; i < 3; i++) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const p = await ctx.newPage();
    await p.goto("http://localhost:4600", { waitUntil: "load" });
    await p.waitForTimeout(1000 + i * 400);
    const r = await new AxeBuilder({ page: p }).withTags(["wcag2a","wcag2aa"]).analyze();
    out.mobileAxe.push(r.violations.map(v => v.id + "×" + v.nodes.length).join(",") || "clean");
    await ctx.close();
  }
  /* commands char-exact in DOM */
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  await p.goto("http://localhost:4600", { waitUntil: "load" });
  await p.waitForTimeout(1000);
  const text = await p.evaluate(() => document.body.innerText);
  const cmds = ["/deal","/balance","/release","/refund","/cancel","/dispute","/restart","/verify","/add","/stats","/leaderboard","/start","/help","/calc","/support","/vouch"];
  out.commands = cmds.every(c => text.includes(c)) ? "all 16 present" : cmds.filter(c => !text.includes(c)).join(",");
  out.calc100 = text.includes("/calc 100*0.9925");
  /* banned phrases scan of rendered text */
  const banned = ["trustless","audited","insured","risk-free","100% safe","guaranteed","Binance","licensed","TVL","exchange and broker","we hold your"];
  out.bannedHits = banned.filter(w => text.toLowerCase().includes(w.toLowerCase()));
  /* join-note string exact */
  out.joinNote = text.includes("Join both @LetefP2p and @LetefMm before opening the bot.");
  out.bioTag = text.includes("Add @letefmm to your Telegram bio. It is free and lowers the service fee.");
  out.vaultNote = text.includes("Your crypto is deposited into a public smart-contract vault, not a staff member's personal wallet.");
  out.stageD = text.includes("Local currency is paid directly between traders — it is not held in the crypto escrow contract.");
  out.stageE = text.includes("Only confirm release after the payment has actually arrived.");
  out.illustrative = text.includes("Illustrative layout — not a real trade");
  /* keyboard: tab focus visible on first CTA */
  await p.keyboard.press("Tab");
  out.focusVisible = await p.evaluate(() => { const a = document.activeElement; return a && (a.classList.contains("btn") || a.tagName === "A"); });
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
