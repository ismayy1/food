import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/restaurant-interior.jpg"
          alt="Falafilo Food restaurant"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/80" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 text-center lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-background sm:text-4xl">
          <span className="text-balance">Ready to Taste the Best Falafel in Town?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-background/75">
          Visit us today or order online for pickup and delivery. Fresh,
          delicious, and ready in minutes.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild className="gap-2 rounded-xl">
            <Link href="/order">Order Online</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="gap-2 rounded-xl border-background/30 bg-background/10 text-background backdrop-blur-sm hover:bg-background/20 hover:text-background"
          >
            <a href="tel:+40779302308">
              <Phone className="h-4 w-4" />
              Call Now
            </a>
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
      </div>
    </section>
  );
}
