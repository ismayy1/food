import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-falafel.jpg"
          alt="Delicious falafel spread"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-36">
        <div className="max-w-2xl">
          <Badge
            variant="secondary"
            className="mb-6 gap-1.5 rounded-full bg-primary/20 px-3 py-1.5 text-primary-foreground backdrop-blur-sm"
          >
            <Star className="h-3.5 w-3.5 fill-current" />
            4.6 Rating from 293 Reviews
          </Badge>

          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-background sm:text-5xl lg:text-6xl">
            <span className="text-balance">Fresh & Flavorful Fast-Food in Bucharest</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-background/80">
            Authentic falafel wraps, platters & healthy fast-food made daily
            with the freshest ingredients. Affordable meals from 20-40 lei.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild className="gap-2 rounded-xl">
              <Link href="/menu">
                View Menu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="gap-2 rounded-xl border-background/30 bg-background/10 text-background backdrop-blur-sm hover:bg-background/20 hover:text-background"
            >
              <Link href="/order">Order Online</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="gap-2 rounded-xl border-background/30 bg-background/10 text-background backdrop-blur-sm hover:bg-background/20 hover:text-background"
            >
              <a
                href="https://maps.google.com/?q=Soseaua+Andronache+3+Bucuresti"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="h-4 w-4" />
                Get Directions
              </a>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-background/70">
            {["Dine-in", "Takeaway", "No-contact Delivery"].map((service) => (
              <div key={service} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
