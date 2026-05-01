import Link from "next/link";

import { AnimateIn } from "@/components/animate-in";
import { StructuredData } from "@/components/structured-data";
import { getSortedContent } from "@/lib/content";
import { buildAbsoluteUrl, createBreadcrumbSchema, formatPublishedDate } from "@/lib/site-data";

export const metadata = {
  title: "Writing",
  description: "Technical writing on systems, AI security, debugging, and engineering operations.",
  alternates: {
    canonical: "/blog/"
  }
};

const blogIndexSchema = [
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Writing", path: "/blog/" }
  ]),
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Atharva Gham Writing",
    url: buildAbsoluteUrl("/blog/"),
    description: "Technical writing on systems, AI security, debugging, and engineering operations."
  }
];

export default function BlogIndexPage() {
  const sortedPosts = getSortedContent("blog");

  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main blog-main">
      <StructuredData data={blogIndexSchema} />
      <AnimateIn className="surface page-hero" delay={0.05}>
        <p className="eyebrow">Writing</p>
        <h1>Notes on systems, AI security, and engineering judgment.</h1>
        <p className="muted hero-copy">
          This is where project work turns into explanation: what changed, what broke, what the
          evidence said, and what decision followed from that.
        </p>
      </AnimateIn>

      <section className="blog-list">
        {sortedPosts.map((post, index) => (
          <AnimateIn key={post.slug} className="surface blog-card" delay={0.08 + index * 0.05}>
            <div className="blog-card-meta">
              <span>{post.category}</span>
              <span>{post.readTime}</span>
              <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
            </div>
            <h2>{post.title}</h2>
            <p className="muted">{post.excerpt}</p>
            <div className="tag-row">
              {(post.tags ?? []).slice(0, 4).map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <Link href={`/blog/${post.slug}/`} className="text-link">
              Open article
            </Link>
          </AnimateIn>
        ))}
      </section>
    </main>
  );
}
