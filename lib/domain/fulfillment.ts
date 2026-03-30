import type { FulfillmentState } from "@/lib/types";

const localZipPrefixes = new Set(["20", "21", "22"]);

export function resolveFulfillment(state: FulfillmentState) {
  if (!state.mode) {
    return { ok: false, message: "Please select a delivery type first." };
  }

  if (!/^\d{5}$/.test(state.zipCode)) {
    return { ok: false, message: "Enter a valid 5-digit ZIP code." };
  }

  const isLocalZip = localZipPrefixes.has(state.zipCode.slice(0, 2));
  if (state.mode === "local" && !isLocalZip) {
    return {
      ok: false,
      message: "Local delivery is not available for this ZIP code. Try Ship Nationwide.",
    };
  }

  if (state.mode === "nationwide" && isLocalZip && state.localMethod === "pickup") {
    return {
      ok: false,
      message: "Pickup is only available in local mode.",
    };
  }

  return {
    ok: true,
    message: state.mode === "local" ? "Local fulfillment configured." : "Nationwide fulfillment configured.",
  };
}

export function defaultFulfillmentState(): FulfillmentState {
  const today = new Date();
  const date = today.toISOString().slice(0, 10);
  return {
    mode: null,
    zipCode: "",
    date,
    localMethod: "delivery",
    locationId: "georgetown",
  };
}

export function isFulfillmentConflict(current: FulfillmentState, incomingMode: FulfillmentState["mode"]) {
  return Boolean(current.mode && incomingMode && current.mode !== incomingMode);
}
