"use client";

import useSWR from "swr";
import {
  DollarSign,
  ShoppingCart,
  UtensilsCrossed,
  Star,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface DashboardData {
  menuItemCount: number;
  popularCount: number;
  totalOrders: number;
  activeOrders: number;
  todayRevenue: number;
  reviewCount: number;
  avgRating: number;
  recentOrders: {
    id: string;
    customer: string;
    items: { name: string; quantity: number; price: number }[];
    total: string;
    status: string;
    time: string;
  }[];
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const statusColors: Record<string, string> = {
  Preparing: "bg-accent text-accent-foreground",
  Ready: "bg-primary/15 text-primary",
  Delivered: "bg-secondary text-secondary-foreground",
  Cancelled: "bg-destructive/15 text-destructive",
  Pending: "bg-accent text-accent-foreground",
};

export default function AdminDashboard() {
  const { data, isLoading } = useSWR<DashboardData>("/api/dashboard", fetcher, {
    refreshInterval: 15000,
  });

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = [
    {
      label: "Today's Revenue",
      value: `${data.todayRevenue.toLocaleString()} lei`,
      change: `${data.totalOrders} total orders`,
      icon: DollarSign,
      href: "/admin/analytics",
    },
    {
      label: "Active Orders",
      value: String(data.activeOrders),
      change: `${data.totalOrders} total`,
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    {
      label: "Menu Items",
      value: String(data.menuItemCount),
      change: `${data.popularCount} popular`,
      icon: UtensilsCrossed,
      href: "/admin/menu",
    },
    {
      label: "Avg. Rating",
      value: String(data.avgRating),
      change: `${data.reviewCount} reviews`,
      icon: Star,
      href: "/admin/reviews",
    },
  ];

  function formatItems(items: { name: string; quantity: number; price: number }[]): string {
    if (!Array.isArray(items)) return String(items);
    return items.map((i) => `${i.quantity}x ${i.name}`).join(", ");
  }

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
                {data.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm font-medium text-card-foreground">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-card-foreground">
                      {order.customer}
                    </td>
                    <td className="hidden px-4 py-3 text-sm text-muted-foreground md:table-cell">
                      {formatItems(order.items)}
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
          {data.recentOrders.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No orders yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
