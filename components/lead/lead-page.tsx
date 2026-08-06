import { LandingPageShell } from "@/components/landing/landing-page-shell";
import { LandingPromoBanner } from "@/components/landing/landing-promo-banner";
import { OurClientSection } from "@/components/landing/our-client-section";
import "@/components/landing/landing-fluid.css";
import "@/components/landing/landing-mobile.module.css";
import { SHOW_LANDING_DEMO_ENTRY } from "@/lib/config/constants";
import { LeadCaptureSection } from "./lead-capture-section";
import { LeadHowLayerWorksSection } from "./lead-how-layer-works-section";
import { PersonalAgentBottomCtaSection } from "@/components/products/personal-agent/personal-agent-bottom-cta-section";
import { LeadClientTestimonialsSection } from "./lead-client-testimonials-section";
import { LeadWalkthroughFab } from "./lead-walkthrough-fab";
import styles from "./lead-page.module.css";

export function LeadPage() {
  return (
    <>
      <LandingPageShell pageClassName={styles.page}>
        <div className="landing-page-gutter">
          <main className={`${styles.main} landing-main__inner`} id="main">
            {SHOW_LANDING_DEMO_ENTRY ? <LandingPromoBanner /> : null}
            <LeadCaptureSection />
            <div className={styles.clientsSpacing}>
              <OurClientSection />
            </div>
            {/* How Layer Works + Why Now pin together (Figma 1822:22480 → 1822:22940) */}
            <LeadHowLayerWorksSection />
            <LeadClientTestimonialsSection />
            <PersonalAgentBottomCtaSection />
          </main>
        </div>
      </LandingPageShell>
      {/* Outside ScrollSmoother so position:fixed is not transformed */}
      <LeadWalkthroughFab />
    </>
  );
}
