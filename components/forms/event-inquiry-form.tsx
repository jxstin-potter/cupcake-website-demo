"use client";

import { useState } from "react";

export function EventInquiryForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return <p className="rounded-xl bg-green-50 p-3 text-sm text-green-800">Inquiry submitted. Our mock events team will follow up soon.</p>;
  }

  return (
    <form
      className="premium-surface grid gap-3 rounded-2xl p-4 md:p-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <h3 className="text-2xl text-pink-900">Special Event Inquiry</h3>
      <input required placeholder="Full name" className="premium-ring rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm text-zinc-900" />
      <input required placeholder="Email" type="email" className="premium-ring rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm text-zinc-900" />
      <textarea required placeholder="Event details" rows={4} className="premium-ring rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm text-zinc-900" />
      <button type="submit" className="rounded-full bg-pink-700 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-800">
        Submit Inquiry
      </button>
    </form>
  );
}
