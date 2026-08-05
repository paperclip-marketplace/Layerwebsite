import shared from "./card-visuals.module.css";
import { IMPROVE_CARD_ASSETS } from "./improve-card-assets";
import styles from "./improve-card-visual.module.css";

/** Figma 1822:24327 — Improve card visual (backdrop + call UI + scorecard) */
export function ImproveCardVisual() {
  return (
    <div className={shared.visual} data-node-id="1822:24327">
      <div className={styles.backdrop} data-node-id="1822:24328" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMPROVE_CARD_ASSETS.backdropBg}
          alt=""
          className={styles.backdropImage}
        />
      </div>

      {/* 1822:24329 — call group */}
      <div
        className={styles.callOuter}
        data-node-id="1822:24330"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMPROVE_CARD_ASSETS.callShadowOuter}
          alt=""
          className={styles.layerImage}
        />
      </div>

      <div className={styles.callUi} data-node-id="1822:24332" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMPROVE_CARD_ASSETS.callUi}
          alt=""
          className={styles.callImage}
        />
      </div>

      <div
        className={styles.callInner}
        data-node-id="1822:24333"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMPROVE_CARD_ASSETS.callShadowInner}
          alt=""
          className={styles.layerImage}
        />
      </div>

      {/* 1822:24335 — scorecard group */}
      <div className={styles.scorecardWrap} data-node-id="1822:24336">
        <div className={styles.scorecardRotate}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMPROVE_CARD_ASSETS.scorecard}
            alt=""
            className={styles.scorecardImage}
          />
        </div>
      </div>

      <div className={styles.bottomFade} aria-hidden data-node-id="1822:24334" />
    </div>
  );
}
