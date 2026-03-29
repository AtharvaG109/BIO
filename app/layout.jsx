import "./globals.css";

import { AnalyticsScript } from "@/components/analytics-script";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig, withBasePath } from "@/lib/site-data";

const faviconPath = withBasePath("/favicon.svg");

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.shortName} | Software + Security Engineer`,
    template: `%s | ${siteConfig.shortName}`
  },
  description: siteConfig.description,
  icons: {
    icon: faviconPath
  },
  openGraph: {
    title: `${siteConfig.shortName} | Software + Security Engineer`,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.shortName,
    locale: "en_US",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ScrollProgress />
        <div className="page-backdrop page-backdrop-left" />
        <div className="page-backdrop page-backdrop-right" />
        <SiteHeader />
        {children}
        <SiteFooter />
        <AnalyticsScript />
      </body>
    </html>
  );
}
