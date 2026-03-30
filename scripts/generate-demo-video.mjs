/**
 * Builds a short MP4 demo: slideshow from docs/screenshots/*.png when present,
 * otherwise a simple lavfi pattern clip. Requires ffmpeg-static (bundled binary).
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import ffmpegPath from "ffmpeg-static";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const outDir = path.join(repoRoot, "docs", "demo");
const outFile = path.join(outDir, "cakecup-demo.mp4");
const screenshotsDir = path.join(repoRoot, "docs", "screenshots");

/** Optional: Cursor-captured assets (same filenames as README copy step). */
const CURSOR_ASSETS = path.join(
  process.env.USERPROFILE || "",
  ".cursor",
  "projects",
  "c-Users-Jxsti-gtowncupcakervrsengineer",
  "assets",
);

const SLIDE_SEC = 3;
const ORDER = [
  "home-hero.png",
  "account.png",
  "product-detail.png",
  "catalog-builder.png",
  "pathways.png",
];

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function listScreenshots() {
  if (!fs.existsSync(screenshotsDir)) return [];
  const files = fs.readdirSync(screenshotsDir).filter((f) => /\.png$/i.test(f));
  const ordered = [];
  for (const name of ORDER) {
    if (files.includes(name)) ordered.push(path.join(screenshotsDir, name));
  }
  for (const f of files.sort()) {
    const full = path.join(screenshotsDir, f);
    if (!ordered.includes(full)) ordered.push(full);
  }
  return ordered;
}

function tryCopyFromCursorAssets() {
  if (!fs.existsSync(CURSOR_ASSETS)) return;
  const map = {
    "home-hero.png":
      "c__Users_Jxsti_AppData_Roaming_Cursor_User_workspaceStorage_b858f0d82e271f75b1aa1473beaa1e52_images_browser-screenshot-af7a05a3-d9c3-41c2-a793-d59db1d33f91.png",
    "account.png":
      "c__Users_Jxsti_AppData_Roaming_Cursor_User_workspaceStorage_b858f0d82e271f75b1aa1473beaa1e52_images_browser-screenshot-3d8f8c9c-0bd7-4c88-9a95-0393fae80fb9.png",
    "product-detail.png":
      "c__Users_Jxsti_AppData_Roaming_Cursor_User_workspaceStorage_b858f0d82e271f75b1aa1473beaa1e52_images_browser-screenshot-f09abf2b-3147-4c85-8114-f67c6ae9c7d7.png",
    "catalog-builder.png":
      "c__Users_Jxsti_AppData_Roaming_Cursor_User_workspaceStorage_b858f0d82e271f75b1aa1473beaa1e52_images_browser-screenshot-5e13dd0c-b9af-43a7-ae08-3f996b79ed8b.png",
    "pathways.png":
      "c__Users_Jxsti_AppData_Roaming_Cursor_User_workspaceStorage_b858f0d82e271f75b1aa1473beaa1e52_images_browser-screenshot-3362a14c-ac5f-42ea-9a1f-2fc6a40d2e1d.png",
  };
  ensureDir(screenshotsDir);
  let copied = 0;
  for (const [destName, srcName] of Object.entries(map)) {
    const src = path.join(CURSOR_ASSETS, srcName);
    const dest = path.join(screenshotsDir, destName);
    if (fs.existsSync(src) && !fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
      copied++;
    }
  }
  if (copied) console.log(`Copied ${copied} screenshot(s) from Cursor assets into docs/screenshots/`);
}

function ffmpeg(args) {
  const bin = ffmpegPath;
  if (!bin) {
    console.error("ffmpeg-static did not resolve to a binary.");
    process.exit(1);
  }
  const r = spawnSync(bin, ["-hide_banner", "-loglevel", "error", ...args], {
    stdio: "inherit",
    encoding: "utf8",
  });
  return r.status ?? 1;
}

function buildSlideshow(absolutePaths) {
  /** ffconcat requires forward slashes and quoted paths for Windows. */
  const lines = ["ffconcat version 1.0"];
  for (const abs of absolutePaths) {
    const posix = abs.replace(/\\/g, "/");
    lines.push(`file '${posix.replace(/'/g, "'\\''")}'`);
    lines.push(`duration ${SLIDE_SEC}`);
  }
  const last = absolutePaths[absolutePaths.length - 1].replace(/\\/g, "/");
  lines.push(`file '${last.replace(/'/g, "'\\''")}'`);

  const listPath = path.join(outDir, "demo-slideshow.ffconcat");
  fs.writeFileSync(listPath, lines.join("\n"), "utf8");
  return listPath;
}

function main() {
  ensureDir(outDir);

  if (!listScreenshots().length) tryCopyFromCursorAssets();

  const shots = listScreenshots();

  if (shots.length > 0) {
    const listFile = buildSlideshow(shots);
    const code = ffmpeg([
      "-y",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      listFile,
      "-vf",
      "format=yuv420p,scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      outFile,
    ]);
    if (code !== 0) process.exit(code);
    try {
      fs.unlinkSync(listFile);
    } catch {
      /* ignore */
    }
    console.log(`Wrote ${outFile} (${shots.length} slides × ${SLIDE_SEC}s)`);
    return;
  }

  console.warn("No screenshots in docs/screenshots/; generating a short placeholder clip.");
  const code = ffmpeg([
    "-y",
    "-f",
    "lavfi",
    "-i",
    "color=c=0xfce7f3:s=1280x720:d=8",
    "-c:v",
    "libx264",
    "-t",
    "8",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    outFile,
  ]);
  if (code !== 0) process.exit(code);
  console.log(`Wrote ${outFile} (placeholder — add PNGs to docs/screenshots/ and re-run)`);
}

main();
