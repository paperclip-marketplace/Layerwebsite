import {
  LandingHeadingReveal,
  LandingSubheadingReveal,
} from "@/components/landing/landing-text-reveal";
import { MOLTEN_FOUNDER_SUPPORT_ASSETS } from "./molten-founder-support-assets";
import {
  MOLTEN_PARTNER,
  type PartnerPageConfig,
} from "./partner-pages";
import styles from "./molten-founder-support-section.module.css";

/** Figma 2406:3300 — Founder support / Why Now band. */
export function MoltenFounderSupportSection({
  partner = MOLTEN_PARTNER,
}: {
  partner?: PartnerPageConfig;
}) {
  return (
    <section
      className={`${styles.section} landing-band-left molten-founder-support-section landing-full-bleed-strokes`}
      aria-labelledby="molten-founder-support-heading"
      data-node-id="2406:3300"
      data-name="Why Now"
    >
      <div className={styles.backdrop} aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MOLTEN_FOUNDER_SUPPORT_ASSETS.background}
          alt=""
          className={styles.backdropImage}
        />
      </div>

      <div className={`${styles.copyBlock} molten-founder-support-copy`}>
        <p className={styles.eyebrow} data-node-id="2406:3301">
          founder support
        </p>

        <div
          className={`landing-copy-row ${styles.heroRow}`}
          data-node-id="2406:3302"
          data-name="Why Now Text"
        >
          <LandingHeadingReveal
            as="h2"
            id="molten-founder-support-heading"
            className={`${styles.headline} landing-copy-headline`}
            data-node-id="2406:3303"
          >
            <span className={styles.headlineStrike}>
              Not another subscription.
            </span>
            <span className={styles.headlinePrimary}>A real partner!</span>
          </LandingHeadingReveal>
          <LandingSubheadingReveal
            className={`${styles.description} landing-copy-aside`}
            data-node-id="2406:3304"
          >
            Early-stage {partner.companyName} portfolio companies get three months
            of Layer access, up to 5,000 monthly credits, and hands-on support.
          </LandingSubheadingReveal>
        </div>
      </div>
    </section>
  );
}
