"use client";

import { useMemo, useState } from "react";
import { flavors, products } from "@/lib/data/catalog";
import { TARGET_BOX_COUNT, validateBuilderSelection } from "@/lib/domain/builder";
import { useMockStore } from "@/components/providers/mock-store-provider";

export function CustomDozenBuilder() {
  const { fulfillment, upsertCartItem } = useMockStore();
  const [selection, setSelection] = useState<Record<string, number>>({});
  const total = useMemo(() => Object.values(selection).reduce((sum, count) => sum + count, 0), [selection]);
  const validation = validateBuilderSelection(selection, fulfillment.date);

  function updateFlavor(flavorId: string, delta: number) {
    setSelection((prev) => {
      const current = prev[flavorId] ?? 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [flavorId]: next };
    });
  }

  function addBuilderToCart() {
    if (!validation.ok || !fulfillment.mode) {
      alert(validation.errors[0] ?? "Please select a delivery type first.");
      return;
    }
    const baseProduct = products.find((p) => p.handle === "custom-dozen");
    if (!baseProduct) return;
    const stableSelectionKey = Object.entries(selection)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([id, count]) => `${id}:${count}`)
      .join("|");
    upsertCartItem({
      id: `custom-dozen-${stableSelectionKey}`,
      productHandle: "custom-dozen",
      quantity: 1,
      unitPrice: baseProduct.price,
      title: "Custom Dozen",
      image: baseProduct.image,
      builderSelection: selection,
    });
    alert("Custom dozen added to cart.");
  }

  return (
    <section className="premium-muted rounded-2xl border border-pink-200 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h3 className="ink-on-white text-2xl">Build your custom dozen</h3>
        <p className="ink-on-white rounded-full border border-pink-300 bg-white px-3 py-1 text-sm font-bold">
          {total} / {TARGET_BOX_COUNT}
        </p>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {flavors.map((flavor) => (
          <div key={flavor.id} className="ink-on-white flex items-center justify-between rounded-xl border border-pink-200 bg-white p-3">
            <div>
              <p className="ink-on-white font-semibold">{flavor.name}</p>
              <p className="ink-on-white text-xs font-semibold">Max {flavor.maxPerOrder ?? TARGET_BOX_COUNT}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateFlavor(flavor.id, -1)}
                className="ink-on-white rounded-full border border-pink-300 bg-white px-2.5 py-0.5 font-semibold hover:bg-pink-50"
              >
                -
              </button>
              <span className="ink-on-white w-6 text-center text-[0.95rem] font-bold">{selection[flavor.id] ?? 0}</span>
              <button
                type="button"
                onClick={() => updateFlavor(flavor.id, 1)}
                className="ink-on-white rounded-full border border-pink-300 bg-white px-2.5 py-0.5 font-semibold hover:bg-pink-50"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        {validation.errors.length > 0 && (
          <ul className="mb-3 list-inside list-disc text-sm text-rose-700">
            {validation.errors.slice(0, 2).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <button type="button" className="rounded-full bg-pink-700 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-800" onClick={addBuilderToCart}>
          Add Custom Dozen
        </button>
      </div>
    </section>
  );
}
