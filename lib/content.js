import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const contentRoot = join(process.cwd(), "content");

function parseValue(value) {
  const trimmed = value.trim();

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }

  if (trimmed === "true") {
    return true;
  }

  if (trimmed === "false") {
    return false;
  }

  return trimmed.replace(/^["']|["']$/g, "");
}

function parseFrontmatter(source) {
  if (!source.startsWith("---")) {
    return { data: {}, body: source.trim() };
  }

  const end = source.indexOf("\n---", 3);

  if (end === -1) {
    return { data: {}, body: source.trim() };
  }

  const rawFrontmatter = source.slice(3, end).trim();
  const body = source.slice(end + 4).trim();
  const data = {};

  for (const line of rawFrontmatter.split("\n")) {
    const index = line.indexOf(":");

    if (index === -1) {
      continue;
    }

    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1);
    data[key] = parseValue(value);
  }

  return { data, body };
}

function parseAttributes(value = "") {
  const attrs = {};
  const pattern = /(\w+)="([^"]*)"/g;
  let match = pattern.exec(value);

  while (match) {
    attrs[match[1]] = match[2];
    match = pattern.exec(value);
  }

  return attrs;
}

function flushParagraph(blocks, paragraphLines) {
  if (!paragraphLines.length) {
    return;
  }

  blocks.push({
    type: "paragraph",
    text: paragraphLines.join(" ").replace(/\s+/g, " ").trim()
  });
  paragraphLines.length = 0;
}

function flushList(blocks, listItems) {
  if (!listItems.length) {
    return;
  }

  blocks.push({ type: "list", items: [...listItems] });
  listItems.length = 0;
}

export function parseMarkdownBlocks(markdown) {
  const blocks = [];
  const paragraphLines = [];
  const listItems = [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph(blocks, paragraphLines);
      flushList(blocks, listItems);
      continue;
    }

    if (trimmed.startsWith("```")) {
      flushParagraph(blocks, paragraphLines);
      flushList(blocks, listItems);
      const language = trimmed.slice(3).trim() || "text";
      const code = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }

      blocks.push({ type: "code", language, code: code.join("\n") });
      continue;
    }

    if (trimmed.startsWith(":::")) {
      flushParagraph(blocks, paragraphLines);
      flushList(blocks, listItems);
      const [, kind = "callout", rest = ""] = trimmed.match(/^:::(\w+)\s*(.*)$/) ?? [];
      const inner = [];
      index += 1;

      while (index < lines.length && lines[index].trim() !== ":::") {
        inner.push(lines[index]);
        index += 1;
      }

      blocks.push({
        type: kind,
        attrs: parseAttributes(rest),
        children: parseMarkdownBlocks(inner.join("\n"))
      });
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph(blocks, paragraphLines);
      flushList(blocks, listItems);
      blocks.push({ type: "heading", level: 3, text: trimmed.slice(4) });
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph(blocks, paragraphLines);
      flushList(blocks, listItems);
      blocks.push({ type: "heading", level: 2, text: trimmed.slice(3) });
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph(blocks, paragraphLines);
      listItems.push(trimmed.slice(2));
      continue;
    }

    flushList(blocks, listItems);
    paragraphLines.push(trimmed);
  }

  flushParagraph(blocks, paragraphLines);
  flushList(blocks, listItems);

  return blocks;
}

export function readContentCollection(collection) {
  const directory = join(contentRoot, collection);

  return readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const source = readFileSync(join(directory, file), "utf8");
      const { data, body } = parseFrontmatter(source);
      const slug = data.slug || file.replace(/\.mdx$/, "");

      return {
        ...data,
        slug,
        body,
        blocks: parseMarkdownBlocks(body)
      };
    });
}

export function getContentBySlug(collection, slug) {
  return readContentCollection(collection).find((item) => item.slug === slug) ?? null;
}

export function getSortedContent(collection) {
  return readContentCollection(collection).sort((a, b) => {
    const left = Date.parse(`${a.publishedAt || a.updatedAt || a.date || "1970-01-01"}T00:00:00Z`);
    const right = Date.parse(`${b.publishedAt || b.updatedAt || b.date || "1970-01-01"}T00:00:00Z`);

    return right - left;
  });
}
