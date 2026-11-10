const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })).newPage();
  await p.goto("http://localhost:4600", { waitUntil: "load" });
  await p.waitForTimeout(1200);
  const r = await new AxeBuilder({ page: p }).withTags(["wcag2a","wcag2aa"]).analyze();
  for (const v of r.violations) {
    console.log(v.id);
    for (const n of v.nodes) {
      console.log("  target:", n.target.join(" "), "| html:", n.html.slice(0, 110));
      console.log("  msg:", ((n.any[0]||{}).message||"").replace(/\s+/g," ").slice(0,180));
    }
  }
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
