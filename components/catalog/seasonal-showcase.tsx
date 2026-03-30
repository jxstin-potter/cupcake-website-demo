"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Product } from "@/lib/types";

/** Reference-aligned: image 280×220px, card min-width 280px, carousel gap */
const CARD_W = 280;
const IMG_H = 220;

export function SeasonalShowcase({ products }: { products: Product[] }) {
  const railRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const rail = railRef.current;
    if (!rail) return;
    const step = CARD_W + 20; /* gap-5 = 1.25rem ≈ 20px */
    rail.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  return (
    <section className="rounded-4xl border border-pink-100/80 bg-linear-to-b from-white via-rose-50/40 to-pink-50/30 py-5 shadow-sm shadow-pink-100/50 md:py-8">
      <div className="mb-6 flex flex-col items-center gap-4 md:mb-8">
        <h2 className="font-display w-full max-w-4xl text-center text-3xl font-semibold lowercase leading-[1.1] tracking-tight text-pink-950 md:text-5xl lg:text-6xl">
          cupcakes for every season &amp; reason
        </h2>
        <div className="hidden shrink-0 justify-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-pink-200 bg-white text-lg text-pink-600 shadow-sm transition hover:border-pink-300 hover:bg-pink-50"
            aria-label="Previous products"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-pink-200 bg-white text-lg text-pink-600 shadow-sm transition hover:border-pink-300 hover:bg-pink-50"
            aria-label="Next products"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((product) => (
          <article
            key={product.id}
            className="snap-start overflow-hidden rounded-2xl border border-pink-100/90 bg-white text-center shadow-sm shadow-pink-100/40"
            style={{ width: CARD_W, minWidth: CARD_W, maxWidth: CARD_W }}
          >
            <Link href={`/products/${product.handle}`} className="block">
              <div className="relative bg-pink-50/80" style={{ width: CARD_W, height: IMG_H }}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes={`${CARD_W}px`}
                  className="object-cover"
                />
              </div>
            </Link>
            <div className="px-3 pb-3 pt-2">
              <p className="font-display text-[0.95rem] font-semibold lowercase leading-tight text-pink-950">
                {product.name.toLowerCase()}
              </p>
              <p className="mt-2 line-clamp-4 min-h-[4.5rem] text-left text-[11px] leading-relaxed text-pink-900/85">
                {product.description.toLowerCase()}
              </p>
              <div className="mt-3 flex flex-col items-center gap-2">
                <Link
                  href={`/products/${product.handle}`}
                  className="inline-flex min-w-[120px] justify-center rounded-full border border-pink-400/70 bg-white px-6 py-1.5 text-sm font-semibold lowercase text-pink-900 transition hover:bg-pink-50"
                >
                  details
                </Link>
                <p className="text-[10px] font-medium uppercase tracking-wide text-pink-400">seasonal</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
