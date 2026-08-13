import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AffiliatesSection } from "@/features/landing/affiliates-section";
import { FaqSection } from "@/features/landing/faq-section";
import { FinalCtaSection } from "@/features/landing/final-cta-section";
import { HeroSection } from "@/features/landing/hero-section";
import { HowItWorksSection } from "@/features/landing/how-it-works-section";
import { PhilosophySection } from "@/features/landing/philosophy-section";
import { PricingSection } from "@/features/landing/pricing-section";
import { SocialProofSection } from "@/features/landing/social-proof-section";
import { TrustBarSection } from "@/features/landing/trust-bar-section";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-white">
      <SiteHeader />
      <main>
        <HeroSection />
        <TrustBarSection />
        <HowItWorksSection />
        <PhilosophySection />
        <AffiliatesSection />
        <PricingSection />
        <SocialProofSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
