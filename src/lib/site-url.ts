/**
 * Production site origin — single source of truth for canonical, OG and static SEO files.
 *
 * Set SITE_URL in .env / .env.local (see .env.example).
 * Available in SSR and client via Vite envPrefix (SITE_).
 * On Nitro/Vercel runtime SSR, process.env.SITE_URL is also read when present.
 */
function normalizeSiteUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

function readEnvSiteUrl(): string | undefined {
  if (typeof process !== "undefined" && process.env["SITE_URL"]) {
    return process.env["SITE_URL"];
  }

  const fromImportMeta = import.meta.env["SITE_URL"] as string | undefined;
  if (fromImportMeta) return fromImportMeta;

  return undefined;
}

export function getSiteUrl(): string {
  const configured = readEnvSiteUrl();
  if (configured) return normalizeSiteUrl(configured);

  if (import.meta.env.DEV) {
    return normalizeSiteUrl(
      (import.meta.env["SITE_DEV_URL"] as string | undefined) ?? "http://localhost:5173",
    );
  }

  return "";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!base) return path.startsWith("/") ? path : `/${path}`;

  if (path === "/") return `${base}/`;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export function absoluteAssetUrl(assetPath: string): string {
  if (/^https?:\/\//i.test(assetPath)) return assetPath;
  return absoluteUrl(assetPath);
}
