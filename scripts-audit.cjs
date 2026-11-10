const { chromium } = require("playwright");
const OUT = "/home/user/letef-qa";
require("fs").mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push("PAGEERR " + e.message.slice(0, 140)));
  p.on("console", (m) => { if (m.type() === "error") errs.push("CONSOLE " + m.text().slice(0, 140)); });
  await p.goto("http://localhost:4600", { waitUntil: "load" });
  await p.waitForTimeout(1600);
  await p.screenshot({ path: `${OUT}/01-hero.png`, timeout: 60000 });
  const shots = [
    ["02-promise", ".promise"], ["03-highlights", ".cards4"], ["04-how", "#how-it-works"],
    ["05-fees", "#fees"], ["06-security", "#security"], ["07-vouches", "#vouches"],
    ["08-commands", "#commands"], ["09-faq", "#faq"], ["10-support", "#support"], ["11-footer", ".footer"],
  ];
  for (const [name, sel] of shots) {
    await p.evaluate((s) => document.querySelector(s)?.scrollIntoView({ behavior: "instant", block: "start" }), sel);
    await p.waitForTimeout(1300);
    await p.screenshot({ path: `${OUT}/${name}.png`, timeout: 60000 });
  }
  // mid-story frame: scroll into the middle of how-it-works steps
  const howTop = await p.evaluate(() => document.querySelector("#how-it-works").getBoundingClientRect().top + scrollY);
  await p.evaluate((y) => scrollTo(0, y), howTop + 2400);
  await p.waitForTimeout(1400);
  await p.screenshot({ path: `${OUT}/04b-story-mid.png`, timeout: 60000 });
  console.log(JSON.stringify({ errs: errs.slice(0, 6) }));
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
