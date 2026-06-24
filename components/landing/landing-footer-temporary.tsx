import Image from "next/image";
import Link from "next/link";
import { FOOTER_POLICY_LINKS } from "@/lib/landing/footer-nav";
import styles from "./landing-footer-temporary.module.css";

const LOGO_MARK = "/assets/images/landing/layer-mark.svg";
const LOGO_WORDMARK = "/assets/images/landing/layer-wordmark.svg";

/** Figma 1494:2745 — compact temporary footer (logo + copyright + policy links). */
export function LandingFooterTemporary() {
  return (
    <footer
      className={styles.section}
      data-node-id="1494:2744"
      data-name="Footer"
    >
      <div
        className={`${styles.gutter} landing-page-gutter`}
        data-node-id="1494:2744"
        data-name="Footer Content"
      >
        <div className={styles.card} data-node-id="1494:2745" data-name="Footer Main">
          <div className={styles.row} data-node-id="1494:2826">
            <Link href="/" className={styles.logoLink} aria-label="Layer home">
              <span className={styles.logo} data-node-id="1494:2827" data-name="logo">
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

            <div className={styles.divider} aria-hidden data-node-id="1494:2828" />

            <div className={styles.meta} data-node-id="1494:2845">
              <p className={styles.copyright} data-node-id="1494:2846">
                Ⓒ 2026 Layer AI Systems Ltd. All rights reserved.
              </p>
              <div className={styles.legalLinks} data-node-id="1494:2847">
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
        </div>
      </div>
    </footer>
  );
}
