import {
  LandingHeadingReveal,
  LandingSubheadingReveal,
} from "./landing-text-reveal";
import styles from "./landing-leadership-control-section.module.css";

/** Figma 713:1064 — Leadership Control Section Title */
export function LandingLeadershipControlSection() {
  return (
    <section
      className={`${styles.section} landing-leadership-control-section`}
      aria-labelledby="landing-leadership-control-heading"
      data-name="Leadership Control Section Title"
      data-node-id="713:1064"
    >
      <p className={styles.eyebrow} data-node-id="713:1065">
        Leadership control
      </p>

      <div
        className="landing-copy-row"
        data-name="Leadership behavioral Description"
        data-node-id="713:1066"
      >
        <LandingHeadingReveal
          id="landing-leadership-control-heading"
          className={`${styles.headline} landing-copy-headline`}
        >
          <span className={styles.headlineLine}>
            Leadership defines the standard.{" "}
            <span className={styles.highlight}>Agents reinforce</span>
          </span>
          <span className={`${styles.headlineLine} ${styles.highlight}`}>
            it at every touchpoint.
          </span>
        </LandingHeadingReveal>
        <LandingSubheadingReveal
          className={`${styles.description} landing-copy-aside`}
        >
          Set what agents know, how they behave, and what actions they can take.
        </LandingSubheadingReveal>
      </div>
    </section>
  );
}
