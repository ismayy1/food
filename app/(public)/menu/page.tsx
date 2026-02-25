import type { Metadata } from "next";
import { MenuPageClient } from "./menu-client";
import { getMenuItems } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Menu | Falafilo Food - Falafel Wraps, Platters & More",
  description:
    "Browse our full menu of authentic falafel wraps, platters, sides, salads and drinks. Affordable prices from 20-40 lei.",
};

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const items = await getMenuItems();
  return <MenuPageClient initialItems={items} />;
}
