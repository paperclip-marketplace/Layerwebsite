import { LandingPageShell } from "@/components/landing/landing-page-shell";
import "@/components/landing/landing-fluid.css";
import "@/components/landing/landing-mobile.module.css";
import styles from "@/components/terms/terms-page.module.css";
import { DpaContent } from "./dpa-content";

export function DpaPage() {
  return (
    <LandingPageShell pageClassName={styles.page}>
      <main className={`${styles.main} landing-main__inner`} id="main">
        <DpaContent />
      </main>
    </LandingPageShell>
  );
}
