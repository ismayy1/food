import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const sql = getDb();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";

    const rows = all
      ? await sql`SELECT * FROM reviews ORDER BY created_at DESC`
      : await sql`SELECT * FROM reviews WHERE visible = true ORDER BY created_at DESC`;

    const reviews = rows.map((r: Record<string, unknown>) => ({
      id: String(r.id),
      name: r.name,
      rating: Number(r.rating),
      text: r.text,
      date: r.date,
      visible: r.visible,
    }));
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
