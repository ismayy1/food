"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { menuItems, categories } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function MenuPageClient() {
  const [activeCategory, setActiveCategory] = useState<string>("wraps");
  const { addItem, totalItems } = useCart();

  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
          Our Menu
        </h1>
        <p className="mt-3 max-w-xl text-lg text-muted-foreground">
          Explore our delicious selection of falafel wraps, platters, sides, and
          refreshing drinks. All made fresh daily.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "rounded-xl px-5 py-2.5 text-sm font-medium transition-all",
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {item.popular && (
                <Badge className="absolute left-3 top-3 rounded-full bg-primary text-primary-foreground">
                  Popular
                </Badge>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-primary">
                  {item.price} lei
                </span>
                <Button
                  size="sm"
                  onClick={() => addItem(item)}
                  className="gap-1.5 rounded-xl"
                >
                  <Plus className="h-4 w-4" />
                  Add to Order
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Cart Bar */}
      {totalItems > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <span className="font-medium text-card-foreground">
                {totalItems} item{totalItems !== 1 ? "s" : ""} in cart
              </span>
            </div>
            <Button asChild className="gap-2 rounded-xl">
              <Link href="/order">Go to Order</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
