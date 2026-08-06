import { IMPROVE_CARD_ASSETS } from "./improve-card-assets";
import styles from "./improve-card-visual.module.css";

/** Improve card visual — flat composite (call UI + coaching card) */
export function ImproveCardVisual() {
  return (
    <div className={styles.root} data-node-id="1822:24327">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMPROVE_CARD_ASSETS.composite}
        alt=""
        className={styles.composite}
        width={724}
        height={560}
        decoding="async"
      />
    </div>
  );
}
