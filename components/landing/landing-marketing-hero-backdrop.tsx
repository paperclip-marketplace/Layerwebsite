import { MARKETING_HERO_BACKDROP_ASSETS } from "./marketing-hero-backdrop-assets";
import styles from "./landing-marketing-hero-backdrop.module.css";

type LandingMarketingHeroBackdropProps = {
  className?: string;
  /** Figma node id for the bg layer when known */
  dataNodeId?: string;
};

/**
 * Grid + animated bottom mesh glow used on Contact, Lead capture, and Molten heroes.
 * Figma 1634:8734 (contact), 1822:22351 (lead), 2406:3264 (molten).
 */
export function LandingMarketingHeroBackdrop({
  className,
  dataNodeId = "1634:8734",
}: LandingMarketingHeroBackdropProps) {
  return (
    <div
      className={[styles.backdrop, className].filter(Boolean).join(" ")}
      aria-hidden
      data-node-id={dataNodeId}
      data-name="bg"
    >
      <div className={styles.backdropWhite} />
      <div className={styles.bottomEllipse}>
        <div className={styles.bottomEllipsePulse}>
          <div className={styles.bottomEllipseFlow}>
            <img
              src={MARKETING_HERO_BACKDROP_ASSETS.bottomGlow}
              alt=""
              className={styles.bottomEllipseSvg}
            />
            <img
              src={MARKETING_HERO_BACKDROP_ASSETS.bottomGlow}
              alt=""
              className={styles.bottomEllipseSvg}
              aria-hidden
            />
          </div>
        </div>
      </div>
      <div className={styles.backdropGrid} data-node-id="1634:8737">
        <div className={styles.backdropGridV} />
        <div className={styles.backdropGridH} />
      </div>
    </div>
  );
}
