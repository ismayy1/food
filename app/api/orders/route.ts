import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
    const orders = rows.map((r: Record<string, unknown>) => ({
      id: String(r.id),
      customer: r.customer_name,
      phone: r.phone,
      type: r.order_type,
      address: r.address || "",
      notes: r.notes || "",
      items: typeof r.items === "string" ? JSON.parse(r.items as string) : r.items,
      total: Number(r.total),
      status: r.status,
      time: new Date(r.created_at as string).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" }),
      created_at: r.created_at,
    }));
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const sql = getDb();
    const body = await request.json();
    const { customer_name, phone, order_type, address, notes, items, total } = body;

    if (!customer_name || !phone || !order_type || !items || !total) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const rows = await sql`
      INSERT INTO orders (customer_name, phone, order_type, address, notes, items, total, status)
      VALUES (${customer_name}, ${phone}, ${order_type}, ${address || null}, ${notes || ""}, ${JSON.stringify(items)}, ${total}, 'pending')
      RETURNING *
    `;

    const r = rows[0];
    return NextResponse.json({
      id: String(r.id),
      customer: r.customer_name,
      phone: r.phone,
      type: r.order_type,
      items: typeof r.items === "string" ? JSON.parse(r.items as string) : r.items,
      total: Number(r.total),
      status: r.status,
      time: new Date(r.created_at as string).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" }),
    }, { status: 201 });
  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
