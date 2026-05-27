import styles from "./landing-mobile-title-section.module.css";

/** Figma 513:1153 — Section Title Container (mobile only). */
export function LandingMobileTitleSection() {
  return (
    <section
      className={`${styles.section} landing-mobile-title-section`}
      data-name="Section Title Container"
      data-node-id="513:1153"
      aria-label="Product category"
    >
      <p className={styles.text} data-node-id="513:1154">
        Agentic GTM Performance Platform
      </p>
    </section>
  );
}
