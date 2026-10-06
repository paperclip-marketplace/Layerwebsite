import Image from "next/image";
import { LEAD_HOW_LAYER_WORKS_ASSETS } from "../lead-how-layer-works-assets";
import styles from "./card-visuals.module.css";

/** Figma 1822:23889 — Context card visual */
export function ContextCardVisual() {
  return (
    <div className={styles.visual} data-node-id="1822:23890">
      <div className={styles.contextBackdrop} aria-hidden>
        <Image
          src={LEAD_HOW_LAYER_WORKS_ASSETS.contextBg}
          alt=""
          fill
          className={styles.contextBgImage}
          sizes="560px"
        />
        <div className={styles.contextBgGradient} />
      </div>
      <div className={styles.contextIconsWrap} data-node-id="1822:23891">
        <Image
          src={LEAD_HOW_LAYER_WORKS_ASSETS.contextIcons}
          alt="Connected GTM tools and integrations"
          width={638}
          height={352}
          className={styles.contextIcons}
          sizes="560px"
        />
      </div>
    </div>
  );
}
