import heroImage from "@/assets/hero.jpg";
import { getBouquetProductPath, staticBouquets } from "@/data/bouquets";
import { absoluteAssetUrl, absoluteUrl } from "@/lib/site-url";

export const BRAND_NAME = "LUNA FLOWERS";

export function jsonLdScript(data: unknown) {
  return {
    type: "application/ld+json" as const,
    children: JSON.stringify(data),
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: BRAND_NAME,
        url: absoluteUrl("/"),
        logo: absoluteAssetUrl(heroImage),
      },
      {
        "@type": "WebSite",
        name: BRAND_NAME,
        url: absoluteUrl("/"),
        inLanguage: "ru-RU",
        publisher: {
          "@type": "Organization",
          name: BRAND_NAME,
        },
      },
    ],
  };
}

export function buildCatalogItemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Каталог букетов LUNA FLOWERS",
    numberOfItems: staticBouquets.length,
    itemListElement: staticBouquets.map((bouquet, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: bouquet.name,
      url: absoluteUrl(getBouquetProductPath(bouquet)),
    })),
  };
}
