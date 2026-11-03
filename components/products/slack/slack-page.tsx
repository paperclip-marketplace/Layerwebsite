import { Lato } from "next/font/google";
import { LandingPageShell } from "@/components/landing/landing-page-shell";
import "@/components/landing/landing-fluid.css";
import "@/components/landing/landing-mobile.module.css";
import { SlackCallsSection } from "./slack-calls-section";
import { SlackControlSection } from "./slack-control-section";
import { SlackCtaSection } from "./slack-cta-section";
import { SlackFaqSection } from "./slack-faq-section";
import { SlackHeroSection } from "./slack-hero-section";
import { SlackHowSection } from "./slack-how-section";
import { SlackPartnerSection } from "./slack-partner-section";
import { SlackRichAnswersSection } from "./slack-rich-answers-section";
import { SlackRolesSection } from "./slack-roles-section";
import { SlackRoutinesSection } from "./slack-routines-section";
import styles from "./slack-page.module.css";

/* Slack's own UI typeface, used only inside the Slack product scenes. */
const slackFont = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--slack-font",
  display: "swap",
});

/**
 * Layer for Slack — public product + Slack Marketplace installation page.
 * Design: Claude Design canvas "Layer for Slack — Marketplace page (rev 2)",
 * built on the Layer Figma DS (J3jb7yK70qgQW7NWues14V, agents.md v1.6).
 */
export function SlackPage() {
  return (
    <LandingPageShell pageClassName={`${styles.page} ${slackFont.variable}`}>
      <div className="landing-page-gutter">
        <main className={`${styles.main} landing-main__inner`} id="main">
          <SlackHeroSection />
          <SlackPartnerSection />
          <SlackCallsSection />
          <SlackRolesSection />
          <SlackRichAnswersSection />
          <SlackRoutinesSection />
          <SlackHowSection />
          <SlackControlSection />
          <SlackFaqSection />
          <SlackCtaSection />
        </main>
      </div>
    </LandingPageShell>
  );
}
