import { siteConfig } from "@/lib/site-data";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`
  };
}
