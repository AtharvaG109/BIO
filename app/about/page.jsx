import Image from "next/image";

import { AnimateIn } from "@/components/animate-in";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StructuredData } from "@/components/structured-data";
import {
  buildAbsoluteUrl,
  createBreadcrumbSchema,
  siteConfig,
  toolGroups,
  withBasePath
} from "@/lib/site-data";

const aboutDescription =
  "About Atharva Gham, a backend, platform, and security engineer shaped by graduate cybersecurity work at the University of Maryland.";

export const metadata = {
  title: "About",
  description: aboutDescription,
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
    description: aboutDescription,
    sameAs: siteConfig.sameAs
  }
];

const profileVisuals = [
  {
    title: "UMD campus before a storm",
    src: "/media/about-umd-campus-building.jpg",
    alt: "Brick University of Maryland campus building with a white cupola under dark storm clouds.",
    note: "A familiar College Park view from the period when secure systems and cloud security became everyday work for me."
  },
  {
    title: "McKeldin Mall in the evening",
    src: "/media/about-umd-mall-local.jpg",
    alt: "Wide view across McKeldin Mall at the University of Maryland under a blue evening sky.",
    note: "The long view across campus fits the way I think about engineering: keep the larger system visible while working through the details."
  }
];

const aboutStrengths = [
  {
    title: "Backend and Platform Systems",
    body:
      "APIs, workers, queues, service boundaries, and deployment paths built with failure modes in mind."
  },
  {
    title: "Observability-Led Debugging",
    body:
      "Tracing, logs, metrics, packet captures, and direct runtime evidence before guessing at a fix."
  },
  {
    title: "Security That Fits Delivery",
    body:
      "CI checks, policy gates, detection logic, IAM hygiene, and remediation workflows that engineering teams can maintain."
  },
  {
    title: "Low-Level Curiosity",
    body:
      "Enough comfort with Linux, binaries, memory, and networking to keep digging when the bug sits below the application layer."
  }
];

const workingPrinciples = [
  {
    title: "Be Direct About Uncertainty",
    body:
      "I would rather say what we know, what we do not know, and what evidence would settle it than oversell a guess.",
    signal: "Useful in incidents, security reviews, and technical handoffs."
  },
  {
    title: "Stay With the Hard Parts",
    body:
      "Shipping is not the finish line if rollout, alerts, docs, or cleanup are still weak.",
    signal: "Ownership means making the system easier to live with."
  },
  {
    title: "Use Evidence",
    body:
      "When behavior is unclear, I reach for traces, logs, packets, source, and tests instead of debating from memory.",
    signal: "It keeps discussions concrete and fixes defensible."
  }
];

const aboutDepthCards = [
  {
    title: "Architecture to Operations",
    body:
      "I think about deployability, fallback behavior, telemetry, and support paths while the design is still being shaped.",
    signal: "The result is less cleanup after launch."
  },
  {
    title: "Security as Engineering Quality",
    body:
      "Threat models, defaults, and guardrails work best when they are built into the flow of delivery.",
    signal: "That makes risk easier to find, explain, and reduce."
  },
  {
    title: "Communication That Lowers Friction",
    body:
      "I write notes and summaries so another engineer can understand the decision, reproduce the issue, or continue the work.",
    signal: "Good context saves time when the work gets complicated."
  }
];

const interestNotes = [
  {
    title: "Systems and Linux",
    body: "Processes, networking, memory, and the OS behavior behind service failures."
  },
  {
    title: "Security Research",
    body:
      "Exploit mechanics, incident writeups, detection ideas, and defensive patterns that survive real constraints."
  },
  {
    title: "AI Security",
    body:
      "How tool-using agents fail, where trust boundaries move, and how to make automation auditable."
  },
  {
    title: "Distributed Systems",
    body:
      "Queues, concurrency, resilience, and observability in services that cannot rely on a single happy path."
  }
];

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main">
      <StructuredData data={aboutSchema} />
      <PageHero
        eyebrow="About"
        title="I build backend, platform, and security systems that are easier to understand under pressure."
        copy="My best work sits close to runtime behavior: APIs, services, telemetry, deployments, security controls, and the debugging path when something breaks. I like practical engineering over polished buzzwords."
        actions={[
          { label: "View experience", href: "/experience/", variant: "primary" },
          { label: "Request intro", href: "/contact/", variant: "secondary" }
        ]}
      />

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="University of Maryland"
            title="The place that sharpened how I think about security."
            copy="My graduate work at UMD gave me a stronger base in secure systems, cloud security, offensive practice, and defensive engineering. The photos keep that background grounded in the place where the work happened."
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
            <h2>College Park is where the work became more concrete.</h2>
            <p className="muted">
              The coursework and labs made security feel less like a checklist and more like an
              engineering discipline: understand the system, test assumptions, look at the evidence,
              and leave the design easier to operate.
            </p>
            <div className="about-photo-note-grid">
              <article>
                <p className="micro-label">Graduate focus</p>
                <p>M.Eng. work in Cybersecurity Engineering at the University of Maryland, College Park.</p>
              </article>
              <article>
                <p className="micro-label">How it shows up</p>
                <p>Backend and platform work with clearer threat models, better observability, and safer defaults.</p>
              </article>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section-block">
        <div className="about-intro-grid">
          <AnimateIn className="surface panel-card about-story-panel" delay={0.06}>
            <p className="eyebrow">Who I Am</p>
            <h2>I like the part of engineering where the details start to matter.</h2>
            <p className="about-lead">
              I am drawn to backend and platform work because small design decisions show up later
              in latency, failures, alerts, and security posture. I prefer getting close enough to
              the system to explain what is happening, not just patch the symptom.
            </p>
            <div className="about-story-grid">
              <article className="about-story-note">
                <p>
                  I enjoy building services and tools that a team can operate after the first demo.
                  That means clear boundaries, useful logs and traces, simple runbooks, and defaults
                  that make the safe path the easy path.
                </p>
              </article>
              <article className="about-story-note about-story-note-accent">
                <p className="micro-label">Why security stays close</p>
                <p>
                  Security fits that same way of working. Good controls should reduce uncertainty
                  for engineers, not sit in a separate document no one trusts.
                </p>
              </article>
            </div>
          </AnimateIn>

          <AnimateIn className="surface panel-card about-aim-panel" delay={0.12}>
            <p className="eyebrow">Next</p>
            <h2>The teams where I fit best.</h2>
            <div className="about-aim-list">
              <article className="about-aim-item">
                <span className="about-aim-mark" aria-hidden="true" />
                <p>Backend, platform, or infrastructure teams that care about reliability, observability, and measured performance.</p>
              </article>
              <article className="about-aim-item">
                <span className="about-aim-mark" aria-hidden="true" />
                <p>Security engineering teams that turn risk into guardrails, automation, and clear remediation paths.</p>
              </article>
              <article className="about-aim-item">
                <span className="about-aim-mark" aria-hidden="true" />
                <p>Groups that value ownership after launch: debugging, hardening, documentation, and incident learning.</p>
              </article>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="Strengths"
            title="The work I want people to trust me with."
            copy="I am useful when a project needs someone who can connect implementation details with production behavior and security tradeoffs."
          />
        </AnimateIn>

        <div className="overview-grid">
          <div className="capability-grid">
            {aboutStrengths.map((card, index) => (
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
                <h2>Make the system explainable before calling it done.</h2>
              </div>
              <p className="muted home-collaboration-copy">
                I care about the shape of the work after it ships: who can debug it, who can support
                it, and whether the next engineer can understand the tradeoffs.
              </p>
            </div>

            <div className="home-collaboration-grid">
              {workingPrinciples.map((principle) => (
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
            eyebrow="Depth"
            title="How I keep broad work from becoming vague."
            copy="I try to connect each layer to something visible: a metric, a failure mode, a security boundary, a deployment risk, or a clear handoff."
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
            <h2>The areas I keep studying because they make me better on real projects.</h2>
            <div className="interest-stack">
              {interestNotes.map((item) => (
                <article key={item.title} className="interest-item">
                  <h3>{item.title}</h3>
                  <p className="muted">{item.body}</p>
                </article>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn className="surface panel-card" delay={0.14}>
            <p className="eyebrow">Technical range</p>
            <h2>The tools I keep reaching for.</h2>
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
