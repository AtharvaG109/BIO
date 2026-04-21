import { AnimateIn } from "@/components/animate-in";
import { PageHero } from "@/components/page-hero";
import { ProjectShowcase } from "@/components/project-showcase";
import { StructuredData } from "@/components/structured-data";
import { buildAbsoluteUrl, createBreadcrumbSchema, projects } from "@/lib/site-data";

export const metadata = {
  title: "Projects",
  description: "Interactive project browsing and case studies for Atharva Gham.",
  alternates: {
    canonical: "/projects/"
  }
};

const projectIndexSchema = [
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects/" }
  ]),
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Atharva Gham Projects",
    url: buildAbsoluteUrl("/projects/"),
    description: "Interactive project browsing and case studies for Atharva Gham."
  }
];

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main">
      <StructuredData data={projectIndexSchema} />
      <PageHero
        eyebrow="Projects"
        title="Case studies from shipped systems and security work."
        copy="These projects cover backend systems, security products, low-level research, and the engineering tradeoffs behind each one."
        actions={[
          { label: "Open workbench", href: "/workbench/", variant: "secondary" },
          { label: "Request intro", href: "/contact/", variant: "primary" }
        ]}
      />

      <section className="section-block">
        <div className="projects-intro-grid">
          <AnimateIn className="surface panel-card projects-intro-panel" delay={0.04}>
            <p className="eyebrow">How To Read This Page</p>
            <h2>This is not a gallery of one-off demos.</h2>
            <p className="muted">
              I use these projects to show how I think about systems: what the problem really was,
              why the architecture ended up the way it did, and what changed because the work
              shipped.
            </p>
          </AnimateIn>

          <AnimateIn className="surface panel-card projects-note-panel" delay={0.1}>
            <p className="eyebrow">What To Expect</p>
            <ul className="bullet-list">
              <li>Public, product-shaped work with clearer scope and more honest tradeoffs.</li>
              <li>Backend, platform, security, and low-level systems projects rather than generic app builds.</li>
              <li>Case studies that explain why the design matters, not only what tech was used.</li>
            </ul>
          </AnimateIn>
        </div>
      </section>

      <section className="section-block projects-showcase-section">
        <ProjectShowcase projects={projects} />
      </section>
    </main>
  );
}
