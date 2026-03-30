import { NextResponse } from "next/server";
import { cartSubtotal, cartTotal, estimateShipping } from "@/lib/domain/cart";
import type { CartState, FulfillmentState } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as { cart: CartState; fulfillment: FulfillmentState };
  const subtotal = cartSubtotal(body.cart.items);
  const shipping = estimateShipping(body.fulfillment);
  const total = cartTotal(body.cart, body.fulfillment);
  return NextResponse.json({ subtotal, shipping, total });
}
