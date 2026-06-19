import { LandingPageShell } from "@/components/landing/landing-page-shell";
import "@/components/landing/landing-fluid.css";
import "@/components/landing/landing-mobile.module.css";
import { TermsContent } from "./terms-content";
import styles from "./terms-page.module.css";

export function TermsPage() {
  return (
    <LandingPageShell pageClassName={styles.page}>
      <main className={`${styles.main} landing-main__inner`} id="main">
        <TermsContent />
      </main>
    </LandingPageShell>
  );
}
