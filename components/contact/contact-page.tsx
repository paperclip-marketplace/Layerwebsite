import { LandingPageShell } from "@/components/landing/landing-page-shell";
import { OurClientSection } from "@/components/landing/our-client-section";
import "@/components/landing/landing-fluid.css";
import "@/components/landing/landing-mobile.module.css";
import { ContactUs } from "./contact-us";
import styles from "./contact-page.module.css";

export function ContactPage({ recaptchaSiteKey }: { recaptchaSiteKey: string }) {
  return (
    <LandingPageShell pageClassName={styles.page}>
      <div className="landing-page-gutter">
        <main className={`${styles.main} landing-main__inner`} id="main">
          <ContactUs recaptchaSiteKey={recaptchaSiteKey} />
          <div className={styles.clientsSpacing}>
            <OurClientSection />
          </div>
        </main>
      </div>
    </LandingPageShell>
  );
}
