import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/config/constants";
import styles from "./landing-footer.module.css";

const LOGO_MARK = "/assets/images/landing/layer-mark.svg";
const LOGO_WORDMARK = "/assets/images/landing/layer-wordmark.svg";

const POLICY_LINKS = [
  { label: "Privacy Policy", href: ROUTES.privacy },
  { label: "Terms of Services", href: ROUTES.terms },
  { label: "Cookie Policy", href: "#" },
] as const;

export function LandingFooter() {
  return (
    <footer className={`${styles.section} landing-shell-x`} data-name="Footer Content">
      <div className={styles.card} data-name="Footer Main">
        <div className={styles.topRow} data-name="Info Sections">
          <div className={styles.logoColumn} data-name="Info Text Container">
            <Link href="/" className={styles.logoLink} aria-label="Layer home">
              <span className={styles.logo} data-name="logo">
                <Image
                  src={LOGO_MARK}
                  alt=""
                  width={73}
                  height={54}
                  className={styles.logoMark}
                />
                <Image
                  src={LOGO_WORDMARK}
                  alt=""
                  width={131}
                  height={47}
                  className={styles.logoWordmark}
                />
              </span>
            </Link>
          </div>

          <nav
            className={styles.nav}
            aria-label="Footer"
            data-name="Contacts Section"
          >
            <div className={styles.navPrimary} data-name="Contact Info Container">
              <Link href={ROUTES.pricing} className={styles.linkPrimary}>
                Pricing
              </Link>
            </div>
            <div
              className={styles.navSecondary}
              data-name="Contact Summary Container"
            >
              {POLICY_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={styles.linkSecondary}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <p className={styles.copyright}>
          Ⓒ 2026 Layer Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
