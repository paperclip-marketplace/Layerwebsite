"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { SuccessCheckIcon } from "@/components/contact/success-check-icon";
import { ROUTES } from "@/lib/config/constants";
import {
  LEAD_FORM_INITIAL_STATE,
  LEAD_IMPROVEMENT_OPTIONS,
  LEAD_ROLE_OPTIONS,
  LEAD_TEAM_SIZE_OPTIONS,
  type LeadFormState,
  type LeadImprovementOption,
} from "./lead-form-shared";
import styles from "./lead-walkthrough-fab.module.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const SENTINEL_ID = "lead-capture";
const MORPH_DURATION = 0.52;
const PANEL_DURATION = 0.55;
const CLOSE_DURATION = 0.48;

type PillSize = {
  width: number;
  height: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
};

/** Figma 1822:25389 closed | 1822:25649/25650/25715 open */
export function LeadWalkthroughFab() {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCircle, setIsCircle] = useState(false);
  const [form, setForm] = useState<LeadFormState>(LEAD_FORM_INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const closeSlotRef = useRef<HTMLSpanElement>(null);
  const closeGlyphRef = useRef<SVGSVGElement>(null);
  const isAnimatingRef = useRef(false);
  const isOpenRef = useRef(false);
  const visibleRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);
  const pillSizeRef = useRef<PillSize>({
    width: 0,
    height: 56,
    paddingTop: 12,
    paddingRight: 20,
    paddingBottom: 12,
    paddingLeft: 24,
  });

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  const measurePillSize = useCallback(() => {
    const button = toggleRef.current;
    if (!button) return;

    gsap.set(button, {
      width: "auto",
      height: "auto",
      clearProps: "padding,borderRadius",
    });
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

  const resetToggleToPill = useCallback(() => {
    const button = toggleRef.current;
    const label = labelRef.current;
    const arrow = arrowRef.current;
    const closeSlot = closeSlotRef.current;
    const closeGlyph = closeGlyphRef.current;

    if (button) {
      gsap.killTweensOf(button);
      gsap.set(button, {
        width: "auto",
        height: "auto",
        clearProps: "padding,borderRadius,width,height",
      });
    }
    if (label) {
      gsap.killTweensOf(label);
      gsap.set(label, {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        clearProps: "transform",
      });
    }
    if (arrow) {
      gsap.killTweensOf(arrow);
      gsap.set(arrow, {
        autoAlpha: 1,
        rotate: 0,
        scale: 1,
        clearProps: "transform",
      });
    }
    if (closeSlot) {
      gsap.killTweensOf(closeSlot);
      gsap.set(closeSlot, { autoAlpha: 0 });
    }
    if (closeGlyph) {
      gsap.killTweensOf(closeGlyph);
      gsap.set(closeGlyph, {
        rotate: 0,
        scale: 1,
        clearProps: "transform",
      });
    }
    setIsCircle(false);
  }, []);

  const animateOpen = useCallback(() => {
    const panel = panelRef.current;
    const button = toggleRef.current;
    const label = labelRef.current;
    const arrow = arrowRef.current;
    const closeSlot = closeSlotRef.current;
    const closeGlyph = closeGlyphRef.current;
    if (!panel || !button || !label || !arrow || !closeSlot || !closeGlyph) {
      return;
    }

    gsap.killTweensOf([panel, button, label, arrow, closeSlot, closeGlyph]);

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
      setIsCircle(true);
      isAnimatingRef.current = false;
      return;
    }

    gsap.set(panel, {
      autoAlpha: 0,
      y: 32,
      scale: 0.92,
      transformOrigin: "bottom right",
    });
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
        setIsCircle(true);
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
          duration: 0.24,
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
          duration: 0.26,
          ease: "power2.in",
        },
        0.02,
      )
      .to(closeSlot, { autoAlpha: 1, duration: 0.3, ease: "power2.out" }, 0.2)
      .to(
        closeGlyph,
        {
          rotate: 0,
          scale: 1,
          duration: 0.36,
          ease: "back.out(1.7)",
        },
        0.2,
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
        0.1,
      );
  }, []);

  const animateClose = useCallback(() => {
    const panel = panelRef.current;
    const button = toggleRef.current;
    const label = labelRef.current;
    const arrow = arrowRef.current;
    const closeSlot = closeSlotRef.current;
    const closeGlyph = closeGlyphRef.current;

    if (!button || !label || !arrow || !closeSlot || !closeGlyph) {
      return Promise.resolve();
    }

    let { width, height, paddingTop, paddingRight, paddingBottom, paddingLeft } =
      pillSizeRef.current;

    // Fallback if pill size was never measured
    if (!width) {
      width = button.offsetWidth || 336;
      height = button.offsetHeight || 56;
      paddingTop = 12;
      paddingRight = 20;
      paddingBottom = 12;
      paddingLeft = 24;
    }

    gsap.killTweensOf([panel, button, label, arrow, closeSlot, closeGlyph].filter(Boolean));

    if (prefersReducedMotionRef.current) {
      if (panel) gsap.set(panel, { autoAlpha: 0 });
      gsap.set(button, {
        width: "auto",
        height: "auto",
        padding: "",
        borderRadius: "",
      });
      gsap.set([label, arrow], { autoAlpha: 1, scale: 1, x: 0, rotate: 0 });
      gsap.set(closeSlot, { autoAlpha: 0 });
      gsap.set(closeGlyph, { rotate: 0, scale: 1 });
      setIsCircle(false);
      return Promise.resolve();
    }

    setIsCircle(false);

    return new Promise<void>((resolve) => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          gsap.set(button, {
            width: "auto",
            height: "auto",
            clearProps: "padding,borderRadius,width,height",
          });
          gsap.set([label, arrow], {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            rotate: 0,
            clearProps: "transform",
          });
          gsap.set(closeSlot, { autoAlpha: 0 });
          gsap.set(closeGlyph, {
            rotate: 0,
            scale: 1,
            clearProps: "transform",
          });
          resolve();
        },
      });

      if (panel) {
        timeline.to(
          panel,
          {
            autoAlpha: 0,
            y: 28,
            scale: 0.94,
            duration: CLOSE_DURATION,
            ease: "power2.inOut",
          },
          0,
        );
      }

      timeline
        .to(
          closeSlot,
          { autoAlpha: 0, duration: 0.22, ease: "power2.in" },
          0.08,
        )
        .to(
          closeGlyph,
          {
            rotate: 90,
            scale: 0.5,
            duration: 0.26,
            ease: "power2.in",
          },
          0.08,
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
            ease: "power3.inOut",
          },
          0.12,
        )
        .to(
          label,
          {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            duration: 0.36,
            ease: "power2.out",
          },
          0.32,
        )
        .to(
          arrow,
          {
            autoAlpha: 1,
            rotate: 0,
            scale: 1,
            duration: 0.36,
            ease: "back.out(1.3)",
          },
          0.36,
        );
    });
  }, []);

  const open = useCallback(() => {
    if (isAnimatingRef.current || isOpenRef.current || !visibleRef.current) {
      return;
    }
    isAnimatingRef.current = true;
    measurePillSize();
    setIsOpen(true);
  }, [measurePillSize]);

  const close = useCallback(async () => {
    if (isAnimatingRef.current || !isOpenRef.current) return;
    isAnimatingRef.current = true;
    await animateClose();
    setIsOpen(false);
    isAnimatingRef.current = false;
  }, [animateClose]);

  /** Smoothly close panel (if open), then hide the FAB — used when scrolling back to hero */
  const closeAndHide = useCallback(async () => {
    if (!visibleRef.current && !isOpenRef.current) return;

    if (isOpenRef.current) {
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        await animateClose();
        setIsOpen(false);
        isAnimatingRef.current = false;
      } else {
        // Wait for in-flight animation, then ensure closed
        await new Promise<void>((resolve) => {
          const id = window.setInterval(() => {
            if (!isAnimatingRef.current) {
              window.clearInterval(id);
              resolve();
            }
          }, 32);
        });
        if (isOpenRef.current) {
          isAnimatingRef.current = true;
          await animateClose();
          setIsOpen(false);
          isAnimatingRef.current = false;
        }
      }
    }

    resetToggleToPill();
    setVisible(false);
  }, [animateClose, resetToggleToPill]);

  const showClosedFab = useCallback(() => {
    setIsOpen(false);
    resetToggleToPill();
    setVisible(true);
  }, [resetToggleToPill]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    animateOpen();
  }, [isOpen, animateOpen]);

  /* Lock page scroll while panel is open — only the panel may scroll */
  useEffect(() => {
    if (!isOpen) return;

    const smoother = ScrollSmoother.get();
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverscroll = html.style.overscrollBehavior;
    const prevBodyOverscroll = body.style.overscrollBehavior;

    smoother?.paused(true);
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overscrollBehavior = "none";

    // Any page wheel/touch scrolls the FAB panel — never the page behind it
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const panel = panelRef.current;
      if (!panel) return;
      panel.scrollTop += event.deltaY;
    };

    let lastTouchY: number | null = null;

    const onTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const panel = panelRef.current;
      const y = event.touches[0]?.clientY;
      if (!panel || lastTouchY == null || y == null) return;
      panel.scrollTop += lastTouchY - y;
      lastTouchY = y;
    };

    const onTouchEnd = () => {
      lastTouchY = null;
    };

    document.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      smoother?.paused(false);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      html.style.overscrollBehavior = prevHtmlOverscroll;
      body.style.overscrollBehavior = prevBodyOverscroll;
      document.removeEventListener("wheel", onWheel);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [isOpen]);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = event.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    const sentinel = document.getElementById(SENTINEL_ID);
    if (!sentinel) return;

    const trigger = ScrollTrigger.create({
      trigger: sentinel,
      start: "bottom top",
      end: "max",
      onEnter: () => {
        showClosedFab();
      },
      onLeaveBack: () => {
        void closeAndHide();
      },
    });

    if (trigger.isActive) {
      showClosedFab();
    }

    return () => {
      trigger.kill();
    };
  }, [closeAndHide, showClosedFab]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") void close();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  useEffect(() => {
    return () => {
      const nodes = [
        panelRef.current,
        toggleRef.current,
        labelRef.current,
        arrowRef.current,
        closeSlotRef.current,
        closeGlyphRef.current,
      ];
      nodes.forEach((node) => {
        if (node) gsap.killTweensOf(node);
      });
    };
  }, []);

  const updateField =
    (field: "workEmail" | "role" | "teamSize") =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const toggleImprovement = (option: LeadImprovementOption) => {
    setForm((prev) => {
      const selected = prev.improvements.includes(option);
      return {
        ...prev,
        improvements: selected
          ? prev.improvements.filter((item) => item !== option)
          : [...prev.improvements, option],
      };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (form.improvements.length === 0) return;
    setSubmitted(true);
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.root} ${visible ? styles.rootVisible : ""}`}
      data-node-id={isOpen ? "1822:25649" : "1822:25389"}
    >
      {isOpen ? (
        <div
          ref={backdropRef}
          className={styles.backdrop}
          aria-hidden
          onClick={() => void close()}
        />
      ) : null}

      <div className={styles.stack}>
        {isOpen ? (
          <div
            ref={panelRef}
            className={styles.panel}
            data-node-id="1822:25650"
            role="dialog"
            aria-modal="true"
            aria-label="Get a Personalized Walkthrough"
          >
            {submitted ? (
              <div className={styles.successBody} role="status" aria-live="polite">
                <SuccessCheckIcon />
                <p className={styles.successTitle}>
                  Thank
                  <span className={styles.successTitleHighlight}> You!</span>
                </p>
                <p className={styles.successMessage}>
                  Our team will get back to you within 24–48 hours depending on
                  availability.
                </p>
                <p className={styles.successCtaText}>
                  Want to get started now?{" "}
                  <Link href={ROUTES.signUp} className={styles.successCtaLink}>
                    Sign Up
                  </Link>
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.panelHeader} data-node-id="1822:25651">
                  <h2 className={styles.panelTitle} data-node-id="1822:25652">
                    See what{" "}
                    <span className={styles.panelTitleHighlight}>Layer</span> can
                    do for
                    <br />
                    your team.
                  </h2>
                  <p className={styles.panelSubtitle} data-node-id="1822:25653">
                    Tell us about your team and we&apos;ll show you where Layer
                    can make the biggest impact.
                  </p>
                </div>

                <div className={styles.fields} data-node-id="1822:25654">
                  <label className={styles.field}>
                    <span className={styles.label}>Work Email*</span>
                    <input
                      className={styles.input}
                      type="email"
                      name="workEmail"
                      required
                      autoComplete="email"
                      placeholder="jhon@acme.com"
                      value={form.workEmail}
                      onChange={updateField("workEmail")}
                    />
                  </label>

                  <div className={styles.fieldRow}>
                    <label className={styles.field}>
                      <span className={styles.label}>Your Role*</span>
                      <div className={styles.selectWrap}>
                        <select
                          className={styles.select}
                          name="role"
                          required
                          value={form.role}
                          onChange={updateField("role")}
                        >
                          {LEAD_ROLE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <span
                          className={`material-symbols-rounded ${styles.selectIcon}`}
                          aria-hidden
                        >
                          expand_more
                        </span>
                      </div>
                    </label>

                    <label className={styles.field}>
                      <span className={styles.label}>Team Size*</span>
                      <div className={styles.selectWrap}>
                        <select
                          className={styles.select}
                          name="teamSize"
                          required
                          value={form.teamSize}
                          onChange={updateField("teamSize")}
                        >
                          {LEAD_TEAM_SIZE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <span
                          className={`material-symbols-rounded ${styles.selectIcon}`}
                          aria-hidden
                        >
                          expand_more
                        </span>
                      </div>
                    </label>
                  </div>

                  <fieldset className={styles.checkboxFieldset}>
                    <legend className={styles.label}>
                      What&apos;re you looking to improve?*
                    </legend>
                    <div className={styles.checkboxGrid}>
                      {LEAD_IMPROVEMENT_OPTIONS.map((option) => {
                        const checked = form.improvements.includes(option);
                        const inputId = `fab-improvement-${option.replace(/\s+/g, "-").toLowerCase()}`;

                        return (
                          <label
                            key={option}
                            className={styles.checkboxOption}
                            htmlFor={inputId}
                          >
                            <input
                              id={inputId}
                              className={styles.checkboxInput}
                              type="checkbox"
                              name="improvements"
                              value={option}
                              checked={checked}
                              onChange={() => toggleImprovement(option)}
                            />
                            <span
                              className={`${styles.checkboxBox} ${checked ? styles.checkboxBoxChecked : ""}`}
                              aria-hidden
                            >
                              {checked ? (
                                <span
                                  className={`material-symbols-rounded ${styles.checkboxMark}`}
                                >
                                  check
                                </span>
                              ) : null}
                            </span>
                            <span className={styles.checkboxLabel}>{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>

                <button
                  type="submit"
                  className={styles.submit}
                  data-node-id="1822:25714"
                >
                  <span>Get a Personalized Walkthrough</span>
                  <span
                    className={`material-symbols-rounded ${styles.submitIcon}`}
                    aria-hidden
                  >
                    arrow_forward
                  </span>
                </button>
              </form>
            )}
          </div>
        ) : null}

        <button
          ref={toggleRef}
          type="button"
          className={`${styles.toggleButton} ${isCircle ? styles.toggleButtonOpen : ""}`}
          data-node-id={isOpen ? "1822:25715" : "1822:25389"}
          data-name="button"
          aria-label={
            isOpen
              ? "Close walkthrough form"
              : "Get a Personalized Walkthrough"
          }
          aria-expanded={isOpen ? "true" : "false"}
          tabIndex={visible ? 0 : -1}
          onClick={isOpen ? () => void close() : open}
        >
          <span ref={labelRef} className={styles.pillLabel}>
            Get a Personalized Walkthrough
          </span>
          <span
            ref={arrowRef}
            className={`material-symbols-rounded ${styles.pillIcon}`}
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
    </div>
  );
}
