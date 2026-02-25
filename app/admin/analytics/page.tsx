"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const weeklyRevenue = [
  { day: "Mon", revenue: 1850 },
  { day: "Tue", revenue: 2100 },
  { day: "Wed", revenue: 1950 },
  { day: "Thu", revenue: 2400 },
  { day: "Fri", revenue: 3200 },
  { day: "Sat", revenue: 3800 },
  { day: "Sun", revenue: 2900 },
];

const monthlyOrders = [
  { month: "Jan", orders: 320 },
  { month: "Feb", orders: 380 },
  { month: "Mar", orders: 410 },
  { month: "Apr", orders: 450 },
  { month: "May", orders: 520 },
  { month: "Jun", orders: 580 },
];

const categoryBreakdown = [
  { name: "Wraps", value: 45 },
  { name: "Platters", value: 25 },
  { name: "Sides", value: 18 },
  { name: "Drinks", value: 12 },
];

const CHART_COLORS = [
  "oklch(0.65 0.18 55)",
  "oklch(0.72 0.16 70)",
  "oklch(0.82 0.15 80)",
  "oklch(0.55 0.12 40)",
];

const topItems = [
  { name: "Classic Falafel Wrap", orders: 145, revenue: "3,190 lei" },
  { name: "Family Combo", orders: 89, revenue: "5,785 lei" },
  { name: "Mixed Platter", orders: 76, revenue: "3,040 lei" },
  { name: "Hummus Falafel Wrap", orders: 68, revenue: "1,768 lei" },
  { name: "Fresh Lemonade", orders: 112, revenue: "1,344 lei" },
];

export default function AdminAnalyticsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Sales Analytics
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your restaurant performance and trends
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "This Week", value: "18,200 lei", sub: "+15% vs last week" },
          { label: "This Month", value: "72,400 lei", sub: "+8% vs last month" },
          { label: "Avg Order Value", value: "42 lei", sub: "+3 lei increase" },
          { label: "Total Orders", value: "1,720", sub: "This month" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-card p-4"
          >
            <p className="text-xs text-muted-foreground">{card.label}</p>
            <p className="mt-1 text-2xl font-bold text-card-foreground">
              {card.value}
            </p>
            <p className="mt-0.5 text-xs text-primary">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Revenue */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 font-semibold text-card-foreground">
            Weekly Revenue
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.02 80)" />
              <XAxis dataKey="day" fontSize={12} stroke="oklch(0.5 0.02 50)" />
              <YAxis fontSize={12} stroke="oklch(0.5 0.02 50)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.90 0.02 80)",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="revenue" fill="oklch(0.65 0.18 55)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Orders Trend */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 font-semibold text-card-foreground">
            Monthly Orders Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyOrders}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.02 80)" />
              <XAxis dataKey="month" fontSize={12} stroke="oklch(0.5 0.02 50)" />
              <YAxis fontSize={12} stroke="oklch(0.5 0.02 50)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.90 0.02 80)",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="oklch(0.65 0.18 55)"
                strokeWidth={2}
                dot={{ fill: "oklch(0.65 0.18 55)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 font-semibold text-card-foreground">
            Sales by Category
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {categoryBreakdown.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.90 0.02 80)",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            {categoryBreakdown.map((cat, i) => (
              <div key={cat.name} className="flex items-center gap-1.5">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: CHART_COLORS[i] }}
                />
                <span className="text-xs text-muted-foreground">
                  {cat.name} ({cat.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Items */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 font-semibold text-card-foreground">
            Top Selling Items
          </h3>
          <div className="space-y-3">
            {topItems.map((item, i) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.orders} orders
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary">
                  {item.revenue}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
