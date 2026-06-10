import { OurClientLogosTicker } from "@/components/landing/our-client-logos-ticker";
import styles from "./personal-agent-logos-section.module.css";

export function PersonalAgentLogosSection() {
  return (
    <section
      className={`${styles.section} landing-full-bleed-strokes`}
      aria-labelledby="personal-agent-clients-heading"
      data-node-id="1091:5915"
    >
      <div className={styles.copyRow} data-node-id="1091:5916">
        <p
          id="personal-agent-clients-heading"
          className={styles.copy}
          data-node-id="1091:5917"
        >
          Layer works with some of the most forward-thinking GTM teams in the
          world, including:
        </p>
      </div>

      <OurClientLogosTicker />
    </section>
  );
}
