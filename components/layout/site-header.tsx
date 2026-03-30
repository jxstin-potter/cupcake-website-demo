"use client";

import Link from "next/link";
import { useMockStore } from "@/components/providers/mock-store-provider";

export function SiteHeader() {
  const { cart } = useMockStore();
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-30 border-b border-pink-200/60 bg-white/93 shadow-[0_10px_36px_-22px_rgba(61,36,51,0.14)] backdrop-blur-md backdrop-saturate-150">
      <div className="premium-muted border-b border-pink-200/50 px-4 py-2.5 text-center text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-pink-800/90">
        Handcrafted daily for local delivery and nationwide shipping
      </div>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6 md:py-5">
        <Link
          href="/"
          className="font-display text-[1.625rem] font-semibold lowercase leading-none tracking-tight text-pink-950 md:text-[2rem]"
        >
          CakeCup
        </Link>
        <nav className="hidden items-center gap-5 text-[0.92rem] font-semibold md:flex">
          <Link className="readable-link" href="/collections/all">
            Shop All
          </Link>
          <Link className="readable-link" href="/pages/local-orders">
            Local Orders
          </Link>
          <Link className="readable-link" href="/pages/ship-nationwide">
            Ship Nationwide
          </Link>
          <Link className="readable-link" href="/pages/faq">
            FAQs
          </Link>
          <Link className="readable-link" href="/blogs/news">
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-2 text-sm md:gap-3">
          <Link
            className="rounded-full border border-pink-200 px-3 py-1.5 font-semibold text-zinc-900 hover:border-pink-300 hover:bg-pink-50"
            href="/account"
          >
            Account
          </Link>
          <Link className="rounded-full bg-pink-700 px-3 py-1.5 text-white hover:bg-pink-800" href="/cart">
            Cart ({itemCount})
          </Link>
        </div>
      </div>
    </header>
  );
}
