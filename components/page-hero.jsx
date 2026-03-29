import Link from "next/link";

import { AnimateIn } from "@/components/animate-in";

export function PageHero({ eyebrow, title, copy, actions = [] }) {
  return (
    <AnimateIn className="surface page-hero" delay={0.05}>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {copy ? <p className="muted hero-copy">{copy}</p> : null}
      {actions.length ? (
        <div className="cta-row">
          {actions.map((action) => {
            const className = `button ${
              action.variant === "primary" ? "button-primary" : "button-secondary"
            }`;

            if (
              action.href.startsWith("http") ||
              action.href.startsWith("mailto:") ||
              action.href.startsWith("tel:")
            ) {
              return (
                <a
                  key={action.label}
                  href={action.href}
                  className={className}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  rel={action.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {action.label}
                </a>
              );
            }

            return (
              <Link key={action.label} href={action.href} className={className}>
                {action.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </AnimateIn>
  );
}
