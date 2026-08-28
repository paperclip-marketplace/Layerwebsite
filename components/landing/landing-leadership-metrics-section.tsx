"use client";

import type { Ref } from "react";
import { LandingHeadingReveal } from "./landing-text-reveal";
import styles from "./landing-leadership-metrics-section.module.css";

export function LandingLeadershipMetricsSection({
  sectionRef,
}: {
  sectionRef?: Ref<HTMLElement>;
} = {}) {
  return (
    <section
      ref={sectionRef}
      className={`${styles.section} landing-leadership-metrics-section`}
      aria-labelledby="landing-leadership-metrics-heading"
      data-name="Leadership Metrics"
    >
      <p className={styles.eyebrow}>Metrics</p>

      <div className={styles.copyBlock}>
        <LandingHeadingReveal
          id="landing-leadership-metrics-heading"
          className={styles.headline}
        >
          Built to improve the metrics revenue{" "}
          <span className={styles.highlight}>leaders already care about.</span>
        </LandingHeadingReveal>
      </div>
    </section>
  );
}
