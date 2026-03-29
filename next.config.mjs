function normalizeBasePath(value) {
  if (!value || value === "/") {
    return "";
  }

  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
}

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgSite = repositoryName.endsWith(".github.io");
const inferredBasePath =
  process.env.GITHUB_ACTIONS === "true" && repositoryName && !isUserOrOrgSite
    ? `/${repositoryName}`
    : "";
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();
const basePath = normalizeBasePath(configuredBasePath || inferredBasePath);

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  }
};

export default nextConfig;
