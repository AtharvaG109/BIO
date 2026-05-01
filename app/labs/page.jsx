import { AnimateIn } from "@/components/animate-in";
import { LabsPlayground } from "@/components/labs-playground";
import { StructuredData } from "@/components/structured-data";
import { buildAbsoluteUrl, createBreadcrumbSchema } from "@/lib/site-data";

export const metadata = {
  title: "Labs",
  description:
    "Client-side security and systems playground for JWTs, logs, detection rules, risk scoring, packet flows, and CI security gates.",
  alternates: {
    canonical: "/labs/"
  }
};

const labsSchema = [
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Labs", path: "/labs/" }
  ]),
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Atharva Gham Labs",
    url: buildAbsoluteUrl("/labs/"),
    description:
      "Interactive browser-only security and systems tools for portfolio visitors."
  }
];

export default function LabsPage() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main">
      <StructuredData data={labsSchema} />
      <AnimateIn className="surface page-hero" delay={0.05}>
        <p className="eyebrow">Labs</p>
        <h1>Small security tools that make the portfolio hands-on.</h1>
        <p className="muted hero-copy">
          These browser-only utilities use sanitized sample data to show the same workflows behind
          my systems and security projects: decode, parse, match, score, explain, and gate.
        </p>
      </AnimateIn>
      <LabsPlayground />
    </main>
  );
}
