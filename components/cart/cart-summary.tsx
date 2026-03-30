"use client";

import { useMockStore } from "@/components/providers/mock-store-provider";
import { cartSubtotal, cartTotal, estimateShipping } from "@/lib/domain/cart";

export function CartSummary() {
  const { cart, fulfillment } = useMockStore();
  const subtotal = cartSubtotal(cart.items);
  const shipping = estimateShipping(fulfillment);
  const total = cartTotal(cart, fulfillment);

  return (
    <aside className="premium-surface rounded-3xl p-4 md:p-5">
      <h2 className="text-2xl text-pink-900">Order Summary</h2>
      <div className="mt-3 space-y-2 text-sm text-zinc-800">
        <p className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </p>
        <p className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </p>
        <p className="flex justify-between border-t border-pink-100 pt-2 font-semibold text-pink-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </p>
      </div>
    </aside>
  );
}
