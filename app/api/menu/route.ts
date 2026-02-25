import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM menu_items ORDER BY category, name`;
    const items = rows.map((r: Record<string, unknown>) => ({
      id: String(r.id),
      name: r.name,
      description: r.description,
      price: Number(r.price),
      category: r.category,
      image: r.image,
      popular: r.popular,
    }));
    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const sql = getDb();
    const body = await request.json();
    const { name, description, price, category, image, popular } = body;

    if (!name || !price || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const rows = await sql`
      INSERT INTO menu_items (name, description, price, category, image, popular)
      VALUES (${name}, ${description || ""}, ${price}, ${category}, ${image || "/images/falafel-wrap.jpg"}, ${popular || false})
      RETURNING *
    `;
    const r = rows[0];
    return NextResponse.json({
      id: String(r.id),
      name: r.name,
      description: r.description,
      price: Number(r.price),
      category: r.category,
      image: r.image,
      popular: r.popular,
    }, { status: 201 });
  } catch (error) {
    console.error("Failed to create menu item:", error);
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 });
  }
}
