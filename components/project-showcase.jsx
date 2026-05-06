"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { ProjectPreviewDiagram } from "@/components/project-preview-diagram";
import { getSortedProjects } from "@/lib/site-data";

const cardTransition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1]
};

export function ProjectShowcase({ projects }) {
  const shouldReduceMotion = useReducedMotion();
  const spotlightRef = useRef(null);
  const newestProjectSlug = useMemo(() => getSortedProjects(projects)[0]?.slug ?? null, [projects]);
  const categories = useMemo(() => {
    return ["All", ...new Set(projects.map((project) => project.category))];
  }, [projects]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSlug, setSelectedSlug] = useState(projects[0]?.slug ?? null);

  const visibleProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  useEffect(() => {
    if (!visibleProjects.length) {
      return;
    }

    const currentVisible = visibleProjects.some((project) => project.slug === selectedSlug);

    if (!currentVisible) {
      setSelectedSlug(visibleProjects[0].slug);
    }
  }, [selectedSlug, visibleProjects]);

  const selectedProject =
    visibleProjects.find((project) => project.slug === selectedSlug) ?? visibleProjects[0] ?? projects[0];

  const previewProject = (projectSlug) => {
    setSelectedSlug(projectSlug);

    window.requestAnimationFrame(() => {
      spotlightRef.current?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth", block: "start" });
      spotlightRef.current?.focus({ preventScroll: true });
    });
  };

  return (
    <div className="project-showcase">
      {selectedProject ? (
        <motion.article
          ref={spotlightRef}
          layout={!shouldReduceMotion}
          className="surface project-spotlight"
          transition={shouldReduceMotion ? { duration: 0 } : cardTransition}
          tabIndex={-1}
        >
          <div className="project-spotlight-head">
            <div>
              <div className="project-label-row">
                <p className="eyebrow">Project spotlight</p>
                {selectedProject.slug === newestProjectSlug ? (
                  <span className="project-badge">Newest project</span>
                ) : null}
              </div>
              <h3>{selectedProject.title}</h3>
            </div>
            <div className="project-meta">
              <span>{selectedProject.category}</span>
              <span>{selectedProject.year}</span>
            </div>
          </div>

          <p className="muted">{selectedProject.summary}</p>
          {selectedProject.metrics?.length ? (
            <div className="metric-grid project-metric-grid">
              {selectedProject.metrics.map((metric) => (
                <div key={`${metric.value}-${metric.label}`} className="metric-card">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          ) : null}
          <div className="media-frame project-preview-frame">
            <ProjectPreviewDiagram project={selectedProject} variant="feature" />
          </div>
          <p className="project-impact">{selectedProject.challenge}</p>

          <div className="spotlight-columns">
            <div>
              <p className="micro-label">Approach</p>
              <ul className="bullet-list compact-list">
                {selectedProject.approach.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="micro-label">Result</p>
              <p className="muted">{selectedProject.result}</p>
              <div className="tag-row spotlight-tags">
                {selectedProject.stack.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Link href={`/projects/${selectedProject.slug}/`} className="text-link">
            Open full case study
          </Link>
          {selectedProject.links?.length ? (
            <div className="project-card-actions project-links">
              {selectedProject.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </motion.article>
      ) : null}

      <div className="project-showcase-head">
        <p className="micro-label">Browse by focus area</p>
        <p className="muted">
          {visibleProjects.length} project{visibleProjects.length === 1 ? "" : "s"} shown
        </p>
      </div>

      <div className="chip-row" role="toolbar" aria-label="Project categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`chip ${category === activeCategory ? "chip-active" : ""}`}
            onClick={() => setActiveCategory(category)}
            aria-pressed={category === activeCategory}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div layout={!shouldReduceMotion} className="project-grid">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => {
            const isActive = project.slug === selectedProject?.slug;

            return (
              <motion.article
                key={project.slug}
                layout={!shouldReduceMotion}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                transition={shouldReduceMotion ? { duration: 0 } : cardTransition}
                className={`surface project-card ${isActive ? "project-card-active" : ""}`}
              >
                <button
                  type="button"
                  className="project-card-toggle"
                  onClick={() => previewProject(project.slug)}
                  aria-pressed={isActive}
                >
                  <div className="project-card-thumbnail project-preview-frame">
                    <ProjectPreviewDiagram project={project} variant="compact" />
                  </div>
                  <div className="project-meta">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  {project.slug === newestProjectSlug ? <span className="project-badge">Newest project</span> : null}
                  <h3>{project.title}</h3>
                  <p className="muted">{project.summary}</p>
                  <p className="project-impact">{project.impact}</p>
                  {project.metrics?.[0] ? (
                    <p className="project-card-metric">
                      <strong>{project.metrics[0].value}</strong> {project.metrics[0].label}
                    </p>
                  ) : null}
                  <ul className="bullet-list compact-list">
                    {project.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </button>

                <div className="project-card-actions">
                  <button
                    type="button"
                    className="text-link text-link-button"
                    onClick={() => previewProject(project.slug)}
                  >
                    Preview here
                  </button>
                  <Link href={`/projects/${project.slug}/`} className="text-link">
                    Open case study
                  </Link>
                  {project.links?.[0] ? (
                    <a
                      href={project.links[0].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      {project.links[0].label}
                    </a>
                  ) : null}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
