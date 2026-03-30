import { flavors, products } from "@/lib/data/catalog";
import type { Product } from "@/lib/types";

export interface CatalogFilterInput {
  collection?: string;
  profile?: string;
  badge?: string;
  query?: string;
  sort?: "popularity" | "price-asc" | "price-desc";
}

export function filterCatalog(input: CatalogFilterInput): Product[] {
  const filtered = products.filter((product) => {
    const collectionPass = !input.collection || product.collectionSlugs.includes(input.collection);
    const profilePass =
      !input.profile ||
      product.flavors.some((flavorId) => flavors.find((f) => f.id === flavorId)?.profile === input.profile);
    const badgePass = !input.badge || product.badges.some((badge) => badge.toLowerCase() === input.badge?.toLowerCase());
    const queryPass =
      !input.query ||
      product.name.toLowerCase().includes(input.query.toLowerCase()) ||
      product.description.toLowerCase().includes(input.query.toLowerCase());
    return collectionPass && profilePass && badgePass && queryPass;
  });

  return sortCatalog(filtered, input.sort ?? "popularity");
}

export function sortCatalog(items: Product[], sort: NonNullable<CatalogFilterInput["sort"]>) {
  return [...items].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return b.popularity - a.popularity;
  });
}
