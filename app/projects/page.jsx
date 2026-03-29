import { PageHero } from "@/components/page-hero";
import { ProjectShowcase } from "@/components/project-showcase";
import { projects } from "@/lib/site-data";

export const metadata = {
  title: "Projects",
  description: "Interactive project browsing and case studies for Atharva Vijayanand Gham."
};

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main">
      <PageHero
        eyebrow="Projects"
        title="Case studies and interactive project previews."
        copy="Filter by category, preview in the spotlight, and explore both shipped engineering projects and published technical work."
        actions={[
          { label: "Explore practice", href: "/practice/", variant: "secondary" },
          { label: "Request intro", href: "/contact/", variant: "primary" }
        ]}
      />

      <section className="section-block">
        <ProjectShowcase projects={projects} />
      </section>
    </main>
  );
}
