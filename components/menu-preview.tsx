import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { menuItems } from "@/lib/data";

export function MenuPreview() {
  const popularItems = menuItems.filter((item) => item.popular).slice(0, 4);

  return (
    <section className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              <span className="text-balance">Popular Picks</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Our most loved dishes, crafted with care.
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden gap-2 sm:flex">
            <Link href="/menu">
              Full Menu
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popularItems.map((item, index) => (
            <Link
              key={item.id}
              href="/menu"
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={index === 0}
                />
                {item.popular && (
                  <Badge className="absolute left-3 top-3 rounded-full bg-primary text-primary-foreground">
                    Popular
                  </Badge>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-card-foreground">
                  {item.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {item.price} lei
                  </span>
                  <span className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    View Details &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild className="gap-2">
            <Link href="/menu">
              View Full Menu
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
