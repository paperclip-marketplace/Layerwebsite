import styles from "./our-client-section.module.css";
import { OurClientLogosTicker } from "./our-client-logos-ticker";

export function OurClientSection() {
  return (
    <section
      className={`${styles.section} landing-clients-section landing-band-left`}
      aria-labelledby="our-clients-heading"
      data-name="Forward Thinking Logos Container"
      data-node-id="713:438"
    >
      <div
        className={styles.copyRow}
        data-name="Frame 1171276682"
        data-node-id="513:1195"
      >
        <p
          id="our-clients-heading"
          className={styles.copy}
          data-node-id="513:1196"
        >
          Trusted By Leading B2B Revenue Teams
        </p>
      </div>

      <OurClientLogosTicker />
    </section>
  );
}
