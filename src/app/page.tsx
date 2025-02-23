import { Hero } from "@/components/ui/animated-hero";
import { FeaturesSectionWithHoverEffects } from "@/components/blocks/feature-section-with-hover-effects";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="bg-background relative">
        <Hero />
      </section>

      <section className="bg-background/95 relative py-20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="max-w-6xl mx-auto px-4 relative">
          <FeaturesSectionWithHoverEffects />
        </div>
      </section>
    </main>
  );
}
