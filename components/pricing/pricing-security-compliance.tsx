import Image from "next/image";
import styles from "./pricing-security-compliance.module.css";

const BADGES = [
  {
    id: "soc2",
    src: "/assets/images/landing/footer/soc2.png",
    alt: "AICPA SOC 2",
    crop: false,
  },
  {
    id: "gdpr",
    src: "/assets/images/landing/footer/gdpr.png",
    alt: "GDPR",
    crop: true,
  },
  {
    id: "iso",
    src: "/assets/images/landing/footer/iso.png",
    alt: "ISO 27001 Certified",
    crop: false,
  },
] as const;

/** Figma 2142:21040 — Security and compliance */
export function PricingSecurityCompliance() {
  return (
    <div
      className={styles.card}
      data-name="Security and compliance"
      data-node-id="2142:21040"
    >
      <div className={styles.copy} data-node-id="2142:21089">
        <h3 className={styles.title} data-node-id="2142:21088">
          Security and compliance
        </h3>
        <p className={styles.subtitle} data-node-id="2142:21041">
          Enterprise-grade security and compliance certifications
        </p>
      </div>

      <div className={styles.badges} data-node-id="2142:21090">
        {BADGES.map((badge) => {
          const tooltipId = `pricing-badge-status-${badge.id}`;

          return (
            <div
              key={badge.id}
              className={styles.badgeWrap}
              tabIndex={0}
              aria-describedby={tooltipId}
            >
              <div
                className={
                  badge.crop ? `${styles.badge} ${styles.badgeCrop}` : styles.badge
                }
              >
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  width={80}
                  height={80}
                  className={badge.crop ? styles.badgeImageCrop : styles.badgeImage}
                  sizes="80px"
                />
              </div>
              <div
                id={tooltipId}
                className={styles.tooltip}
                data-node-id="2142:21101"
                role="tooltip"
              >
                <span className={styles.tooltipCaret} aria-hidden>
                  <img
                    src="/assets/images/landing/footer/tooltip-caret.svg"
                    alt=""
                    width={6}
                    height={8}
                    className={styles.tooltipCaretIcon}
                  />
                </span>
                <span className={styles.tooltipLabel} data-node-id="2142:21104">
                  in Progress
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
