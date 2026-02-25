import type { Metadata } from "next";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact & Location | Falafilo Food",
  description:
    "Find Falafilo Food at Soseaua Andronache 3, Bucuresti. Call us at 0779 302 308. Open daily until 10 PM.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
          Contact & Location
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          We would love to hear from you. Visit us or get in touch!
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">
                  Address
                </h3>
                <p className="text-sm text-muted-foreground">
                  {businessInfo.address}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">
                  Phone
                </h3>
                <a
                  href="tel:+40779302308"
                  className="text-sm text-primary hover:underline"
                >
                  {businessInfo.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">
                  Hours
                </h3>
                <p className="text-sm text-muted-foreground">
                  {businessInfo.hours}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-3 font-semibold text-card-foreground">
              Services
            </h3>
            <div className="flex flex-wrap gap-2">
              {businessInfo.services.map((service) => (
                <span
                  key={service}
                  className="rounded-lg bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild className="gap-2 rounded-xl">
              <a href="tel:+40779302308">
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="gap-2 rounded-xl"
            >
              <a
                href="https://maps.google.com/?q=Soseaua+Andronache+3+Bucuresti"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>
            </Button>
          </div>
        </div>

        {/* Map */}
        <div className="overflow-hidden rounded-2xl border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2847.5!2d26.14!3d44.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2021a1a2a3a5b%3A0x1234567890abcdef!2sSoseaua%20Andronache%203%2C%20Bucharest!5e0!3m2!1sen!2sro!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "450px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Falafilo Food Location"
          />
        </div>
      </div>
    </div>
  );
}
