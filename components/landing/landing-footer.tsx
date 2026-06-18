"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/config/constants";
import {
  FOOTER_NAV_COLUMNS,
  FOOTER_POLICY_LINKS,
  type FooterNavColumn,
  type FooterNavLink,
} from "@/lib/landing/footer-nav";
import { requestHeaderDropdown } from "@/lib/landing/header-dropdown";
import styles from "./landing-footer.module.css";

const LOGO_MARK = "/assets/images/landing/layer-mark.svg";
const LOGO_WORDMARK = "/assets/images/landing/layer-wordmark.svg";

function scrollToOurStory() {
  document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" });
}

function FooterNavLinkItem({
  item,
  onOurStoryClick,
}: {
  item: FooterNavLink;
  onOurStoryClick?: () => void;
}) {
  if (item.href === ROUTES.ourStory) {
    return (
      <Link
        href={item.href}
        className={styles.navLink}
        onClick={(event) => {
          if (onOurStoryClick) {
            event.preventDefault();
            onOurStoryClick();
          }
        }}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <Link href={item.href} className={styles.navLink}>
      {item.label}
    </Link>
  );
}

function FooterNavColumnBlock({
  column,
  onOurStoryClick,
}: {
  column: FooterNavColumn;
  onOurStoryClick?: () => void;
}) {
  return (
    <div className={styles.navColumn} data-name="Contact Info Column">
      {column.dropdown ? (
        <button
          type="button"
          className={styles.sectionHeader}
          onClick={() => requestHeaderDropdown(column.dropdown!)}
        >
          {column.title}
        </button>
      ) : (
        <div className={styles.sectionHeader}>{column.title}</div>
      )}

      <div className={styles.navItems} data-name="Contact Summary Container">
        {column.items.map((item) => (
          <FooterNavLinkItem
            key={item.label}
            item={item}
            onOurStoryClick={onOurStoryClick}
          />
        ))}
      </div>
    </div>
  );
}

export function LandingFooter() {
  const pathname = usePathname();
  const isHome = pathname === ROUTES.home;

  return (
    <footer
      className={styles.section}
      data-node-id="1089:5810"
      data-name="Footer"
    >
      <div
        className={`${styles.content} landing-shell-x`}
        data-node-id="1031:6390"
        data-name="Footer Content"
      >
        <div className={styles.card} data-node-id="1031:6391" data-name="Footer Main">
          <div className={styles.topRow} data-node-id="1310:2151" data-name="Info Sections">
            <div
              className={styles.logoColumn}
              data-node-id="1310:2152"
              data-name="Info Text Container"
            >
              <Link href="/" className={styles.logoLink} aria-label="Layer home">
                <span className={styles.logo} data-node-id="1310:2153" data-name="logo">
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
            </div>

            <nav className={styles.navColumns} aria-label="Footer">
              {FOOTER_NAV_COLUMNS.map((column) => (
                <FooterNavColumnBlock
                  key={column.title}
                  column={column}
                  onOurStoryClick={isHome ? scrollToOurStory : undefined}
                />
              ))}
            </nav>
          </div>

          <div className={styles.bottomRow} data-node-id="1310:2180">
            <p className={styles.copyright} data-node-id="1310:2181">
              Ⓒ 2026 Layer AI Systems Ltd. All rights reserved.
            </p>
            <div className={styles.legalLinks} data-node-id="1310:2182">
              {FOOTER_POLICY_LINKS.map((item) => (
                <Link key={item.label} href={item.href} className={styles.legalLink}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
