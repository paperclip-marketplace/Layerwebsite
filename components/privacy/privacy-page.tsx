import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import "@/components/landing/landing-fluid.css";
import "@/components/landing/landing-mobile.module.css";
import { PrivacyContent } from "./privacy-content";
import styles from "../terms/terms-page.module.css";

export function PrivacyPage() {
  return (
    <div className={`${styles.page} landing-main`}>
      <LandingHeader />
      <main className={`${styles.main} landing-main__inner`} id="main">
        <PrivacyContent />
      </main>
      <LandingFooter />
    </div>
  );
}
