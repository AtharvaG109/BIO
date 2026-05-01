import { ImageResponse } from "next/og";

import { getProjectBySlug, projects, siteConfig } from "@/lib/site-data";

export const dynamic = "force-static";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug) ?? projects[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #081116 0%, #172631 55%, #2b1712 100%)",
          color: "#f5fafd",
          fontFamily: "Inter, Arial, sans-serif"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 30, color: "#ff947b", fontWeight: 700 }}>{siteConfig.initials}</div>
          <div style={{ fontSize: 28, color: "#98abb9" }}>{`${project.category} / ${project.year}`}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 style={{ maxWidth: 940, margin: 0, fontSize: 72, lineHeight: 1.04, letterSpacing: 0 }}>
            {project.title}
          </h1>
          <p style={{ maxWidth: 930, margin: "36px 0 0", fontSize: 32, lineHeight: 1.35, color: "#d5e1ea" }}>
            {project.summary}
          </p>
        </div>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          {project.stack.slice(0, 5).map((item) => (
            <span
              key={item}
              style={{
                padding: "12px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: 24
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    ),
    size
  );
}
