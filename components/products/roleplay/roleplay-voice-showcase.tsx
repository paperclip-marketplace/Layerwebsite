"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ROLEPLAY_VOICE_ORBS } from "./roleplay-assets";
import styles from "./roleplay-hero-section.module.css";

const VOICE_ORB_COUNT = ROLEPLAY_VOICE_ORBS.length;
const AUTO_ADVANCE_MS = 6000;
const SLIDE_DURATION = 1.5;
const SLIDE_EASE = "power2.inOut";
const TRAIN_BTN_FADE = 0.25;

/** Figma 1411:1912 — side row width with orbs pinned to each edge. */
const FIGMA_VOICE_TRACK_W = 1280;

const VOICE_ORB_LABELS = [
  "Warm voice",
  "Calm voice",
  "Bright voice",
  "Deep voice",
  "Soft voice",
  "Bold voice",
] as const;

function readCssLength(host: HTMLElement, variable: string, fallback: number) {
  const raw = getComputedStyle(host).getPropertyValue(variable).trim();
  if (!raw) return fallback;

  const probe = document.createElement("div");
  probe.style.cssText =
    "position:absolute;visibility:hidden;pointer-events:none;width:0;height:0;";
  probe.style.width = raw;
  host.appendChild(probe);
  const px = probe.getBoundingClientRect().width;
  host.removeChild(probe);
  return px || fallback;
}

function getVoiceCarouselMetrics(showcaseEl: HTMLElement | null) {
  const fluidUnit = Math.min(window.innerWidth / 1440, 1);
  const host =
    showcaseEl?.closest<HTMLElement>(".landing-main") ?? showcaseEl ?? document.documentElement;

  const centerSize = readCssLength(
    host,
    "--l-roleplay-voice-center-size",
    320 * fluidUnit,
  );
  const sideSize = readCssLength(
    host,
    "--l-roleplay-voice-side-size",
    232 * fluidUnit,
  );
  const showcaseH = readCssLength(
    host,
    "--l-roleplay-showcase-h",
    560 * fluidUnit,
  );
  const centerTop = readCssLength(
    host,
    "--l-roleplay-voice-center-top",
    120 * fluidUnit,
  );
  const trackW = readCssLength(
    host,
    "--l-hero-inner-w",
    FIGMA_VOICE_TRACK_W * fluidUnit,
  );

  const spread = trackW / 2 - sideSize / 2;
  const centerY = centerTop + centerSize / 2 - showcaseH / 2;

  return { centerSize, sideSize, spread, centerY };
}

function getCircularOffset(
  cardIndex: number,
  activeIndex: number,
  count: number,
): number {
  let offset = cardIndex - activeIndex;

  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;

  return offset;
}

function getSlideDirection(from: number, to: number, count: number): 1 | -1 {
  const diff = (to - from + count) % count;
  return diff === 1 ? 1 : -1;
}

function getVoiceSlotLayout(
  offset: number,
  metrics: ReturnType<typeof getVoiceCarouselMetrics>,
) {
  const { centerSize, sideSize, spread, centerY } = metrics;
  const isCenter = offset === 0;
  const isAdjacent = Math.abs(offset) === 1;
  const size = isCenter ? centerSize : sideSize;

  return {
    x: offset * spread,
    y: isCenter ? centerY : 0,
    yPercent: -50,
    xPercent: -50,
    width: size,
    height: size,
    opacity: isCenter ? 1 : isAdjacent ? 0.3 : 0,
    zIndex: isCenter ? 3 : isAdjacent ? 1 : 0,
  };
}

function VoiceOrb({
  src,
  isCenter,
}: {
  src: string;
  isCenter: boolean;
}) {
  return (
    <div className={styles.voiceOrbWrapper}>
      <div
        className={`${styles.voiceOrb} ${isCenter ? styles.voiceOrbCenter : styles.voiceOrbSide}`}
        data-name="voice-orb"
      >
        <img src={src} alt="" className={styles.voiceOrbImage} />
      </div>
    </div>
  );
}

export function RoleplayVoiceShowcase() {
  const [announcedIndex, setAnnouncedIndex] = useState(0);
  const [centerIndex, setCenterIndex] = useState(0);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const trainBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const isAnimatingRef = useRef(false);
  const pausedRef = useRef(false);
  const displayIndexRef = useRef(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const reducedMotionRef = useRef(false);

  const fadeTrainButton = useCallback((opacity: number, duration: number) => {
    const button = trainBtnRef.current;
    if (!button) return;

    gsap.killTweensOf(button);
    gsap.to(button, {
      opacity,
      duration,
      ease: "power2.inOut",
      pointerEvents: opacity > 0 ? "auto" : "none",
    });
  }, []);

  const pulseNavButton = useCallback((button: HTMLButtonElement | null) => {
    if (!button || reducedMotionRef.current) return;

    gsap.fromTo(
      button,
      { scale: 1 },
      { scale: 0.9, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.inOut" },
    );
  }, []);

  const layoutOrbs = useCallback(
    (
      index: number,
      animate: boolean,
      previousIndex: number,
      direction: 1 | -1,
    ) => {
      const metrics = getVoiceCarouselMetrics(showcaseRef.current);
      const duration = animate && !reducedMotionRef.current ? SLIDE_DURATION : 0;

      timelineRef.current?.kill();

      const timeline = gsap.timeline();
      timelineRef.current = timeline;

      orbRefs.current.forEach((slot, orbIndex) => {
        if (!slot) return;

        const newOffset = getCircularOffset(orbIndex, index, VOICE_ORB_COUNT);
        const oldOffset = getCircularOffset(orbIndex, previousIndex, VOICE_ORB_COUNT);
        const target = getVoiceSlotLayout(newOffset, metrics);
        const wasVisible = Math.abs(oldOffset) <= 1;
        const isVisible = Math.abs(newOffset) <= 1;

        if (!animate) {
          gsap.set(slot, target);
          return;
        }

        if (!isVisible && !wasVisible) {
          gsap.set(slot, {
            ...target,
            x: (newOffset > 0 ? 1 : -1) * metrics.spread * 2,
            opacity: 0,
          });
          return;
        }

        if (!wasVisible && isVisible) {
          gsap.set(slot, {
            x: (newOffset + direction) * metrics.spread,
            y: target.y,
            yPercent: -50,
            xPercent: -50,
            width: metrics.sideSize,
            height: metrics.sideSize,
            opacity: 0,
            zIndex: 1,
          });
          timeline.to(
            slot,
            {
              ...target,
              duration,
              ease: SLIDE_EASE,
              force3D: true,
            },
            0,
          );
          return;
        }

        if (wasVisible && !isVisible) {
          timeline.to(
            slot,
            {
              x: (oldOffset - direction) * metrics.spread,
              opacity: 0,
              width: metrics.sideSize,
              height: metrics.sideSize,
              zIndex: 0,
              duration,
              ease: SLIDE_EASE,
              force3D: true,
            },
            0,
          );
          return;
        }

        timeline.to(
          slot,
          {
            ...target,
            yPercent: -50,
            xPercent: -50,
            duration,
            ease: SLIDE_EASE,
            force3D: true,
          },
          0,
        );
      });

      return timeline;
    },
    [],
  );

  const goToIndex = useCallback(
    (nextIndex: number, options?: { animate?: boolean; pulseButton?: "prev" | "next" }) => {
      if (isAnimatingRef.current && options?.animate !== false) return;

      const normalized = (nextIndex + VOICE_ORB_COUNT) % VOICE_ORB_COUNT;
      if (normalized === displayIndexRef.current && options?.animate !== false) return;

      const animate = options?.animate !== false && !reducedMotionRef.current;
      const previousIndex = displayIndexRef.current;
      const direction = getSlideDirection(previousIndex, normalized, VOICE_ORB_COUNT);

      if (animate) {
        isAnimatingRef.current = true;
        fadeTrainButton(0, TRAIN_BTN_FADE);
      }

      displayIndexRef.current = normalized;
      setCenterIndex(normalized);

      if (!animate) {
        setAnnouncedIndex(normalized);
      }

      if (options?.pulseButton === "prev") {
        pulseNavButton(prevBtnRef.current);
      } else if (options?.pulseButton === "next") {
        pulseNavButton(nextBtnRef.current);
      }

      const timeline = layoutOrbs(normalized, animate, previousIndex, direction);

      timeline.eventCallback("onComplete", () => {
        setAnnouncedIndex(normalized);
        isAnimatingRef.current = false;
        fadeTrainButton(1, TRAIN_BTN_FADE);
      });

      if (!animate) {
        isAnimatingRef.current = false;
      }
    },
    [fadeTrainButton, layoutOrbs, pulseNavButton],
  );

  const goToPrevious = useCallback(
    (options?: { animate?: boolean; pulseButton?: boolean }) => {
      goToIndex(displayIndexRef.current - 1, {
        animate: options?.animate,
        pulseButton: options?.pulseButton ? "prev" : undefined,
      });
    },
    [goToIndex],
  );

  const goToNext = useCallback(
    (options?: { animate?: boolean; pulseButton?: boolean }) => {
      goToIndex(displayIndexRef.current + 1, {
        animate: options?.animate,
        pulseButton: options?.pulseButton ? "next" : undefined,
      });
    },
    [goToIndex],
  );

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    orbRefs.current.forEach((slot) => {
      if (!slot) return;
      gsap.set(slot, { top: "50%", left: "50%" });
    });

    if (trainBtnRef.current) {
      gsap.set(trainBtnRef.current, { opacity: 1 });
    }

    layoutOrbs(0, false, 0, 1);
  }, [layoutOrbs]);

  useEffect(() => {
    const onResize = () =>
      layoutOrbs(
        displayIndexRef.current,
        false,
        displayIndexRef.current,
        1,
      );
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [layoutOrbs]);

  useEffect(() => {
    if (reducedMotionRef.current) return;

    const intervalId = window.setInterval(() => {
      if (pausedRef.current || isAnimatingRef.current) return;
      goToNext({ pulseButton: true });
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(intervalId);
  }, [goToNext]);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
      if (trainBtnRef.current) {
        gsap.killTweensOf(trainBtnRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={showcaseRef}
      className={`${styles.showcase} ${styles.showcaseVoice}`}
      data-node-id="1411:1912"
      data-name="hero-ticker"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onBlurCapture={(event) => {
        if (!showcaseRef.current?.contains(event.relatedTarget as Node)) {
          pausedRef.current = false;
        }
      }}
    >
      <div className={styles.showcaseStage}>
        {ROLEPLAY_VOICE_ORBS.map((src, index) => (
          <div
            key={src}
            ref={(element) => {
              orbRefs.current[index] = element;
            }}
            className={styles.voiceOrbSlot}
          >
            <VoiceOrb src={src} isCenter={index === centerIndex} />
          </div>
        ))}
      </div>

      <div className={styles.voiceTrainAnchor}>
        <button
          ref={trainBtnRef}
          type="button"
          className={styles.voiceTrainBtn}
          tabIndex={0}
        >
          <span>Start Training</span>
          <span
            className={`material-symbols-rounded ${styles.voiceTrainIcon}`}
            aria-hidden
          >
            arrow_forward
          </span>
        </button>
      </div>

      <div className={styles.showcaseFade} aria-hidden />

      <div className={styles.showcaseNav} data-node-id="1411:1918">
        <button
          ref={prevBtnRef}
          type="button"
          className={styles.showcaseNavBtn}
          aria-label="Previous voice"
          onClick={() => goToPrevious({ pulseButton: true })}
          data-node-id="1411:1919"
        >
          <span
            className={`material-symbols-rounded ${styles.showcaseNavIcon}`}
            aria-hidden
          >
            arrow_back
          </span>
        </button>
        <button
          ref={nextBtnRef}
          type="button"
          className={styles.showcaseNavBtn}
          aria-label="Next voice"
          onClick={() => goToNext({ pulseButton: true })}
          data-node-id="1411:1920"
        >
          <span
            className={`material-symbols-rounded ${styles.showcaseNavIcon}`}
            aria-hidden
          >
            arrow_forward
          </span>
        </button>
      </div>

      <p className={styles.showcaseSrOnly} aria-live="polite">
        Showing {VOICE_ORB_LABELS[announcedIndex]}
      </p>
    </div>
  );
}
