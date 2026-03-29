import Link from "next/link";
import { notFound } from "next/navigation";

import { AnimateIn } from "@/components/animate-in";
import { StructuredData } from "@/components/structured-data";
import {
  blogPosts,
  buildAbsoluteUrl,
  createBreadcrumbSchema,
  formatPublishedDate,
  getPostBySlug,
  siteConfig
} from "@/lib/site-data";

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
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}/`
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: buildAbsoluteUrl(`/blog/${post.slug}/`),
      type: "article",
      publishedTime: `${post.publishedAt}T00:00:00Z`,
      authors: [siteConfig.name],
      images: [buildAbsoluteUrl("/social-preview.svg")]
    }
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = [
    createBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Writing", path: "/blog/" },
      { name: post.title, path: `/blog/${post.slug}/` }
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      datePublished: `${post.publishedAt}T00:00:00Z`,
      dateModified: `${post.publishedAt}T00:00:00Z`,
      author: {
        "@type": "Person",
        name: siteConfig.name,
        sameAs: siteConfig.sameAs
      },
      publisher: {
        "@type": "Person",
        name: siteConfig.name
      },
      image: [buildAbsoluteUrl("/social-preview.svg")],
      mainEntityOfPage: buildAbsoluteUrl(`/blog/${post.slug}/`)
    }
  ];

  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main article-main">
      <StructuredData data={articleSchema} />
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
