import { NextResponse } from "next/server";
import { resolveFulfillment } from "@/lib/domain/fulfillment";
import type { FulfillmentState } from "@/lib/types";

export async function POST(request: Request) {
  const state = (await request.json()) as FulfillmentState;
  const result = resolveFulfillment(state);
  return NextResponse.json(result);
}
