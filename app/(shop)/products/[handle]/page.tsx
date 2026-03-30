import { notFound } from "next/navigation";
import Image from "next/image";
import { CustomDozenBuilder } from "@/components/builder/custom-dozen-builder";
import { products } from "@/lib/data/catalog";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = products.find((item) => item.handle === handle);
  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <section className="premium-surface grid gap-6 rounded-3xl p-5 md:grid-cols-2">
        <div className="relative h-80 w-full overflow-hidden rounded-2xl">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-4xl text-pink-900">{product.name}</h1>
          <p className="mt-2 text-zinc-700">{product.description}</p>
          <p className="mt-3 text-2xl font-semibold text-pink-900">${product.price.toFixed(2)}</p>
          {product.compareAtPrice && <p className="text-sm text-zinc-500 line-through">${product.compareAtPrice.toFixed(2)}</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            {product.badges.map((badge) => (
              <span key={badge} className="rounded-full border border-pink-200 bg-pink-50 px-2 py-0.5 text-xs text-pink-700">
                {badge}
              </span>
            ))}
          </div>
          {product.flavors.length > 0 && (
            <div className="mt-4">
              <h2 className="text-sm font-semibold">Flavor profile</h2>
              <p className="text-sm text-zinc-600">{product.flavors.join(", ")}</p>
            </div>
          )}
        </div>
      </section>
      {product.category === "builder" && <CustomDozenBuilder />}
    </div>
  );
}
