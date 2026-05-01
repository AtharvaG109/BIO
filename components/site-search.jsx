"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export function SiteSearch({ entries }) {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("All");
  const types = useMemo(() => ["All", ...new Set(entries.map((entry) => entry.type))], [entries]);
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return entries
      .filter((entry) => activeType === "All" || entry.type === activeType)
      .map((entry) => {
        const haystack = `${entry.title} ${entry.summary} ${entry.tags.join(" ")}`.toLowerCase();
        const score = normalized
          ? normalized
              .split(/\s+/)
              .filter((term) => haystack.includes(term)).length
          : 1;

        return { ...entry, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  }, [activeType, entries, query]);

  return (
    <section className="search-shell">
      <div className="surface search-controls">
        <label>
          <span className="micro-label">Search the portfolio</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Rust, OpenTelemetry, AI security, packet analysis..."
          />
        </label>
        <div className="chip-row" role="toolbar" aria-label="Search result type">
          {types.map((type) => (
            <button
              key={type}
              type="button"
              className={`chip ${type === activeType ? "chip-active" : ""}`}
              onClick={() => setActiveType(type)}
              aria-pressed={type === activeType}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="search-results" aria-live="polite">
        {results.map((entry) => (
          <article key={entry.href} className="surface search-result-card">
            <div className="project-meta">
              <span>{entry.type}</span>
              <span>{entry.tags.slice(0, 3).join(" / ")}</span>
            </div>
            <h2>{entry.title}</h2>
            <p className="muted">{entry.summary}</p>
            <Link href={entry.href} className="text-link">
              Open result
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
