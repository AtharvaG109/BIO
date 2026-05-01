import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const outDir = new URL("../out/", import.meta.url).pathname;
const routes = [
  "index.html",
  "projects/index.html",
  "projects/enterprise-nids-network-detection-platform/index.html",
  "blog/observability-as-a-root-cause-discipline/index.html",
  "labs/index.html",
  "search/index.html",
  "resume/index.html",
  "contact/index.html",
  "search-index.json"
];

async function main() {
  for (const route of routes) {
    await access(join(outDir, route));
  }

  const labs = await readFile(join(outDir, "labs/index.html"), "utf8");
  const search = await readFile(join(outDir, "search/index.html"), "utf8");

  if (!labs.includes("JWT Inspector") || !labs.includes("CI Security Preview")) {
    throw new Error("Labs export is missing expected tool content");
  }

  if (!search.includes("Search the portfolio")) {
    throw new Error("Search export is missing expected controls");
  }

  console.log(`Smoke checked ${routes.length} static export routes.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
