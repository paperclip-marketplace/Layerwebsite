import Link from "next/link";
import { LandingHeadingReveal } from "@/components/landing/landing-text-reveal";
import { ROUTES } from "@/lib/config/constants";
import { ROLEPLAY_ASSETS } from "./roleplay-assets";
import styles from "./roleplay-bottom-cta-section.module.css";

export function RoleplayBottomCtaSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="roleplay-bottom-cta-heading"
      data-node-id="1089:6402"
      data-name="bottom-cta"
    >
      <div className={styles.backdrop} aria-hidden>
        <div className={styles.backdropWhite} />
        <img
          src={ROLEPLAY_ASSETS.bottomCtaBg}
          alt=""
          className={styles.backdropImage}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className={styles.content}>
        <LandingHeadingReveal
          id="roleplay-bottom-cta-heading"
          className={styles.headline}
        >
          <span className={styles.headlineLine}>Built for the future.</span>
          <span className={`${styles.headlineLine} ${styles.highlight}`}>
            Available today.
          </span>
        </LandingHeadingReveal>

        <div className={styles.actions}>
          <Link href={ROUTES.signUp} className={styles.primaryBtn}>
            <span>Get Started</span>
            <span
              className={`material-symbols-rounded ${styles.btnIcon}`}
              aria-hidden
            >
              arrow_forward
            </span>
          </Link>
          <Link href="#" className={styles.secondaryBtn}>
            <span>Contact Sales</span>
            <span
              className={`material-symbols-rounded ${styles.btnIcon}`}
              aria-hidden
            >
              call
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
