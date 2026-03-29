import Link from "next/link";
import { notFound } from "next/navigation";

import { AnimateIn } from "@/components/animate-in";
import { blogPosts, formatPublishedDate, getPostBySlug } from "@/lib/site-data";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found"
    };
  }

  return {
    title: post.title,
    description: post.excerpt
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main article-main">
      <AnimateIn className="article-header" delay={0.05}>
        <Link href="/blog/" className="back-link">
          Back to writing
        </Link>
        <p className="eyebrow">
          {post.category} • {post.readTime} •{" "}
          <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
        </p>
        <h1>{post.title}</h1>
        <p className="muted hero-copy">{post.intro}</p>
      </AnimateIn>

      <article className="surface article-shell">
        {post.sections.map((section, index) => (
          <AnimateIn key={section.heading} className="article-section" delay={0.08 + index * 0.04}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul className="bullet-list article-bullets">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </AnimateIn>
        ))}
      </article>
    </main>
  );
}
