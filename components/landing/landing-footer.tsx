import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/config/constants";
import styles from "./landing-footer.module.css";

const LOGO_MARK = "/assets/images/landing/layer-mark.svg";
const LOGO_WORDMARK = "/assets/images/landing/layer-wordmark.svg";

const PRIMARY_NAV_COLUMNS = [
  [
    { label: "Products", href: ROUTES.productsRoleplay },
    { label: "Solutions", href: "#" },
  ],
  [
    { label: "Pricing", href: ROUTES.pricing },
    { label: "Our Story", href: "#" },
  ],
] as const;

const POLICY_LINKS = [
  { label: "Privacy Policy", href: ROUTES.privacy },
  { label: "Terms of Services", href: ROUTES.terms },
  { label: "Cookie Policy", href: "#" },
] as const;

export function LandingFooter() {
  return (
    <footer
      className={`${styles.section} landing-shell-x`}
      data-node-id="1089:5810"
      data-name="Footer"
    >
      <div className={styles.content} data-node-id="1031:6390" data-name="Footer Content">
        <div className={styles.card} data-node-id="1031:6391" data-name="Footer Main">
          <div className={styles.topRow} data-node-id="1031:6392" data-name="Info Sections">
            <div
              className={styles.logoColumn}
              data-node-id="1031:6393"
              data-name="Info Text Container"
            >
              <Link href="/" className={styles.logoLink} aria-label="Layer home">
                <span className={styles.logo} data-node-id="1031:6394" data-name="logo">
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
              data-node-id="1031:6395"
              data-name="Contacts Section"
            >
              <div
                className={styles.navPrimary}
                data-node-id="1031:6396"
                data-name="Contact Info Container"
              >
                {PRIMARY_NAV_COLUMNS.map((column, columnIndex) => (
                  <div
                    key={columnIndex}
                    className={styles.navColumn}
                    data-name="Contact Info Column"
                  >
                    {column.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={styles.linkPrimary}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              <div
                className={styles.navSecondary}
                data-node-id="1031:6403"
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

          <p className={styles.copyright} data-node-id="1031:6407">
            Ⓒ 2026 Layer AI Systems Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
