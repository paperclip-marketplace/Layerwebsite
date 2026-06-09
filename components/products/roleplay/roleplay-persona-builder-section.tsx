import { ROLEPLAY_ASSETS } from "./roleplay-assets";
import styles from "./roleplay-persona-builder-section.module.css";

export function RoleplayPersonaBuilderSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="roleplay-persona-heading"
      data-node-id="1089:5531"
    >
      <div className={styles.header} data-node-id="1089:5532">
        <p className={styles.eyebrow} data-node-id="1089:5533">
          persona builder
        </p>
        <div
          className="landing-copy-row"
          data-node-id="1089:5534"
        >
          <h2
            id="roleplay-persona-heading"
            className={`${styles.headline} landing-copy-headline`}
            data-node-id="1089:5535"
          >
            <span className={styles.headlineLine}>Simple, functional </span>
            <span className={`${styles.headlineLine} ${styles.highlight}`}>
              and straightforward
            </span>
          </h2>
          <p
            className={`${styles.aside} landing-copy-aside`}
            data-node-id="1089:5536"
          >
            Set what agents know, how they behave, and what actions they can
            take.
          </p>
        </div>
      </div>

      <div className={styles.showcase} data-node-id="1089:5537" data-name="hero-ticker">
        <div className={styles.imageCenter} data-node-id="1089:5538">
          <div className={styles.imageCard} data-node-id="1089:5539">
            <div className={styles.imageFrame} aria-hidden>
              <div className={styles.imageBackdrop} />
              <div className={styles.imageClip}>
                <img
                  src={ROLEPLAY_ASSETS.personaBuilder}
                  alt="Layer persona builder interface"
                  className={styles.image}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={styles.fadeBottom}
          data-node-id="1089:5540"
          aria-hidden
        />
      </div>
    </section>
  );
}
