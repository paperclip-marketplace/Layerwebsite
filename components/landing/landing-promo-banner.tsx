import Link from "next/link";
import { ROUTES } from "@/lib/config/constants";
import styles from "./landing-promo-banner.module.css";

export function LandingPromoBanner() {
  return (
    <section
      className={styles.banner}
      aria-label="Promotional announcement"
      data-node-id="1089:5857"
    >
      <p className={`${styles.promoMedium} ${styles.text}`} data-node-id="1089:5858">
        Experience Layer for completely FREE
      </p>
      <Link href={ROUTES.demo} className={styles.button} data-node-id="1089:5859">
        <span className={`material-symbols-rounded ${styles.buttonIcon}`} aria-hidden>
          terminal
        </span>
        <span className={`${styles.promoMedium} ${styles.buttonText}`} data-node-id="1089:5861">
          <span className={styles.buttonTextDesktop}>Try Interactive Demo</span>
          <span className={styles.buttonTextMobile}>Try Now</span>
        </span>
      </Link>
    </section>
  );
}
