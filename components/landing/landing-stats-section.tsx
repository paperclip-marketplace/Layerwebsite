"use client";

import { useEffect, useState } from "react";
import styles from "./landing-stats-section.module.css";
import { useCountUp, useInViewOnce } from "./use-count-up";

type StatCard = {
  id: string;
  label: string;
  targetValue: number;
  prefix?: string;
  unit: string;
  dataName: string;
  delayMs?: number;
};

const STAT_CARDS: StatCard[] = [
  {
    id: "ramp-time",
    label: "ramp time",
    targetValue: 6,
    unit: "months",
    dataName: "Ramp Time Section",
    delayMs: 0,
  },
  {
    id: "quota",
    label: "Quota attainment",
    targetValue: 54,
    unit: "%",
    dataName: "Quota Container",
    delayMs: 80,
  },
  {
    id: "customer-facing",
    label: "Time spent customer-facing",
    targetValue: 50,
    prefix: "<",
    unit: "%",
    dataName: "Customer Time Container",
    delayMs: 160,
  },
];

function StatCardView({
  card,
  animate,
}: {
  card: StatCard;
  animate: boolean;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!animate) {
      setActive(false);
      return;
    }

    const delay = card.delayMs ?? 0;
    if (delay === 0) {
      setActive(true);
      return;
    }

    const timer = window.setTimeout(() => setActive(true), delay);
    return () => window.clearTimeout(timer);
  }, [animate, card.delayMs]);

  const displayValue = useCountUp(card.targetValue, active);

  return (
    <article className={`${styles.card} landing-stats-card`} data-name={card.dataName}>
      <div className={styles.cardTitle}>
        <span className={styles.dot} aria-hidden />
        <p className={styles.label}>{card.label}</p>
      </div>
      <div className={styles.metric}>
        <p className={styles.value}>
          {card.prefix ? (
            <span className={styles.valuePrefix}>{card.prefix}</span>
          ) : null}
          {displayValue}
        </p>
        <p className={styles.unit}>{card.unit}</p>
      </div>
    </article>
  );
}

export function LandingStatsSection() {
  const [sectionRef, inView] = useInViewOnce<HTMLElement>(0.25);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} landing-stats-section`}
      aria-label="GTM performance statistics"
      data-name="Ramp Time Container"
    >
      {STAT_CARDS.map((card) => (
        <StatCardView key={card.id} card={card} animate={inView} />
      ))}
    </section>
  );
}
