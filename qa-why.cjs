const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  await p.goto("http://localhost:4600", { waitUntil: "load" });
  await p.waitForTimeout(1200);
  const r = await new AxeBuilder({ page: p }).withTags(["wcag2a","wcag2aa"]).analyze();
  for (const v of r.violations) {
    console.log("=====", v.id, "×", v.nodes.length);
    const msgs = new Map();
    for (const n of v.nodes) {
      const key = (n.any[0] && n.any[0].message) || (n.all[0] && n.all[0].message) || "";
      msgs.set(key, (msgs.get(key) || 0) + 1);
    }
    [...msgs].forEach(([m, c]) => console.log("  [" + c + "]", m.replace(/\s+/g, " ").slice(0, 220)));
    console.log("  sample:", v.nodes[0].html.slice(0, 140));
  }
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
