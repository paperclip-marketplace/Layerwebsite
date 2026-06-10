import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingPromoBanner } from "@/components/landing/landing-promo-banner";
import { SHOW_LANDING_DEMO_ENTRY } from "@/lib/config/constants";
import "@/components/landing/landing-fluid.css";
import "@/components/landing/landing-mobile.module.css";
import styles from "./personal-agent-page.module.css";
import { PersonalAgentBottomCtaSection } from "./personal-agent-bottom-cta-section";
import { PersonalAgentCustomizeSection } from "./personal-agent-customize-section";
import { PersonalAgentHeroSection } from "./personal-agent-hero-section";
import { PersonalAgentIntegrationsSection } from "./personal-agent-integrations-section";
import { PersonalAgentLogosSection } from "./personal-agent-logos-section";
import { PersonalAgentUseCasesSection } from "./personal-agent-use-cases-section";
import { PersonalAgentWhyNowSection } from "./personal-agent-why-now-section";

export function PersonalAgentPage() {
  return (
    <div className={`${styles.page} landing-main`}>
      <LandingHeader />
      <div className="landing-page-gutter">
        <main className={`${styles.main} landing-main__inner`} id="main">
          {SHOW_LANDING_DEMO_ENTRY ? <LandingPromoBanner /> : null}
          <PersonalAgentHeroSection />
          <PersonalAgentLogosSection />
          <PersonalAgentUseCasesSection />
          <PersonalAgentWhyNowSection />
          <PersonalAgentCustomizeSection />
          <PersonalAgentIntegrationsSection />
          <PersonalAgentBottomCtaSection />
        </main>
      </div>
      <LandingFooter />
    </div>
  );
}
