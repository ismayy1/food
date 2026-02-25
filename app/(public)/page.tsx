import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { MenuPreview } from "@/components/menu-preview";
import { ReviewsPreview } from "@/components/reviews-preview";
import { CTASection } from "@/components/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <MenuPreview />
      <ReviewsPreview />
      <CTASection />
    </>
  );
}
