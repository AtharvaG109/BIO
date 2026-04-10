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
        title="Start the conversation with context."
        copy="I keep direct phone details off the public site. Use the request form for serious roles, project discussions, engineering conversations, research, or collaboration."
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
