import { LandingHeadingReveal } from "./landing-text-reveal";
import styles from "./landing-why-now-section.module.css";

/** Figma 713:1057 — Why Now */
export function LandingWhyNowSection() {
  return (
    <section
      className={`${styles.section} landing-why-now-section`}
      aria-labelledby="landing-why-now-heading"
      data-name="Why Now"
      data-node-id="713:1057"
    >
      <div className={styles.copyBlock} data-node-id="713:1059">
        <p className={styles.eyebrow} data-node-id="713:1058">
          why now
        </p>

        <div
          className={`landing-copy-row ${styles.heroRow}`}
          data-name="Why Now Text"
        >
          <LandingHeadingReveal
            id="landing-why-now-heading"
            className={`${styles.headline} landing-copy-headline`}
          >
            The era of unassisted GTM is ending.
          </LandingHeadingReveal>
          <p className={`${styles.description} landing-copy-aside`} data-node-id="713:1061">
            The first wave of AI automated tasks. The next wave improves
            performance. Revenue work is too human to automate blindly, but too
            important to leave unsupported.
          </p>
        </div>
      </div>

      <p className={styles.footer} data-node-id="713:1062">
        <span className={styles.footerMuted}>Layer agents </span>
        <span className={styles.footerEmphasis}>give revenue leaders</span>
        <span className={styles.footerMuted}> the leverage they never had, </span>
        <span className={styles.footerEmphasis}>
          every call supported, every interaction coached,
        </span>
        <span className={styles.footerMuted}> and </span>
        <span className={styles.footerEmphasis}>
          every team member backed by agents
        </span>
        <span className={styles.footerMuted}> that </span>
        <span className={styles.footerEmphasis}>
          source, prepare, practice, perform, and follow up.
        </span>
      </p>
    </section>
  );
}
