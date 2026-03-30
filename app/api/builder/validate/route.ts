import { NextResponse } from "next/server";
import { validateBuilderSelection } from "@/lib/domain/builder";
import type { BuilderSelection } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as { selection: BuilderSelection; date: string };
  const result = validateBuilderSelection(body.selection, body.date);
  return NextResponse.json(result);
}
