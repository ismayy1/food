import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reviews, businessInfo } from "@/lib/data";

export function ReviewsPreview() {
  const featuredReviews = reviews.slice(0, 3);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center gap-1.5">
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
          <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-balance">{businessInfo.rating} out of 5</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Based on {businessInfo.reviewCount} Google reviews
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-1">
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
              <p className="mt-4 text-sm leading-relaxed text-card-foreground">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    {review.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {review.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" asChild className="gap-2 rounded-xl">
            <Link href="/reviews">
              See All Reviews
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
