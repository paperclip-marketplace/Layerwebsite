"use client";

import { useRef } from "react";
import styles from "./our-client-section.module.css";
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
  { src: `${CLIENT_LOGO_BASE}/client-01.png`, alt: "Payhawk" },
  { src: `${CLIENT_LOGO_BASE}/client-02.png`, alt: "Modulr" },
  { src: `${CLIENT_LOGO_BASE}/client-03.png`, alt: "Risk Ledger" },
  { src: `${CLIENT_LOGO_BASE}/client-04.png`, alt: "Atlar" },
  { src: `${CLIENT_LOGO_BASE}/client-05.png`, alt: "Cronofy" },
  { src: `${CLIENT_LOGO_BASE}/client-06.png`, alt: "Vixio" },
  {
    src: `${CLIENT_LOGO_BASE}/client-07.png`,
    alt: "Rivero",
    fit: "contain-bottom",
  },
  { src: `${CLIENT_LOGO_BASE}/client-08.png`, alt: "Medfin" },
  { src: `${CLIENT_LOGO_BASE}/client-09.png`, alt: "Mecenat" },
  {
    src: `${CLIENT_LOGO_BASE}/client-10.png`,
    alt: "Times Higher Education",
  },
  { src: `${CLIENT_LOGO_BASE}/client-11.png`, alt: "Tacto" },
  { src: `${CLIENT_LOGO_BASE}/client-12.png`, alt: "Datamaran" },
  { src: `${CLIENT_LOGO_BASE}/client-13.png`, alt: "SALESmanago" },
  { src: `${CLIENT_LOGO_BASE}/client-14.png`, alt: "Atmio" },
  { src: `${CLIENT_LOGO_BASE}/client-15.png`, alt: "Legalfly" },
  { src: `${CLIENT_LOGO_BASE}/client-16.png`, alt: "9fin" },
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
      <img
        src={logo.src}
        alt={logo.alt}
        width={136}
        height={64}
        className={`${styles.logoImg} ${fitClass}`}
        loading="lazy"
        decoding="async"
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
