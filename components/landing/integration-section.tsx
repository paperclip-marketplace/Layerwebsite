import styles from "./integration-section.module.css";
import { IntegrationLogosMarquee } from "./integration-logos-marquee";

export function IntegrationSection() {
  return (
    <section
      className={`${styles.section} landing-integration-section landing-band-left`}
      aria-labelledby="integration-section-heading"
      data-name="Forward Thinking Logos Container"
      data-node-id="729:1389"
      data-integration-marquee-section
    >
      <div
        className={styles.copyRow}
        data-name="Frame 1171276682"
        data-node-id="513:1688"
      >
        <p
          id="integration-section-heading"
          className={styles.copy}
          data-node-id="513:1689"
        >
          Agents live in and are powered by your existing stack:
        </p>
      </div>

      <IntegrationLogosMarquee />

      <div className={styles.moreRow} data-node-id="729:1434">
        <p className={styles.more} data-node-id="729:1435">
          &amp; 600+ more
        </p>
      </div>
    </section>
  );
}
