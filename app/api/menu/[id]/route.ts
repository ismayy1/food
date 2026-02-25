import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sql = getDb();
    const body = await request.json();
    const { name, description, price, category, popular } = body;

    const rows = await sql`
      UPDATE menu_items
      SET name = ${name}, description = ${description}, price = ${price},
          category = ${category}, popular = ${popular}, updated_at = NOW()
      WHERE id = ${Number(id)}
      RETURNING *
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const r = rows[0];
    return NextResponse.json({
      id: String(r.id),
      name: r.name,
      description: r.description,
      price: Number(r.price),
      category: r.category,
      image: r.image,
      popular: r.popular,
    });
  } catch (error) {
    console.error("Failed to update menu item:", error);
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sql = getDb();
    const rows = await sql`DELETE FROM menu_items WHERE id = ${Number(id)} RETURNING id`;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete menu item:", error);
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 });
  }
}
