"use client";

import { useRef } from "react";
import styles from "./landing-key-metrics-section.module.css";
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
    image: `${METRIC_IMAGE_BASE}/metric-01.png`,
    imageAlt: "Line chart showing reduced ramp time",
    variant: "gray",
    imageFade: true,
    title: "2-months ramp time",
    description: "Compress learning time through Roleplay and Simulation.",
    dataName: "Metric Container 1",
  },
  {
    id: "quota",
    image: `${METRIC_IMAGE_BASE}/metric-02.png`,
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
    image: `${METRIC_IMAGE_BASE}/metric-03.png`,
    imageAlt: "Circular diagram showing 15 hours saved per week",
    variant: "gray",
    imageFade: false,
    title: "15 hours back per rep per week",
    description: "Prep, CRM, follow-up, and admin move out of the way.",
    dataName: "Metric Container 3",
  },
  {
    id: "forecast",
    image: `${METRIC_IMAGE_BASE}/metric-04.png`,
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
    image: `${METRIC_IMAGE_BASE}/metric-05.png`,
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
        <img
          src={card.image}
          alt={card.imageAlt}
          className={styles.image}
          width={456}
          height={368}
          loading="lazy"
          decoding="async"
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
  trackRef: React.RefObject<HTMLDivElement | null>;
  translateX: number;
  pinEnabled: boolean;
}) {
  return (
    <div
      ref={trackRef}
      className={`${styles.track} landing-key-metrics-section__track ${pinEnabled ? styles.trackPinned : ""}`}
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

export function LandingKeyMetricsSection() {
  const pinEnabled = usePinnedHorizontalScrollEnabled();
  const spacerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { translateX, spacerHeight } = usePinnedHorizontalScroll({
    cardCount: KEY_METRIC_CARDS.length,
    enabled: pinEnabled,
    spacerRef,
    trackRef,
  });

  return (
    <section
      className={`${styles.section} landing-key-metrics-section ${pinEnabled ? styles.sectionPinned : ""}`}
      aria-label="Key revenue metrics"
      data-name="Key Metrics"
    >
      {pinEnabled ? (
        <div
          ref={spacerRef}
          className={styles.pinSpacer}
          style={spacerHeight != null ? { height: spacerHeight } : undefined}
        >
          <div className={styles.pinSticky} data-pin-sticky>
            <MetricCardTrack
              trackRef={trackRef}
              translateX={translateX}
              pinEnabled
            />
          </div>
        </div>
      ) : (
        <MetricCardTrack
          trackRef={trackRef}
          translateX={0}
          pinEnabled={false}
        />
      )}
    </section>
  );
}
