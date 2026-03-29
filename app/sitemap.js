import { blogPosts, projects, siteConfig } from "@/lib/site-data";

export const dynamic = "force-static";

function buildUrl(path) {
  const siteUrl = siteConfig.siteUrl.endsWith("/")
    ? siteConfig.siteUrl.slice(0, -1)
    : siteConfig.siteUrl;

  if (path === "/") {
    return `${siteUrl}/`;
  }

  return `${siteUrl}${path}`;
}

export default function sitemap() {
  const staticRoutes = [
    "/",
    "/about/",
    "/experience/",
    "/projects/",
    "/labs/",
    "/blog/",
    "/resume/",
    "/contact/"
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: buildUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8
  }));

  const blogEntries = blogPosts.map((post) => ({
    url: buildUrl(`/blog/${post.slug}/`),
    lastModified: new Date(`${post.publishedAt}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7
  }));

  const projectEntries = projects.map((project) => ({
    url: buildUrl(`/projects/${project.slug}/`),
    lastModified: new Date(`${project.year}-12-31T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.75
  }));

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
