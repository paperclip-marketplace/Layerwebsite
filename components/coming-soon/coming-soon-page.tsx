import { ComingSoonSection } from "./coming-soon-section";
import { LandingPageShell } from "@/components/landing/landing-page-shell";
import "@/components/landing/landing-fluid.css";
import "@/components/landing/landing-mobile.module.css";
import styles from "./coming-soon-page.module.css";

export function ComingSoonPage() {
  return (
    <LandingPageShell pageClassName={styles.page}>
      <div className="landing-page-gutter">
        <main className={`${styles.main} landing-main__inner`} id="main">
          <ComingSoonSection />
        </main>
      </div>
    </LandingPageShell>
  );
}
