"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  ShoppingBag,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">F</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Falafilo
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground",
                pathname === link.href
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/contact" className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex">
            <Phone className="h-4 w-4" />
            <span className="hidden lg:inline">0779 302 308</span>
          </Link>

          <Link href="/order" className="relative">
            <Button variant="default" size="sm" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Order</span>
              {totalItems > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 h-5 min-w-5 justify-center rounded-full bg-primary-foreground px-1.5 text-xs text-primary"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 pt-6">
                <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                    <span className="text-lg font-bold text-primary-foreground">F</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">Falafilo</span>
                </Link>
                <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        pathname === link.href
                          ? "bg-secondary text-secondary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/order"
                    onClick={() => setOpen(false)}
                    className="mt-2 flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-base font-medium text-primary-foreground"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Order Online
                    {totalItems > 0 && (
                      <Badge variant="secondary" className="ml-auto">{totalItems}</Badge>
                    )}
                  </Link>
                </nav>
                <div className="border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <a href="tel:+40779302308">0779 302 308</a>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Sos. Andronache 3, Bucuresti</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
