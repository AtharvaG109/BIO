import { access, readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const requiredFrontmatter = {
  blog: ["slug", "title", "category", "publishedAt", "readTime", "excerpt", "tags"],
  projects: ["slug", "title", "category", "updatedAt", "excerpt", "tags"]
};

async function parseFrontmatter(path) {
  const source = await readFile(path, "utf8");
  const match = source.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    throw new Error(`${path} is missing frontmatter`);
  }

  const data = {};

  for (const line of match[1].split("\n")) {
    const index = line.indexOf(":");

    if (index !== -1) {
      data[line.slice(0, index).trim()] = line.slice(index + 1).trim();
    }
  }

  return data;
}

async function validateCollection(collection) {
  const directory = join(root, "content", collection);
  const files = (await readdir(directory)).filter((file) => file.endsWith(".mdx"));

  if (!files.length) {
    throw new Error(`content/${collection} has no MDX files`);
  }

  for (const file of files) {
    const path = join(directory, file);
    const data = await parseFrontmatter(path);

    for (const field of requiredFrontmatter[collection]) {
      if (!data[field]) {
        throw new Error(`${path} is missing required frontmatter field: ${field}`);
      }
    }
  }
}

async function main() {
  await access(join(root, "public", "llms.txt"));
  await access(join(root, "public", "portfolio-summary.json"));
  await validateCollection("blog");
  await validateCollection("projects");
  console.log("Validated MDX content and public AI summary artifacts.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
