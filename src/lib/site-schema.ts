import heroImage from "@/assets/hero.jpg";
import {
  getBouquetProductPath,
  staticBouquets,
} from "@/data/bouquets";
import { absoluteAssetUrl, absoluteUrl } from "@/lib/site-url";

export const BRAND_NAME = "LUNA FLOWERS";

/** Contact data mirrored from /contact — do not invent values. */
export const businessContact = {
  phone: "+74950000000",
  email: "hello@lunaflowers.ru",
  streetAddress: "Большая Никитская, 12",
  addressLocality: "Москва",
  addressCountry: "RU",
  openingHours: "Mo-Su 09:00-21:00",
} as const;

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
        email: businessContact.email,
        telephone: businessContact.phone,
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

export function buildFloristJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Florist",
    name: BRAND_NAME,
    url: absoluteUrl("/contact"),
    telephone: businessContact.phone,
    email: businessContact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessContact.streetAddress,
      addressLocality: businessContact.addressLocality,
      addressCountry: businessContact.addressCountry,
    },
    openingHours: businessContact.openingHours,
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
