import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex="-1" className="page-shell page-main not-found-main">
      <section className="surface page-hero">
        <p className="eyebrow">Not found</p>
        <h1>The page you were looking for does not exist.</h1>
        <p className="muted hero-copy">
          The route may have moved, or the article has not been created yet.
        </p>
        <Link href="/" className="button button-primary">
          Return home
        </Link>
      </section>
    </main>
  );
}
