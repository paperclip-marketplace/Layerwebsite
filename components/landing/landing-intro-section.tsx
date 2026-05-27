import {
  LandingHeadingReveal,
  LandingSubheadingReveal,
} from "./landing-text-reveal";
import styles from "./landing-intro-section.module.css";

export function LandingIntroSection() {
  return (
    <section className={styles.section} aria-labelledby="landing-intro-heading">
      <p className={styles.badge}>Agentic GTM Performance Platform</p>

      <div className={styles.content}>
        <LandingHeadingReveal
          id="landing-intro-heading"
          className={styles.headline}
        >
          Every rep. Every call. Every deal.{" "}
          <span className={styles.highlight}>Win more!</span>
        </LandingHeadingReveal>
        <LandingSubheadingReveal className={styles.description}>
          Layer pairs every rep with one AI performance agent trained on your
          playbook, customer context, workflows, and standards.
        </LandingSubheadingReveal>
      </div>
    </section>
  );
}
