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
        title="Who I am, what kind of engineer I am, and how I like to work."
        copy="I am a backend, platform, and security engineer who likes difficult systems work. I care about reliability, clear architecture, real debugging, and building things that still make sense once they are running in the real world."
        actions={[
          { label: "View experience", href: "/experience/", variant: "primary" },
          { label: "Request intro", href: "/contact/", variant: "secondary" }
        ]}
      />

      <section className="section-block">
        <div className="detail-grid">
          <AnimateIn className="surface panel-card" delay={0.06}>
            <p className="eyebrow">Who I Am</p>
            <h2>I am not just trying to ship features. I like understanding how the system actually behaves.</h2>
            <div className="preview-list compact-preview-list">
              <article className="preview-item">
                <p>
                  My strongest work usually sits somewhere between backend engineering, platform
                  reliability, and security. I like being close to the runtime, the telemetry, the
                  packet flow, the release process, and the debugging trail when something goes
                  wrong.
                </p>
              </article>
              <article className="preview-item">
                <p>
                  I enjoy building useful systems, but I also care a lot about whether the system is
                  explainable. If a service is hard to observe, hard to reason about, or easy to
                  break during rollout, I do not consider the job finished yet.
                </p>
              </article>
              <article className="preview-item">
                <p>
                  A lot of my interest in security comes from that same mindset. I care about making
                  systems safer in ways that are concrete and operational, not cosmetic.
                </p>
              </article>
            </div>
          </AnimateIn>

          <AnimateIn className="surface panel-card" delay={0.12}>
            <p className="eyebrow">What I Want To Keep Doing</p>
            <h2>The environments where I do my best work.</h2>
            <ul className="bullet-list">
              <li>Backend or platform teams where reliability, observability, and performance are treated as engineering work, not cleanup.</li>
              <li>Security-minded environments where guardrails, automation, and debugging depth matter more than buzzwords.</li>
              <li>Teams that value ownership, clear communication, and engineers who stay with the hard parts after launch.</li>
            </ul>
          </AnimateIn>
        </div>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="Strengths"
            title="Where I add leverage."
            copy="I tend to be most useful when a project needs architecture, implementation, and post-launch follow-through from the same person."
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
              Technical range matters, but I care just as much about whether the work is observable,
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
            title="How I turn broad range into reliable delivery."
            copy="The goal is not to sound broad. The goal is to stay useful when the work crosses multiple layers and somebody needs to keep the whole thing understandable."
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
            <h2>The technical areas I keep coming back to, even when they are not required by the current project.</h2>
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
            <h2>The tooling that keeps showing up across the work I do.</h2>
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
