import Image from "next/image";
import { EXECUTE_CARD_ASSETS } from "./execute-card-assets";
import styles from "./execute-desktop-home.module.css";

/** Figma 1822:23960 / 1822:23961 — macOS home wallpaper */
export function ExecuteDesktopHome() {
  return (
    <div className={styles.home} data-node-id="1822:23960">
      <div className={styles.wallpaper} aria-hidden data-name="wallpaper/bg">
        <div className={styles.wallpaperMainLayer} data-name="Main">
          <Image
            src={EXECUTE_CARD_ASSETS.wallpaperMain}
            alt=""
            fill
            className={styles.wallpaperImg}
            aria-hidden
            priority
          />
        </div>
        <div className={styles.wallpaperTopRightLayer} data-name="Top Right Corner">
          <Image
            src={EXECUTE_CARD_ASSETS.wallpaperTopRight}
            alt=""
            fill
            className={styles.wallpaperImg}
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
