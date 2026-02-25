import type { Metadata } from "next";
import { OrderPageClient } from "./order-client";

export const metadata: Metadata = {
  title: "Order Online | Falafilo Food - Pickup & Delivery",
  description:
    "Order falafel online from Falafilo Food. Select your items, choose pickup or delivery, and enjoy fresh falafel in minutes.",
};

export default function OrderPage() {
  return <OrderPageClient />;
}
