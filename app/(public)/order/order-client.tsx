"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MapPin,
  Truck,
  ArrowLeft,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart-context";
import { menuItems, categories } from "@/lib/data";
import { cn } from "@/lib/utils";

type OrderMode = "pickup" | "delivery";

export function OrderPageClient() {
  const {
    items: cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>("wraps");
  const [orderMode, setOrderMode] = useState<OrderMode>("pickup");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center lg:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mt-6 font-serif text-3xl font-bold text-foreground">
          Order Placed!
        </h1>
        <p className="mt-3 text-muted-foreground">
          Thank you for your order! We are preparing your food now.
          {orderMode === "pickup"
            ? " Your order will be ready for pickup shortly."
            : " Your order will be delivered to your door."}
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button
            asChild
            className="rounded-xl"
            onClick={() => {
              clearCart();
              setOrderPlaced(false);
            }}
          >
            <Link href="/">Back to Home</Link>
          </Button>
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => {
              clearCart();
              setOrderPlaced(false);
            }}
          >
            New Order
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/menu"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Menu
        </Link>
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
          Order Online
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Add items to your cart and checkout when ready.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Menu Selection */}
        <div className="lg:col-span-2">
          {/* Order Mode Toggle */}
          <div className="mb-6 flex gap-2 rounded-xl bg-secondary p-1.5">
            <button
              onClick={() => setOrderMode("pickup")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                orderMode === "pickup"
                  ? "bg-card text-card-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <MapPin className="h-4 w-4" />
              Pickup
            </button>
            <button
              onClick={() => setOrderMode("delivery")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                orderMode === "delivery"
                  ? "bg-card text-card-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Truck className="h-4 w-4" />
              Delivery
            </button>
          </div>

          {/* Categories */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Items */}
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredItems.map((item) => {
              const inCart = cartItems.find((c) => c.id === item.id);
              return (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-card-foreground">
                        {item.name}
                      </h3>
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">
                        {item.price} lei
                      </span>
                      {inCart ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, inCart.quantity - 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium text-card-foreground">
                            {inCart.quantity}
                          </span>
                          <button
                            onClick={() => addItem(item)}
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addItem(item)}
                          className="h-7 gap-1 rounded-lg text-xs"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-card-foreground">
                Your Order
              </h2>
              {totalItems > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-auto rounded-full"
                >
                  {totalItems}
                </Badge>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="mt-8 text-center">
                <ShoppingBag className="mx-auto h-10 w-10 text-muted" />
                <p className="mt-3 text-sm text-muted-foreground">
                  Your cart is empty. Add items from the menu.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-4 divide-y divide-border">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 py-3"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity} x {item.price} lei
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-card-foreground">
                          {item.quantity * item.price} lei
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                {orderMode === "delivery" && (
                  <div className="mt-4 space-y-3 border-t border-border pt-4">
                    <h3 className="text-sm font-semibold text-card-foreground">
                      Delivery Details
                    </h3>
                    <div>
                      <Label htmlFor="address" className="text-xs">
                        Delivery Address
                      </Label>
                      <Input
                        id="address"
                        placeholder="Enter your address"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes" className="text-xs">
                        Notes (optional)
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Any special instructions?"
                        className="mt-1"
                        rows={2}
                      />
                    </div>
                  </div>
                )}

                {/* Totals */}
                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-card-foreground">{totalPrice} lei</span>
                  </div>
                  {orderMode === "delivery" && (
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Delivery Fee
                      </span>
                      <span className="text-card-foreground">10 lei</span>
                    </div>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-semibold text-card-foreground">
                      Total
                    </span>
                    <span className="text-xl font-bold text-primary">
                      {totalPrice + (orderMode === "delivery" ? 10 : 0)} lei
                    </span>
                  </div>
                </div>

                <Button
                  className="mt-4 w-full gap-2 rounded-xl"
                  size="lg"
                  onClick={() => setOrderPlaced(true)}
                >
                  Place Order
                </Button>

                <button
                  onClick={clearCart}
                  className="mt-2 w-full text-center text-xs text-muted-foreground hover:text-destructive"
                >
                  Clear Cart
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
