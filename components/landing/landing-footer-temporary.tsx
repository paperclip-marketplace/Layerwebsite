import Image from "next/image";
import Link from "next/link";
import { FOOTER_POLICY_LINKS } from "@/lib/landing/footer-nav";
import styles from "./landing-footer-temporary.module.css";

const LOGO_MARK = "/assets/images/landing/layer-mark.svg";
const LOGO_WORDMARK = "/assets/images/landing/layer-wordmark.svg";

const FOOTER_BADGES = [
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

/** Figma 2135:20367 — compact footer (logo + tagline + badges + policy links). */
export function LandingFooterTemporary() {
  return (
    <footer
      className={styles.section}
      data-node-id="2135:20367"
      data-name="Footer Content"
    >
      <div className={styles.card} data-node-id="2135:20368" data-name="Footer Main">
        <div
          className={styles.info}
          data-node-id="2135:20369"
          data-name="Info Text Container"
        >
          <div className={styles.topRow} data-node-id="2135:20370">
            <div className={styles.brand} data-node-id="2135:20371">
              <Link href="/" className={styles.logoLink} aria-label="Layer home">
                <span className={styles.logo} data-node-id="2135:20372" data-name="logo">
                  <Image
                    src={LOGO_MARK}
                    alt=""
                    width={34}
                    height={25}
                    className={styles.logoMark}
                  />
                  <Image
                    src={LOGO_WORDMARK}
                    alt=""
                    width={61}
                    height={22}
                    className={styles.logoWordmark}
                  />
                </span>
              </Link>
              <p className={styles.tagline} data-node-id="2135:20374">
                Agents for revenue teams. Made in London for the whole world.
              </p>
            </div>

            <div className={styles.badges} data-node-id="2135:20375">
              {FOOTER_BADGES.map((badge) => {
                const tooltipId = `footer-badge-status-${badge.id}`;

                return (
                  <div
                    key={badge.src}
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
                        width={54}
                        height={54}
                        className={badge.crop ? styles.badgeImageCrop : styles.badgeImage}
                        sizes="54px"
                      />
                    </div>
                    <div
                      id={tooltipId}
                      className={styles.tooltip}
                      data-node-id="2135:20635"
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
                      <span className={styles.tooltipLabel} data-node-id="2135:20637">
                        In Progress
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.bottomRow} data-node-id="2135:20380">
          <p className={styles.copyright} data-node-id="2135:20381">
            Ⓒ 2026 Layer AI Systems Ltd. All rights reserved.
          </p>
          <div className={styles.legalLinks} data-node-id="2135:20382">
            {FOOTER_POLICY_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={styles.legalLink}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
