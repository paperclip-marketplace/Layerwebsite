import { LandingHeader } from "./landing-header";
import { LandingMobileTitleSection } from "./landing-mobile-title-section";
import { LandingHeroSection } from "./landing-hero-section";
import { LandingTopSection } from "./landing-top-section";
import { OurClientSection } from "./our-client-section";
import { LandingWhatWeDoSection } from "./landing-what-we-do-section";
import { LandingSplitSection } from "./landing-split-section";
import { IntegrationSection } from "./integration-section";
import { LandingProblemSection } from "./landing-problem-section";
import { LandingStatsSection } from "./landing-stats-section";
import { LandingFailurePointsSection } from "./landing-failure-points-section";
import { LandingWhyNowSection } from "./landing-why-now-section";
import { LandingLeadershipControlSection } from "./landing-leadership-control-section";
import { LandingLeadershipImageSection } from "./landing-leadership-image-section";
import { LandingLeadershipMetricsSection } from "./landing-leadership-metrics-section";
import { LandingKeyMetricsSection } from "./landing-key-metrics-section";
import { LandingOperatorSection } from "./landing-operator-section";
import { TeamExperienceSection } from "./team-experience";
import { LandingFooter } from "./landing-footer";
import { LandingScrollSmoother } from "./landing-scroll-smoother";
import "./landing-fluid.css";
import "./landing-mobile.module.css";
import styles from "./landing-page.module.css";

const SHOW_TEAM_EXPERIENCE_SECTION = true;

export function LandingPage() {
  return (
    <div className={`${styles.page} landing-main`}>
      <LandingHeader />
      <LandingScrollSmoother>
        <LandingMobileTitleSection />

        <div className="landing-page-gutter">
          <main className={`${styles.main} landing-main__inner`} id="main">
        <div
          className="landing-hero-intro"
          data-name="Hero intro"
        >
          <LandingTopSection />
          <LandingHeroSection />
        </div>

        <OurClientSection />

        <div
          className="landing-problem-stats landing-band-left"
          data-name="Problem Main Content"
          data-node-id="713:455"
        >
          <LandingProblemSection />
          <LandingStatsSection />
          <div
            className="landing-problem-citation"
            data-name="Problem Citation"
            data-node-id="725:1307"
          >
            <p data-node-id="725:1305">
              * The Bridge Group, 2024 SaaS AE Metrics &amp; Compensation
              Benchmark; Salesforce, State of Sales Report 2026.
            </p>
          </div>
        </div>

        <LandingFailurePointsSection />

        <div
          className="landing-what-we-do-split landing-band-left"
          data-name="The Solution Container"
          data-node-id="713:895"
        >
          <LandingWhatWeDoSection />
          <LandingSplitSection />
        </div>

        <IntegrationSection />

        <LandingWhyNowSection />

        <div
          className="landing-leadership-block landing-band-left"
          data-name="Leadership Control Section"
          data-node-id="713:1063"
        >
          <LandingLeadershipControlSection />
          <LandingLeadershipImageSection />
        </div>

        <div className="landing-metrics-block landing-band-left">
          <LandingLeadershipMetricsSection />
          <LandingKeyMetricsSection />
        </div>

        <LandingOperatorSection />
        {SHOW_TEAM_EXPERIENCE_SECTION ? <TeamExperienceSection /> : null}
          </main>
        </div>
        <LandingFooter />
      </LandingScrollSmoother>
    </div>
  );
}
