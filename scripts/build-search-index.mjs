import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outDir = new URL("../out/", import.meta.url).pathname;

function stripHtml(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function collectHtmlFiles(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolutePath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectHtmlFiles(absolutePath, relativePath)));
    } else if (entry.name === "index.html" || entry.name.endsWith(".html")) {
      files.push(relativePath);
    }
  }

  return files;
}

async function buildEntries() {
  const files = await collectHtmlFiles(outDir);
  const entries = [];

  for (const file of files) {
    const html = await readFile(join(outDir, file), "utf8");
    const title = html.match(/<title>(.*?)<\/title>/i)?.[1]?.replace(/\s*\|\s*Portfolio Page$/, "") ?? file;
    const description =
      html.match(/<meta name="description" content="([^"]+)"/i)?.[1] ??
      stripHtml(html).slice(0, 240);
    const href = file === "index.html" ? "/" : `/${file.replace(/index\.html$/, "").replace(/\.html$/, "/")}`;

    entries.push({ title, href, description });
  }

  return entries.sort((a, b) => a.href.localeCompare(b.href));
}

await mkdir(outDir, { recursive: true });
const searchIndex = {
  generatedAt: new Date().toISOString(),
  note:
    "Runtime search uses the bundled static index in the Next app. This export artifact indexes generated HTML pages for reviewers and future Pagefind migration.",
  entries: await buildEntries()
};

await writeFile(join(outDir, "search-index.json"), `${JSON.stringify(searchIndex, null, 2)}\n`);
console.log(`Wrote out/search-index.json with ${searchIndex.entries.length} entries`);
