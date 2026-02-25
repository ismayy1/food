import Link from "next/link";
import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">
                  F
                </span>
              </div>
              <span className="text-xl font-bold text-foreground">
                Falafilo Food
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Fresh & flavorful falafel in Bucharest. Made with love using the
              freshest ingredients daily.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: "/menu", label: "Our Menu" },
                { href: "/order", label: "Order Online" },
                { href: "/about", label: "About Us" },
                { href: "/reviews", label: "Reviews" },
                { href: "/gallery", label: "Gallery" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Soseaua Andronache 3, 022521 Bucuresti</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+40779302308" className="hover:text-primary">
                  0779 302 308
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0 text-primary" />
                <span>Open daily until 10 PM</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5">
              {["Dine-in", "Takeaway", "No-contact Delivery"].map(
                (service) => (
                  <li
                    key={service}
                    className="text-sm text-muted-foreground"
                  >
                    {service}
                  </li>
                )
              )}
            </ul>
            <div className="mt-6">
              <Link
                href="/order"
                className="inline-flex items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Falafilo Food. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
