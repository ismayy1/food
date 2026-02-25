import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, Leaf, Heart, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us | Falafilo Food - Our Story",
  description:
    "Learn about Falafilo Food - authentic falafel in Bucharest. Fresh ingredients, healthy options, and fast friendly service.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/food-prep.jpg"
            alt="Preparing fresh falafel"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-foreground/75" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-background sm:text-5xl lg:text-6xl">
            <span className="text-balance">Our Story</span>
          </h1>
          <p className="mt-4 max-w-lg text-lg text-background/80">
            Bringing the authentic taste of falafel to the heart of Bucharest.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                <span className="text-balance">Fresh, Healthy & Full of Flavor</span>
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Falafilo Food was born from a simple passion: bringing
                  authentic, delicious falafel to Bucharest. We believe that
                  fast-food can be both quick and healthy, made with the
                  freshest ingredients and traditional recipes passed down
                  through generations.
                </p>
                <p>
                  Every day, our team prepares falafel from scratch using
                  premium chickpeas, fresh herbs, and authentic spices. We
                  never use frozen or pre-made products. From our creamy
                  hummus to our crispy falafel balls, everything is made
                  in-house with love and care.
                </p>
                <p>
                  Located on Soseaua Andronache, we have become a favorite
                  spot for students, young professionals, families, and
                  tourists looking for a tasty, affordable, and healthy
                  meal in Bucharest.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.floor(businessInfo.rating)
                          ? "fill-primary text-primary"
                          : "fill-primary/30 text-primary/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {businessInfo.rating} rating from{" "}
                  {businessInfo.reviewCount} reviews
                </span>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/falafel-platter.jpg"
                alt="Falafilo food platter"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center font-serif text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-balance">What We Stand For</span>
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Leaf,
                title: "Fresh Daily",
                desc: "All ingredients sourced and prepared fresh every single day.",
              },
              {
                icon: Heart,
                title: "Made with Love",
                desc: "Traditional recipes crafted with passion and authenticity.",
              },
              {
                icon: Users,
                title: "Community First",
                desc: "Proud to serve our Bucharest neighborhood with affordable meals.",
              },
              {
                icon: Award,
                title: "Quality Promise",
                desc: "4.6 star rating speaks to our commitment to excellence.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-balance">Come Visit Us</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            We are located at Soseaua Andronache 3, 022521 Bucuresti. Open
            daily until 10 PM. We would love to have you!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild className="rounded-xl">
              <Link href="/order">Order Online</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-xl"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
