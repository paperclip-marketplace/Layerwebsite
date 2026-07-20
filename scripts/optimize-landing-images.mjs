/**
 * Backup → WebP convert (max width 1600, q82) → delete unused originals.
 * Backups land in `_image-backup-pre-optimize/` (gitignored).
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const BACKUP_ROOT = path.join(ROOT, "_image-backup-pre-optimize");
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;

/** Active assets referenced by the app (convert → webp, then remove source). */
const TARGETS = [
  // Split section
  "public/assets/images/landing/split-section/prepare-bg.png",
  "public/assets/images/landing/split-section/prepare-main.png",
  "public/assets/images/landing/split-section/prepare-secondary.png",
  "public/assets/images/landing/split-section/practice-bg.png",
  "public/assets/images/landing/split-section/practice-main.png",
  "public/assets/images/landing/split-section/practice-secondary.png",
  "public/assets/images/landing/split-section/perform-bg.png",
  "public/assets/images/landing/split-section/perform-main.png",
  "public/assets/images/landing/split-section/follow-up-bg.png",
  "public/assets/images/landing/split-section/follow-up-main.png",
  "public/assets/images/landing/split-section/improve-bg.png",
  "public/assets/images/landing/split-section/improve-main.png",
  "public/assets/images/landing/split-section/improve-secondary.png",
  // Perform widget
  "public/assets/images/landing/split-section/perform-widget/layer-white-logo-small.png",
  "public/assets/images/landing/split-section/perform-widget/texture.png",
  "public/assets/images/landing/split-section/perform-widget/avatar-1.png",
  "public/assets/images/landing/split-section/perform-widget/avatar-2.png",
  "public/assets/images/landing/split-section/perform-widget/avatar-3.png",
  "public/assets/images/landing/split-section/perform-widget/dot.png",
  "public/assets/images/landing/split-section/perform-widget/agent-avatar.png",
  "public/assets/images/landing/split-section/perform-widget/divider-dot.png",
  // Header nav
  "public/assets/images/landing/header-nav/roleplay.png",
  "public/assets/images/landing/header-nav/personal-agent.png",
  "public/assets/images/landing/header-nav/coaching.png",
  "public/assets/images/landing/header-nav/scoring-and-feedback.png",
  "public/assets/images/landing/header-nav/agent-management.png",
  "public/assets/images/landing/header-nav/playbooks.png",
  "public/assets/images/landing/header-nav/skills-and-frameworks.png",
  "public/assets/images/landing/header-nav/interview-and-training.png",
  "public/assets/images/landing/header-nav/tool-calling-and-integrations.png",
  "public/assets/images/landing/header-nav/ramp.png",
  "public/assets/images/landing/header-nav/quota-attainment.png",
  "public/assets/images/landing/header-nav/customer-facing-time.png",
  "public/assets/images/landing/header-nav/co-pilot-v2.png",
  "public/assets/images/landing/header-nav/apple-icon.png",
  // Clients
  ...Array.from({ length: 16 }, (_, i) =>
    `public/assets/images/landing/clients/client-${String(i + 1).padStart(2, "0")}.png`,
  ),
  // Team logos
  "public/assets/images/landing/team-experience/sage-logo.png",
  "public/assets/images/landing/team-experience/criteo-logo.png",
  "public/assets/images/landing/team-experience/xero-logo.png",
  "public/assets/images/landing/team-experience/bandwatch-logo.png",
  "public/assets/images/landing/team-experience/hubspot-logo.png",
  "public/assets/images/landing/team-experience/medallia-logo.png",
  "public/assets/images/landing/team-experience/apple-logo.png",
  "public/assets/images/landing/team-experience/sap-logo.png",
  "public/assets/images/landing/team-experience/parallels-logo.png",
  "public/assets/images/landing/team-experience/paperclip-logo.png",
  "public/assets/images/landing/team-experience/como-logo.png",
  "public/assets/images/landing/team-experience/swiggy-logo.png",
  "public/assets/images/landing/team-experience/perfios-logo.png",
  "public/assets/images/landing/team-experience/sbicard-logo.png",
  "public/assets/images/landing/team-experience/adgm-logo.png",
  // Key metrics / leadership / pricing / coming-soon / operator
  "public/assets/images/landing/key-metrics/metric-01.png",
  "public/assets/images/landing/key-metrics/metric-02.png",
  "public/assets/images/landing/key-metrics/metric-03.png",
  "public/assets/images/landing/key-metrics/metric-04.png",
  "public/assets/images/landing/key-metrics/metric-05.png",
  "public/assets/images/landing/leadership/control-plane.png",
  "public/assets/images/landing/pricing-cta/create-agent.png",
  "public/assets/images/landing/pricing-cta/watch-demo.png",
  "public/assets/images/landing/coming-soon/bg-pattern.png",
  "public/assets/images/landing/coming-soon/app-preview.png",
  "public/assets/images/landing/operator/team-photo.png",
  // Roleplay
  "public/assets/images/landing/products/roleplay/hero-agent-bg.jpg",
  "public/assets/images/landing/products/roleplay/hero-agent-overlay.jpg",
  "public/assets/images/landing/products/roleplay/hero-agent-featured.jpg",
  "public/assets/images/landing/products/roleplay/hero-agent-david.png",
  "public/assets/images/landing/products/roleplay/how-create-persona.png",
  "public/assets/images/landing/products/roleplay/how-enrich-ui.png",
  "public/assets/images/landing/products/roleplay/how-processing.png",
  "public/assets/images/landing/products/roleplay/how-persona-created.png",
  "public/assets/images/landing/products/roleplay/persona-builder.png",
  "public/assets/images/landing/products/roleplay/cta-create.png",
  "public/assets/images/landing/products/roleplay/cta-demo.png",
  "public/assets/images/landing/products/roleplay/bottom-cta-bg.jpg",
  ...Array.from({ length: 6 }, (_, i) =>
    `public/assets/images/landing/products/roleplay/voice-orbs/0${i + 1}.png`,
  ),
  // Personal agent
  "public/assets/images/landing/products/personal-agent/hero-ticker-bg.jpg",
  "public/assets/images/landing/products/personal-agent/use-case-precall.png",
  "public/assets/images/landing/products/personal-agent/use-case-approval-bg.png",
  "public/assets/images/landing/products/personal-agent/use-case-approval-avatar.png",
  "public/assets/images/landing/products/personal-agent/use-case-tools.png",
  "public/assets/images/landing/products/personal-agent/why-now-texture.png",
  "public/assets/images/landing/products/personal-agent/avatar-lacey.png",
  "public/assets/images/landing/products/personal-agent/avatar-mark.png",
  "public/assets/images/landing/products/personal-agent/cta-create.png",
  "public/assets/images/landing/products/personal-agent/cta-demo.png",
  "public/assets/images/landing/products/personal-agent/bottom-cta-bg.jpg",
  // Integration logos (png only)
  "public/integration-logos/gong-logo.png",
  "public/integration-logos/circleback.png",
  // Compress OG / preview (keep as jpg/png for crawlers — handled separately)
];

/** Unused / duplicate / test exports — backup then delete. */
const DELETE = [
  // Split-section unused
  "public/assets/images/landing/split-section/asset-1.png",
  "public/assets/images/landing/split-section/asset-2.png",
  "public/assets/images/landing/split-section/asset-3.png",
  "public/assets/images/landing/split-section/asset-4.png",
  "public/assets/images/landing/split-section/asset-5.png",
  "public/assets/images/landing/split-section/asset-6.png",
  "public/assets/images/landing/split-section/asset-7.png",
  "public/assets/images/landing/split-section/asset-8.png",
  "public/assets/images/landing/split-section/overlay-test.png",
  "public/assets/images/landing/split-section/section-reference.png",
  "public/assets/images/landing/split-section/prepare-bg-fresh.png",
  "public/assets/images/landing/split-section/prepare-card.png",
  "public/assets/images/landing/split-section/practice-bg-new.png",
  "public/assets/images/landing/split-section/practice-bg-old.png",
  "public/assets/images/landing/split-section/practice-base-mcp.png",
  "public/assets/images/landing/split-section/practice-bg-overlay.png",
  "public/assets/images/landing/split-section/practice-bg-overlay-old.png",
  "public/assets/images/landing/split-section/practice-card-ref.png",
  "public/assets/images/landing/split-section/practice-overlay-mcp.png",
  "public/assets/images/landing/split-section/practice-overlay-new.png",
  "public/assets/images/landing/split-section/practice-overlay-old.png",
  "public/assets/images/landing/split-section/perform-bg-fresh.png",
  "public/assets/images/landing/split-section/perform-bg-new.png",
  "public/assets/images/landing/split-section/perform-bg-test-mcp.png",
  "public/assets/images/landing/split-section/follow-bg-new.png",
  "public/assets/images/landing/split-section/follow-bg-overlay-old.png",
  "public/assets/images/landing/split-section/follow-overlay-mcp.png",
  "public/assets/images/landing/split-section/follow-overlay-new.png",
  "public/assets/images/landing/split-section/follow-up-bg-overlay.png",
  "public/assets/images/landing/split-section/improve-base-mcp.png",
  "public/assets/images/landing/split-section/improve-bg-alt.png",
  "public/assets/images/landing/split-section/improve-bg-alt2.png",
  "public/assets/images/landing/split-section/improve-bg-dl.png",
  "public/assets/images/landing/split-section/improve-bg-new.png",
  "public/assets/images/landing/split-section/improve-bg-test-1.png",
  "public/assets/images/landing/split-section/improve-bg-test-2.png",
  "public/assets/images/landing/split-section/improve-bg-test-3.png",
  "public/assets/images/landing/split-section/improve-bg-test-4.png",
  "public/assets/images/landing/split-section/improve-card-full.png",
  "public/assets/images/landing/split-section/improve-card-ref.png",
  "public/assets/images/landing/split-section/improve-card-screenshot.png",
  "public/assets/images/landing/split-section/improve-highlight.png",
  "public/assets/images/landing/split-section/improve-main-shot.png",
  "public/assets/images/landing/split-section/improve-overlay.png",
  "public/assets/images/landing/split-section/perform-widget/layer-logo.png",
  "public/assets/images/landing/split-section/perform-widget/status-dot.png",
  "public/assets/images/landing/split-section/perform-widget/status-dot-figma.png",
  "public/assets/images/landing/split-section/perform-widget/perform-widget.png",
  // Clients unused
  "public/assets/images/landing/clients/clients-grid-800x400.png",
  "public/assets/images/landing/clients/grid-reference.png",
  // Failure / integrations / stats unused folders
  "public/assets/images/landing/failure-points/failure-point-bg.png",
  "public/assets/images/landing/failure-points/sketch-card.png",
  "public/assets/images/landing/integrations/gong.png",
  "public/assets/images/landing/integrations/google-workspace.png",
  "public/assets/images/landing/integrations/hubspot.png",
  "public/assets/images/landing/integrations/salesforce.png",
  "public/assets/images/landing/integrations/section-reference.png",
  "public/assets/images/landing/integrations/slack.png",
  "public/assets/images/landing/stats/dot-indicator.png",
  // Operator unused
  "public/assets/images/landing/operator/even-walser.png",
  "public/assets/images/landing/operator/signature-squiggle.png",
  // Team-experience unused (jpgs + team-* grids)
  "public/assets/images/landing/team-experience/brandwatch.jpg",
  "public/assets/images/landing/team-experience/como.jpg",
  "public/assets/images/landing/team-experience/criteo.jpg",
  "public/assets/images/landing/team-experience/medallia.jpg",
  "public/assets/images/landing/team-experience/paperclip.jpg",
  "public/assets/images/landing/team-experience/parallels.jpg",
  "public/assets/images/landing/team-experience/perfios.jpg",
  "public/assets/images/landing/team-experience/sbi-card.jpg",
  ...Array.from({ length: 15 }, (_, i) =>
    `public/assets/images/landing/team-experience/team-${String(i + 1).padStart(2, "0")}.png`,
  ),
  // Personal agent unused
  "public/assets/images/landing/products/personal-agent/use-case-precall-media.png",
  "public/assets/images/landing/products/personal-agent/use-case-approval-media.png",
  "public/assets/images/landing/products/personal-agent/use-case-tools-media.png",
  "public/assets/images/landing/products/personal-agent/use-case-approval.png",
  "public/assets/images/landing/products/personal-agent/customize-panel-bg.png",
  "public/assets/images/landing/products/personal-agent/customize-visual.jpg",
  "public/assets/images/landing/products/personal-agent/customize-visual.png",
  // Duplicate OG / misc
  "public/assets/home-og.png.png",
  "public/assets/app-og.png.png",
  "public/integration-logos/gong.png",
  "public/integration-logos/salesloft-letter-logo.png",
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

/** OneDrive often locks files briefly — retry unlink / fall back to rename. */
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

  // Skip re-encode if webp already exists and is newer/same size ballpark
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

async function deleteUnused(relPath) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) {
    console.log("skip missing delete:", relPath);
    return;
  }
  backupFile(relPath);
  const removed = await safeRemove(abs);
  console.log(
    removed ? `deleted (backed up): ${relPath}` : `delete locked: ${relPath}`,
  );
}

/** Compress OG assets in place (keep png/jpg for social crawlers). */
async function compressKeepFormat(relPath, maxWidth = 1200, quality = 82) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) {
    console.warn("missing og:", relPath);
    return;
  }
  backupFile(relPath);
  const before = fs.statSync(abs).size;
  const ext = path.extname(abs).toLowerCase();
  const meta = await sharp(abs).metadata();
  let pipeline = sharp(abs);
  if (meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }
  const tmp = `${abs}.tmp`;
  if (ext === ".png") {
    await pipeline.png({ quality, compressionLevel: 9 }).toFile(tmp);
  } else {
    await pipeline.jpeg({ quality, mozjpeg: true }).toFile(tmp);
  }
  const swapped = `${abs}.__old__`;
  try {
    fs.renameSync(abs, swapped);
    fs.renameSync(tmp, abs);
    await safeRemove(swapped);
  } catch {
    fs.copyFileSync(tmp, abs);
    await safeRemove(tmp);
    await safeRemove(swapped);
  }
  const after = fs.statSync(abs).size;
  console.log(
    `og ${relPath} (${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB)`,
  );
}

async function main() {
  ensureDir(BACKUP_ROOT);
  console.log("Backup root:", BACKUP_ROOT);
  console.log("\n=== Convert targets ===");
  for (const t of TARGETS) {
    await convertToWebp(t);
  }
  console.log("\n=== Compress OG (keep format) ===");
  await compressKeepFormat("public/assets/home-og.png", 1200, 80);
  await compressKeepFormat("public/layer-preview-1200x630.jpg", 1200, 80);

  console.log("\n=== Delete unused ===");
  for (const d of DELETE) {
    await deleteUnused(d);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
