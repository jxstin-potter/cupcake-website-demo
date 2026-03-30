import { notFound } from "next/navigation";
import { ProductCard } from "@/components/catalog/product-card";
import { collections } from "@/lib/data/catalog";
import { filterCatalog } from "@/lib/domain/catalog";

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collections.find((item) => item.slug === slug);
  if (!collection) {
    notFound();
  }
  const items = filterCatalog({ collection: slug, sort: "popularity" });

  return (
    <div className="space-y-4">
      <div className="premium-surface rounded-3xl p-5 md:p-6">
        <p className="eyebrow">Collection</p>
        <h1 className="text-4xl text-pink-900">{collection.title}</h1>
        <p className="mt-1 text-zinc-700">{collection.description}</p>
      </div>
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}
