import Image from "next/image";
import { EXECUTE_CARD_ASSETS } from "./execute-card-assets";
import { ExecuteNotchDropdown } from "./execute-notch-dropdown";
import styles from "./execute-layer-notch.module.css";

/** Figma 1822:24186 — Layer notch shell (corner vectors + dropdown panel) */
export function ExecuteLayerNotch() {
  return (
    <div className={styles.root} data-name="layer-notch">
      <div className={styles.cornerRight} aria-hidden data-node-id="1822:24187">
        <Image
          src={EXECUTE_CARD_ASSETS.notchVector50}
          alt=""
          fill
          className={styles.cornerImg}
        />
      </div>
      <div className={styles.cornerLeft} aria-hidden data-node-id="1822:24188">
        <div className={styles.cornerLeftInner}>
          <Image
            src={EXECUTE_CARD_ASSETS.notchVector51}
            alt=""
            fill
            className={styles.cornerImg}
          />
        </div>
      </div>

      <div className={styles.panelWrap}>
        <ExecuteNotchDropdown />
      </div>
    </div>
  );
}
