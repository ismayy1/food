"use client";

import type { Metadata } from "next";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

const galleryImages = [
  {
    src: "/images/hero-falafel.jpg",
    alt: "Fresh falafel spread with hummus and vegetables",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/images/falafel-wrap.jpg",
    alt: "Classic falafel wrap with tahini sauce",
    span: "",
  },
  {
    src: "/images/falafel-platter.jpg",
    alt: "Falafel platter with sides",
    span: "",
  },
  {
    src: "/images/hummus.jpg",
    alt: "Creamy house-made hummus",
    span: "",
  },
  {
    src: "/images/salad.jpg",
    alt: "Fresh Mediterranean salad",
    span: "",
  },
  {
    src: "/images/drinks.jpg",
    alt: "Refreshing beverages",
    span: "lg:col-span-2",
  },
  {
    src: "/images/restaurant-interior.jpg",
    alt: "Falafilo Food restaurant interior",
    span: "lg:col-span-2",
  },
  {
    src: "/images/food-prep.jpg",
    alt: "Fresh falafel preparation",
    span: "",
  },
];

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
          Gallery
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          A glimpse into our food, our space, and what makes Falafilo special.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {galleryImages.map((image, index) => (
          <button
            key={image.src}
            onClick={() => setLightbox(index)}
            className={`group relative aspect-[4/3] overflow-hidden rounded-2xl ${image.span}`}
            aria-label={`View ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/20" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 text-background transition-colors hover:bg-background/40"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-2xl">
            <Image
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              fill
              className="object-cover"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
