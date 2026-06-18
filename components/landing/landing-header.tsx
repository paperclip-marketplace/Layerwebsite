"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { ROUTES, SHOW_LANDING_DEMO_ENTRY } from "@/lib/config/constants";
import {
  LANDING_HEADER_DROPDOWN_EVENT,
  type LandingHeaderDropdownName,
} from "@/lib/landing/header-dropdown";
import styles from "./landing-header.module.css";
import { ProductsDropdown } from "./products-dropdown";
import { SolutionsDropdown } from "./solutions-dropdown";
import gsap from "gsap";

const LOGO_MARK = "/assets/images/landing/layer-mark.svg";
const LOGO_WORDMARK = "/assets/images/landing/layer-wordmark.svg";

type DropdownName = "products" | "solutions";
type OpenDropdown = DropdownName | null;

const CLOSE_DURATION = 0.3;

export function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<OpenDropdown>(null);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const productsDropdownRef = useRef<HTMLDivElement>(null);
  const solutionsDropdownRef = useRef<HTMLDivElement>(null);
  const productsButtonRef = useRef<HTMLAnchorElement>(null);
  const solutionsButtonRef = useRef<HTMLAnchorElement>(null);
  const isAnimatingRef = useRef(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const getDropdownRef = useCallback((name: DropdownName) => {
    return name === "products" ? productsDropdownRef.current : solutionsDropdownRef.current;
  }, []);

  const resetDropdownItems = useCallback((name: DropdownName) => {
    const ref = getDropdownRef(name);
    if (!ref) return;

    const items = ref.querySelectorAll(".dropdown-anim-stagger");
    gsap.killTweensOf(items);
    gsap.set(items, { opacity: 0, y: 15, scale: 0.98 });
  }, [getDropdownRef]);

  const animateClose = useCallback((name: DropdownName) => {
    const ref = getDropdownRef(name);
    if (!ref) return Promise.resolve();

    gsap.killTweensOf(ref);
    const items = ref.querySelectorAll(".dropdown-anim-stagger");
    gsap.killTweensOf(items);

    return new Promise<void>((resolve) => {
      gsap.to(ref, {
        autoAlpha: 0,
        y: -10,
        scale: 0.95,
        duration: CLOSE_DURATION,
        ease: "power3.in",
        onComplete: () => {
          resetDropdownItems(name);
          resolve();
        },
      });
    });
  }, [getDropdownRef, resetDropdownItems]);

  const animateOpen = useCallback((name: DropdownName) => {
    const ref = getDropdownRef(name);
    if (!ref) return;

    gsap.killTweensOf(ref);
    const items = ref.querySelectorAll(".dropdown-anim-stagger");
    gsap.killTweensOf(items);
    gsap.set(items, { opacity: 0, y: 15, scale: 0.98 });

    gsap.to(ref, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power3.out",
    });

    if (items.length) {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.03,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.1,
      });
    }
  }, [getDropdownRef]);

  const closeActiveDropdown = useCallback(async () => {
    if (!openDropdown || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    const closing = openDropdown;
    await animateClose(closing);
    setOpenDropdown(null);
    setActiveLink((prev) => (prev === closing ? null : prev));
    isAnimatingRef.current = false;
  }, [animateClose, openDropdown]);

  const openDropdownByName = useCallback(
    async (name: DropdownName) => {
      if (isAnimatingRef.current) return;
      clearCloseTimer();

      if (openDropdown === name) {
        setActiveLink(name);
        return;
      }

      if (openDropdown) {
        isAnimatingRef.current = true;
        setActiveLink(name);
        await animateClose(openDropdown);
        setOpenDropdown(name);
        animateOpen(name);
        isAnimatingRef.current = false;
        return;
      }

      setActiveLink(name);
      setOpenDropdown(name);
      animateOpen(name);
    },
    [animateClose, animateOpen, clearCloseTimer, openDropdown],
  );

  const scheduleCloseDropdown = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      void closeActiveDropdown();
    }, 150);
  }, [clearCloseTimer, closeActiveDropdown]);

  const scheduleClosePricingHighlight = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setActiveLink((prev) => (prev === "pricing" ? null : prev));
    }, 150);
  }, [clearCloseTimer]);

  const highlightPricing = useCallback(() => {
    clearCloseTimer();
    setActiveLink("pricing");
    if (openDropdown) void closeActiveDropdown();
  }, [clearCloseTimer, closeActiveDropdown, openDropdown]);

  const handleLinkClick = async (link: string) => {
    setActiveLink(link);
    setMenuOpen(false);
    await closeActiveDropdown();
  };

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    const handleFooterDropdownRequest = (event: Event) => {
      const { name } = (event as CustomEvent<{ name: LandingHeaderDropdownName }>)
        .detail;
      window.scrollTo({ top: 0, behavior: "smooth" });
      void openDropdownByName(name);
    };

    window.addEventListener(
      LANDING_HEADER_DROPDOWN_EVENT,
      handleFooterDropdownRequest,
    );
    return () => {
      window.removeEventListener(
        LANDING_HEADER_DROPDOWN_EVENT,
        handleFooterDropdownRequest,
      );
    };
  }, [openDropdownByName]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const inProducts =
        productsDropdownRef.current?.contains(target) ||
        productsButtonRef.current?.contains(target);
      const inSolutions =
        solutionsDropdownRef.current?.contains(target) ||
        solutionsButtonRef.current?.contains(target);

      if (!inProducts && !inSolutions) {
        void closeActiveDropdown();
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeActiveDropdown, openDropdown]);

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
          <div className={styles.leftSide}>
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

            <nav className={styles.navLinks} aria-label="Primary">
              <div
                className={styles.navItemContainer}
                onMouseEnter={() => void openDropdownByName("products")}
                onMouseLeave={scheduleCloseDropdown}
              >
                <Link
                  href="#"
                  ref={productsButtonRef}
                  className={
                    activeLink === "products" ? styles.navLinkActive : styles.navLink
                  }
                  onClick={(event) => event.preventDefault()}
                >
                  Products
                </Link>
                <ProductsDropdown ref={productsDropdownRef} />
              </div>
              <div
                className={styles.navItemContainer}
                onMouseEnter={() => void openDropdownByName("solutions")}
                onMouseLeave={scheduleCloseDropdown}
              >
                <Link
                  href="#"
                  ref={solutionsButtonRef}
                  className={
                    activeLink === "solutions" ? styles.navLinkActive : styles.navLink
                  }
                  onClick={(event) => event.preventDefault()}
                >
                  Solutions
                </Link>
                <SolutionsDropdown ref={solutionsDropdownRef} />
              </div>
              <div
                className={styles.navItemContainer}
                onMouseEnter={highlightPricing}
                onMouseLeave={scheduleClosePricingHighlight}
              >
                <Link
                  href={ROUTES.pricing}
                  className={
                    activeLink === "pricing" ? styles.navLinkActive : styles.navLink
                  }
                  onClick={() => handleLinkClick("pricing")}
                >
                  Pricing
                </Link>
              </div>
            </nav>
          </div>

          <div className={styles.rightSide}>
            <div className={styles.actions}>
              {SHOW_LANDING_DEMO_ENTRY ? (
                <Link href="#" className={styles.buttonDemo}>
                  <span className="material-symbols-rounded" aria-hidden>
                    terminal
                  </span>
                  Interactive Demo
                </Link>
              ) : null}
              <Link
                href={ROUTES.signIn}
                className={`${styles.button} ${styles.buttonPrimary}`}
              >
                Get Started
              </Link>
            </div>

            <button
              type="button"
              className={styles.menuButton}
              aria-expanded={menuOpen ? "true" : "false"}
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
      </div>

      <div
        id="landing-mobile-nav"
        className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ""}`}
      >
        <Link
          href="#"
          className={`${activeLink === "products" ? styles.navLinkActive : styles.navLink} ${styles.mobileNavLink}`}
          onClick={() => handleLinkClick("products")}
        >
          Products
        </Link>
        <Link
          href="#"
          className={`${activeLink === "solutions" ? styles.navLinkActive : styles.navLink} ${styles.mobileNavLink}`}
          onClick={() => handleLinkClick("solutions")}
        >
          Solutions
        </Link>
        <Link
          href={ROUTES.pricing}
          className={`${activeLink === "pricing" ? styles.navLinkActive : styles.navLink} ${styles.mobileNavLink}`}
          onClick={() => handleLinkClick("pricing")}
        >
          Pricing
        </Link>
        {SHOW_LANDING_DEMO_ENTRY ? (
          <Link
            href="#"
            className={`${styles.buttonDemo} ${styles.mobileNavLink}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="material-symbols-rounded" aria-hidden>
              terminal
            </span>
            Interactive Demo
          </Link>
        ) : null}
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
