"use client";

import { useMemo, useState } from "react";
import { useMockStore } from "@/components/providers/mock-store-provider";
import { resolveFulfillment } from "@/lib/domain/fulfillment";
import type { FulfillmentMode, LocalMethod } from "@/lib/types";

export function FulfillmentSelector() {
  const { fulfillment, setFulfillment } = useMockStore();
  const [message, setMessage] = useState("");

  const status = useMemo(() => resolveFulfillment(fulfillment), [fulfillment]);

  function updateMode(mode: FulfillmentMode) {
    setFulfillment({
      ...fulfillment,
      mode,
    });
    setMessage("");
  }

  function updateMethod(localMethod: LocalMethod) {
    setFulfillment({
      ...fulfillment,
      localMethod,
    });
  }

  function validate() {
    const result = resolveFulfillment(fulfillment);
    setMessage(result.message);
  }

  return (
    <section className="premium-muted rounded-2xl border border-pink-200 p-5">
      <h2 className="text-2xl text-pink-900">Choose your delivery type</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          className={`premium-ring rounded-full px-4 py-2 text-sm font-medium ${fulfillment.mode === "local" ? "bg-pink-700 text-white" : "bg-white text-zinc-700"}`}
          onClick={() => updateMode("local")}
          type="button"
        >
          Local
        </button>
        <button
          className={`premium-ring rounded-full px-4 py-2 text-sm font-medium ${fulfillment.mode === "nationwide" ? "bg-pink-700 text-white" : "bg-white text-zinc-700"}`}
          onClick={() => updateMode("nationwide")}
          type="button"
        >
          Ship Nationwide
        </button>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-4">
        <input
          className="premium-ring rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm text-zinc-900"
          placeholder="ZIP code"
          value={fulfillment.zipCode}
          onChange={(event) => setFulfillment({ ...fulfillment, zipCode: event.target.value })}
        />
        <input
          className="premium-ring rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm text-zinc-900"
          type="date"
          value={fulfillment.date}
          onChange={(event) => setFulfillment({ ...fulfillment, date: event.target.value })}
        />
        <select
          className="premium-ring rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm text-zinc-900"
          value={fulfillment.localMethod}
          onChange={(event) => updateMethod(event.target.value as LocalMethod)}
        >
          <option value="delivery">Delivery</option>
          <option value="pickup">Pickup</option>
        </select>
        <select
          className="premium-ring rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm text-zinc-900"
          value={fulfillment.locationId}
          onChange={(event) => setFulfillment({ ...fulfillment, locationId: event.target.value as "georgetown" | "bethesda" })}
        >
          <option value="georgetown">Georgetown, DC</option>
          <option value="bethesda">Bethesda</option>
        </select>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button className="rounded-full bg-pink-700 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-800" onClick={validate} type="button">
          Apply
        </button>
        <p className="text-sm text-zinc-700">{message || status.message}</p>
      </div>
    </section>
  );
}
