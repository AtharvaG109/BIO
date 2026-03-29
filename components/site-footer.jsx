import Link from "next/link";

import { siteConfig } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-shell">
        <div className="footer-copy">
          <p className="footer-title">{siteConfig.shortName}</p>
          <p className="muted">
            Software engineer and cybersecurity engineer based in {siteConfig.location}.
          </p>
        </div>

        <div className="footer-links">
          <Link href="/about/">About</Link>
          <Link href="/experience/">Experience</Link>
          <Link href="/projects/">Projects</Link>
          <Link href="/practice/">Practice</Link>
          <Link href="/blog/">Writing</Link>
          <Link href="/resume/">Resume</Link>
          <a href={siteConfig.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${siteConfig.email}`}>Email</a>
          <a href="tel:+12408798063">Phone</a>
        </div>
      </div>
    </footer>
  );
}
