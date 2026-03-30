import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    email: "mock.customer@example.com",
    points: 420,
    orders: [
      { id: "1001", status: "delivered", total: 42 },
      { id: "998", status: "delivered", total: 47.4 },
    ],
  });
}
