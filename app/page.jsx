import Link from "next/link";

import { AnimateIn } from "@/components/animate-in";
import { SectionHeading } from "@/components/section-heading";
import {
  formatPublishedDate,
  getFeaturedProject,
  getLatestPost,
  hero,
  pathwayCards,
  principles,
  siteConfig,
  stats,
  withBasePath
} from "@/lib/site-data";

const featuredProject = getFeaturedProject();
const latestPost = getLatestPost();

function getUtilityValue(label) {
  if (label === "Email") {
    return siteConfig.email;
  }

  if (label === "Phone") {
    return siteConfig.phone;
  }

  return "Open profile";
}

export default function HomePage() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main">
      <section className="hero-shell">
        <AnimateIn className="hero-copy-block" delay={0.04}>
          <div className="hero-topline">
            <p className="eyebrow">{hero.eyebrow}</p>
            <span className="availability-pill">Open to software, systems, platform, and security roles</span>
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
              <a
                key={link.label}
                href={link.href}
                className="hero-utility-link"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <span className="micro-label">{link.label}</span>
                <span>{getUtilityValue(link.label)}</span>
              </a>
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
            eyebrow="Explore"
            title="Navigate the portfolio."
            copy="Deep-dive into background, projects, practice, writing, or the resume view."
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
        <AnimateIn className="surface contact-band" delay={0.08}>
          <div className="contact-copy">
            <p className="eyebrow">Contact</p>
            <h2>
              If the role needs systems depth, security judgment, and reliable follow-through, I am
              interested.
            </h2>
            <p className="muted">
              I am based in {siteConfig.location} and open to conversations about backend, systems,
              platform, and security engineering work where ownership and trust are treated seriously.
            </p>
          </div>

          <div className="cta-row contact-actions">
            <a href={`mailto:${siteConfig.email}`} className="button button-primary">
              Email Atharva
            </a>
            <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="button button-secondary">
              LinkedIn
            </a>
          </div>
        </AnimateIn>
      </section>
    </main>
  );
}
