import { PERSONAL_AGENT_ASSETS } from "./personal-agent-assets";
import styles from "./personal-agent-why-now-section.module.css";

export function PersonalAgentWhyNowSection() {
  return (
    <section
      className={`${styles.section} personal-agent-why-now-section landing-full-bleed-strokes`}
      aria-labelledby="personal-agent-why-now-heading"
      data-node-id="1091:5956"
    >
      <div className={styles.backdrop} aria-hidden>
        <div className={styles.gradient} />
        <img
          src={PERSONAL_AGENT_ASSETS.whyNowTexture}
          alt=""
          className={styles.texture}
        />
      </div>

      <div className={styles.copyBlock}>
        <p className={styles.eyebrow} data-node-id="1091:5957">
          why now
        </p>

        <div className="landing-copy-row" data-node-id="1091:5958">
          <h2
            id="personal-agent-why-now-heading"
            className={`${styles.headline} landing-copy-headline`}
            data-node-id="1091:5959"
          >
            <span className={styles.headlineLine}>Start in days,</span>
            <span className={styles.headlineLine}>not months</span>
          </h2>
          <p
            className={`${styles.aside} landing-copy-aside`}
            data-node-id="1091:5960"
          >
            Get started easily with minimal setup and hands-on support to explore
            what AI Agents can unlock for your business.
          </p>
        </div>
      </div>
    </section>
  );
}
