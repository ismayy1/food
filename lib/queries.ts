import { getDb } from "./db";
import type { MenuItem, Review } from "./data";

export async function getMenuItems(): Promise<MenuItem[]> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM menu_items ORDER BY category, name`;
  return rows.map((r: Record<string, unknown>) => ({
    id: String(r.id),
    name: r.name as string,
    description: r.description as string,
    price: Number(r.price),
    category: r.category as MenuItem["category"],
    image: r.image as string,
    popular: r.popular as boolean,
  }));
}

export async function getVisibleReviews(): Promise<Review[]> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM reviews WHERE visible = true ORDER BY created_at DESC`;
  return rows.map((r: Record<string, unknown>) => ({
    id: String(r.id),
    name: r.name as string,
    rating: Number(r.rating),
    text: r.text as string,
    date: r.date as string,
  }));
}
