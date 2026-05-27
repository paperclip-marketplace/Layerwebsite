import styles from "./landing-hero-section.module.css";
import { HeroVideoPlayer } from "./hero-video-player";

/** Figma 713:825 — hero video and supporting copy. */
export function LandingHeroSection() {
  return (
    <section
      className={`${styles.section} landing-hero-section`}
      aria-label="Product overview"
      data-node-id="713:825"
    >
      <div
        className={`${styles.innerShell} landing-hero-section__inner`}
        data-name="Frame 1171276683"
      >
        <div className={styles.imageShell} data-name="Hero Image Container">
          <div className={styles.imageFrame} data-name="Hero Video">
            <HeroVideoPlayer />
          </div>
        </div>

        <p className={styles.caption} data-node-id="713:831">
          Layer agents are trained on your playbooks and customer context,
          connected to your existing tools, deployed where your team already
          works, helping them source, prepare, perform live, and follow up.
        </p>
      </div>
    </section>
  );
}
