import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Falafilo Food | Fresh & Flavorful Fast-Food in Bucharest",
  description:
    "Falafilo Food - Authentic falafel wraps, platters & healthy fast-food in Bucharest, Romania. Fresh ingredients, affordable prices (20-40 lei). Dine-in, takeaway & delivery.",
  keywords:
    "falafel Bucharest, fast food Bucharest, healthy fast food, falafel wrap, Mediterranean food Bucharest",
  openGraph: {
    title: "Falafilo Food | Fresh & Flavorful Fast-Food in Bucharest",
    description:
      "Authentic falafel wraps, platters & healthy fast-food. Fresh ingredients, affordable prices.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#c87533",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
