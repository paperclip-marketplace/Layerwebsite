import { LandingPageShell } from "@/components/landing/landing-page-shell";
import "@/components/landing/landing-fluid.css";
import "@/components/landing/landing-mobile.module.css";
import { PrivacyContent } from "./privacy-content";
import styles from "../terms/terms-page.module.css";

export function PrivacyPage() {
  return (
    <LandingPageShell pageClassName={styles.page}>
      <main className={`${styles.main} landing-main__inner`} id="main">
        <PrivacyContent />
      </main>
    </LandingPageShell>
  );
}
