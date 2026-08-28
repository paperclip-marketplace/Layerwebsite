import { LandingOptimizedImage } from "./landing-optimized-image";
import { LandingHeadingReveal, LandingSubheadingReveal } from "./landing-text-reveal";
import { LandingOperatorTexture } from "./landing-operator-texture";
import styles from "./landing-operator-section.module.css";

const SKY_BG = "/assets/images/landing/operator/landing-filler-background.webp";

/** Figma 2135:20307 — Operator Content */
export function LandingOperatorSection() {
  return (
    <section
      className={`${styles.section} landing-operator-section`}
      aria-labelledby="landing-operator-heading"
      data-name="Operator Content"
      data-node-id="2135:20307"
    >
      <div className={styles.bg} aria-hidden>
        <LandingOptimizedImage
          src={SKY_BG}
          alt=""
          fill
          className={styles.bgImage}
          sizes="100vw"
          quality={90}
        />
      </div>
      <LandingOperatorTexture />

      <div
        className={styles.main}
        data-name="Operator Main Content"
        data-node-id="2135:20308"
      >
        <div
          className={`${styles.headerRow} landing-copy-row`}
          data-name="Operator Header"
          data-node-id="2135:20309"
        >
          <LandingHeadingReveal
            id="landing-operator-heading"
            className={`${styles.headline} landing-copy-headline`}
          >
            <span className={styles.headlineStack} data-node-id="2135:20310">
              <span className={styles.headlineLine}>Built by GTM operators,</span>
              <span className={`${styles.headlineLine} ${styles.strikethrough}`}>
                not tourists.
              </span>
            </span>
          </LandingHeadingReveal>
          <LandingSubheadingReveal
            className={`${styles.headerDescription} landing-copy-aside`}
            data-node-id="2135:20311"
          >
            We have lived the problem. We know the metrics. We understand the
            operating system of a revenue team.
          </LandingSubheadingReveal>
        </div>

        <div
          className={styles.founderBlock}
          data-name="Founder Section"
          data-node-id="2135:20312"
        >
          <div className={styles.bio} data-node-id="2135:20313">
            <p className={styles.bioParagraph}>
              <span className={styles.bioMuted}>Layer is founded by </span>
              <span className={styles.bioLink}>Even Walser</span>
              <span className={styles.bioMuted}>, former</span>
              <span className={styles.bioEmphasis}> CRO at </span>
              <span className={styles.bioLink}>GoCardless</span>
              <span className={styles.bioEmphasis}>, </span>
              <span className={styles.bioLink}>Decibel</span>
              <span className={styles.bioEmphasis}>, </span>
              <span className={styles.bioLink}>Brandwatch</span>
              <span className={styles.bioEmphasis}>, </span>
              <span className={styles.bioMuted}>and</span>
              <span className={styles.bioEmphasis}> </span>
              <span className={styles.bioLink}>Topsy</span>
              <span className={styles.bioEmphasis}>.</span>
            </p>
            <p className={styles.bioParagraph}>
              <span className={styles.bioMuted}>
                Even has scaled software companies from{" "}
              </span>
              <span className={styles.bioEmphasis}>zero to $180M ARR,</span>
              <span className={styles.bioMuted}> helped raise over </span>
              <span className={styles.bioEmphasis}>$550M,</span>
              <span className={styles.bioMuted}> and </span>
              <span className={styles.bioEmphasis}>
                built GTM teams across North America, Europe, and Australia.{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
