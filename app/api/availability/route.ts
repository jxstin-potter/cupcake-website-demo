import { NextResponse } from "next/server";
import { getDateAvailabilityMessage, getUnavailableFlavors } from "@/lib/domain/availability";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") ?? new Date().toISOString().slice(0, 10);
  const unavailable = getUnavailableFlavors(date);
  return NextResponse.json({
    date,
    message: getDateAvailabilityMessage(date),
    unavailable,
  });
}
