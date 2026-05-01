import { getSortedContent } from "@/lib/content";
import { projects, siteConfig, toolGroups } from "@/lib/site-data";

function cleanText(value = "") {
  return value.replace(/\s+/g, " ").trim();
}

export function buildSearchEntries() {
  const posts = getSortedContent("blog").map((post) => ({
    type: "Writing",
    title: post.title,
    href: `/blog/${post.slug}/`,
    summary: post.excerpt,
    tags: post.tags ?? [post.category].filter(Boolean)
  }));

  const projectEntries = projects.map((project) => ({
    type: "Project",
    title: project.title,
    href: `/projects/${project.slug}/`,
    summary: cleanText(`${project.summary} ${project.impact}`),
    tags: [...project.stack, project.category]
  }));

  const corePages = [
    {
      type: "Page",
      title: "Labs",
      href: "/labs/",
      summary: "Client-side security playground for JWTs, logs, detection rules, risk scoring, packet flows, and CI gates.",
      tags: ["JWT", "logs", "detection", "CVSS", "CI"]
    },
    {
      type: "Page",
      title: "Workbench",
      href: "/workbench/",
      summary: "Research notes, reverse engineering practice, security workflows, and systems study.",
      tags: ["research", "reverse engineering", "Linux", "cloud security"]
    },
    {
      type: "Resume",
      title: `${siteConfig.name} Resume`,
      href: "/resume/",
      summary: siteConfig.availability,
      tags: toolGroups.flatMap((group) => group.items).slice(0, 24)
    }
  ];

  return [...projectEntries, ...posts, ...corePages];
}
