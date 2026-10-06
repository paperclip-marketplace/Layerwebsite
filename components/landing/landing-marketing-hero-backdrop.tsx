import {
  MARKETING_HERO_BACKDROP_ASSETS,
  type MarketingHeroBackdropVariant,
} from "./marketing-hero-backdrop-assets";
import styles from "./landing-marketing-hero-backdrop.module.css";

type LandingMarketingHeroBackdropProps = {
  className?: string;
  /** Figma node id for the bg layer when known */
  dataNodeId?: string;
  variant?: MarketingHeroBackdropVariant;
};

/**
 * Grid + animated bottom mesh glow used on Contact, Lead capture, and Molten heroes.
 * Figma 1634:8734 (contact), 1822:22351 (lead), 2406:3264 (molten).
 */
export function LandingMarketingHeroBackdrop({
  className,
  dataNodeId = "1634:8734",
  variant = "default",
}: LandingMarketingHeroBackdropProps) {
  const glowSrc =
    variant === "notion"
      ? MARKETING_HERO_BACKDROP_ASSETS.notionBottomGlow
      : variant === "inflexion"
        ? MARKETING_HERO_BACKDROP_ASSETS.inflexionBottomGlow
        : variant === "molten"
          ? MARKETING_HERO_BACKDROP_ASSETS.moltenBottomGlow
          : MARKETING_HERO_BACKDROP_ASSETS.bottomGlow;
  const variantClass =
    variant === "molten" || variant === "notion" || variant === "inflexion"
      ? styles.backdropMolten
      : undefined;

  return (
    <div
      className={[styles.backdrop, variantClass, className].filter(Boolean).join(" ")}
      aria-hidden
      data-node-id={dataNodeId}
      data-name="bg"
    >
      <div className={styles.backdropWhite} />
      <div className={styles.bottomEllipse}>
        <div className={styles.bottomEllipsePulse}>
          <div className={styles.bottomEllipseFlow}>
            <img
              src={glowSrc}
              alt=""
              className={styles.bottomEllipseSvg}
            />
            <img
              src={glowSrc}
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
      {/* Figma 2406:3298 / 2467:3262 — white fade over mesh + grid */}
      <div className={styles.backdropWhiteFade} aria-hidden />
    </div>
  );
}
