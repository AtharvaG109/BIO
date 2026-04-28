import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const requiredFiles = [
  "index.html",
  "404.html",
  "sitemap.xml",
  "robots.txt",
  "_headers",
  "security.txt",
  "humans.txt",
  "llms.txt",
  "site.webmanifest",
  "social-preview.svg"
];

const outDir = new URL("../out/", import.meta.url);

async function assertFile(path) {
  await access(join(outDir.pathname, path));
}

async function main() {
  const missing = [];

  for (const file of requiredFiles) {
    try {
      await assertFile(file);
    } catch {
      missing.push(file);
    }
  }

  if (missing.length > 0) {
    throw new Error(`Static export is missing required files: ${missing.join(", ")}`);
  }

  const sitemap = await readFile(join(outDir.pathname, "sitemap.xml"), "utf8");
  const manifest = JSON.parse(await readFile(join(outDir.pathname, "site.webmanifest"), "utf8"));

  if (!sitemap.includes("<urlset")) {
    throw new Error("sitemap.xml does not look like a valid sitemap");
  }

  if (!manifest.name || !manifest.start_url) {
    throw new Error("site.webmanifest is missing required name/start_url fields");
  }

  console.log(`Verified static export with ${requiredFiles.length} required files.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
