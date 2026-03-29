import { AnimateIn } from "@/components/animate-in";
import { StructuredData } from "@/components/structured-data";
import {
  buildAbsoluteUrl,
  createBreadcrumbSchema,
  practiceFoundations,
  practiceTracks,
  studyThemes
} from "@/lib/site-data";

export const metadata = {
  title: "Workbench",
  description:
    "Research notes, reverse-engineering study, security workflows, and applied systems practice distilled into portfolio-ready takeaways.",
  alternates: {
    canonical: "/workbench/"
  }
};

const workbenchSchema = [
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Workbench", path: "/workbench/" }
  ]),
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Atharva Gham Workbench",
    url: buildAbsoluteUrl("/workbench/"),
    description:
      "Research notes, reverse-engineering study, security workflows, and applied systems practice distilled into portfolio-ready takeaways."
  }
];

export default function WorkbenchPage() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main">
      <StructuredData data={workbenchSchema} />
      <AnimateIn className="surface page-hero" delay={0.05}>
        <p className="eyebrow">Workbench</p>
        <h1>Research, reverse engineering, and applied systems work.</h1>
        <p className="muted hero-copy">
          This section turns hands-on study into engineering signal: how I reason through binaries,
          communications, operating-system behavior, cloud security, and exploit mechanics.
        </p>
      </AnimateIn>

      <section className="section-block learning-page-grid">
        {practiceTracks.map((track, index) => (
          <AnimateIn key={track.title} className="surface learning-card" delay={0.08 + index * 0.04}>
            <div className="project-meta">
              <span>{track.category}</span>
              <span>Applied track</span>
            </div>
            <h2>{track.title}</h2>
            <p className="muted">{track.summary}</p>
            <div className="practice-block">
              <p className="micro-label">Where it showed up</p>
              <ul className="bullet-list compact-list">
                {track.usedIn.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="practice-block">
              <p className="micro-label">What I worked through</p>
              <ul className="bullet-list compact-list">
                {track.actions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="tag-row">
              {track.tools.map((tool) => (
                <span key={tool} className="tag">
                  {tool}
                </span>
              ))}
            </div>
          </AnimateIn>
        ))}
      </section>

      <section className="section-block">
        <AnimateIn className="surface library-card" delay={0.06}>
          <p className="eyebrow">Distilled Study</p>
          <h2>Substance over screenshots or file dumps.</h2>
          <div className="preview-list compact-preview-list">
            {studyThemes.map((theme) => (
              <article key={theme.title} className="preview-item">
                <div className="preview-head preview-head-column">
                  <h3>{theme.title}</h3>
                  <span>Applied theme</span>
                </div>
                <p className="muted">{theme.summary}</p>
                <ul className="bullet-list compact-list">
                  {theme.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </AnimateIn>
      </section>

      <section className="section-block">
        <AnimateIn className="surface library-card" delay={0.06}>
          <p className="eyebrow">How It Shows Up</p>
          <h2>What this study changes in the way I build and debug systems.</h2>
          <div className="proof-grid">
            {practiceFoundations.map((item) => (
              <article key={item} className="library-group">
                <p className="muted">{item}</p>
              </article>
            ))}
          </div>
        </AnimateIn>
      </section>
    </main>
  );
}
