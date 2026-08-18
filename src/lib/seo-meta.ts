import heroImage from "@/assets/hero.jpg";
import workshopImage from "@/assets/workshop.jpg";
import { absoluteAssetUrl, absoluteUrl } from "@/lib/site-url";

export const defaultOgImage = heroImage;
export const storyOgImage = workshopImage;

export type PageSeoOptions = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  /** Path-only page URL, e.g. `/shop` */
  path: string;
  ogImage?: string;
};

export function buildPageMeta(options: PageSeoOptions) {
  const ogTitle = options.ogTitle ?? options.title;
  const ogDescription = options.ogDescription ?? options.description;
  const pageUrl = absoluteUrl(options.path);
  const ogImageUrl = absoluteAssetUrl(options.ogImage ?? defaultOgImage);

  return {
    meta: [
      { title: options.title },
      { name: "description", content: options.description },
      { property: "og:title", content: ogTitle },
      { property: "og:description", content: ogDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: pageUrl },
      { property: "og:image", content: ogImageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ogTitle },
      { name: "twitter:description", content: ogDescription },
      { name: "twitter:image", content: ogImageUrl },
    ],
    links: [{ rel: "canonical", href: pageUrl }],
  };
}
