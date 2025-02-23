import { Button } from "@/components/ui/button";
import { FeaturesSectionWithHoverEffects } from "@/components/blocks/feature-section-with-hover-effects";
import { ClientHero } from "@/components/ClientHero";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-background relative">
        <div className="max-w-6xl mx-auto px-4">
          <ClientHero />
        </div>
        {/* Decorative bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      </section>

      {/* Features Section */}
      <section className="bg-background/95 relative py-20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="max-w-6xl mx-auto px-4 relative">
          <FeaturesSectionWithHoverEffects />
        </div>
      </section>
    </div>
  );
}
