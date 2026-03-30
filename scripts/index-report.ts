import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const ignore = new Set([".git", ".next", "node_modules"]);

function walk(dir: string, out: string[] = []) {
  for (const entry of readdirSync(dir)) {
    if (ignore.has(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, out);
    } else {
      out.push(relative(root, full).replaceAll("\\", "/"));
    }
  }
  return out;
}

const files = walk(root).sort();
const routes = files.filter((f) => f.startsWith("app/") && f.endsWith("/page.tsx")).length;
const apis = files.filter((f) => f.startsWith("app/api/") && f.endsWith("route.ts")).length;
const domains = files.filter((f) => f.startsWith("lib/domain/")).length;
const components = files.filter((f) => f.startsWith("components/")).length;

console.log("=== Index Report ===");
console.log(`Total files indexed: ${files.length}`);
console.log(`Route pages: ${routes}`);
console.log(`API routes: ${apis}`);
console.log(`Domain modules: ${domains}`);
console.log(`UI components: ${components}`);
console.log("");
for (const file of files) {
  console.log(file);
}
