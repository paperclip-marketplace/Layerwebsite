"use client";

import { useRef } from "react";
import { getSettingsPageIntegrations } from "@/lib/integrations/config";
import styles from "./integration-section.module.css";
import { useLandingLogoMarquee } from "./use-landing-logo-marquee";

const SETTINGS_INTEGRATION_LOGOS = getSettingsPageIntegrations().map(
  (integration) => ({
    id: integration.id,
    src: integration.logoUrl,
    alt: integration.name,
  }),
);

function IntegrationLogoCell({
  logo,
  cellRef,
}: {
  logo: (typeof SETTINGS_INTEGRATION_LOGOS)[number];
  cellRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={cellRef} className={styles.logoCell}>
      <img
        src={logo.src}
        alt={logo.alt}
        width={136}
        height={64}
        className={styles.logoImg}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function IntegrationLogosMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const marqueeLogos = [
    ...SETTINGS_INTEGRATION_LOGOS,
    ...SETTINGS_INTEGRATION_LOGOS,
  ];

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
      data-node-id="513:1690"
    >
      <div ref={viewportRef} className={styles.marqueeViewport}>
        <div className={styles.fadeLeft} aria-hidden data-node-id="513:1701" />
        <div
          ref={trackRef}
          className={styles.marqueeTrack}
          data-name="Logo Row"
          data-node-id="513:1691"
        >
          {marqueeLogos.map((logo, index) => (
            <IntegrationLogoCell
              key={`${logo.id}-${index}`}
              logo={logo}
              cellRef={(el) => {
                cellsRef.current[index] = el;
              }}
            />
          ))}
        </div>
        <div className={styles.fadeRight} aria-hidden data-node-id="513:1700" />
      </div>
    </div>
  );
}
