"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function CatalogFilters() {
  const router = useRouter();
  const params = useSearchParams();

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    router.push(`/collections/all?${next.toString()}`);
  }

  return (
    <section className="premium-surface rounded-3xl p-4 md:p-5">
      <h2 className="text-2xl text-pink-900">Filter Products</h2>
      <div className="mt-3 grid gap-2 md:grid-cols-4">
        <select
          className="premium-ring rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm text-zinc-900"
          value={params.get("profile") ?? ""}
          onChange={(e) => setParam("profile", e.target.value)}
        >
          <option value="">Flavor profile</option>
          <option value="chocolate">Chocolate</option>
          <option value="vanilla">Vanilla</option>
          <option value="fruit">Fruit</option>
          <option value="specialty">Specialty</option>
        </select>
        <select
          className="premium-ring rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm text-zinc-900"
          value={params.get("badge") ?? ""}
          onChange={(e) => setParam("badge", e.target.value)}
        >
          <option value="">Occasion / badge</option>
          <option value="Seasonal">Seasonal</option>
          <option value="Year Round">Year Round</option>
          <option value="Vegan">Vegan</option>
          <option value="bestseller">Bestseller</option>
        </select>
        <select
          className="premium-ring rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm text-zinc-900"
          value={params.get("sort") ?? "popularity"}
          onChange={(e) => setParam("sort", e.target.value)}
        >
          <option value="popularity">Popularity</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
        <input
          className="premium-ring rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm text-zinc-900"
          placeholder="Search"
          defaultValue={params.get("query") ?? ""}
          onBlur={(e) => setParam("query", e.target.value)}
        />
      </div>
    </section>
  );
}
