import { OurClientLogosTicker } from "@/components/landing/our-client-logos-ticker";
import styles from "./roleplay-logos-section.module.css";

export function RoleplayLogosSection() {
  return (
    <section
      className={`${styles.section} landing-clients-section landing-band-left`}
      aria-labelledby="roleplay-clients-heading"
      data-node-id="1088:4217"
    >
      <div className={styles.copyRow} data-node-id="1088:4218">
        <p id="roleplay-clients-heading" className={styles.copy} data-node-id="1088:4219">
          Layer works with some of the most forward-thinking GTM teams in the
          world, including:
        </p>
      </div>

      <OurClientLogosTicker />
    </section>
  );
}
