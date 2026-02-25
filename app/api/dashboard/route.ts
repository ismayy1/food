import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const sql = getDb();

    const [menuCount, orderStats, recentOrders, reviewStats] = await Promise.all([
      sql`SELECT COUNT(*) as count, COUNT(*) FILTER (WHERE popular = true) as popular_count FROM menu_items`,
      sql`
        SELECT
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE status NOT IN ('delivered', 'cancelled')) as active,
          COALESCE(SUM(total) FILTER (WHERE created_at::date = CURRENT_DATE), 0) as today_revenue
        FROM orders
      `,
      sql`SELECT * FROM orders ORDER BY created_at DESC LIMIT 5`,
      sql`SELECT COUNT(*) as count, COALESCE(AVG(rating), 0) as avg_rating FROM reviews WHERE visible = true`,
    ]);

    const recent = recentOrders.map((r: Record<string, unknown>) => ({
      id: `ORD-${String(r.id).padStart(3, "0")}`,
      customer: r.customer_name,
      items: typeof r.items === "string" ? JSON.parse(r.items as string) : r.items,
      total: `${Number(r.total)} lei`,
      status: (r.status as string).charAt(0).toUpperCase() + (r.status as string).slice(1),
      time: new Date(r.created_at as string).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" }),
    }));

    return NextResponse.json({
      menuItemCount: Number(menuCount[0].count),
      popularCount: Number(menuCount[0].popular_count),
      totalOrders: Number(orderStats[0].total),
      activeOrders: Number(orderStats[0].active),
      todayRevenue: Number(orderStats[0].today_revenue),
      reviewCount: Number(reviewStats[0].count),
      avgRating: Number(Number(reviewStats[0].avg_rating).toFixed(1)),
      recentOrders: recent,
    });
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
  }
}
