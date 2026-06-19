"use client";

import styles from "./roleplay-hero-section.module.css";
import { useRoleplayMode } from "./roleplay-mode-context";

export function RoleplayModeToggle() {
  const { mode, setMode } = useRoleplayMode();

  return (
    <div className={styles.modeToggle} data-node-id="1088:5188">
      <button
        type="button"
        className={`${styles.modeOption} ${mode === "voice" ? styles.modeOptionActive : styles.modeOptionMuted}`}
        onClick={() => setMode("voice")}
        aria-pressed={mode === "voice"}
        data-node-id="1088:5189"
      >
        <span
          className={`material-symbols-rounded ${styles.modeIcon}`}
          aria-hidden
        >
          volume_up
        </span>
        <span>Voice Roleplay</span>
      </button>
      <button
        type="button"
        className={`${styles.modeOption} ${mode === "video" ? styles.modeOptionActive : styles.modeOptionMuted}`}
        onClick={() => setMode("video")}
        aria-pressed={mode === "video"}
        data-node-id="1088:5192"
      >
        <span
          className={`material-symbols-rounded ${styles.modeIcon}`}
          aria-hidden
        >
          groups
        </span>
        <span>Video Roleplay</span>
      </button>
    </div>
  );
}
