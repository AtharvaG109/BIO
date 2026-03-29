import Link from "next/link";

import { AnimateIn } from "@/components/animate-in";
import { StructuredData } from "@/components/structured-data";
import { buildAbsoluteUrl, createBreadcrumbSchema, formatPublishedDate, getSortedBlogPosts } from "@/lib/site-data";

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
  const sortedPosts = getSortedBlogPosts();

  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main blog-main">
      <StructuredData data={blogIndexSchema} />
      <AnimateIn className="surface page-hero" delay={0.05}>
        <p className="eyebrow">Writing</p>
        <h1>Field notes on systems, AI security, and failure analysis.</h1>
        <p className="muted hero-copy">
          This journal is where portfolio work turns into technical narrative: what changed, what broke,
          and what engineering decision followed afterward.
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
            <Link href={`/blog/${post.slug}/`} className="text-link">
              Open article
            </Link>
          </AnimateIn>
        ))}
      </section>
    </main>
  );
}
