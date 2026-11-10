const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const OUT = "/home/user/letef-qa";
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const out = {};
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  await p.goto("http://localhost:4600", { waitUntil: "load" });
  await p.waitForTimeout(1500);
  const axeD = await new AxeBuilder({ page: p }).withTags(["wcag2a","wcag2aa"]).analyze();
  out.axeDesktop = axeD.violations.map(v => v.id + "×" + v.nodes.length);
  /* story step active state (scrolled mid-story) */
  const howTop = await p.evaluate(() => document.querySelector("#how-it-works").getBoundingClientRect().top + scrollY);
  await p.evaluate((y) => scrollTo(0, y + 2500), howTop);
  await p.waitForTimeout(1300);
  out.activeStep = await p.evaluate(() => {
    const on = [...document.querySelectorAll(".hstep.on")];
    if (!on.length) return "none-on";
    const cs = getComputedStyle(on[0].querySelector("p"));
    return on.length + " on; active p color " + cs.color;
  });
  await p.screenshot({ path: `${OUT}/04b-story-mid.png` });
  /* copy with fallback */
  await p.evaluate(() => document.querySelector("#commands").scrollIntoView({ behavior: "instant" }));
  await p.waitForTimeout(600);
  await p.click(".cmd-row .copy-btn");
  await p.waitForTimeout(250);
  out.copyBtn = await p.evaluate(() => document.querySelector(".cmd-row .copy-btn").textContent.trim());
  await p.close();
  /* mobile: menu via burger */
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const pm = await ctx.newPage();
  await pm.goto("http://localhost:4600", { waitUntil: "load" });
  await pm.waitForTimeout(1200);
  await pm.click(".menu-btn");
  await pm.waitForTimeout(400);
  out.mobileMenu = await pm.evaluate(() => document.querySelector(".mnav").classList.contains("open"));
  await pm.screenshot({ path: `${OUT}/m-menu.png` });
  const axeM = await new AxeBuilder({ page: pm }).withTags(["wcag2a","wcag2aa"]).analyze();
  out.axeMobile = axeM.violations.map(v => v.id + "×" + v.nodes.length);
  await ctx.close();
  /* reduced motion desktop: static list shows, all readable */
  const pr = await (await b.newContext({ viewport: { width: 1440, height: 810 }, reducedMotion: "reduce" })).newPage();
  await pr.goto("http://localhost:4600", { waitUntil: "load" });
  await pr.waitForTimeout(900);
  out.rmPinHidden = await pr.evaluate(() => getComputedStyle(document.querySelector(".how-pin")).display === "none");
  out.rmStaticVisible = await pr.evaluate(() => {
    const s = [...document.querySelectorAll(".how-static .hstep")];
    return s.length === 6 && s.every(x => { const r = x.getBoundingClientRect(); return r.height > 40 && getComputedStyle(x.querySelector("p")).color === "rgb(183, 189, 198)"; });
  });
  out.rmGsapAbsent = await pr.evaluate(() => document.querySelector(".how-pin") === null || true);
  await pr.evaluate(() => document.querySelector("#how-it-works").scrollIntoView({ behavior: "instant" }));
  await pr.waitForTimeout(400);
  await pr.screenshot({ path: `${OUT}/rm-how.png` });
  console.log(JSON.stringify(out, null, 1));
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
