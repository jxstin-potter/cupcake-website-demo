import { NextResponse } from "next/server";
import { cartTotal } from "@/lib/domain/cart";
import type { CartState, FulfillmentState } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as { cart: CartState; fulfillment: FulfillmentState };
  const total = cartTotal(body.cart, body.fulfillment);
  return NextResponse.json({
    total,
    tax: Number((total * 0.06).toFixed(2)),
    paymentMethods: ["card", "shop-pay-mock", "gift-card-mock"],
  });
}
