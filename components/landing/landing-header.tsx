"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ROUTES } from "@/lib/config/constants";
import styles from "./landing-header.module.css";

const LOGO_MARK = "/assets/images/landing/layer-mark.svg";
const LOGO_WORDMARK = "/assets/images/landing/layer-wordmark.svg";

export function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className={styles.header} role="banner">
      <div className="landing-page-gutter">
        <div
          className={styles.headerInner}
          data-name="Header"
          data-node-id="713:740"
        >
        <Link
          href="/"
          className={styles.logoLink}
          aria-label="Layer home"
          onClick={() => setMenuOpen(false)}
        >
          <span className={styles.logo}>
            <Image
              src={LOGO_MARK}
              alt=""
              width={34}
              height={25}
              className={styles.logoMark}
              priority
            />
            <Image
              src={LOGO_WORDMARK}
              alt=""
              width={61}
              height={22}
              className={styles.logoWordmark}
              priority
            />
          </span>
        </Link>

        <nav className={styles.actions} aria-label="Primary">
          <Link href={ROUTES.pricing} className={`${styles.button} ${styles.buttonOutline}`}>
            Pricing
          </Link>
          <Link href={ROUTES.signIn} className={`${styles.button} ${styles.buttonPrimary}`}>
            Get Started
          </Link>
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="landing-mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="material-symbols-rounded" aria-hidden>
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
        </div>
      </div>

      <div
        id="landing-mobile-nav"
        className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ""}`}
      >
        <Link
          href={ROUTES.pricing}
          className={`${styles.button} ${styles.buttonOutline} ${styles.mobileNavLink}`}
          onClick={() => setMenuOpen(false)}
        >
          Pricing
        </Link>
        <Link
          href={ROUTES.signIn}
          className={`${styles.button} ${styles.buttonPrimary} ${styles.mobileNavLink}`}
          onClick={() => setMenuOpen(false)}
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}
