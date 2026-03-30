"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultFulfillmentState } from "@/lib/domain/fulfillment";
import type { CartItem, CartState, FulfillmentState } from "@/lib/types";

interface StoreContextValue {
  fulfillment: FulfillmentState;
  cart: CartState;
  setFulfillment: (state: FulfillmentState) => void;
  upsertCartItem: (item: CartItem) => void;
  removeCartItem: (id: string) => void;
  clearCart: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);
const STORE_KEY = "gc-mock-store";

export function MockStoreProvider({ children }: { children: React.ReactNode }) {
  const [fulfillment, setFulfillment] = useState<FulfillmentState>(() => {
    if (typeof window === "undefined") return defaultFulfillmentState();
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return defaultFulfillmentState();
    try {
      const parsed = JSON.parse(raw) as { fulfillment: FulfillmentState };
      return parsed.fulfillment;
    } catch {
      localStorage.removeItem(STORE_KEY);
      return defaultFulfillmentState();
    }
  });
  const [cart, setCart] = useState<CartState>(() => {
    if (typeof window === "undefined") return { items: [] };
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return { items: [] };
    try {
      const parsed = JSON.parse(raw) as { cart: CartState };
      return parsed.cart;
    } catch {
      localStorage.removeItem(STORE_KEY);
      return { items: [] };
    }
  });

  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify({ fulfillment, cart }));
  }, [fulfillment, cart]);

  const value = useMemo<StoreContextValue>(
    () => ({
      fulfillment,
      cart,
      setFulfillment,
      upsertCartItem: (incoming) => {
        setCart((prev) => {
          const existing = prev.items.find((item) => item.id === incoming.id);
          if (!existing) {
            return { items: [...prev.items, incoming] };
          }
          return {
            items: prev.items.map((item) => (item.id === incoming.id ? { ...incoming } : item)),
          };
        });
      },
      removeCartItem: (id) => setCart((prev) => ({ items: prev.items.filter((item) => item.id !== id) })),
      clearCart: () => setCart({ items: [] }),
    }),
    [fulfillment, cart],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useMockStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useMockStore must be used under MockStoreProvider.");
  }
  return ctx;
}
