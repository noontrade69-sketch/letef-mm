const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const OUT = "/home/user/letef-qa";
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const out = {};
  /* desktop */
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message.slice(0, 120)));
  p.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 120)); });
  await p.goto("http://localhost:4600", { waitUntil: "load" });
  await p.waitForTimeout(1500);
  const axeD = await new AxeBuilder({ page: p }).withTags(["wcag2a", "wcag2aa"]).analyze();
  out.axeDesktop = axeD.violations.map(v => v.id + "×" + v.nodes.length);
  /* every link on the page */
  out.links = await p.evaluate(() => {
    const seen = {};
    document.querySelectorAll("a[href]").forEach(a => { const h = a.getAttribute("href"); seen[h] = (seen[h] || 0) + 1; });
    return Object.keys(seen).length + " unique, " + JSON.stringify(seen);
  });
  /* vault addresses character-exact vs expected */
  const expected = ["0xa91ffF1E9eb8d0621560cdcf0f6BbE60b7182BF8", "0xF101df779D9dA44cF1C44F8CA0E750277E4A14D5", "0x4198c2b639703d86D80beA498a0BE905671495Ae"];
  const bodyText = await p.evaluate(() => document.body.innerText);
  out.vaults = expected.map(a => bodyText.includes(a));
  /* fee calculator math: 100 USDT, both tagged, BEP, tagged row → service 0.25, net fee 0.20, net 99.55 */
  await p.evaluate(() => document.querySelector("#fees").scrollIntoView({ behavior: "instant" }));
  await p.waitForTimeout(700);
  await p.fill("#calc-amt", "100");
  await p.waitForTimeout(300);
  const calcText = await p.evaluate(() => document.querySelector(".calc-out").innerText);
  out.calc = calcText.replace(/\n/g, " | ");
  /* copy button */
  await p.evaluate(() => document.querySelector("#commands").scrollIntoView({ behavior: "instant" }));
  await p.waitForTimeout(600);
  await p.click(".cmd-row .copy-btn");
  await p.waitForTimeout(200);
  out.copyBtn = await p.evaluate(() => document.querySelector(".cmd-row .copy-btn").textContent.trim());
  /* FAQ accordion keyboard */
  await p.evaluate(() => document.querySelector("#faq").scrollIntoView({ behavior: "instant" }));
  await p.waitForTimeout(500);
  await p.click(".qa button");
  await p.waitForTimeout(450);
  out.faqOpens = await p.evaluate(() => document.querySelector(".qa").getAttribute("data-open"));
  out.desktopErrs = errs.slice(0, 5);
  await p.close();
  /* mobile */
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const pm = await ctx.newPage();
  const merrs = [];
  pm.on("pageerror", (e) => merrs.push(e.message.slice(0, 120)));
  await pm.goto("http://localhost:4600", { waitUntil: "load" });
  await pm.waitForTimeout(1500);
  out.mobileOverflow = await pm.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  const axeM = await new AxeBuilder({ page: pm }).withTags(["wcag2a", "wcag2aa"]).analyze();
  out.axeMobile = axeM.violations.map(v => v.id + "×" + v.nodes.length);
  await pm.screenshot({ path: `${OUT}/m-hero.png` });
  await pm.evaluate(() => document.querySelector(".sticky-cta a").click());
  await pm.waitForTimeout(600);
  out.mobileMenu = await pm.evaluate(() => document.querySelector(".mnav").classList.contains("open"));
  await pm.screenshot({ path: `${OUT}/m-menu.png` });
  out.mobileErrs = merrs.slice(0, 5);
  await ctx.close();
  /* reduced motion */
  const pr = await (await b.newContext({ viewport: { width: 1440, height: 810 }, reducedMotion: "reduce" })).newPage();
  await pr.goto("http://localhost:4600", { waitUntil: "load" });
  await pr.waitForTimeout(1200);
  out.rmHeroVisible = await pr.evaluate(() => document.querySelector("h1").getBoundingClientRect().height > 40);
  out.rmStepsVisible = await pr.evaluate(() => { const s = [...document.querySelectorAll(".hstep")]; return s.length > 6 && s.every(x => getComputedStyle(x).opacity === "1"); });
  await pr.screenshot({ path: `${OUT}/rm-hero.png` });
  console.log(JSON.stringify(out, null, 1));
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
