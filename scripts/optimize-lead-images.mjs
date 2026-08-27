/**
 * Lead page — convert referenced PNG/JPG assets to WebP (max 1600w, q82).
 * Backups → `_image-backup-pre-optimize/` (gitignored). Removes sources after convert.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const BACKUP_ROOT = path.join(ROOT, "_image-backup-pre-optimize");
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;

/** Actively referenced by the lead page (+ bottom CTA shared with PA). */
const TARGETS = [
  // Capture
  "public/assets/images/lead/alex-lyma-young.png",
  // How Layer Works — context
  "public/assets/images/lead/how-layer-works/context-bg.png",
  "public/assets/images/lead/how-layer-works/context-icons.png",
  "public/assets/images/lead/how-layer-works/notch-icon.png",
  // Build
  "public/assets/images/lead/how-layer-works/build/backdrop-bg.png",
  // Deploy
  "public/assets/images/lead/how-layer-works/deploy/backdrop-bg.png",
  "public/assets/images/lead/how-layer-works/deploy/hero-center.png",
  "public/assets/images/lead/how-layer-works/deploy/portrait-maria.png",
  "public/assets/images/lead/how-layer-works/deploy/assignee-even.png",
  "public/assets/images/lead/how-layer-works/deploy/hero-left.png",
  "public/assets/images/lead/how-layer-works/deploy/hero-left-accent.png",
  "public/assets/images/lead/how-layer-works/deploy/portrait-maria-left.png",
  "public/assets/images/lead/how-layer-works/deploy/avatar-left-overlay.png",
  "public/assets/images/lead/how-layer-works/deploy/assignee-jhon.png",
  "public/assets/images/lead/how-layer-works/deploy/hero-right.png",
  "public/assets/images/lead/how-layer-works/deploy/portrait-alex.png",
  "public/assets/images/lead/how-layer-works/deploy/assignee-deepanjan.png",
  // Improve
  "public/assets/images/lead/how-layer-works/improve/backdrop-raw.png",
  "public/assets/images/lead/how-layer-works/improve/call-ui.png",
  "public/assets/images/lead/how-layer-works/improve/scorecard.png",
  // Client testimonials
  "public/assets/images/lead/client-testimonials/card-1-bg.png",
  "public/assets/images/lead/client-testimonials/card-1-logo.png",
  "public/assets/images/lead/client-testimonials/card-2-bg.png",
  "public/assets/images/lead/client-testimonials/card-2-logo.png",
  "public/assets/images/lead/client-testimonials/card-3-bg.png",
  "public/assets/images/lead/client-testimonials/payhawk-logo.png",
  // Bottom CTA (used on lead page)
  "public/assets/images/landing/products/personal-agent/bottom-cta-bg.png",
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function backupFile(relPath) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) return false;
  const dest = path.join(BACKUP_ROOT, relPath);
  ensureDir(path.dirname(dest));
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(abs, dest);
  }
  return true;
}

function toWebpPath(relPath) {
  return relPath.replace(/\.(png|jpe?g)$/i, ".webp");
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function safeRemove(abs) {
  for (let i = 0; i < 8; i++) {
    try {
      fs.unlinkSync(abs);
      return true;
    } catch (err) {
      if (err?.code !== "EPERM" && err?.code !== "EBUSY") throw err;
      await sleep(250 * (i + 1));
    }
  }
  try {
    const junk = `${abs}.__delete_me__`;
    fs.renameSync(abs, junk);
    try {
      fs.unlinkSync(junk);
    } catch {
      console.warn("queued for manual delete:", junk);
    }
    return true;
  } catch (err) {
    console.warn("could not remove (kept):", abs, err?.code || err);
    return false;
  }
}

async function convertToWebp(relPath) {
  const abs = path.join(ROOT, relPath);
  const outRel = toWebpPath(relPath);
  const outAbs = path.join(ROOT, outRel);

  if (!fs.existsSync(abs)) {
    if (fs.existsSync(outAbs)) {
      console.log("already webp:", outRel);
      return;
    }
    console.warn("missing:", relPath);
    return;
  }

  backupFile(relPath);

  if (fs.existsSync(outAbs)) {
    const removed = await safeRemove(abs);
    console.log(
      removed
        ? `already webp, removed source: ${relPath}`
        : `already webp, source locked: ${relPath}`,
    );
    return;
  }

  const before = fs.statSync(abs).size;
  const meta = await sharp(abs).metadata();
  let pipeline = sharp(abs);
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  const tmp = `${outAbs}.tmp`;
  ensureDir(path.dirname(outAbs));
  await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(tmp);
  fs.renameSync(tmp, outAbs);
  const after = fs.statSync(outAbs).size;
  await safeRemove(abs);
  console.log(
    `ok ${relPath} → ${outRel} (${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB)`,
  );
}

async function main() {
  ensureDir(BACKUP_ROOT);
  console.log("Backup root:", BACKUP_ROOT);
  console.log("\n=== Convert lead page targets ===");
  for (const t of TARGETS) {
    await convertToWebp(t);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
