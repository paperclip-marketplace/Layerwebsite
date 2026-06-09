import Link from "next/link";
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
      <Link href="#" className={styles.button} data-node-id="1089:5859">
        <span className={`material-symbols-rounded ${styles.buttonIcon}`} aria-hidden>
          terminal
        </span>
        <span className={`${styles.promoMedium} ${styles.buttonText}`} data-node-id="1089:5861">
          Try Interactive Demo
        </span>
      </Link>
    </section>
  );
}
