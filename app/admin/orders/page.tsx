"use client";

import { useState } from "react";
import useSWR from "swr";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer: string;
  phone: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
  type: "pickup" | "delivery";
  address?: string;
  time: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const statusColors: Record<string, string> = {
  pending: "bg-accent text-accent-foreground",
  preparing: "bg-primary/15 text-primary",
  ready: "bg-chart-2/15 text-chart-2",
  delivered: "bg-secondary text-secondary-foreground",
  cancelled: "bg-destructive/15 text-destructive",
};

export default function AdminOrdersPage() {
  const { data: orders = [], mutate, isLoading } = useSWR<Order[]>("/api/orders", fetcher, {
    refreshInterval: 10000,
  });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  async function updateStatus(id: string, newStatus: Order["status"]) {
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      await mutate();
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  }

  function formatItems(items: OrderItem[]): string {
    if (!Array.isArray(items)) return String(items);
    return items.map((i) => `${i.quantity}x ${i.name}`).join(", ");
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage incoming takeaway and delivery orders
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {(["pending", "preparing", "ready", "delivered", "cancelled"] as const).map(
          (status) => {
            const count = orders.filter((o) => o.status === status).length;
            return (
              <button
                key={status}
                onClick={() =>
                  setStatusFilter(statusFilter === status ? "all" : status)
                }
                className={cn(
                  "rounded-xl border border-border bg-card p-3 text-center transition-all hover:shadow-sm",
                  statusFilter === status && "ring-2 ring-primary"
                )}
              >
                <p className="text-2xl font-bold text-card-foreground">
                  {count}
                </p>
                <p className="text-xs capitalize text-muted-foreground">
                  {status}
                </p>
              </button>
            );
          }
        )}
      </div>

      {/* Search */}
      <div className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders or customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-card-foreground">
                    ORD-{order.id.padStart(3, "0")}
                  </span>
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                      statusColors[order.status] || ""
                    }`}
                  >
                    {order.status}
                  </span>
                  <Badge variant="outline" className="rounded-full text-xs capitalize">
                    {order.type}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-card-foreground">
                  {order.customer}
                </p>
                <p className="text-xs text-muted-foreground">{order.phone}</p>
                {order.address && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Deliver to: {order.address}
                  </p>
                )}
                <p className="mt-2 text-sm text-muted-foreground">
                  {formatItems(order.items)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">
                  {order.total} lei
                </p>
                <p className="text-xs text-muted-foreground">{order.time}</p>
              </div>
            </div>
            {order.status !== "delivered" && order.status !== "cancelled" && (
              <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
                {order.status === "pending" && (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(order.id, "preparing")}
                    className="rounded-lg text-xs"
                  >
                    Start Preparing
                  </Button>
                )}
                {order.status === "preparing" && (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(order.id, "ready")}
                    className="rounded-lg text-xs"
                  >
                    Mark Ready
                  </Button>
                )}
                {order.status === "ready" && (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(order.id, "delivered")}
                    className="rounded-lg text-xs"
                  >
                    Mark Delivered
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateStatus(order.id, "cancelled")}
                  className="rounded-lg text-xs text-destructive hover:text-destructive"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        ))}
        {filteredOrders.length === 0 && (
          <div className="rounded-xl border border-border bg-card py-12 text-center text-muted-foreground">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
}
