"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  customer: string;
  phone: string;
  items: string;
  total: number;
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
  type: "pickup" | "delivery";
  address?: string;
  time: string;
}

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Maria Ionescu",
    phone: "0721 123 456",
    items: "2x Classic Falafel Wrap, 1x Creamy Hummus",
    total: 59,
    status: "preparing",
    type: "pickup",
    time: "14:23",
  },
  {
    id: "ORD-002",
    customer: "Alexandru Popescu",
    phone: "0732 234 567",
    items: "1x Family Combo",
    total: 65,
    status: "ready",
    type: "delivery",
    address: "Str. Floreasca 25, Bucuresti",
    time: "14:15",
  },
  {
    id: "ORD-003",
    customer: "Sophie Laurent",
    phone: "0743 345 678",
    items: "1x Spicy Falafel Wrap, 1x Fresh Lemonade",
    total: 37,
    status: "delivered",
    type: "delivery",
    address: "Bd. Pipera 10, Bucuresti",
    time: "13:45",
  },
  {
    id: "ORD-004",
    customer: "Andrei Dragomir",
    phone: "0754 456 789",
    items: "1x Mixed Platter, 2x Ayran",
    total: 60,
    status: "pending",
    type: "pickup",
    time: "14:30",
  },
  {
    id: "ORD-005",
    customer: "Elena Vasilescu",
    phone: "0765 567 890",
    items: "1x Mediterranean Wrap, 1x Turkish Tea",
    total: 36,
    status: "preparing",
    type: "pickup",
    time: "14:20",
  },
  {
    id: "ORD-006",
    customer: "Radu Mihailescu",
    phone: "0776 678 901",
    items: "1x Falafel Platter, 1x Fresh Orange Juice",
    total: 49,
    status: "cancelled",
    type: "delivery",
    address: "Str. Dorobanti 50, Bucuresti",
    time: "13:30",
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-accent text-accent-foreground",
  preparing: "bg-primary/15 text-primary",
  ready: "bg-chart-2/15 text-chart-2",
  delivered: "bg-secondary text-secondary-foreground",
  cancelled: "bg-destructive/15 text-destructive",
};

const statusOptions = ["all", "pending", "preparing", "ready", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
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

  function updateStatus(id: string, newStatus: Order["status"]) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
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
                    {order.id}
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
                  {order.items}
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
