"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { CUSTOMER_FACING_PRODUCTS } from "@/lib/config/customer-facing-products";
import { ROUTES } from "@/lib/config/constants";
import styles from "./fixed-explore-features-button.module.css";

const MORPH_DURATION = 0.48;
const PANEL_DURATION = 0.52;
const CLOSE_DURATION = 0.38;
const ITEM_STAGGER = 0.045;

type PillSize = {
  width: number;
  height: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
};

export function FixedExploreFeaturesButton() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isFab, setIsFab] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const closeSlotRef = useRef<HTMLSpanElement>(null);
  const closeGlyphRef = useRef<SVGSVGElement>(null);
  const pillSizeRef = useRef<PillSize>({
    width: 0,
    height: 56,
    paddingTop: 12,
    paddingRight: 20,
    paddingBottom: 12,
    paddingLeft: 24,
  });
  const isAnimatingRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);

  const measurePillSize = useCallback(() => {
    const button = toggleRef.current;
    if (!button) return;

    gsap.set(button, { width: "auto", height: "auto", clearProps: "padding,borderRadius" });
    const computed = window.getComputedStyle(button);
    pillSizeRef.current = {
      width: button.offsetWidth,
      height: button.offsetHeight,
      paddingTop: parseFloat(computed.paddingTop),
      paddingRight: parseFloat(computed.paddingRight),
      paddingBottom: parseFloat(computed.paddingBottom),
      paddingLeft: parseFloat(computed.paddingLeft),
    };
  }, []);

  const resetPanelItems = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const items = panel.querySelectorAll(".explore-anim-stagger");
    gsap.killTweensOf(items);
    gsap.set(items, { opacity: 0, y: 14, scale: 0.98 });
  }, []);

  const animateOpen = useCallback(() => {
    const panel = panelRef.current;
    const button = toggleRef.current;
    const label = labelRef.current;
    const arrow = arrowRef.current;
    const closeSlot = closeSlotRef.current;
    const closeGlyph = closeGlyphRef.current;

    if (!panel || !button || !label || !arrow || !closeSlot || !closeGlyph) return;

    const items = panel.querySelectorAll(".explore-anim-stagger");

    gsap.killTweensOf([panel, button, label, arrow, closeSlot, closeGlyph, items]);

    if (prefersReducedMotionRef.current) {
      gsap.set(panel, { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set(button, {
        width: 56,
        height: 56,
        padding: 0,
        borderRadius: 28,
      });
      gsap.set([label, arrow], { autoAlpha: 0, scale: 0.8 });
      gsap.set(closeSlot, { autoAlpha: 1 });
      gsap.set(closeGlyph, { rotate: 0, scale: 1 });
      gsap.set(items, { opacity: 1, y: 0, scale: 1 });
      setIsFab(true);
      isAnimatingRef.current = false;
      return;
    }

    gsap.set(panel, {
      autoAlpha: 0,
      y: 28,
      scale: 0.9,
      transformOrigin: "bottom right",
    });
    gsap.set(items, { opacity: 0, y: 14, scale: 0.98 });
    gsap.set(closeSlot, { autoAlpha: 0 });
    gsap.set(closeGlyph, {
      rotate: -90,
      scale: 0.6,
      transformOrigin: "50% 50%",
    });
    gsap.set([label, arrow], { autoAlpha: 1, scale: 1 });

    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        setIsFab(true);
        isAnimatingRef.current = false;
      },
    });

    timeline
      .to(
        button,
        {
          width: 56,
          height: 56,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          borderRadius: 28,
          duration: MORPH_DURATION,
        },
        0,
      )
      .to(
        label,
        {
          autoAlpha: 0,
          x: -10,
          scale: 0.86,
          duration: 0.22,
          ease: "power2.in",
        },
        0,
      )
      .to(
        arrow,
        {
          autoAlpha: 0,
          rotate: 45,
          scale: 0.4,
          duration: 0.24,
          ease: "power2.in",
        },
        0.02,
      )
      .to(closeSlot, { autoAlpha: 1, duration: 0.28, ease: "power2.out" }, 0.18)
      .to(
        closeGlyph,
        {
          rotate: 0,
          scale: 1,
          duration: 0.34,
          ease: "back.out(1.7)",
        },
        0.18,
      )
      .to(
        panel,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: PANEL_DURATION,
          ease: "power3.out",
        },
        0.12,
      )
      .to(
        items,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: ITEM_STAGGER,
          duration: 0.42,
          ease: "power2.out",
        },
        0.28,
      );
  }, []);

  const animateClose = useCallback(() => {
    const panel = panelRef.current;
    const button = toggleRef.current;
    const label = labelRef.current;
    const arrow = arrowRef.current;
    const closeSlot = closeSlotRef.current;
    const closeGlyph = closeGlyphRef.current;

    if (!panel || !button || !label || !arrow || !closeSlot || !closeGlyph) {
      return Promise.resolve();
    }

    const { width, height, paddingTop, paddingRight, paddingBottom, paddingLeft } =
      pillSizeRef.current;
    const items = panel.querySelectorAll(".explore-anim-stagger");

    gsap.killTweensOf([panel, button, label, arrow, closeSlot, closeGlyph, items]);

    if (prefersReducedMotionRef.current) {
      gsap.set(panel, { autoAlpha: 0 });
      gsap.set(button, { width: "auto", height: "auto", padding: "", borderRadius: "" });
      gsap.set([label, arrow], { autoAlpha: 1, scale: 1, x: 0, rotate: 0 });
      gsap.set(closeSlot, { autoAlpha: 0 });
      gsap.set(closeGlyph, { rotate: 0, scale: 1 });
      resetPanelItems();
      setIsFab(false);
      return Promise.resolve();
    }

    setIsFab(false);

    return new Promise<void>((resolve) => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          gsap.set(button, { width: "auto", height: "auto", clearProps: "padding,borderRadius" });
          gsap.set([label, arrow], {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            rotate: 0,
            clearProps: "transform",
          });
          gsap.set(closeSlot, { autoAlpha: 0 });
          gsap.set(closeGlyph, { rotate: 0, scale: 1, clearProps: "transform" });
          resetPanelItems();
          setIsFab(false);
          resolve();
        },
      });

      timeline
        .to(
          items,
          {
            opacity: 0,
            y: 10,
            scale: 0.98,
            stagger: { each: ITEM_STAGGER * 0.6, from: "end" },
            duration: 0.18,
            ease: "power2.in",
          },
          0,
        )
        .to(
          panel,
          {
            autoAlpha: 0,
            y: 18,
            scale: 0.94,
            duration: CLOSE_DURATION,
            ease: "power3.in",
          },
          0.06,
        )
        .to(closeSlot, { autoAlpha: 0, duration: 0.18, ease: "power2.in" }, 0.1)
        .to(
          closeGlyph,
          {
            rotate: 90,
            scale: 0.5,
            duration: 0.22,
            ease: "power2.in",
          },
          0.1,
        )
        .to(
          button,
          {
            width,
            height,
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
            borderRadius: 99,
            duration: MORPH_DURATION,
          },
          0.14,
        )
        .to(
          label,
          {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          0.34,
        )
        .to(
          arrow,
          {
            autoAlpha: 1,
            rotate: 0,
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.4)",
          },
          0.38,
        );
    });
  }, [resetPanelItems]);

  const open = useCallback(() => {
    if (isAnimatingRef.current || isOpen) return;
    isAnimatingRef.current = true;
    measurePillSize();
    setIsOpen(true);
  }, [isOpen, measurePillSize]);

  const close = useCallback(async () => {
    if (isAnimatingRef.current || !isOpen) return;
    isAnimatingRef.current = true;
    await animateClose();
    setIsOpen(false);
    isAnimatingRef.current = false;
  }, [animateClose, isOpen]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    animateOpen();
  }, [isOpen, animateOpen]);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    measurePillSize();

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = event.matches;
    };

    const handleResize = () => {
      if (!isOpen && !isAnimatingRef.current) measurePillSize();
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    window.addEventListener("resize", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, measurePillSize]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen, close]);

  useEffect(() => {
    return () => {
      const panel = panelRef.current;
      const button = toggleRef.current;
      const label = labelRef.current;
      const arrow = arrowRef.current;
      const closeSlot = closeSlotRef.current;
      const closeGlyph = closeGlyphRef.current;
      if (panel) gsap.killTweensOf(panel);
      if (button) gsap.killTweensOf(button);
      if (label) gsap.killTweensOf(label);
      if (arrow) gsap.killTweensOf(arrow);
      if (closeSlot) gsap.killTweensOf(closeSlot);
      if (closeGlyph) gsap.killTweensOf(closeGlyph);
    };
  }, []);

  useEffect(() => {
    if (isOpen) return;
    setIsFab(false);
    measurePillSize();
  }, [pathname, isOpen, measurePillSize]);

  if (pathname === ROUTES.pricing) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={styles.container}
      data-node-id={isOpen ? "1089:6933" : "1089:6779"}
      data-name="button"
    >
      {isOpen && (
        <div
          ref={panelRef}
          className={styles.panel}
          data-node-id="1089:7169"
        >
          <div className={styles.panelContent}>
            <div className={styles.panelInner}>
              <div className={styles.section}>
                <p
                  className={`${styles.sectionTitle} explore-anim-stagger`}
                >
                  For Customer Facing Team
                </p>
                <div className={styles.itemsList}>
                  {CUSTOMER_FACING_PRODUCTS.map((product) => {
                    const isCurrent = pathname === product.href;

                    return (
                      <Link
                        key={product.title}
                        href={product.href}
                        className={`${styles.item} explore-anim-stagger`}
                        onClick={close}
                      >
                        <div className={styles.itemImage}>
                          <img src={product.image} alt="" />
                        </div>
                        <div className={styles.itemText}>
                          <div className={styles.itemTitleRow}>
                            <p className={styles.itemTitle}>{product.title}</p>
                            {isCurrent && (
                              <span className={styles.currentBadge}>
                                <span
                                  className={`material-symbols-rounded ${styles.currentIcon}`}
                                  aria-hidden
                                >
                                  visibility
                                </span>
                                <span className={styles.currentLabel}>
                                  Currently Viewing
                                </span>
                              </span>
                            )}
                          </div>
                          <p className={styles.itemDescription}>
                            {product.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        ref={toggleRef}
        type="button"
        className={`${styles.toggleButton} ${isFab ? styles.toggleButtonOpen : ""}`}
        data-node-id={isOpen ? "1089:6934" : "1089:6779"}
        aria-label={isOpen ? "Close explore features" : "Explore other features"}
        aria-expanded={isOpen ? "true" : "false"}
        onClick={isOpen ? close : open}
      >
        <span ref={labelRef} className={styles.label}>
          Explore other features
        </span>
        <span
          ref={arrowRef}
          className={`material-symbols-rounded ${styles.icon}`}
          aria-hidden
        >
          north_east
        </span>
        <span ref={closeSlotRef} className={styles.closeIconSlot} aria-hidden>
          <svg
            ref={closeGlyphRef}
            className={styles.closeIconSvg}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 7L17 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M17 7L7 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}
