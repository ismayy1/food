import type { Metadata } from "next";
import { Star } from "lucide-react";
import { reviews, businessInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Reviews | Falafilo Food - Customer Testimonials",
  description:
    "Read what our customers say about Falafilo Food. 4.6 star rating from 293 Google reviews.",
};

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
          Customer Reviews
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          See what people are saying about Falafilo Food
        </p>

        {/* Overall Rating */}
        <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-border bg-card p-6">
          <div className="text-5xl font-bold text-foreground">
            {businessInfo.rating}
          </div>
          <div className="mt-2 flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 ${
                  star <= Math.floor(businessInfo.rating)
                    ? "fill-primary text-primary"
                    : "fill-primary/30 text-primary/30"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Based on {businessInfo.reviewCount} Google reviews
          </p>

          {/* Rating Bars */}
          <div className="mt-6 space-y-2">
            {[
              { stars: 5, percentage: 78 },
              { stars: 4, percentage: 15 },
              { stars: 3, percentage: 4 },
              { stars: 2, percentage: 2 },
              { stars: 1, percentage: 1 },
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-3">
                <span className="w-3 text-xs text-muted-foreground">
                  {row.stars}
                </span>
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs text-muted-foreground">
                  {row.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {review.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-card-foreground">
                  {review.name}
                </p>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= review.rating
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-card-foreground">
              &ldquo;{review.text}&rdquo;
            </p>
          </div>
        ))}
      </div>

      {/* Google Reviews CTA */}
      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Want to leave a review? Visit our{" "}
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Google Business Page
          </a>
        </p>
      </div>
    </div>
  );
}
