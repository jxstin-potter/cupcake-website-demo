"use client";

import Link from "next/link";
import { CartSummary } from "@/components/cart/cart-summary";
import { useMockStore } from "@/components/providers/mock-store-provider";

export default function CartPage() {
  const { cart, removeCartItem, clearCart } = useMockStore();

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <section className="premium-surface rounded-3xl p-4 md:p-5">
        <h1 className="text-3xl text-pink-900">Your Cart</h1>
        {cart.items.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-700">Your cart is empty.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {cart.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between rounded-xl border border-pink-100 bg-white p-3">
                <div>
                  <p className="font-semibold text-zinc-900">{item.title}</p>
                  <p className="text-sm text-zinc-700">
                    Qty {item.quantity} · ${item.unitPrice.toFixed(2)}
                  </p>
                  {item.giftMessage && <p className="text-xs text-zinc-500">Gift note: {item.giftMessage}</p>}
                  {item.logoFileName && <p className="text-xs text-zinc-500">Logo file: {item.logoFileName}</p>}
                </div>
                <button
                  className="rounded-full border border-pink-200 px-3 py-1 text-sm font-semibold text-zinc-900 hover:bg-pink-50"
                  onClick={() => removeCartItem(item.id)}
                  type="button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex gap-2">
          <button className="rounded-full border border-pink-200 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-pink-50" onClick={clearCart} type="button">
            Clear cart
          </button>
          <Link href="/checkout" className="rounded-full bg-pink-700 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-800">
            Continue to checkout
          </Link>
        </div>
      </section>
      <CartSummary />
    </div>
  );
}
