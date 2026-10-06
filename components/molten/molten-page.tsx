import { LandingPageShell } from "@/components/landing/landing-page-shell";
import { OurClientSection } from "@/components/landing/our-client-section";
import "@/components/landing/landing-fluid.css";
import "@/components/landing/landing-mobile.module.css";
import { MoltenHero } from "./molten_hero";
import { MoltenOfferSection } from "./molten-offer-section";
import { MoltenFounderSupportSection } from "./molten-founder-support-section";
import { WhyLayer } from "./why-layer";
import { PersonalAgentBottomCtaSection } from "@/components/products/personal-agent/personal-agent-bottom-cta-section";
import styles from "./molten-page.module.css";

export function MoltenPage() {
  return (
    <LandingPageShell pageClassName={styles.page}>
      <div className="landing-page-gutter">
        <main className={`${styles.main} landing-main__inner`} id="main">
          <MoltenHero />
          <div className={styles.clientsSpacing}>
            <OurClientSection />
          </div>
          <div className="landing-metrics-block landing-band-left">
            <MoltenOfferSection />
          </div>
          <MoltenFounderSupportSection />
          <div className={styles.whyLayerSpacing}>
            <WhyLayer />
          </div>
          <PersonalAgentBottomCtaSection />
        </main>
      </div>
    </LandingPageShell>
  );
}
