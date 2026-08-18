import fs from "node:fs";
import path from "node:path";
import { loadEnv } from "vite";

const root = process.cwd();
const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const env = loadEnv(mode, root, "");
const siteUrl = (env.SITE_URL ?? "").trim().replace(/\/+$/, "");

function readBouquetSlugs(): string[] {
  const source = fs.readFileSync(path.join(root, "src/data/bouquets.ts"), "utf8");
  const slugs = [...source.matchAll(/^\s+id: "([^"]+)"/gm)].map((match) => match[1]);
  const unique = [...new Set(slugs)];
  return unique.filter((slug) => !["to-3000", "3000-5000", "5000-10000", "from-10000"].includes(slug));
}

if (!siteUrl) {
  console.warn(
    "[seo] SITE_URL is not set — robots.txt and sitemap.xml were not regenerated. Set SITE_URL in .env.local or CI.",
  );
  process.exit(0);
}

const productSlugs = readBouquetSlugs();

const staticRoutes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/shop", changefreq: "weekly", priority: "0.9" },
  { path: "/story", changefreq: "monthly", priority: "0.7" },
  { path: "/bespoke", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
];

const productRoutes = productSlugs.map((slug) => ({
  path: `/shop/${slug}`,
  changefreq: "weekly",
  priority: "0.8",
}));

const routes = [...staticRoutes, ...productRoutes];
const lastmod = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(({ path: routePath, changefreq, priority }) => {
    const loc = routePath === "/" ? `${siteUrl}/` : `${siteUrl}${routePath}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

const robots = `User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const publicDir = path.join(root, "public");
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");
fs.writeFileSync(path.join(publicDir, "robots.txt"), robots, "utf8");

console.log(
  `[seo] Generated robots.txt and sitemap.xml for ${siteUrl} (${routes.length} URLs, ${productRoutes.length} products)`,
);
