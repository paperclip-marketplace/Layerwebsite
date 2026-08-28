import styles from "./landing-mobile-title-section.module.css";

/** Figma 513:1153 — Section Title Container (mobile only). Layout spacer; label hidden on landing. */
export function LandingMobileTitleSection() {
  return (
    <section
      className={`${styles.section} landing-mobile-title-section`}
      data-name="Section Title Container"
      data-node-id="513:1153"
      aria-hidden="true"
    >
      <p className={styles.text} data-node-id="513:1154">
        Agentic GTM Performance Platform
      </p>
    </section>
  );
}
