"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./landing-failure-points-section.module.css";

const FAILURE_POINTS = [
  {
    index: "01",
    text: "Ramp requires real practice. Real practice costs pipeline.",
  },
  {
    index: "02",
    text: "Preparation is inconsistent.",
  },
  {
    index: "03",
    text: "Deal-defining moments are handled inconsistently.",
  },
  {
    index: "04",
    text: "Coaching depends on manager time and skill.",
  },
  {
    index: "05",
    text: "Admin steals customer time.",
  },
] as const;

function findCenteredRowIndex(
  rows: readonly (HTMLElement | null)[],
): number {
  const viewportCenter = window.innerHeight / 2;
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  rows.forEach((row, index) => {
    if (!row) {
      return;
    }

    const rect = row.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      return;
    }

    const rowCenter = rect.top + rect.height / 2;
    const distance = Math.abs(rowCenter - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

export function LandingFailurePointsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const [scrollActiveIndex, setScrollActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const activeIndex = hoverIndex ?? scrollActiveIndex;

  const updateScrollActiveIndex = useCallback(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const sectionRect = section.getBoundingClientRect();
    const inView =
      sectionRect.bottom > 0 && sectionRect.top < window.innerHeight;

    if (!inView) {
      return;
    }

    setScrollActiveIndex(findCenteredRowIndex(rowRefs.current));
  }, []);

  const scheduleScrollUpdate = useCallback(() => {
    if (rafRef.current != null) {
      return;
    }

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      updateScrollActiveIndex();
    });
  }, [updateScrollActiveIndex]);

  useEffect(() => {
    window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
    window.addEventListener("resize", scheduleScrollUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleScrollUpdate);
      window.removeEventListener("resize", scheduleScrollUpdate);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [scheduleScrollUpdate]);

  useLayoutEffect(() => {
    updateScrollActiveIndex();

    const rows = rowRefs.current.filter(Boolean) as HTMLElement[];
    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(scheduleScrollUpdate, {
            root: null,
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
          })
        : null;

    rows.forEach((row) => observer?.observe(row));
    if (sectionRef.current) {
      observer?.observe(sectionRef.current);
    }

    return () => observer?.disconnect();
  }, [scheduleScrollUpdate, updateScrollActiveIndex]);

  const setRowRef = useCallback((index: number, node: HTMLElement | null) => {
    rowRefs.current[index] = node;
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} landing-failure-points-section`}
      aria-label="Current failure points"
      data-name="Failure Points Container"
    >
      <div className={styles.list} role="list" onMouseLeave={() => setHoverIndex(null)}>
        {FAILURE_POINTS.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <article
              key={item.index}
              ref={(node) => setRowRef(index, node)}
              className={`${styles.row} ${isActive ? styles.rowActive : ""}`}
              data-name="Failure Point"
              onMouseEnter={() => setHoverIndex(index)}
              onFocus={() => setHoverIndex(index)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setHoverIndex(null);
                }
              }}
              tabIndex={0}
              role="listitem"
              aria-current={isActive ? "true" : undefined}
            >
              <div
                className={`${styles.rowBg} ${isActive ? styles.rowBgVisible : ""}`}
                aria-hidden
              >
                <div className={styles.rowBgPeach} />
                <div className={styles.rowBgGradient} />
                <div className={styles.rowBgGrain} />
                <div className={styles.rowBgOverlay} />
              </div>

              <p className={styles.index}>[ {item.index} ]</p>
              <p className={styles.statement}>{item.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
