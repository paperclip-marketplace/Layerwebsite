import { LandingOptimizedImage } from "./landing-optimized-image";
import styles from "./landing-leadership-image-section.module.css";

const LEADERSHIP_IMAGE = "/assets/images/landing/leadership/control-plane.webp";

/** Figma 713:1069 — hero-ticker / Leadership Image */
export function LandingLeadershipImageSection() {
  return (
    <section
      className={`${styles.section} landing-leadership-image-section`}
      aria-label="Control plane playbooks interface"
      data-name="hero-ticker"
      data-node-id="713:1069"
    >
      <div className={styles.clipArea}>
        <div
          className={styles.imageCenter}
          data-name="Leadership Image"
          data-node-id="713:1070"
        >
          <div
            className={styles.imageCard}
            data-name="Leadership Image"
            data-node-id="713:1071"
          >
            <div className={styles.imageFrame} aria-hidden>
              <div className={styles.imageBackdrop} />
              <div className={styles.imageClip}>
                <LandingOptimizedImage
                  src={LEADERSHIP_IMAGE}
                  alt="Layer control plane playbooks interface showing workflow management"
                  fill
                  className={styles.image}
                  sizes="(max-width: 900px) 100vw, 1200px"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={styles.fadeBottom}
          data-name="Leadership Image Container"
          data-node-id="713:1072"
          aria-hidden
        />
      </div>
    </section>
  );
}
