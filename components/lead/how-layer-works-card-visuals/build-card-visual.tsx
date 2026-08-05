import { BUILD_CARD_ASSETS } from "./build-card-assets";
import styles from "./build-card-visual.module.css";
import shared from "./card-visuals.module.css";
import { BuildDiscountGovernanceCard } from "./build-discount-governance-card";
import { BuildMeddicCard } from "./build-meddic-card";
import { BuildObjectionCard } from "./build-objection-card";

/** Figma 1822:23896 — Build card visual */
export function BuildCardVisual() {
  return (
    <div className={shared.visual} data-node-id="1822:23896">
      <div className={styles.backdrop} data-node-id="1822:23897" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BUILD_CARD_ASSETS.backdropBg}
          alt=""
          className={styles.backdropImage}
        />
        <div className={styles.backdropGradient} />
      </div>

      <div className={styles.meddicWrap}>
        <BuildMeddicCard />
      </div>

      <div className={styles.objectionWrap}>
        <BuildObjectionCard />
      </div>

      <div className={styles.directiveWrap}>
        <BuildDiscountGovernanceCard />
      </div>

      <div className={styles.bottomFade} aria-hidden data-node-id="1822:23900" />
    </div>
  );
}
