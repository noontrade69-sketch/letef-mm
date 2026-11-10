const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const OUT = "/home/user/letef-qa/v2";
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const out = {};
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  const errs = [];
  p.on("pageerror", e => errs.push(e.message.slice(0, 120)));
  p.on("console", m => { if (m.type() === "error") errs.push(m.text().slice(0, 120)); });
  await p.goto("http://localhost:4610", { waitUntil: "load" });
  await p.waitForTimeout(2000);
  const axeD = await new AxeBuilder({ page: p }).withTags(["wcag2a", "wcag2aa"]).analyze();
  out.axeDesktop = axeD.violations.map(v => v.id + "×" + v.nodes.length);
  const text = await p.evaluate(() => document.body.innerText);
  const expected = [
    "0xa91ffF1E9eb8d0621560cdcf0f6BbE60b7182BF8",
    "0xF101df779D9dA44cF1C44F8CA0E750277E4A14D5",
    "0x4198c2b639703d86D80beA498a0BE905671495Ae",
  ];
  out.vaults = expected.map(a => text.includes(a));
  const cmds = ["/deal","/balance","/release","/refund","/cancel","/dispute","/restart","/verify","/add","/stats","/leaderboard","/start","/help","/calc","/support","/vouch"];
  out.commands = cmds.every(c => text.includes(c)) ? "ALL 16" : "MISSING " + cmds.filter(c => !text.includes(c));
  out.banned = ["trustless","audited","insured","risk-free","100% safe","guaranteed","binance","licensed"].filter(w => text.toLowerCase().includes(w));
  out.joinNote = text.includes("Join both @LetefP2p and @LetefMm before opening the bot.");
  out.bioTag = text.includes("Add @letefmm to your Telegram bio. It is free and lowers the service fee.");
  out.vaultLead = text.includes("Your crypto is deposited into a public smart-contract vault, not a staff member's personal wallet.");
  out.stageD = text.includes("Local currency is paid directly between traders — it is not held in the crypto escrow contract.");
  out.stageE = text.includes("Only confirm release after the payment has actually arrived.");
  out.illustrative = text.includes("Illustrative layout — not a real trade");
  /* calculator */
  await p.evaluate(() => document.querySelector("#fees").scrollIntoView({ behavior: "instant" }));
  await p.waitForTimeout(700);
  await p.fill("#calc-amt", "100");
  await p.waitForTimeout(300);
  out.calc = (await p.evaluate(() => document.querySelector(".calc-out").innerText)).replace(/\n/g, " | ");
  /* fee tier default = both sides → 0.25% */
  /* links */
  out.links = await p.evaluate(() => {
    const s = new Set();
    document.querySelectorAll("a[href]").forEach(a => s.add(a.getAttribute("href")));
    return [...s].length + " unique: " + [...s].filter(h => h.startsWith("https")).join(" ");
  });
  await p.evaluate(() => scrollTo(0, 0));
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${OUT}/d-hero.png` });
  const shots = [["d-flow", "#how-it-works"], ["d-fees", "#fees"], ["d-vaults", "#vaults"], ["d-commands", "#commands"], ["d-vouches", "#vouches"], ["d-faq", "#faq"], ["d-footer", ".footer"]];
  for (const [n, s] of shots) {
    await p.evaluate(x => document.querySelector(x).scrollIntoView({ behavior: "instant" }), s);
    await p.waitForTimeout(900);
    await p.screenshot({ path: `${OUT}/${n}.png` });
  }
  out.desktopErrs = errs.slice(0, 4);
  await p.close();
  /* mobile */
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const pm = await ctx.newPage();
  await pm.goto("http://localhost:4610", { waitUntil: "load" });
  await pm.waitForTimeout(1800);
  out.mobileOverflow = await pm.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  const axeM = await new AxeBuilder({ page: pm }).withTags(["wcag2a", "wcag2aa"]).analyze();
  out.axeMobile = axeM.violations.map(v => v.id + "×" + v.nodes.length);
  await pm.screenshot({ path: `${OUT}/m-hero.png` });
  await pm.evaluate(() => document.querySelector("#fees").scrollIntoView({ behavior: "instant" }));
  await pm.waitForTimeout(800);
  await pm.screenshot({ path: `${OUT}/m-fees.png` });
  await pm.click(".menu-btn");
  await pm.waitForTimeout(350);
  out.mobileMenu = await pm.evaluate(() => document.querySelector(".mnav").classList.contains("open"));
  await pm.screenshot({ path: `${OUT}/m-menu.png` });
  await ctx.close();
  /* reduced motion */
  const pr = await (await b.newContext({ viewport: { width: 1440, height: 810 }, reducedMotion: "reduce" })).newPage();
  await pr.goto("http://localhost:4610", { waitUntil: "load" });
  await pr.waitForTimeout(1000);
  out.rmMsgsVisible = await pr.evaluate(() => [...document.querySelectorAll(".msg")].every(m => getComputedStyle(m).opacity === "1"));
  console.log(JSON.stringify(out, null, 1));
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
