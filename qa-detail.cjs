const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  await p.goto("http://localhost:4600", { waitUntil: "load" });
  await p.waitForTimeout(1200);
  const r = await new AxeBuilder({ page: p }).withTags(["wcag2a","wcag2aa"]).analyze();
  for (const v of r.violations) {
    console.log("==", v.id, v.nodes.length);
    const seen = new Set();
    for (const n of v.nodes.slice(0, 30)) {
      const el = await p.evaluateHandle((sel) => document.querySelector(sel), n.target[0]).catch(()=>null);
      const info = await p.evaluate((e) => {
        if (!e) return "(gone)";
        const cs = getComputedStyle(e);
        return `${e.tagName}.${e.className.toString().slice(0,40)} | color:${cs.color} bg:${cs.backgroundColor} sz:${cs.fontSize}`;
      }, el).catch(() => "(err)");
      const key = info.split("|")[0] + info.split("|")[1];
      if (!seen.has(key)) { seen.add(key); console.log("  ", n.target[0].slice(0, 90), "→", info); }
    }
  }
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
