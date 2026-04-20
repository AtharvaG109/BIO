import "./globals.css";
import { Inter, Outfit } from "next/font/google";

const fontInter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fontOutfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

import { AnalyticsScript } from "@/components/analytics-script";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildAbsoluteUrl, siteConfig, withBasePath } from "@/lib/site-data";

const faviconPath = withBasePath("/favicon.svg");
const socialPreviewPath = buildAbsoluteUrl("/social-preview.svg");
const googleSiteVerificationToken =
  process.env.GOOGLE_SITE_VERIFICATION ||
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  "Q1qnn9j21GEvPg9Dx-20kHfxkeiG0zOffzHTG2Dr_Ug";
const themeInitScript = `
  (function () {
    try {
      var key = "atharva-site-theme";
      var stored = window.localStorage.getItem(key);
      var theme = stored === "light" || stored === "dark" ? stored : "dark";
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (error) {
      document.documentElement.dataset.theme = "dark";
      document.documentElement.style.colorScheme = "dark";
    }
  })();
`;

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
    <html lang="en" suppressHydrationWarning className={`${fontInter.variable} ${fontOutfit.variable}`}>
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
