"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./landing-split-section.module.css";
import { PerformWidgetExpanded } from "./perform-widget-expanded";
import {
  LandingOptimizedImage,
  prefetchOptimizedImages,
} from "./landing-optimized-image";
import {
  usePinnedHorizontalScroll,
  usePinnedHorizontalScrollEnabled,
} from "./use-pinned-horizontal-scroll";

const ASSET = "/assets/images/landing/split-section";

type SplitCardConfig = {
  id: string;
  title: string;
  index: string;
  description: ReactNode;
  backgrounds: string[];
  bgGradient?: boolean;
  mainImage?: string;
  mainAlt?: string;
  fadeClass?: string;
  secondary?: {
    src: string;
    alt: string;
    wrapClass: string;
    imgClass: string;
  };
  improveLayout?: boolean;
  performLayout?: boolean;
};

const SPLIT_CARDS: SplitCardConfig[] = [
  {
    id: "prepare",
    title: "Prepare",
    index: "01",
    description: (
      <>
        <span>Walk into </span>
        <span className={styles.emphasis}>every important conversation</span>
        <span> with </span>
        <span className={styles.emphasis}>
          the context, risks, and recommended next-best action
        </span>
        <span> to </span>
        <span className={styles.emphasis}>win the stage.</span>
      </>
    ),
    backgrounds: [`${ASSET}/prepare-bg.webp`],
    bgGradient: true,
    mainImage: `${ASSET}/prepare-main.webp`,
    mainAlt:
      "Prepare workflow showing conversation context and next-best actions",
    fadeClass: styles.visualFadeDark,
    secondary: {
src: `${ASSET}/prepare-secondary-sm.webp`,
      alt: "Recommended approach panel",
      wrapClass: styles.prepareSecondary,
      imgClass: styles.prepareSecondaryImg,
    },
  },
  {
    id: "practice",
    title: "Practice",
    index: "02",
    description: (
      <>
        Rehearse discovery, objections, qualification, negotiation, pricing,
        renewals, and{" "}
        <span className={styles.emphasis}>competitive moments before</span> the
        stakes are real.
      </>
    ),
    backgrounds: [`${ASSET}/practice-bg.webp`],
    mainImage: `${ASSET}/practice-main.webp`,
    mainAlt: "Practice roleplay session interface",
    fadeClass: styles.visualFadeLight,
    secondary: {
      src: `${ASSET}/practice-secondary-sm.webp`,
      alt: "Roleplay participant card",
      wrapClass: styles.practiceSecondary,
      imgClass: styles.practiceSecondaryImg,
    },
  },
  {
    id: "perform",
    title: "Perform",
    index: "03",
    description: (
      <>
        <span className={styles.emphasis}>
          Get guidance, coaching cues, approvals
        </span>
        {" and next-step"}
        <br />
        {"support "}
        <span className={styles.emphasis}>in the moment.</span>
      </>
    ),
    backgrounds: [`${ASSET}/perform-bg.webp`],
    performLayout: true,
  },
  {
    id: "follow-up",
    title: "Follow up",
    index: "04",
    description: (
      <>
        <span className={styles.emphasis}>
          Draft follow-ups, update CRM, book next the meeting.
        </span>
        <br />
        Increase <span className={styles.emphasis}>customer time.</span>
      </>
    ),
    backgrounds: [`${ASSET}/follow-up-bg.webp`],
    mainImage: `${ASSET}/follow-up-main.webp`,
    mainAlt: "Follow-up and CRM update workflow",
    fadeClass: styles.visualFadeFollowUp,
  },
  {
    id: "improve",
    title: "Improve",
    index: "05",
    description: (
      <>
        Learn from
        <span className={styles.emphasis}> every interaction.</span>
        <br />
        Coached
        <span className={styles.emphasis}> after every call.</span>
      </>
    ),
    backgrounds: [`${ASSET}/improve-bg.webp`],
    mainImage: `${ASSET}/improve-main.webp`,
    mainAlt: "Session list in Layer",
    improveLayout: true,
  },
];

function slideAssets(card: SplitCardConfig): string[] {
  const srcs = [...card.backgrounds];
  if (card.mainImage) srcs.push(card.mainImage);
  if (card.secondary?.src) srcs.push(card.secondary.src);
  if (card.performLayout) {
    srcs.push(
      `${ASSET}/perform-main.webp`,
      `${ASSET}/perform-widget/texture.webp`,
      `${ASSET}/perform-widget/agent-avatar.webp`,
    );
  }
  if (card.improveLayout) {
    srcs.push(`${ASSET}/improve-main.webp`, `${ASSET}/improve-secondary-sm.webp`);
  }
  return srcs;
}

function PerformCardVisual({ priority }: { priority?: boolean }) {
  return (
    <div
      className={styles.cardVisual}
      data-name="Perform Content"
      data-node-id="713:277"
    >
      <div
        className={styles.visualShell}
        data-name="Perform Content Row"
        data-node-id="713:278"
      >
        <div
          className={styles.visualMain}
          data-name="Perform Image"
          data-node-id="713:279"
        >
          <LandingOptimizedImage
            src={`${ASSET}/perform-main.webp`}
            alt="Live performance coaching interface"
            fill
            priority={priority}
            className={styles.visualMainImg}
            sizes="(max-width: 900px) 100vw, 1024px"
          />
        </div>
        <div
          className={`${styles.visualFade} ${styles.visualFadePerform}`}
          data-name="Perform Highlight"
          data-node-id="713:280"
          aria-hidden
        />
        <div
          className={styles.performWidget}
          data-name="Widget / Expanded"
          data-node-id="713:281"
        >
          <PerformWidgetExpanded priority={priority} />
        </div>
      </div>
    </div>
  );
}

function ImproveCardVisual({ priority }: { priority?: boolean }) {
  return (
    <div
      className={styles.cardVisual}
      data-name="Improve Content"
      data-node-id="713:376"
    >
      <div className={styles.improveContent}>
        <div
          className={styles.visualShell}
          data-name="Improve Content Row"
          data-node-id="713:377"
        >
          <div
            className={styles.visualMain}
            data-name="Improve Main Image"
            data-node-id="713:378"
          >
            <LandingOptimizedImage
              src={`${ASSET}/improve-main.webp`}
              alt="Layer sessions coaching dashboard"
              fill
              priority={priority}
              className={styles.visualMainImg}
              sizes="(max-width: 900px) 100vw, 1024px"
            />
          </div>
        </div>

        <div
          className={styles.improveHighlight}
          data-name="Improve Highlight"
          data-node-id="713:379"
        >
          <div
            className={styles.improveSubContent}
            data-name="Improve Sub Content"
            data-node-id="713:380"
          >
            <div
              className={styles.improveSecondaryFrame}
              data-name="Improve Secondary Image"
              data-node-id="713:381"
            >
              <div className={styles.improveSecondaryClip}>
                <LandingOptimizedImage
                  src={`${ASSET}/improve-secondary-sm.webp`}
                  alt="Discovery call coaching session review"
                  fill
                  className={styles.improveSecondaryImg}
                  sizes="(max-width: 900px) 80vw, 420px"
                />
              </div>
            </div>
            <div
              className={styles.improveFeedbackGradient}
              data-name="Session Feedback Container"
              data-node-id="713:382"
            >
              <div
                className={styles.improveFeedbackRow}
                data-name="Feedback Row"
                data-node-id="713:383"
              >
                <div className={styles.improveFeedbackCopy}>
                  <p className={styles.improveFeedbackLabel}>
                    How was the sessions? Let us know
                  </p>
                  <button
                    type="button"
                    className={styles.improveFeedbackBtnOutline}
                  >
                    <span
                      className={`material-symbols-rounded ${styles.improveFeedbackIcon}`}
                      aria-hidden
                    >
                      feedback
                    </span>
                    Share Feedback
                  </button>
                </div>
                <button
                  type="button"
                  className={styles.improveFeedbackBtnPrimary}
                >
                  Coach Me
                  <span
                    className={`material-symbols-rounded ${styles.improveFeedbackIcon}`}
                    aria-hidden
                  >
                    back_hand
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SplitCard({
  card,
  priority,
}: {
  card: SplitCardConfig;
  priority?: boolean;
}) {
  return (
    <div className={styles.cardOuter} data-pin-scroll-card>
      <article
        className={`${styles.card} ${card.id === "prepare" ? styles.cardPrepare : ""} ${card.id === "practice" ? styles.cardPractice : ""} ${card.id === "improve" ? styles.cardImprove : ""} ${card.id === "perform" ? styles.cardPerform : ""} ${card.id === "follow-up" ? styles.cardFollowUp : ""}`}
        data-node-id={
          card.id === "prepare"
            ? "513:1575"
            : card.id === "practice"
              ? "513:1639"
              : card.id === "perform"
                ? "713:271"
                : card.id === "improve"
                  ? "713:370"
                  : undefined
        }
        data-name={`${card.title} card`}
      >
        <div className={styles.cardBg} aria-hidden>
          {card.backgrounds.map((src, i) => (
            <LandingOptimizedImage
              key={src}
              src={src}
              alt=""
              fill
              priority={priority && i === 0}
              className={`${styles.cardBgImg} ${i > 0 ? styles.cardBgImgOverlay : ""}`}
              sizes="(max-width: 900px) 100vw, 56vw"
            />
          ))}
          {card.bgGradient ? <div className={styles.cardBgGradient} /> : null}
        </div>

        <header className={styles.cardHeader}>
          <div className={styles.cardTitleRow}>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <span className={styles.cardIndex} aria-hidden>
              {card.index}
            </span>
          </div>
          <p className={styles.cardDescription}>{card.description}</p>
        </header>

        {card.improveLayout ? (
          <ImproveCardVisual priority={priority} />
        ) : card.performLayout ? (
          <PerformCardVisual priority={priority} />
        ) : (
          <div className={styles.cardVisual}>
            <div className={styles.visualShell}>
              <div className={styles.visualMain}>
                {card.mainImage ? (
                  <LandingOptimizedImage
                    src={card.mainImage}
                    alt={card.mainAlt ?? ""}
                    fill
                    priority={priority}
                    className={styles.visualMainImg}
                    sizes="(max-width: 900px) 100vw, 1024px"
                  />
                ) : null}
              </div>
              {card.fadeClass ? (
                <div className={`${styles.visualFade} ${card.fadeClass}`} />
              ) : null}
              {card.secondary ? (
                <div
                  className={`${styles.visualSecondary} ${card.secondary.wrapClass}`}
                >
                  <LandingOptimizedImage
                    src={card.secondary.src}
                    alt={card.secondary.alt}
                    fill
                    priority={priority}
                    className={card.secondary.imgClass}
                    sizes="(max-width: 900px) 50vw, 360px"
                  />
                </div>
              ) : null}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

function SplitCardTrack({
  trackRef,
  translateX,
  pinEnabled,
  activeIndex,
}: {
  trackRef: React.RefObject<HTMLDivElement>;
  translateX: number;
  pinEnabled: boolean;
  activeIndex: number;
}) {
  return (
    <div
      ref={trackRef}
      className={`${styles.track} landing-split-section__track ${pinEnabled ? styles.trackPinned : ""}`}
      role="list"
      style={
        pinEnabled
          ? { transform: `translate3d(${translateX}px, 0, 0)` }
          : undefined
      }
    >
      {SPLIT_CARDS.map((card, i) => (
        <div key={card.id} role="listitem">
          <SplitCard card={card} priority={i === 0 && activeIndex === 0} />
        </div>
      ))}
    </div>
  );
}

export function LandingSplitSection() {
  const pinEnabled = usePinnedHorizontalScrollEnabled();
  const spacerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { translateX, spacerHeight } = usePinnedHorizontalScroll({
    cardCount: SPLIT_CARDS.length,
    enabled: pinEnabled,
    spacerRef,
    trackRef,
  });

  useEffect(() => {
    if (!pinEnabled) {
      prefetchOptimizedImages(slideAssets(SPLIT_CARDS[0]));
      prefetchOptimizedImages(slideAssets(SPLIT_CARDS[1]));
      return;
    }
    const next = Math.min(activeIndex + 1, SPLIT_CARDS.length - 1);
    prefetchOptimizedImages(slideAssets(SPLIT_CARDS[next]));
  }, [activeIndex, pinEnabled]);

  useEffect(() => {
    if (!pinEnabled || !trackRef.current) return;
    const cardWidth = trackRef.current.scrollWidth / SPLIT_CARDS.length || 1;
    const idx = Math.min(
      SPLIT_CARDS.length - 1,
      Math.max(0, Math.round(Math.abs(translateX) / cardWidth)),
    );
    setActiveIndex(idx);
  }, [translateX, pinEnabled]);

  return (
    <section
      className={`${styles.section} landing-split-section ${pinEnabled ? styles.sectionPinned : ""}`}
      aria-label="How Layer supports your team"
      data-name="Split Section"
      data-node-id="513:1653"
    >
      {pinEnabled ? (
        <div
          ref={spacerRef}
          className={styles.pinSpacer}
          style={spacerHeight != null ? { height: spacerHeight } : undefined}
        >
          <div className={styles.pinSticky} data-pin-sticky>
            <SplitCardTrack
              trackRef={trackRef}
              translateX={translateX}
              pinEnabled
              activeIndex={activeIndex}
            />
          </div>
        </div>
      ) : (
        <SplitCardTrack
          trackRef={trackRef}
          translateX={0}
          pinEnabled={false}
          activeIndex={0}
        />
      )}
    </section>
  );
}
