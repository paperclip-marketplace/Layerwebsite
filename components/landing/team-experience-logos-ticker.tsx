"use client";

import { useRef } from "react";
import styles from "./team-experience.module.css";
import { TEAM_LOGOS, type TeamLogo, type TeamLogoFit } from "./team-experience-logos";
import { useLandingLogoMarquee } from "./use-landing-logo-marquee";

function fitClass(fit: TeamLogoFit | undefined) {
  if (fit === "contain-bottom") return styles.logoImgContainBottom;
  if (fit === "cover") return styles.logoImgCover;
  return styles.logoImgContain;
}

function TeamLogoCell({
  logo,
  cellRef,
}: {
  logo: TeamLogo;
  cellRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={cellRef} className={styles.logoCell} data-name="Logo">
      <img
        src={logo.src}
        alt={logo.alt}
        width={136}
        height={64}
        className={`${styles.logoImg} ${fitClass(logo.fit)}`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function TeamExperienceLogosTicker() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const marqueeLogos = [...TEAM_LOGOS, ...TEAM_LOGOS];

  useLandingLogoMarquee({
    viewportRef,
    trackRef,
    cellsRef,
    activeClassName: styles.logoCellActive,
    enableMobileTouch: true,
  });

  return (
    <div
      className={styles.mobileTicker}
      data-logo-marquee
      data-name="Team Experience Logos Ticker"
    >
      <div ref={viewportRef} className={styles.marqueeViewport}>
        <div className={styles.fadeLeft} aria-hidden />
        <div ref={trackRef} className={styles.marqueeTrack} data-name="Logo Row">
          {marqueeLogos.map((logo, index) => (
            <TeamLogoCell
              key={`${logo.src}-${index}`}
              logo={logo}
              cellRef={(el) => {
                cellsRef.current[index] = el;
              }}
            />
          ))}
        </div>
        <div className={styles.fadeRight} aria-hidden />
      </div>
    </div>
  );
}
