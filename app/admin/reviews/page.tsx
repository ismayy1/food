"use client";

import useSWR from "swr";
import { Star, Eye, EyeOff, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { businessInfo } from "@/lib/data";

interface AdminReview {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  visible: boolean;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminReviewsPage() {
  const { data: reviews = [], mutate, isLoading } = useSWR<AdminReview[]>(
    "/api/reviews?all=true",
    fetcher
  );

  async function toggleVisibility(id: string, currentVisible: boolean) {
    try {
      await fetch(`/api/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible: !currentVisible }),
      });
      await mutate();
    } catch (error) {
      console.error("Failed to toggle review visibility:", error);
    }
  }

  async function deleteReview(id: string) {
    try {
      await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      await mutate();
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Review Moderation
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage and moderate customer reviews displayed on your website
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-3xl font-bold text-primary">{businessInfo.rating}</p>
          <p className="mt-1 text-xs text-muted-foreground">Google Rating</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-3xl font-bold text-card-foreground">
            {businessInfo.reviewCount}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Total Reviews</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-3xl font-bold text-card-foreground">
            {reviews.filter((r) => r.visible).length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Visible</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-3xl font-bold text-card-foreground">
            {reviews.filter((r) => !r.visible).length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Hidden</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`rounded-xl border border-border bg-card p-5 transition-all ${
              !review.visible ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
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
              <div className="flex items-center gap-2">
                {!review.visible && (
                  <Badge variant="outline" className="text-xs">
                    Hidden
                  </Badge>
                )}
                <div className="flex items-center gap-0.5">
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
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-card-foreground">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="mt-3 flex gap-2 border-t border-border pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleVisibility(review.id, review.visible)}
                className="gap-1.5 rounded-lg text-xs"
              >
                {review.visible ? (
                  <>
                    <EyeOff className="h-3.5 w-3.5" />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye className="h-3.5 w-3.5" />
                    Show
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteReview(review.id)}
                className="gap-1.5 rounded-lg text-xs text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
