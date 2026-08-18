import { absoluteAssetUrl, absoluteUrl } from "@/lib/site-url";
import { getBouquetProductPath, type Bouquet } from "@/data/bouquets";

const BRAND_NAME = "LUNA FLOWERS";

export function buildProductJsonLd(bouquet: Bouquet) {
  const pageUrl = absoluteUrl(getBouquetProductPath(bouquet));
  const imageUrl = absoluteAssetUrl(bouquet.image);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: bouquet.name,
        description: bouquet.description,
        image: imageUrl,
        url: pageUrl,
        brand: {
          "@type": "Brand",
          name: BRAND_NAME,
        },
        offers: {
          "@type": "Offer",
          price: bouquet.price,
          priceCurrency: "RUB",
          availability: "https://schema.org/InStock",
          url: pageUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Каталог",
            item: absoluteUrl("/shop"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: bouquet.name,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export function productJsonLdScript(bouquet: Bouquet) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(buildProductJsonLd(bouquet)),
  };
}
