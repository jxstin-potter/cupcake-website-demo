import type { CartItem, CartState, FulfillmentState } from "@/lib/types";
import { isFulfillmentConflict } from "@/lib/domain/fulfillment";

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

export function estimateShipping(fulfillment: FulfillmentState) {
  if (fulfillment.mode === "local") {
    return fulfillment.localMethod === "delivery" ? 8 : 0;
  }
  if (fulfillment.mode === "nationwide") {
    return 15;
  }
  return 0;
}

export function cartTotal(state: CartState, fulfillment: FulfillmentState) {
  return cartSubtotal(state.items) + estimateShipping(fulfillment);
}

export function canAddItemToCart(
  fulfillment: FulfillmentState,
  incomingMode: FulfillmentState["mode"],
  hasItems: boolean,
) {
  if (!fulfillment.mode) {
    return { ok: false, message: "Please select a delivery type first." };
  }
  if (hasItems && isFulfillmentConflict(fulfillment, incomingMode)) {
    return {
      ok: false,
      message: "You cannot mix delivery methods in one cart. Start a new cart to switch modes.",
    };
  }
  return { ok: true, message: "Ready to add to cart." };
}
