import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const files = [];
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "node_modules" || ent.name === ".next") continue;
      walk(p);
    } else if (/\.(tsx|ts)$/.test(ent.name)) files.push(p);
  }
}
walk(path.join(ROOT, "components"));
walk(path.join(ROOT, "lib"));
walk(path.join(ROOT, "app"));

const re = /["'`](\/[^"'`\s]+\.(?:webp|png|jpe?g))["'`]/g;
const missing = [];
const seen = new Set();
for (const f of files) {
  const t = fs.readFileSync(f, "utf8");
  let m;
  while ((m = re.exec(t))) {
    const url = m[1];
    if (seen.has(url)) continue;
    seen.add(url);
    const abs = path.join(ROOT, "public", url.replace(/^\//, "").replace(/\//g, path.sep));
    if (!fs.existsSync(abs)) missing.push(`${url}  ← ${path.relative(ROOT, f)}`);
  }
}
if (missing.length) {
  console.log("MISSING:\n" + missing.join("\n"));
  process.exit(1);
}
console.log(`OK — ${seen.size} unique image refs exist on disk`);
