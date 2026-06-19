"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ROLEPLAY_ASSETS } from "./roleplay-assets";
import { useRoleplayMode } from "./roleplay-mode-context";
import styles from "./roleplay-hero-section.module.css";

type AgentMedia = "featured" | "overlayLeft" | "bgRight" | "david";

type ShowcaseAgent = {
  name: string;
  role: string;
  company: string;
  goals: number;
  pains: number;
  media: AgentMedia;
};

const SHOWCASE_AGENTS: readonly ShowcaseAgent[] = [
  {
    name: "Mark S.",
    role: "Chief Technology Officer",
    company: "Sony",
    goals: 17,
    pains: 12,
    media: "featured",
  },
  {
    name: "Priya K.",
    role: "Director of Sales",
    company: "HubSpot",
    goals: 13,
    pains: 9,
    media: "bgRight",
  },
  {
    name: "David R.",
    role: "Head of Product",
    company: "Notion",
    goals: 19,
    pains: 15,
    media: "david",
  },
  {
    name: "Lacey M.",
    role: "VP of Revenue",
    company: "Stripe",
    goals: 11,
    pains: 8,
    media: "overlayLeft",
  },
] as const;

const AUTO_ADVANCE_MS = 6000;
const SLIDE_DURATION = 1.5;
const SLIDE_EASE = "power2.inOut";

/** Figma 1088:4768 — side row width with cards pinned to each edge. */
const FIGMA_SHOWCASE_TRACK_W = 1280;

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

function getCarouselMetrics(showcaseEl: HTMLElement | null) {
  const fluidUnit = Math.min(window.innerWidth / 1440, 1);
  const host =
    showcaseEl?.closest<HTMLElement>(".landing-main") ?? showcaseEl ?? document.documentElement;

  const centerW = readCssLength(
    host,
    "--l-roleplay-center-card-w",
    360 * fluidUnit,
  );
  const centerH = readCssLength(
    host,
    "--l-roleplay-center-card-h",
    520 * fluidUnit,
  );
  const sideW = readCssLength(host, "--l-roleplay-side-card-w", 264 * fluidUnit);
  const sideH = readCssLength(host, "--l-roleplay-side-card-h", 382 * fluidUnit);
  const trackW = readCssLength(
    host,
    "--l-hero-inner-w",
    FIGMA_SHOWCASE_TRACK_W * fluidUnit,
  );

  // Figma 1088:4207 — side cards sit at the edges of the 1280px row; center card is viewport-centered.
  const spread = trackW / 2 - sideW / 2;

  return { centerW, centerH, sideW, sideH, spread };
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

function getSlotLayout(
  offset: number,
  metrics: ReturnType<typeof getCarouselMetrics>,
) {
  const { centerW, centerH, sideW, sideH, spread } = metrics;
  const isCenter = offset === 0;
  const isAdjacent = Math.abs(offset) === 1;

  return {
    x: offset * spread,
    yPercent: -50,
    xPercent: -50,
    width: isCenter ? centerW : sideW,
    height: isCenter ? centerH : sideH,
    opacity: isCenter ? 1 : isAdjacent ? 0.3 : 0,
    zIndex: isCenter ? 3 : isAdjacent ? 1 : 0,
    cardMix: isCenter ? 1 : 0,
  };
}

function slotTweenProps(target: ReturnType<typeof getSlotLayout>) {
  const { cardMix, ...layout } = target;
  return { ...layout, "--card-mix": cardMix };
}

function AgentCardMedia({ media }: { media: AgentMedia }) {
  if (media === "featured") {
    return (
      <div className={styles.agentCardMedia} aria-hidden>
        <img
          src={ROLEPLAY_ASSETS.heroAgentFeatured}
          alt=""
          className={styles.agentCardFeatured}
        />
      </div>
    );
  }

  if (media === "bgRight") {
    return (
      <div className={styles.agentCardMedia} aria-hidden>
        <img
          src={ROLEPLAY_ASSETS.heroAgentBg}
          alt=""
          className={styles.agentCardBgRight}
        />
      </div>
    );
  }

  if (media === "david") {
    return (
      <div className={styles.agentCardMedia} aria-hidden>
        <img
          src={ROLEPLAY_ASSETS.heroAgentDavid}
          alt=""
          className={styles.agentCardDavid}
        />
      </div>
    );
  }

  return (
    <div className={styles.agentCardMedia} aria-hidden>
      <img
        src={ROLEPLAY_ASSETS.heroAgentOverlay}
        alt=""
        className={styles.agentCardOverlayLeft}
      />
    </div>
  );
}

function AgentCard({
  agent,
  isCenter,
  agentMode,
}: {
  agent: ShowcaseAgent;
  isCenter: boolean;
  agentMode: "voice" | "video";
}) {
  const isVideo = agentMode === "video";

  return (
    <article className={styles.agentCard} data-name="agent-card">
      <AgentCardMedia media={agent.media} />

      <div className={styles.agentCardContent}>
        <div className={styles.agentCardTop}>
          <span
            className={`${styles.agentChip} ${isVideo ? styles.agentChipVideo : styles.agentChipVoice}`}
          >
            {isVideo ? "Video Agent" : "Voice Agent"}
          </span>
        </div>

        <div className={styles.agentCardBottom}>
          <div className={styles.agentIdentity}>
            <p className={styles.agentName}>{agent.name}</p>
            <div className={styles.agentMeta}>
              <span>{agent.role}</span>
              <span className={styles.agentMetaDot} aria-hidden />
              <span className={styles.agentCompany}>{agent.company}</span>
            </div>
          </div>

          <div className={styles.agentStatsPanel}>
            <div className={styles.agentStats}>
              <div className={styles.agentStat}>
                <span className={styles.agentStatLabel}>Goals</span>
                <span className={styles.agentStatValue}>{agent.goals}</span>
              </div>
              <div className={styles.agentStat}>
                <span className={styles.agentStatLabel}>Pains</span>
                <span className={styles.agentStatValue}>{agent.pains}</span>
              </div>
            </div>
            <button
              type="button"
              className={styles.agentTrainBtn}
              tabIndex={isCenter ? 0 : -1}
            >
              <span>Start Training</span>
              <span
                className={`material-symbols-rounded ${styles.agentTrainIcon}`}
                aria-hidden
              >
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function RoleplayAgentShowcase() {
  const [announcedIndex, setAnnouncedIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const isAnimatingRef = useRef(false);
  const pausedRef = useRef(false);
  const displayIndexRef = useRef(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const reducedMotionRef = useRef(false);

  const pulseNavButton = useCallback((button: HTMLButtonElement | null) => {
    if (!button || reducedMotionRef.current) return;

    gsap.fromTo(
      button,
      { scale: 1 },
      { scale: 0.9, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.inOut" },
    );
  }, []);

  const layoutCards = useCallback(
    (
      index: number,
      animate: boolean,
      previousIndex: number,
      direction: 1 | -1,
    ) => {
      const metrics = getCarouselMetrics(showcaseRef.current);
      const duration = animate && !reducedMotionRef.current ? SLIDE_DURATION : 0;

      timelineRef.current?.kill();

      const timeline = gsap.timeline();
      timelineRef.current = timeline;

      const count = SHOWCASE_AGENTS.length;

      cardRefs.current.forEach((slot, cardIndex) => {
        if (!slot) return;

        const newOffset = getCircularOffset(cardIndex, index, count);
        const oldOffset = getCircularOffset(cardIndex, previousIndex, count);
        const target = getSlotLayout(newOffset, metrics);
        const wasVisible = Math.abs(oldOffset) <= 1;
        const isVisible = Math.abs(newOffset) <= 1;

        if (!animate) {
          gsap.set(slot, slotTweenProps(target));
          return;
        }

        // Hidden cards stay off-screen — never slide through the carousel.
        if (!isVisible && !wasVisible) {
          gsap.set(slot, {
            ...slotTweenProps(target),
            x: (newOffset > 0 ? 1 : -1) * metrics.spread * 2,
            opacity: 0,
          });
          return;
        }

        // Entering from off-screen on the active side.
        if (!wasVisible && isVisible) {
          gsap.set(slot, {
            x: (newOffset + direction) * metrics.spread,
            yPercent: -50,
            xPercent: -50,
            width: metrics.sideW,
            height: metrics.sideH,
            opacity: 0,
            zIndex: 1,
            "--card-mix": 0,
          });
          timeline.to(
            slot,
            {
              ...slotTweenProps(target),
              duration,
              ease: SLIDE_EASE,
              force3D: true,
            },
            0,
          );
          return;
        }

        // Exiting off-screen on the active side.
        if (wasVisible && !isVisible) {
          timeline.to(
            slot,
            {
              x: (oldOffset - direction) * metrics.spread,
              opacity: 0,
              width: metrics.sideW,
              height: metrics.sideH,
              zIndex: 0,
              "--card-mix": 0,
              duration,
              ease: SLIDE_EASE,
              force3D: true,
            },
            0,
          );
          return;
        }

        // Visible cards slide and resize together between center and side.
        timeline.to(
          slot,
          {
            ...slotTweenProps(target),
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

      const count = SHOWCASE_AGENTS.length;
      const normalized = (nextIndex + count) % count;
      if (normalized === displayIndexRef.current && options?.animate !== false) return;

      const animate = options?.animate !== false && !reducedMotionRef.current;
      const previousIndex = displayIndexRef.current;
      const direction = getSlideDirection(previousIndex, normalized, count);

      if (animate) isAnimatingRef.current = true;

      displayIndexRef.current = normalized;

      if (!animate) {
        setAnnouncedIndex(normalized);
      }

      if (options?.pulseButton === "prev") {
        pulseNavButton(prevBtnRef.current);
      } else if (options?.pulseButton === "next") {
        pulseNavButton(nextBtnRef.current);
      }

      const timeline = layoutCards(normalized, animate, previousIndex, direction);

      timeline.eventCallback("onComplete", () => {
        setAnnouncedIndex(normalized);
        isAnimatingRef.current = false;
      });

      if (!animate) {
        isAnimatingRef.current = false;
      }
    },
    [layoutCards, pulseNavButton],
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

    cardRefs.current.forEach((slot) => {
      if (!slot) return;
      gsap.set(slot, { top: "50%", left: "50%" });
    });

    layoutCards(0, false, 0, 1);
  }, [layoutCards]);

  useEffect(() => {
    const onResize = () =>
      layoutCards(
        displayIndexRef.current,
        false,
        displayIndexRef.current,
        1,
      );
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [layoutCards]);

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
    };
  }, []);

  const centerAgent = SHOWCASE_AGENTS[announcedIndex];
  const { mode: agentMode } = useRoleplayMode();

  return (
    <div
      ref={showcaseRef}
      className={styles.showcase}
      data-node-id="1088:4207"
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
        {SHOWCASE_AGENTS.map((agent, index) => (
          <div
            key={agent.name}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className={styles.showcaseCardSlot}
          >
            <AgentCard
              agent={agent}
              isCenter={index === announcedIndex}
              agentMode={agentMode}
            />
          </div>
        ))}
      </div>

      <div className={styles.showcaseNav} data-node-id="1088:4884">
        <button
          ref={prevBtnRef}
          type="button"
          className={styles.showcaseNavBtn}
          aria-label="Previous agent"
          onClick={() => goToPrevious({ pulseButton: true })}
          data-node-id="1088:4871"
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
          aria-label="Next agent"
          onClick={() => goToNext({ pulseButton: true })}
          data-node-id="1088:4865"
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
        Showing {centerAgent.name}, {centerAgent.role} at {centerAgent.company}
      </p>
    </div>
  );
}
