import Link from "next/link";

import { AnimateIn } from "@/components/animate-in";
import { ContactPanel } from "@/components/contact-panel";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import {
  buildAbsoluteUrl,
  buildThemes,
  engineeringSignals,
  formatPublishedDate,
  getFeaturedProject,
  getLatestPost,
  hero,
  pathwayCards,
  principles,
  selectedWins,
  siteConfig,
  stats,
  withBasePath
} from "@/lib/site-data";

const featuredProject = getFeaturedProject();
const latestPost = getLatestPost();
const homepageSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.shortName,
    alternateName: `${siteConfig.shortName} Portfolio`,
    url: buildAbsoluteUrl("/")
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: buildAbsoluteUrl("/"),
    image: buildAbsoluteUrl("/social-preview.svg"),
    jobTitle: "Software Engineer",
    knowsAbout: [
      "Backend engineering",
      "Platform engineering",
      "Observability",
      "Security automation",
      "Reverse engineering",
      "Application security"
    ],
    sameAs: siteConfig.sameAs
  }
];

export default function HomePage() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main">
      <StructuredData data={homepageSchema} />
      <section className="hero-shell">
        <AnimateIn className="hero-copy-block" delay={0.04}>
          <div className="hero-topline">
            <p className="eyebrow">{hero.eyebrow}</p>
            <span className="availability-pill">Open to backend, platform, software, and security roles</span>
          </div>

          <h1>{hero.headline}</h1>
          <p className="hero-copy muted">{hero.summary}</p>

          <div className="cta-row">
            {hero.actions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`button ${
                  action.variant === "primary" ? "button-primary" : "button-secondary"
                }`}
              >
                {action.label}
              </Link>
            ))}
          </div>

          <div className="hero-utility-grid" aria-label="Contact links">
            {hero.utilityLinks.map((link) => (
              link.href.startsWith("http") || link.href.startsWith("mailto:") ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="hero-utility-link"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span className="micro-label">{link.label}</span>
                  <span>{link.value}</span>
                </a>
              ) : (
                <Link key={link.label} href={link.href} className="hero-utility-link">
                  <span className="micro-label">{link.label}</span>
                  <span>{link.value}</span>
                </Link>
              )
            ))}
          </div>
        </AnimateIn>

        <AnimateIn className="surface hero-aside" delay={0.12}>
          <div className="hero-aside-grid">
            <article className="hero-glance-card hero-glance-featured">
              <p className="micro-label">Mission</p>
              <h2>{hero.mission}</h2>
              <p className="muted">
                Engineering work grounded in ownership, clarity, and operational follow-through.
              </p>
            </article>

            <article className="hero-glance-card">
              <p className="micro-label">Current focus</p>
              <ul className="bullet-list compact-list">
                {hero.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="hero-glance-card">
              <p className="micro-label">How I work</p>
              <div className="mini-principles">
                {principles.map((principle) => (
                  <div key={principle.title} className="mini-principle">
                    <strong>{principle.title}</strong>
                    <span>{principle.signal}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </AnimateIn>
      </section>

      <section className="signal-grid" aria-label="Key portfolio metrics">
        {stats.map((item, index) => (
          <AnimateIn key={item.label} className="surface signal-card" delay={0.08 + index * 0.04}>
            <p className="signal-value">{item.value}</p>
            <p className="muted">{item.label}</p>
          </AnimateIn>
        ))}
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="What I Can Build"
            title="Where I am most useful to an engineering team."
            copy="The strongest fit is work that spans architecture, reliability, debugging, and secure delivery rather than only isolated ticket execution."
          />
        </AnimateIn>

        <div className="capability-grid">
          {buildThemes.map((item, index) => (
            <AnimateIn key={item.title} className="surface capability-card" delay={0.08 + index * 0.05}>
              <p className="micro-label">Scope</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="Engineering Profile"
            title="The kind of work I am strongest in."
            copy="The portfolio is centered on backend delivery, platform reliability, and security work that survives contact with production."
          />
        </AnimateIn>

        <div className="capability-grid">
          {engineeringSignals.map((item, index) => (
            <AnimateIn key={item.title} className="surface capability-card depth-card" delay={0.08 + index * 0.05}>
              <p className="micro-label">Strength</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="Selected Impact"
            title="A few signals that matter quickly."
            copy="I want the site to answer the first serious question fast: what changed because of the work?"
          />
        </AnimateIn>

        <div className="proof-grid impact-grid">
          {selectedWins.map((item, index) => (
            <AnimateIn key={item.label} className="library-group impact-card" delay={0.08 + index * 0.05}>
              <p className="impact-value">{item.value}</p>
              <p className="muted">{item.label}</p>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="Explore"
            title="Navigate the portfolio."
            copy="Deep-dive into background, projects, the workbench, writing, or the resume view."
          />
        </AnimateIn>

        <div className="route-grid">
          {pathwayCards.map((card, index) => (
            <AnimateIn key={card.title} className="surface route-card" delay={0.08 + index * 0.04}>
              <p className="micro-label">{card.eyebrow}</p>
              <h3>{card.title}</h3>
              <p className="muted">{card.body}</p>
              <p className="route-card-signal">{card.signal}</p>
              <Link href={card.href} className="text-link">
                Open {card.title.toLowerCase()}
              </Link>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="detail-grid">
          {featuredProject ? (
            <AnimateIn className="surface panel-card" delay={0.08}>
              <p className="eyebrow">Featured project</p>
              <h2>{featuredProject.title}</h2>
              <p className="muted panel-copy">{featuredProject.summary}</p>
              <div className="media-frame">
                <img
                  src={withBasePath(featuredProject.media.src)}
                  alt={featuredProject.media.alt}
                  className="project-media"
                />
              </div>
              <p className="project-impact">{featuredProject.challenge}</p>
              <div className="tag-row">
                {featuredProject.stack.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
              <div className="cta-row compact-actions">
                <Link href="/projects/" className="button button-secondary">
                  Browse all projects
                </Link>
                <Link href={`/projects/${featuredProject.slug}/`} className="button button-primary">
                  Open case study
                </Link>
              </div>
            </AnimateIn>
          ) : null}

          {latestPost ? (
            <AnimateIn className="surface panel-card" delay={0.14}>
              <p className="eyebrow">Latest writing</p>
              <h2>{latestPost.title}</h2>
              <p className="muted panel-copy">{latestPost.excerpt}</p>
              <div className="preview-item standalone-preview">
                <div className="preview-head">
                  <h3>{latestPost.category}</h3>
                  <span>{latestPost.readTime}</span>
                  <time dateTime={latestPost.publishedAt}>
                    {formatPublishedDate(latestPost.publishedAt)}
                  </time>
                </div>
                <p className="muted">{latestPost.intro}</p>
              </div>
              <div className="cta-row compact-actions">
                <Link href="/blog/" className="button button-secondary">
                  Browse writing
                </Link>
                <Link href={`/blog/${latestPost.slug}/`} className="button button-primary">
                  Read note
                </Link>
              </div>
            </AnimateIn>
          ) : null}
        </div>
      </section>

      <section className="section-block" id="contact">
        <AnimateIn delay={0.08}>
          <ContactPanel />
        </AnimateIn>
      </section>
    </main>
  );
}
