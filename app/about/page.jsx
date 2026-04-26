import Image from "next/image";

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
  toolGroups,
  withBasePath
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

const profileVisuals = [
  {
    title: "University of Maryland campus",
    src: "/media/about-umd-campus-building.jpg",
    alt: "University of Maryland campus building photographed from a local file.",
    note: "Local campus photo from your files, used to support the UMD graduate background."
  },
  {
    title: "McKeldin Mall view",
    src: "/media/about-umd-mall-local.jpg",
    alt: "McKeldin Mall at the University of Maryland photographed from a local file.",
    note: "Local campus photo from your files, with no online image source or AI generation."
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
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="University of Maryland"
            title="Campus photos from your own files, not online sources."
            copy="These images come from the local HEIC files you provided. They connect the About page to your University of Maryland cybersecurity engineering background without using online images or AI-generated campus scenes."
          />
        </AnimateIn>

        <div className="about-visual-grid">
          <AnimateIn className="surface about-photo-gallery" delay={0.08}>
            {profileVisuals.map((item) => (
              <figure key={item.src} className="about-photo-card">
                <Image
                  src={withBasePath(item.src)}
                  alt={item.alt}
                  width={1800}
                  height={1350}
                  className="about-profile-image"
                  sizes="(max-width: 860px) 100vw, 50vw"
                  priority={item.src.includes("campus-building")}
                />
                <figcaption>
                  <span>{item.title}</span>
                  <small>{item.note}</small>
                </figcaption>
              </figure>
            ))}
          </AnimateIn>

          <AnimateIn className="surface about-photo-panel" delay={0.14}>
            <p className="eyebrow">Background</p>
            <h2>Cybersecurity engineering, grounded in a real UMD context.</h2>
            <p className="muted">
              My M.Eng. in Cybersecurity Engineering at the University of Maryland, College Park
              strengthened the secure systems, cloud security, offensive practice, and defensive
              engineering work behind this portfolio.
            </p>
            <div className="about-photo-note-grid">
              <article>
                <p className="micro-label">Source</p>
                <p>Converted from your local HEIC files and stripped of image metadata before publishing.</p>
              </article>
              <article>
                <p className="micro-label">Style</p>
                <p>Real campus context without synthetic backgrounds, stock imagery, or external photo credits.</p>
              </article>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section-block">
        <div className="about-intro-grid">
          <AnimateIn className="surface panel-card about-story-panel" delay={0.06}>
            <p className="eyebrow">Who I Am</p>
            <h2>I am not just trying to ship features. I like understanding how the system actually behaves.</h2>
            <p className="about-lead">
              My strongest work usually sits somewhere between backend engineering, platform
              reliability, and security. I like being close to the runtime, the telemetry, the
              packet flow, the release process, and the debugging trail when something goes wrong.
            </p>
            <div className="about-story-grid">
              <article className="about-story-note">
                <p>
                  I enjoy building useful systems, but I also care a lot about whether the system is
                  explainable. If a service is hard to observe, hard to reason about, or easy to
                  break during rollout, I do not consider the job finished yet.
                </p>
              </article>
              <article className="about-story-note about-story-note-accent">
                <p className="micro-label">Why security stays close</p>
                <p>
                  A lot of my interest in security comes from the same mindset. I want systems to be
                  safer in ways that are concrete, observable, and operational instead of cosmetic.
                </p>
              </article>
            </div>
          </AnimateIn>

          <AnimateIn className="surface panel-card about-aim-panel" delay={0.12}>
            <p className="eyebrow">What I Want To Keep Doing</p>
            <h2>The environments where I do my best work.</h2>
            <div className="about-aim-list">
              <article className="about-aim-item">
                <span className="about-aim-mark" aria-hidden="true" />
                <p>Backend or platform teams where reliability, observability, and performance are treated as engineering work, not cleanup.</p>
              </article>
              <article className="about-aim-item">
                <span className="about-aim-mark" aria-hidden="true" />
                <p>Security-minded environments where guardrails, automation, and debugging depth matter more than buzzwords.</p>
              </article>
              <article className="about-aim-item">
                <span className="about-aim-mark" aria-hidden="true" />
                <p>Teams that value ownership, clear communication, and engineers who stay with the hard parts after launch.</p>
              </article>
            </div>
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

          <AnimateIn className="surface home-collaboration-shell about-values-shell" delay={0.16}>
            <div className="home-collaboration-head">
              <div>
                <p className="eyebrow">Working style</p>
                <h2>{hero.mission}</h2>
              </div>
              <p className="muted home-collaboration-copy">
                Technical range matters, but I care just as much about whether the work is
                observable, supportable, and trustworthy after the first release.
              </p>
            </div>

            <div className="home-collaboration-grid">
              {principles.map((principle) => (
                <article key={principle.title} className="home-collaboration-card">
                  <p className="micro-label">{principle.title}</p>
                  <p>{principle.body}</p>
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
