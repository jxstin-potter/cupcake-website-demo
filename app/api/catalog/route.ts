import { NextResponse } from "next/server";
import { filterCatalog } from "@/lib/domain/catalog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const collection = searchParams.get("collection") ?? "all";
  const profile = searchParams.get("profile") ?? undefined;
  const badge = searchParams.get("badge") ?? undefined;
  const query = searchParams.get("query") ?? undefined;
  const sort = (searchParams.get("sort") ?? "popularity") as "popularity" | "price-asc" | "price-desc";
  return NextResponse.json({
    items: filterCatalog({ collection, profile, badge, query, sort }),
  });
}
