import {
  LandingHeadingReveal,
  LandingSubheadingReveal,
} from "@/components/landing/landing-text-reveal";
import { LEAD_WHY_NOW_ASSETS } from "./lead-why-now-assets";
import styles from "./lead-why-now-section.module.css";

/** Figma 1822:22940 — Why Now */
export function LeadWhyNowSection() {
  return (
    <section
      className={`${styles.section} lead-why-now-section landing-full-bleed-strokes`}
      aria-labelledby="lead-why-now-heading"
      data-name="Why Now"
      data-node-id="1822:22940"
    >
      <div className={styles.backdrop} aria-hidden>
        <div className={styles.gradient} />
        <img
          src={LEAD_WHY_NOW_ASSETS.launchKey}
          alt=""
          className={styles.texture}
        />
      </div>

      <div className={styles.copyBlock}>
        <p className={styles.eyebrow} data-node-id="1822:22941">
          why now
        </p>

        <div
          className={`landing-copy-row ${styles.heroRow}`}
          data-name="Why Now Text"
          data-node-id="1822:22942"
        >
          <LandingHeadingReveal
            as="h2"
            id="lead-why-now-heading"
            className={`${styles.headline} landing-copy-headline`}
            data-node-id="1822:22943"
          >
            <span className={styles.headlineLine}>Start in hours,</span>
            <span className={styles.headlineLine}>not days</span>
          </LandingHeadingReveal>
          <LandingSubheadingReveal
            className={`${styles.description} landing-copy-aside`}
            data-node-id="1822:22944"
          >
            Get started easily with minimal setup and hands-on support to
            explore what AI Agents can unlock for your business.
          </LandingSubheadingReveal>
        </div>
      </div>
    </section>
  );
}
