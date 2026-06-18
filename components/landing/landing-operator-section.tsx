import { LandingHeadingReveal, LandingSubheadingReveal } from "./landing-text-reveal";
import styles from "./landing-operator-section.module.css";

const TEAM_PHOTO = "/assets/images/landing/operator/team-photo.png";

/** Figma 713:1104 — Operator Section */
export function LandingOperatorSection() {
  return (
    <section
      className={`${styles.section} landing-operator-section`}
      aria-labelledby="landing-operator-heading"
      data-name="Operator Section"
      data-node-id="713:1104"
    >
      <div className={styles.gradient} data-name="Operator Content" data-node-id="729:1314">
        <div className={styles.main} data-name="Operator Main Content" data-node-id="729:1315">
          <div
            className={`${styles.headerRow} landing-copy-row`}
            data-name="Operator Header"
            data-node-id="729:1316"
          >
            <LandingHeadingReveal
              id="landing-operator-heading"
              className={`${styles.headline} landing-copy-headline`}
            >
              <span className={styles.headlineStack} data-node-id="729:1317">
                <span className={styles.headlineLine}>Built by GTM operators,</span>
                <span className={`${styles.headlineLine} ${styles.strikethrough}`}>
                  not tourists.
                </span>
              </span>
            </LandingHeadingReveal>
            <LandingSubheadingReveal
              className={`${styles.headerDescription} landing-copy-aside`}
              data-node-id="729:1318"
            >
              We have lived the problem. We know the metrics. We understand the
              operating system of a revenue team.
            </LandingSubheadingReveal>
          </div>

          <div className={styles.founderBlock} data-name="Founder Section" data-node-id="729:1319">
            <div className={styles.bio} data-node-id="729:1320">
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
                <span className={styles.bioEmphasis}>, and </span>
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

        <div className={styles.imageBlock} data-name="Frame 1171276700" data-node-id="729:1330">
          <div className={styles.imageClip}>
            <img
              src={TEAM_PHOTO}
              alt="Layer team in London"
              className={styles.teamPhoto}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className={styles.imageFadeTop} aria-hidden data-node-id="729:1331" />
          <div className={styles.imageFadeBottom} aria-hidden data-node-id="729:1456" />
        </div>
      </div>
    </section>
  );
}
