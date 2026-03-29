import "./globals.css";

import { AnalyticsScript } from "@/components/analytics-script";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig, withBasePath } from "@/lib/site-data";

const faviconPath = withBasePath("/favicon.svg");
const socialPreviewPath = withBasePath("/social-preview.svg");
const googleSiteVerificationToken =
  process.env.GOOGLE_SITE_VERIFICATION ||
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  "Q1qnn9j21GEvPg9Dx-20kHfxkeiG0zOffzHTG2Dr_Ug";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.shortName,
  verification: {
    google: googleSiteVerificationToken
  },
  title: {
    default: `${siteConfig.shortName} | Backend, Platform, Security Engineer`,
    template: `%s | ${siteConfig.shortName}`
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: faviconPath
  },
  openGraph: {
    title: `${siteConfig.shortName} | Backend, Platform, Security Engineer`,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.shortName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: socialPreviewPath,
        width: 1200,
        height: 630,
        alt: `${siteConfig.shortName} portfolio preview`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.shortName} | Backend, Platform, Security Engineer`,
    description: siteConfig.description,
    images: [socialPreviewPath]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
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
