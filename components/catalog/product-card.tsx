"use client";

import Link from "next/link";
import Image from "next/image";
import { useMockStore } from "@/components/providers/mock-store-provider";
import { canAddItemToCart } from "@/lib/domain/cart";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { fulfillment, cart, upsertCartItem } = useMockStore();
  const addCheck = canAddItemToCart(fulfillment, fulfillment.mode, cart.items.length > 0);

  function addToCart() {
    if (!addCheck.ok) {
      alert(addCheck.message);
      return;
    }
    upsertCartItem({
      id: `${product.handle}-default`,
      productHandle: product.handle,
      quantity: 1,
      unitPrice: product.price,
      title: product.name,
      image: product.image,
    });
  }

  return (
    <article className="premium-surface group overflow-hidden rounded-2xl p-3">
      <div className="relative h-48 overflow-hidden rounded-xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 text-[1.45rem] leading-tight text-pink-900">{product.name}</h3>
      <p className="mt-1 text-[0.94rem] leading-7 text-zinc-700">{product.description}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {product.badges.map((badge) => (
          <span key={badge} className="rounded-full border border-pink-200 bg-pink-50 px-2 py-0.5 text-[11px] font-semibold text-pink-700">
            {badge}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-lg font-semibold text-pink-900">${product.price.toFixed(2)}</p>
        <div className="flex gap-2">
          <Link href={`/products/${product.handle}`} className="rounded-full border border-pink-200 px-3 py-1 text-sm hover:bg-pink-50">
            Details
          </Link>
          <button
            type="button"
            onClick={addToCart}
            className="rounded-full bg-pink-700 px-3 py-1 text-sm font-medium text-white hover:bg-pink-800"
          >
            Add
          </button>
        </div>
      </div>
      {!fulfillment.mode && <p className="mt-2 text-xs font-medium text-amber-700">Please select a delivery type first.</p>}
    </article>
  );
}
