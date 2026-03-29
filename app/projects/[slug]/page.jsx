import Link from "next/link";
import { notFound } from "next/navigation";

import { AnimateIn } from "@/components/animate-in";
import { StructuredData } from "@/components/structured-data";
import {
  buildAbsoluteUrl,
  createBreadcrumbSchema,
  getProjectBySlug,
  projects,
  siteConfig,
  withBasePath
} from "@/lib/site-data";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found"
    };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}/`
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: buildAbsoluteUrl(`/projects/${project.slug}/`),
      type: "article",
      images: [buildAbsoluteUrl(withBasePath(project.media.src))]
    }
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectSchema = [
    createBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects/" },
      { name: project.title, path: `/projects/${project.slug}/` }
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.summary,
      author: {
        "@type": "Person",
        name: siteConfig.name,
        sameAs: siteConfig.sameAs
      },
      about: project.stack,
      image: buildAbsoluteUrl(withBasePath(project.media.src)),
      url: buildAbsoluteUrl(`/projects/${project.slug}/`)
    }
  ];

  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main article-main">
      <StructuredData data={projectSchema} />
      <AnimateIn className="article-header" delay={0.05}>
        <Link href="/projects/" className="back-link">
          Back to projects
        </Link>
        <p className="eyebrow">
          {project.category} • {project.year}
        </p>
        <h1>{project.title}</h1>
        <p className="muted hero-copy">{project.summary}</p>
      </AnimateIn>

      <article className="surface article-shell">
        <AnimateIn className="article-section" delay={0.06}>
          <div className="media-frame media-frame-wide">
            <img
              src={withBasePath(project.media.src)}
              alt={project.media.alt}
              className="project-media"
            />
          </div>
        </AnimateIn>

        <AnimateIn className="article-section" delay={0.08}>
          <h2>Challenge</h2>
          <p>{project.challenge}</p>
        </AnimateIn>

        {project.metrics?.length ? (
          <AnimateIn className="article-section" delay={0.1}>
            <h2>Snapshot</h2>
            <div className="metric-grid">
              {project.metrics.map((metric) => (
                <div key={`${metric.value}-${metric.label}`} className="metric-card">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        ) : null}

        <AnimateIn className="article-section" delay={0.12}>
          <h2>Approach</h2>
          <ul className="bullet-list article-bullets">
            {project.approach.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </AnimateIn>

        {project.architecture?.length ? (
          <AnimateIn className="article-section" delay={0.14}>
            <h2>Architecture</h2>
            <ul className="bullet-list article-bullets">
              {project.architecture.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </AnimateIn>
        ) : null}

        <AnimateIn className="article-section" delay={0.16}>
          <h2>Impact</h2>
          <p>{project.impact}</p>
          <ul className="bullet-list article-bullets">
            {project.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </AnimateIn>

        {project.tradeoffs?.length ? (
          <AnimateIn className="article-section" delay={0.18}>
            <h2>Tradeoffs and Decisions</h2>
            <ul className="bullet-list article-bullets">
              {project.tradeoffs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </AnimateIn>
        ) : null}

        <AnimateIn className="article-section" delay={0.2}>
          <h2>Result</h2>
          <p>{project.result}</p>
        </AnimateIn>

        <AnimateIn className="article-section" delay={0.24}>
          <h2>Stack</h2>
          <div className="tag-row">
            {project.stack.map((item) => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </div>
        </AnimateIn>

        {project.links?.length ? (
          <AnimateIn className="article-section" delay={0.28}>
            <h2>References</h2>
            <div className="project-card-actions project-links">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-link">
                  {link.label}
                </a>
              ))}
            </div>
          </AnimateIn>
        ) : null}
      </article>
    </main>
  );
}
