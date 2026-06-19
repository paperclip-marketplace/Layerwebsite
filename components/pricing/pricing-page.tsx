import { LandingPageShell } from "@/components/landing/landing-page-shell";
import { OurClientSection } from "@/components/landing/our-client-section";
import { SHOW_PRICING_CTA, SHOW_PRICING_FAQ } from "@/lib/config/constants";
import "@/components/landing/landing-fluid.css";
import "@/components/landing/landing-mobile.module.css";
import styles from "./pricing-page.module.css";
import { PricingComparisonSection } from "./pricing-comparison-section";
import { PricingCtaCardsSection } from "./pricing-cta-cards-section";
import { PricingFaqSection } from "./pricing-faq-section";
import { PricingHeroSection } from "./pricing-hero-section";

export function PricingPage() {
  return (
    <LandingPageShell pageClassName={styles.page}>
      <div className="landing-page-gutter">
        <main className={`${styles.main} landing-main__inner`} id="main">
          <PricingHeroSection />
          <PricingComparisonSection />
          <div className={styles.clientsSpacing}>
            <OurClientSection />
          </div>
          {SHOW_PRICING_FAQ ? <PricingFaqSection /> : null}
          {SHOW_PRICING_CTA ? <PricingCtaCardsSection /> : null}
        </main>
      </div>
    </LandingPageShell>
  );
}
