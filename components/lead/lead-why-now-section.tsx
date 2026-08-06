"use client";

import { useEffect, useRef, useState } from "react";
import {
  LandingHeadingReveal,
  LandingSubheadingReveal,
} from "@/components/landing/landing-text-reveal";
import { LEAD_WHY_NOW_ASSETS } from "./lead-why-now-assets";
import styles from "./lead-why-now-section.module.css";

/** Figma 1822:22940 — Why Now */
export function LeadWhyNowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // Inside the How Layer Works pin stack this section can cross scroll
  // thresholds while still off-screen — wait until it's actually in view.
  const [revealReady, setRevealReady] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || revealReady) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          setRevealReady(true);
          observer.disconnect();
        }
      },
      { threshold: [0, 0.2, 0.35, 0.5, 0.65] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [revealReady]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} lead-why-now-section landing-full-bleed-strokes`}
      aria-labelledby="lead-why-now-heading"
      data-name="Why Now"
      data-node-id="1822:22940"
    >
      <div className={styles.backdrop} aria-hidden>
        <div className={styles.gradient} />
        {/* SVG texture — keep as img (vector; not a CDN raster) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LEAD_WHY_NOW_ASSETS.launchKey}
          alt=""
          className={styles.texture}
        />
      </div>

      <div className={styles.copyBlock}>
        <p className={styles.eyebrow} data-node-id="1822:22941">
          why now
        </p>

        <div
          className={`landing-copy-row ${styles.heroRow}`}
          data-name="Why Now Text"
          data-node-id="1822:22942"
        >
          <LandingHeadingReveal
            as="h2"
            id="lead-why-now-heading"
            className={`${styles.headline} landing-copy-headline`}
            data-node-id="1822:22943"
            ready={revealReady}
          >
            <span className={styles.headlineLine}>Start in hours,</span>
            <span className={styles.headlineLine}>not days</span>
          </LandingHeadingReveal>
          <LandingSubheadingReveal
            className={`${styles.description} landing-copy-aside`}
            data-node-id="1822:22944"
            ready={revealReady}
          >
            Get started easily with minimal setup and hands-on support to
            explore what AI Agents can unlock for your business.
          </LandingSubheadingReveal>
        </div>
      </div>
    </section>
  );
}
