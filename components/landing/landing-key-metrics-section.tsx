"use client";

import { useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import styles from "./landing-key-metrics-section.module.css";
import { LandingLeadershipMetricsSection } from "./landing-leadership-metrics-section";
import { LandingOptimizedImage } from "./landing-optimized-image";
import {
  usePinnedHorizontalScroll,
  usePinnedHorizontalScrollEnabled,
} from "./use-pinned-horizontal-scroll";

const METRIC_IMAGE_BASE = "/assets/images/landing/key-metrics";

type MetricCardVariant = "gray" | "peach";

type MetricCard = {
  id: string;
  image: string;
  imageAlt: string;
  variant: MetricCardVariant;
  imageFade: boolean;
  title: string;
  description: string;
  dataName: string;
};

const KEY_METRIC_CARDS: MetricCard[] = [
  {
    id: "ramp-time",
    image: `${METRIC_IMAGE_BASE}/metric-01.webp`,
    imageAlt: "Line chart showing reduced ramp time",
    variant: "gray",
    imageFade: true,
    title: "2-months ramp time",
    description: "Compress learning time through Roleplay and Simulation.",
    dataName: "Metric Container 1",
  },
  {
    id: "quota",
    image: `${METRIC_IMAGE_BASE}/metric-02.webp`,
    imageAlt: "Circular progress showing 90 percent quota attainment",
    variant: "peach",
    imageFade: true,
    title: "90% quota attainment",
    description:
      "The right message and the right moment, our Co-pilot lifts win rates.",
    dataName: "Metric Container 2",
  },
  {
    id: "hours-back",
    image: `${METRIC_IMAGE_BASE}/metric-03.webp`,
    imageAlt: "Circular diagram showing 15 hours saved per week",
    variant: "gray",
    imageFade: false,
    title: "15 hours back per rep per week",
    description: "Prep, CRM, follow-up, and admin move out of the way.",
    dataName: "Metric Container 3",
  },
  {
    id: "forecast",
    image: `${METRIC_IMAGE_BASE}/metric-04.webp`,
    imageAlt: "Forecast confidence visualization",
    variant: "peach",
    imageFade: true,
    title: "Higher forecast confidence",
    description:
      "Use deal context and more to know what is really likely to close.",
    dataName: "Metric Container 4",
  },
  {
    id: "playbook",
    image: `${METRIC_IMAGE_BASE}/metric-05.webp`,
    imageAlt: "Playbook adoption visualization",
    variant: "gray",
    imageFade: true,
    title: "Stronger playbook adoption",
    description: "Prep, CRM, follow-up, and admin move out of the way.",
    dataName: "Metric Container 5",
  },
];

function MetricCardView({ card }: { card: MetricCard }) {
  const cardClass =
    card.variant === "peach" ? styles.cardPeach : styles.cardGray;
  const fadeClass =
    card.variant === "peach" ? styles.imageFadePeach : styles.imageFadeGray;

  return (
    <article
      className={`${styles.card} ${cardClass}`}
      data-name={card.dataName}
      data-pin-scroll-card
    >
      <div className={styles.imageArea}>
        <LandingOptimizedImage
          src={card.image}
          alt={card.imageAlt}
          className={styles.image}
          width={456}
          height={368}
          sizes="(max-width: 900px) 80vw, 456px"
        />
        {card.imageFade ? <div className={fadeClass} aria-hidden /> : null}
      </div>
      <div className={styles.textBlock}>
        <p className={styles.title}>{card.title}</p>
        <p className={styles.description}>{card.description}</p>
      </div>
    </article>
  );
}

function MetricCardTrack({
  trackRef,
  translateX,
  pinEnabled,
}: {
  trackRef: RefObject<HTMLDivElement | null>;
  translateX: number;
  pinEnabled: boolean;
}) {
  return (
    <div
      ref={trackRef as RefObject<HTMLDivElement>}
      className={`${styles.track} landing-key-metrics-section__track ${pinEnabled ? styles.trackPinned : ""}`}
      data-pin-align
      role="list"
      style={
        pinEnabled
          ? { transform: `translate3d(${translateX}px, 0, 0)` }
          : undefined
      }
    >
      {KEY_METRIC_CARDS.map((card) => (
        <div key={card.id} role="listitem">
          <MetricCardView card={card} />
        </div>
      ))}
    </div>
  );
}

export function LandingKeyMetricsSection({
  children,
}: {
  children?: ReactNode;
}) {
  const pinEnabled = usePinnedHorizontalScrollEnabled();
  const headerRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [edgePadding, setEdgePadding] = useState(40);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const measure = () => {
      const pad = Number.parseFloat(getComputedStyle(header).paddingLeft);
      if (Number.isFinite(pad) && pad >= 0) {
        setEdgePadding(pad);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { translateX, spacerHeight } = usePinnedHorizontalScroll({
    cardCount: KEY_METRIC_CARDS.length,
    enabled: pinEnabled,
    spacerRef,
    trackRef,
    edgePadding,
    endAlign: "mirror",
    compactPin: true,
  });

  const stack = (
    <>
      <LandingLeadershipMetricsSection sectionRef={headerRef} />
      <section
        className={`${styles.section} landing-key-metrics-section ${pinEnabled ? styles.sectionPinned : ""}`}
        aria-label="Key revenue metrics"
        data-name="Key Metrics"
      >
        <MetricCardTrack
          trackRef={trackRef}
          translateX={pinEnabled ? translateX : 0}
          pinEnabled={pinEnabled}
        />
      </section>
      {children}
    </>
  );

  if (!pinEnabled) {
    return stack;
  }

  return (
    <div
      ref={spacerRef}
      className={styles.pinSpacer}
      style={spacerHeight != null ? { height: spacerHeight } : undefined}
    >
      <div className={styles.pinSticky} data-pin-sticky>
        {stack}
      </div>
    </div>
  );
}
