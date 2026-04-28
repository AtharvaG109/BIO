# Portfolio

Portfolio site for Atharva Gham, built with Next.js static export and configured for GitHub Pages and other free static hosts.

Advanced Next.js portfolio for a software engineer and cybersecurity engineer.

## Features

- Multi-section homepage with systems and security focus
- Blog index plus article pages
- Resume page with print/save support
- Private contact form that opens a direct email draft
- Downloadable text resume in `public/resume`
- Framer Motion reveal and filter animations
- Google Analytics hook via `NEXT_PUBLIC_GA_ID`
- Static export configuration for free hosting
- Static-host security headers via `public/_headers` for hosts that support it
- Web manifest plus public `security.txt`, `llms.txt`, and `humans.txt` metadata
- GitHub issue templates, PR template, and CI build workflow

## Project Structure

- `app/`: Next.js routes and pages
- `components/`: shared UI and client components
- `lib/site-data.js`: portfolio content, resume data, blog content
- `public/`: downloadable resume and static assets
- `.github/`: deploy workflow plus contribution templates

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Update Content

Edit `lib/site-data.js` to update:

- hero copy
- experience
- projects
- education
- certifications
- skills and tooling
- blog posts
- contact links

## Contact Form

The site now uses a private contact request flow instead of publishing a direct phone number.

The contact form submits in the background to `atharvam10@icloud.com` through FormSubmit.
This keeps the inbox private and avoids publishing direct phone details on the open web.

## Analytics

Set a Google Analytics property ID before build or deploy:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

If the variable is missing, analytics stays disabled.

## Search Console

To enable Google Search Console site verification without another code change later, set:

```bash
GOOGLE_SITE_VERIFICATION=your-verification-token
```

The GitHub Pages workflow now forwards this value from either a repository variable or a repository secret during build, so the verification meta tag is included in production. After that, submit the generated sitemap from:

```text
https://your-site-url/sitemap.xml
```

## Free Hosting

### Recommended: Vercel

Best fit for a Next.js portfolio.

- free hobby tier
- zero-config deploys from GitHub
- strong support for analytics and previews

### Also Supported: GitHub Pages

This repo is configured with static export in `next.config.mjs`, so it can be deployed as a static site too.

Typical flow:

```bash
npm install
npm run build
npm run verify:export
```

Then deploy the generated `out/` directory with GitHub Pages or any static host.

`npm run check` now builds the static export and verifies that the files needed
for search, social previews, security metadata, and GitHub Pages are present.

## Repository Hygiene

The repo includes a lightweight GitHub Actions CI workflow that runs `npm ci` and `npm run build` on pushes and pull requests.

Additional public metadata files live under `public/`:

- `site.webmanifest`
- `security.txt`
- `llms.txt`
- `humans.txt`
