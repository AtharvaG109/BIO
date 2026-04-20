import { AnimateIn } from "@/components/animate-in";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import {
  aboutDepthCards,
  buildAbsoluteUrl,
  capabilityCards,
  createBreadcrumbSchema,
  hero,
  interests,
  principles,
  siteConfig,
  toolGroups
} from "@/lib/site-data";

export const metadata = {
  title: "About",
  description: "Profile, working style, values, and technical interests for Atharva Gham.",
  alternates: {
    canonical: "/about/"
  }
};

const aboutSchema = [
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about/" }
  ]),
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: buildAbsoluteUrl("/about/"),
    jobTitle: "Software Engineer",
    description: siteConfig.description,
    sameAs: siteConfig.sameAs
  }
];

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main">
      <StructuredData data={aboutSchema} />
      <PageHero
        eyebrow="About"
        title="How I work, what I care about, and where I add leverage."
        copy="My work sits at the intersection of backend engineering, platform reliability, and security. The through-line is ownership: design it well, ship it carefully, and keep it understandable once it is running."
        actions={[
          { label: "View experience", href: "/experience/", variant: "primary" },
          { label: "Request intro", href: "/contact/", variant: "secondary" }
        ]}
      />

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="Strengths"
            title="Where I add leverage."
            copy="I tend to be most useful when a project needs architecture, execution, and post-launch follow-through from the same person."
          />
        </AnimateIn>

        <div className="overview-grid">
          <div className="capability-grid">
            {capabilityCards.map((card, index) => (
              <AnimateIn key={card.title} className="surface capability-card" delay={0.08 + index * 0.04}>
                <p className="micro-label">Capability</p>
                <h3>{card.title}</h3>
                <p className="muted">{card.body}</p>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn className="surface values-panel" delay={0.16}>
            <p className="eyebrow">Working style</p>
            <h2>{hero.mission}</h2>
            <p className="muted values-copy">
              Technical range matters, but I care just as much about whether the work is explainable,
              supportable, and trustworthy after the first release.
            </p>

            <div className="values-stack">
              {principles.map((principle) => (
                <article key={principle.title} className="value-item">
                  <div>
                    <p className="micro-label">{principle.title}</p>
                    <p>{principle.body}</p>
                  </div>
                  <p className="muted">{principle.signal}</p>
                </article>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="Execution Depth"
            title="How I turn range into reliable delivery."
            copy="The goal is not to look broad on paper. It is to stay effective when the work crosses multiple layers and the failure modes are real."
          />
        </AnimateIn>

        <div className="capability-grid">
          {aboutDepthCards.map((item, index) => (
            <AnimateIn key={item.title} className="surface capability-card depth-card" delay={0.08 + index * 0.05}>
              <p className="micro-label">Operating layer</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
              <p className="depth-signal">{item.signal}</p>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="detail-grid">
          <AnimateIn className="surface panel-card" delay={0.08}>
            <p className="eyebrow">Interests</p>
            <h2>The technical threads I keep following outside immediate project needs.</h2>
            <div className="interest-stack">
              {interests.map((item) => (
                <article key={item.title} className="interest-item">
                  <h3>{item.title}</h3>
                  <p className="muted">{item.body}</p>
                </article>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn className="surface panel-card" delay={0.14}>
            <p className="eyebrow">Technical range</p>
            <h2>Tooling that keeps showing up across backend, platform, and security work.</h2>
            <div className="preview-list compact-preview-list">
              {toolGroups.map((group) => (
                <article key={group.title} className="preview-item">
                  <div className="preview-head preview-head-column">
                    <h3>{group.title}</h3>
                    <span>{group.items.length} tools</span>
                  </div>
                  <div className="tag-row">
                    {group.items.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>
    </main>
  );
}
