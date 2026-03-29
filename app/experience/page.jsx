import { AnimateIn } from "@/components/animate-in";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import {
  certifications,
  deliveryPatterns,
  education,
  experience,
  stats,
  toolGroups
} from "@/lib/site-data";

export const metadata = {
  title: "Experience",
  description: "Experience, credentials, and technical range for Atharva Vijayanand Gham."
};

export default function ExperiencePage() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main">
      <PageHero
        eyebrow="Experience"
        title="Roles, outcomes, and credentials."
        copy="Career history with emphasis on impact and supporting technical depth."
        actions={[
          { label: "Open resume", href: "/resume/", variant: "primary" },
          { label: "View projects", href: "/projects/", variant: "secondary" }
        ]}
      />

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
            eyebrow="Execution Pattern"
            title="How I run work from design to post-release learning."
            copy="I focus on repeatable practices that protect reliability, speed up debugging, and improve long-term system health."
          />
        </AnimateIn>

        <div className="capability-grid">
          {deliveryPatterns.map((item, index) => (
            <AnimateIn key={item.title} className="surface capability-card depth-card" delay={0.08 + index * 0.05}>
              <p className="micro-label">Pattern</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section-block">
        <AnimateIn delay={0.04}>
          <SectionHeading
            eyebrow="Career"
            title="Where performance, observability, and security converge."
            copy="Most effective where the stack is wide and the operational pressure is real."
          />
        </AnimateIn>

        <div className="experience-stack">
          {experience.map((item, index) => (
            <AnimateIn key={item.role} className="surface experience-card" delay={0.08 + index * 0.06}>
              <div className="experience-side">
                <p className="micro-label">{item.period}</p>
                <p>{item.company}</p>
                <p className="muted">{item.location}</p>
              </div>

              <div className="experience-main">
                <div className="experience-head">
                  <h3>{item.role}</h3>
                  <p className="experience-summary">{item.summary}</p>
                </div>

                <ul className="bullet-list">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>

                <div className="tag-row">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="detail-grid">
          <AnimateIn className="surface panel-card" delay={0.08}>
            <p className="eyebrow">Credentials</p>
            <h2>Graduate study and offensive certification that support the engineering work.</h2>
            <div className="preview-list compact-preview-list">
              {education.map((item) => (
                <article key={item.degree} className="preview-item">
                  <div className="preview-head preview-head-column">
                    <h3>{item.degree}</h3>
                    <span>{item.period}</span>
                  </div>
                  <p>{item.school}</p>
                  <p className="muted">{item.details}</p>
                </article>
              ))}

              {certifications.map((item) => (
                <article key={item.name} className="preview-item">
                  <div className="preview-head preview-head-column">
                    <h3>{item.name}</h3>
                    <span>{item.issuer}</span>
                  </div>
                  <p className="muted">{item.details}</p>
                </article>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn className="surface panel-card" delay={0.14}>
            <p className="eyebrow">Technical range</p>
            <h2>Toolsets that show up repeatedly across systems and security work.</h2>
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
