"use client";

import { useRef } from "react";
import styles from "./our-client-section.module.css";
import { LandingOptimizedImage } from "./landing-optimized-image";
import { useLandingLogoMarquee } from "./use-landing-logo-marquee";

const CLIENT_LOGO_BASE = "/assets/images/landing/clients";

type LogoFit = "contain" | "contain-bottom";

type ClientLogo = {
  src: string;
  alt: string;
  fit?: LogoFit;
};

/** Figma 513:2104 — single horizontal row (all client logos). */
const CLIENT_LOGOS: ClientLogo[] = [
  { src: `${CLIENT_LOGO_BASE}/client-01.webp`, alt: "Payhawk" },
  { src: `${CLIENT_LOGO_BASE}/client-02.webp`, alt: "Modulr" },
  { src: `${CLIENT_LOGO_BASE}/client-03.webp`, alt: "Risk Ledger" },
  { src: `${CLIENT_LOGO_BASE}/client-04.webp`, alt: "Atlar" },
  { src: `${CLIENT_LOGO_BASE}/client-05.webp`, alt: "Cronofy" },
  { src: `${CLIENT_LOGO_BASE}/client-06.webp`, alt: "Vixio" },
  {
    src: `${CLIENT_LOGO_BASE}/client-07.webp`,
    alt: "Rivero",
    fit: "contain-bottom",
  },
  { src: `${CLIENT_LOGO_BASE}/client-08.webp`, alt: "Medfin" },
  { src: `${CLIENT_LOGO_BASE}/client-09.webp`, alt: "Mecenat" },
  {
    src: `${CLIENT_LOGO_BASE}/client-10.webp`,
    alt: "Times Higher Education",
  },
  { src: `${CLIENT_LOGO_BASE}/client-11.webp`, alt: "Tacto" },
  { src: `${CLIENT_LOGO_BASE}/client-12.webp`, alt: "Datamaran" },
  { src: `${CLIENT_LOGO_BASE}/client-13.webp`, alt: "SALESmanago" },
  { src: `${CLIENT_LOGO_BASE}/client-14.webp`, alt: "Atmio" },
  { src: `${CLIENT_LOGO_BASE}/client-15.webp`, alt: "Legalfly" },
  { src: `${CLIENT_LOGO_BASE}/client-16.webp`, alt: "9fin" },
];

function ClientLogoCell({
  logo,
  cellRef,
}: {
  logo: ClientLogo;
  cellRef: (el: HTMLDivElement | null) => void;
}) {
  const fitClass =
    logo.fit === "contain-bottom"
      ? styles.logoImgContainBottom
      : styles.logoImgContain;

  return (
    <div ref={cellRef} className={styles.logoCell} data-name="Logo">
      <LandingOptimizedImage
        src={logo.src}
        alt={logo.alt}
        width={136}
        height={64}
        className={`${styles.logoImg} ${fitClass}`}
        sizes="136px"
      />
    </div>
  );
}

export function OurClientLogosTicker() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const marqueeLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  useLandingLogoMarquee({
    viewportRef,
    trackRef,
    cellsRef,
    activeClassName: styles.logoCellActive,
  });

  return (
    <div
      className={styles.tickerWrap}
      data-logo-marquee
      data-name="Forward Thinking Logos"
      data-node-id="513:1197"
    >
      <div ref={viewportRef} className={styles.marqueeViewport}>
        <div className={styles.fadeLeft} aria-hidden data-node-id="513:1208" />
        <div
          ref={trackRef}
          className={styles.marqueeTrack}
          data-name="Logo Row"
          data-node-id="513:1198"
        >
          {marqueeLogos.map((logo, index) => (
            <ClientLogoCell
              key={`${logo.src}-${index}`}
              logo={logo}
              cellRef={(el) => {
                cellsRef.current[index] = el;
              }}
            />
          ))}
        </div>
        <div className={styles.fadeRight} aria-hidden data-node-id="513:1207" />
      </div>
    </div>
  );
}
