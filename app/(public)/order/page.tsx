import type { Metadata } from "next";
import { OrderPageClient } from "./order-client";
import { getMenuItems } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Order Online | Falafilo Food - Pickup & Delivery",
  description:
    "Order falafel online from Falafilo Food. Select your items, choose pickup or delivery, and enjoy fresh falafel in minutes.",
};

export const dynamic = "force-dynamic";

export default async function OrderPage() {
  const items = await getMenuItems();
  return <OrderPageClient initialItems={items} />;
}
