import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { OurClientSection } from "@/components/landing/our-client-section";
import "@/components/landing/landing-fluid.css";
import "@/components/landing/landing-mobile.module.css";
import styles from "./pricing-page.module.css";
import { PricingComparisonSection } from "./pricing-comparison-section";
import { PricingCtaCardsSection } from "./pricing-cta-cards-section";
import { PricingFaqSection } from "./pricing-faq-section";
import { PricingHeroSection } from "./pricing-hero-section";

export function PricingPage() {
  return (
    <div className={`${styles.page} landing-main`}>
      <LandingHeader />
      <div className="landing-page-gutter">
        <main className={`${styles.main} landing-main__inner`} id="main">
          <PricingHeroSection />
          <PricingComparisonSection />
          <div className={styles.clientsSpacing}>
            <OurClientSection />
          </div>
          <PricingCtaCardsSection />
          <PricingFaqSection />
        </main>
      </div>
      <LandingFooter />
    </div>
  );
}
