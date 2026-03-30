import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { ProductCard } from "@/components/catalog/product-card";
import { filterCatalog } from "@/lib/domain/catalog";

export default async function AllCollectionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const profile = typeof params.profile === "string" ? params.profile : undefined;
  const badge = typeof params.badge === "string" ? params.badge : undefined;
  const query = typeof params.query === "string" ? params.query : undefined;
  const sort = typeof params.sort === "string" ? params.sort : "popularity";
  const products = filterCatalog({ collection: "all", profile, badge, query, sort: sort as never });

  return (
    <div className="space-y-4">
      <div className="premium-surface rounded-3xl p-5 md:p-6">
        <p className="eyebrow">Catalog</p>
        <h1 className="text-4xl text-pink-900">Shop All Cupcakes</h1>
        <p className="mt-1 text-zinc-700">{products.length} items</p>
      </div>
      <CatalogFilters />
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}
