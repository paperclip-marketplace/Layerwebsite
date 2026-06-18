import { LandingHeadingReveal, LandingSubheadingReveal } from "@/components/landing/landing-text-reveal";
import styles from "./pricing-hero-section.module.css";

export function PricingHeroSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="pricing-hero-heading"
      data-node-id="336:1755"
    >
      <p className={styles.badge}>Layer Pricing</p>

      <div className={`landing-copy-row ${styles.content}`}>
        <LandingHeadingReveal
          as="h1"
          id="pricing-hero-heading"
          className={`landing-copy-headline ${styles.headline}`}
        >
          Pricing built around{" "}
          <span className={styles.highlight}>GTM performance</span>, not seats.
        </LandingHeadingReveal>
        <LandingSubheadingReveal
          className={`landing-copy-aside ${styles.description}`}
        >
          Start with unlimited users, agents, and 1,000 monthly credits.
          Scale with expert-led context-layer curation, agent configuration, and
          GTM operating support from Layer&apos;s architects and operators.
        </LandingSubheadingReveal>
      </div>
    </section>
  );
}
