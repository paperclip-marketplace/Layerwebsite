import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingPromoBanner } from "@/components/landing/landing-promo-banner";
import { SHOW_LANDING_DEMO_ENTRY } from "@/lib/config/constants";
import "@/components/landing/landing-fluid.css";
import "@/components/landing/landing-mobile.module.css";
import styles from "./roleplay-page.module.css";
import { RoleplayBottomCtaSection } from "./roleplay-bottom-cta-section";
import { RoleplayHeroSection } from "./roleplay-hero-section";
import { RoleplayHowItWorksSection } from "./roleplay-how-it-works-section";
import { RoleplayLogosSection } from "./roleplay-logos-section";
import { RoleplayPersonaBuilderSection } from "./roleplay-persona-builder-section";

export function RoleplayPage() {
  return (
    <div className={`${styles.page} landing-main`}>
      <LandingHeader />
      <div className="landing-page-gutter">
        <main className={`${styles.main} landing-main__inner`} id="main">
          {SHOW_LANDING_DEMO_ENTRY ? <LandingPromoBanner /> : null}
          <RoleplayHeroSection />
          <RoleplayLogosSection />
          <RoleplayHowItWorksSection />
          <RoleplayPersonaBuilderSection />
          <RoleplayBottomCtaSection />
        </main>
      </div>
      <LandingFooter />
    </div>
  );
}
