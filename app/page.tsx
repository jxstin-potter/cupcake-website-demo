import Link from "next/link";
import { products } from "@/lib/data/catalog";
import { heroImage } from "@/lib/data/media";
import { ProductCard } from "@/components/catalog/product-card";
import { FulfillmentSelector } from "@/components/fulfillment/fulfillment-selector";
import { CustomDozenBuilder } from "@/components/builder/custom-dozen-builder";
import { SeasonalShowcase } from "@/components/catalog/seasonal-showcase";
import { HeroParallax } from "@/components/home/hero-parallax";

export default function Home() {
  const featured = products.slice(0, 4);
  const seasonal = products.filter((product) => product.category === "dozen").slice(0, 8);

  return (
    <div className="space-y-10">
      <HeroParallax imageSrc={heroImage} imageAlt="Cupcakes and treats" />

      <SeasonalShowcase products={seasonal} />

      <section className="premium-surface rounded-3xl p-4 md:p-6">
        <FulfillmentSelector />
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Featured picks</p>
            <h2 className="font-display text-3xl text-pink-950">Cupcakes for every season and reason</h2>
          </div>
          <Link href="/collections/all" className="hidden text-sm font-semibold text-pink-700 hover:text-pink-800 md:block">
            View all
          </Link>
        </div>
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </section>

      <section className="premium-surface rounded-3xl p-4 md:p-6">
        <CustomDozenBuilder />
      </section>

      <section className="premium-surface rounded-3xl p-6 md:p-8">
        <h2 className="font-display text-3xl text-pink-950">Curated pathways</h2>
        <p className="mt-2 text-pink-900/80">Browse assortments by occasion, holiday calendar, and gifting context.</p>
        <div className="mt-5 grid gap-2 md:grid-cols-3">
          <Link
            className="rounded-2xl border border-pink-200 bg-white px-4 py-4 font-semibold text-zinc-900 hover:border-pink-300 hover:bg-pink-50"
            href="/collections/birthdays-occasions"
          >
            Birthdays + Occasions
          </Link>
          <Link
            className="rounded-2xl border border-pink-200 bg-white px-4 py-4 font-semibold text-zinc-900 hover:border-pink-300 hover:bg-pink-50"
            href="/collections/holidays"
          >
            Holidays
          </Link>
          <Link
            className="rounded-2xl border border-pink-200 bg-white px-4 py-4 font-semibold text-zinc-900 hover:border-pink-300 hover:bg-pink-50"
            href="/pages/corporate-gifting"
          >
            Corporate gifting
          </Link>
        </div>
      </section>
    </div>
  );
}
