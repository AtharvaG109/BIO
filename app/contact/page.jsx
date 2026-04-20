import { ContactPanel } from "@/components/contact-panel";
import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "Contact",
  description: "Private contact request flow for Atharva Gham."
};

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main">
      <PageHero
        eyebrow="Contact"
        title="Start with the role, project, or problem."
        copy="I keep direct phone details off the public site. If you are reaching out about a role, collaboration, or technical discussion, send the context here and I will review it directly."
        actions={[
          { label: "View projects", href: "/projects/", variant: "secondary" },
          { label: "Open resume", href: "/resume/", variant: "primary" }
        ]}
      />

      <section className="section-block">
        <ContactPanel />
      </section>
    </main>
  );
}
