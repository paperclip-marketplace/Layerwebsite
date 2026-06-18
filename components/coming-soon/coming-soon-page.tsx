import { ComingSoonSection } from "./coming-soon-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import "@/components/landing/landing-fluid.css";
import "@/components/landing/landing-mobile.module.css";
import styles from "./coming-soon-page.module.css";

export function ComingSoonPage() {
  return (
    <div className={`${styles.page} landing-main`}>
      <LandingHeader />
      <div className="landing-page-gutter">
        <main className={`${styles.main} landing-main__inner`} id="main">
          <ComingSoonSection />
        </main>
      </div>
      <LandingFooter />
    </div>
  );
}
