import styles from "./execute-card-visual.module.css";
import shared from "./card-visuals.module.css";
import { ExecuteDesktopHome } from "./execute-desktop-home";
import { ExecuteLayerNotch } from "./execute-layer-notch";

/** Figma 1822:23958 — Execute card visual (coded desktop + layer notch) */
export function ExecuteCardVisual() {
  return (
    <div className={shared.visual} data-node-id="1822:23958">
      <div className={styles.backdrop} data-node-id="1822:23959" aria-hidden>
        <div className={styles.backdropGrid} />
        <div className={styles.backdropGradient} />
      </div>

      <div className={styles.desktopWrap}>
        <ExecuteDesktopHome />
      </div>

      <div className={styles.notchWrap} data-node-id="1822:24186">
        <ExecuteLayerNotch />
      </div>

      <div className={styles.bottomFade} aria-hidden data-node-id="1822:24237" />
    </div>
  );
}
