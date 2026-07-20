import styles from "./success-check-icon.module.css";

type SuccessCheckIconProps = {
  className?: string;
};

/**
 * Figma 1634:9787 — Lottie-style success check (120×120).
 * Soft aura + smaller solid disk + drawn white tick.
 */
export function SuccessCheckIcon({ className }: SuccessCheckIconProps) {
  return (
    <svg
      className={[styles.svg, className].filter(Boolean).join(" ")}
      viewBox="0 0 120 120"
      width="120"
      height="120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Soft pale-green aura (expands once with the mark) */}
      <circle className={styles.aura} cx="60" cy="60" r="48" />
      {/* Thin outer halo ring */}
      <circle className={styles.auraRing} cx="60" cy="60" r="50" />

      {/* Draw ring first (clockwise from 12 o'clock) */}
      <circle className={styles.ring} cx="60" cy="60" r="34" />
      {/* Solid fill — smaller disk than before */}
      <circle className={styles.fill} cx="60" cy="60" r="34" />
      {/* Tick */}
      <path className={styles.check} d="M42 61.5 L53 72.5 L78 45" />
    </svg>
  );
}
