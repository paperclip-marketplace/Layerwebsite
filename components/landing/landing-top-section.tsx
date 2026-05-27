import {
  LandingHeadingReveal,
  LandingSubheadingReveal,
} from "./landing-text-reveal";
import styles from "./landing-top-section.module.css";

/** Figma 713:821 / 713:428 — hero copy above video. */
export function LandingTopSection() {
  return (
    <section
      className={`${styles.section} landing-top-section`}
      aria-labelledby="landing-top-heading"
      data-node-id="713:821"
    >
      <div
        className={`${styles.copyRow} landing-copy-row`}
        data-name="Section Description Container"
        data-node-id="713:428"
      >
        <LandingHeadingReveal
          id="landing-top-heading"
          className={`${styles.headline} landing-copy-headline`}
        >
          <span className={styles.headlineStack} data-node-id="713:429">
            <span className={styles.headlineLine}>Agents for</span>
            <span className={styles.highlight}>revenue teams.</span>
          </span>
        </LandingHeadingReveal>
        <LandingSubheadingReveal
          className={`${styles.description} landing-copy-aside`}
        >
          Move the metrics your tools can only diagnose.
        </LandingSubheadingReveal>
      </div>
    </section>
  );
}
