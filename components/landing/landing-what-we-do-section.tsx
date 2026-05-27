import {
  LandingHeadingReveal,
  LandingSubheadingReveal,
} from "./landing-text-reveal";
import styles from "./landing-what-we-do-section.module.css";

/** Figma 713:895 — The Solution */
export function LandingWhatWeDoSection() {
  return (
    <section
      className={`${styles.section} landing-what-we-do-section`}
      aria-labelledby="landing-solution-heading"
      data-name="What We Do Container"
      data-node-id="713:895"
    >
      <p className={styles.eyebrow} data-node-id="713:896">
        The Solution
      </p>

      <div
        className="landing-copy-row"
        data-name="What We Do Description"
        data-node-id="713:897"
      >
        <LandingHeadingReveal
          id="landing-solution-heading"
          className={`${styles.headline} landing-copy-headline`}
        >
          <span className={styles.headlineLine}>One agent</span>
          <span className={styles.headlineLine}>
            for every <span className={styles.highlight}>GTM team member.</span>
          </span>
        </LandingHeadingReveal>
        <LandingSubheadingReveal
          className={`${styles.description} landing-copy-aside`}
        >
          Layer gives every GTM team member more leverage by shifting
          context-heavy work to agents. Your team spends less time researching,
          preparing, seeking approvals, and documenting and more time creating
          pipeline, advancing deals, serving customers, and driving growth.
        </LandingSubheadingReveal>
      </div>
    </section>
  );
}
