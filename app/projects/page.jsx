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
        title="Case studies and interactive project previews."
        copy="Filter by category, preview in the spotlight, and explore both shipped engineering projects and published technical work."
        actions={[
          { label: "Open workbench", href: "/workbench/", variant: "secondary" },
          { label: "Request intro", href: "/contact/", variant: "primary" }
        ]}
      />

      <section className="section-block">
        <ProjectShowcase projects={projects} />
      </section>
    </main>
  );
}
