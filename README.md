# Bio

Atharva Gham portfolio site (Next.js static export) configured for GitHub Pages and other free static hosts.

Advanced Next.js portfolio for a software engineer and cybersecurity engineer.

## Features

- Multi-section homepage with systems and security focus
- Blog index plus article pages
- Resume page with print/save support
- Private contact request form with static-host-friendly submission
- Downloadable text resume in `public/resume`
- Framer Motion reveal and filter animations
- Google Analytics hook via `NEXT_PUBLIC_GA_ID`
- Static export configuration for free hosting

## Project Structure

- `app/`: Next.js routes and pages
- `components/`: shared UI and client components
- `lib/site-data.js`: portfolio content, resume data, blog content
- `public/`: downloadable resume and static assets

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

By default, the form submits through FormSubmit using the public email address already shown on the site.
For a cleaner production setup, set your own endpoint before deploy:

```bash
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://formsubmit.co/ajax/your-form-id-or-address
```

If you keep the default FormSubmit setup, make sure you complete its one-time activation email the first time a submission comes through.

## Analytics

Set a Google Analytics property ID before build or deploy:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

If the variable is missing, analytics stays disabled.

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
```

Then deploy the generated `out/` directory with GitHub Pages or any static host.
