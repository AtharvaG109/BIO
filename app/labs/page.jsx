import { AnimateIn } from "@/components/animate-in";
import { practiceFoundations, practiceTracks, studyThemes } from "@/lib/site-data";

export const metadata = {
  title: "Labs",
  description:
    "Applied practice areas built from hands-on labs, challenge environments, exploit study, cloud security exercises, and operational workflows."
};

export default function LabsPage() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main">
      <AnimateIn className="surface page-hero" delay={0.05}>
        <p className="eyebrow">Labs</p>
        <h1>Applied security and systems practice.</h1>
        <p className="muted hero-copy">
          Hands-on workflows from labs, challenge environments, cloud exercises, and tool use — framed as work actually exercised.
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
          <h2>I surface the substance of the material here instead of publishing raw course files.</h2>
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
          <p className="eyebrow">Foundations</p>
          <h2>What the study changed in how I work.</h2>
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
