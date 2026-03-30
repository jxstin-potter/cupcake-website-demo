import assert from "node:assert/strict";
import { filterCatalog } from "@/lib/domain/catalog";
import { defaultFulfillmentState, resolveFulfillment } from "@/lib/domain/fulfillment";
import { TARGET_BOX_COUNT, validateBuilderSelection } from "@/lib/domain/builder";
import { cartSubtotal } from "@/lib/domain/cart";

function run() {
  const state = defaultFulfillmentState();
  const unresolved = resolveFulfillment(state);
  assert.equal(unresolved.ok, false);

  const resolved = resolveFulfillment({
    ...state,
    mode: "local",
    zipCode: "20007",
  });
  assert.equal(resolved.ok, true);

  const catalogResult = filterCatalog({ collection: "all", badge: "bestseller" });
  assert.ok(catalogResult.length > 0, "expected bestseller products");

  const validBuilderSelection = {
    "red-velvet": TARGET_BOX_COUNT,
  };
  const builder = validateBuilderSelection(validBuilderSelection, state.date);
  assert.equal(builder.ok, false, "red velvet max per order should fail at 12");

  const subtotal = cartSubtotal([
    { id: "a", productHandle: "best-seller-dozen", quantity: 2, unitPrice: 42, title: "Best Seller", image: "" },
  ]);
  assert.equal(subtotal, 84);

  console.log("All tests passed.");
}

run();
