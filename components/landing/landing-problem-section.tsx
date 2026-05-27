import {
  LandingHeadingReveal,
  LandingSubheadingReveal,
} from "./landing-text-reveal";
import styles from "./landing-problem-section.module.css";

/** Figma 713:851 — Problem Header */
export function LandingProblemSection() {
  return (
    <section
      className={`${styles.section} landing-problem-section`}
      aria-labelledby="landing-problem-heading"
      data-name="Problem Header"
      data-node-id="713:851"
    >
      <p className={styles.eyebrow} data-node-id="713:852">
        the problem
      </p>

      <div
        className="landing-copy-row"
        data-name="Problem Description"
        data-node-id="713:853"
      >
        <LandingHeadingReveal
          id="landing-problem-heading"
          className={`${styles.headline} landing-copy-headline`}
        >
          <span className={styles.headlineLine}>
            The old playbook added visibility –{" "}
          </span>
          <span className={styles.muted}>not leverage.</span>
        </LandingHeadingReveal>
        <LandingSubheadingReveal
          className={`${styles.description} landing-copy-aside`}
        >
          GTM became more measurable and professional. But insight still had to
          become action through people. The role was instrumented, not
          reimagined.{" "}
          <span className={styles.emphasis}>The metrics prove it.</span>
        </LandingSubheadingReveal>
      </div>
    </section>
  );
}
