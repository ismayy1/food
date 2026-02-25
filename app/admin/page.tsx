"use client";

import {
  DollarSign,
  ShoppingCart,
  UtensilsCrossed,
  Star,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    label: "Today's Revenue",
    value: "2,450 lei",
    change: "+12%",
    icon: DollarSign,
    href: "/admin/analytics",
  },
  {
    label: "Active Orders",
    value: "8",
    change: "+3",
    icon: ShoppingCart,
    href: "/admin/orders",
  },
  {
    label: "Menu Items",
    value: "15",
    change: "3 popular",
    icon: UtensilsCrossed,
    href: "/admin/menu",
  },
  {
    label: "Avg. Rating",
    value: "4.6",
    change: "293 reviews",
    icon: Star,
    href: "/admin/reviews",
  },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Maria I.",
    items: "2x Classic Wrap, 1x Hummus",
    total: "59 lei",
    status: "Preparing",
    time: "5 min ago",
  },
  {
    id: "ORD-002",
    customer: "Alex P.",
    items: "1x Family Combo",
    total: "65 lei",
    status: "Ready",
    time: "12 min ago",
  },
  {
    id: "ORD-003",
    customer: "Sophie L.",
    items: "1x Spicy Wrap, 1x Lemonade",
    total: "37 lei",
    status: "Delivered",
    time: "25 min ago",
  },
  {
    id: "ORD-004",
    customer: "Andrei D.",
    items: "1x Mixed Platter, 2x Ayran",
    total: "60 lei",
    status: "Preparing",
    time: "3 min ago",
  },
];

const statusColors: Record<string, string> = {
  Preparing: "bg-accent text-accent-foreground",
  Ready: "bg-primary/15 text-primary",
  Delivered: "bg-secondary text-secondary-foreground",
  Cancelled: "bg-destructive/15 text-destructive",
};

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your restaurant performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-card-foreground">
                {stat.value}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {stat.label}
                </span>
                <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                  {stat.change}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Recent Orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-sm font-medium text-primary hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Order
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Customer
                  </th>
                  <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground md:table-cell">
                    Items
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm font-medium text-card-foreground">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-card-foreground">
                      {order.customer}
                    </td>
                    <td className="hidden px-4 py-3 text-sm text-muted-foreground md:table-cell">
                      {order.items}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-card-foreground">
                      {order.total}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          statusColors[order.status] || ""
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-xs text-muted-foreground sm:table-cell">
                      {order.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
