import type { Metadata } from "next";
import { MenuPageClient } from "./menu-client";

export const metadata: Metadata = {
  title: "Menu | Falafilo Food - Falafel Wraps, Platters & More",
  description:
    "Browse our full menu of authentic falafel wraps, platters, sides, salads and drinks. Affordable prices from 20-40 lei.",
};

export default function MenuPage() {
  return <MenuPageClient />;
}
