import { IntegrationLogosMarquee } from "@/components/landing/integration-logos-marquee";
import styles from "./personal-agent-integrations-section.module.css";

export function PersonalAgentIntegrationsSection() {
  return (
    <section
      className={`${styles.section} landing-full-bleed-strokes landing-full-bleed-strokes-top`}
      aria-labelledby="personal-agent-integrations-heading"
      data-node-id="1091:5999"
    >
      <div className={styles.copyRow} data-node-id="1091:6000">
        <p
          id="personal-agent-integrations-heading"
          className={styles.copy}
          data-node-id="1091:6001"
        >
          Agents live in and are powered by your existing stack:
        </p>
      </div>

      <IntegrationLogosMarquee />

      <div className={styles.moreRow} data-node-id="1091:6013">
        <p className={styles.moreCopy} data-node-id="1091:6014">
          & 600+ more
        </p>
      </div>
    </section>
  );
}
