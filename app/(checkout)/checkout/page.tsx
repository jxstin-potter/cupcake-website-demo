"use client";

import { useState } from "react";
import { useMockStore } from "@/components/providers/mock-store-provider";
import { CartSummary } from "@/components/cart/cart-summary";

export default function CheckoutPage() {
  const { cart } = useMockStore();
  const [giftMessage, setGiftMessage] = useState("");
  const [logoFileName, setLogoFileName] = useState("");
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <section className="premium-surface rounded-3xl border-green-200 bg-green-50 p-6">
        <h1 className="text-3xl text-green-800">Order placed (mock)</h1>
        <p className="mt-2 text-green-800">Your mock order has been submitted with customization metadata captured.</p>
      </section>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <form
        className="premium-surface space-y-4 rounded-3xl p-4 md:p-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (cart.items.length === 0) return;
          setPlaced(true);
        }}
      >
        <h1 className="text-3xl text-pink-900">Checkout (Mock)</h1>
        <input className="premium-ring w-full rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm text-zinc-900" required placeholder="Email" type="email" />
        <input className="premium-ring w-full rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm text-zinc-900" required placeholder="Shipping address" />
        <textarea
          className="premium-ring w-full rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm text-zinc-900"
          placeholder="Gift message"
          value={giftMessage}
          onChange={(event) => setGiftMessage(event.target.value)}
        />
        <input
          className="premium-ring w-full rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm text-zinc-900"
          placeholder="Logo/image filename"
          value={logoFileName}
          onChange={(event) => setLogoFileName(event.target.value)}
        />
        <button className="rounded-full bg-pink-700 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-800" type="submit">
          Place order
        </button>
      </form>
      <CartSummary />
    </div>
  );
}
