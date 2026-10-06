"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { LandingHeadingReveal } from "@/components/landing/landing-text-reveal";
import {
  usePinnedHorizontalScroll,
  usePinnedHorizontalScrollEnabled,
} from "@/components/landing/use-pinned-horizontal-scroll";
import {
  HowLayerWorksCardVisual,
  type HowLayerWorksCardId,
} from "@/components/lead/how-layer-works-card-visuals";
import { PricingSecurityCompliance } from "@/components/pricing/pricing-security-compliance";
import styles from "./why-layer.module.css";

type HowLayerWorksCard = {
  id: HowLayerWorksCardId;
  nodeId: string;
  title: string;
  description: string;
};

/** Figma 2395:36799 — card copy (visuals unchanged; order Improve → Execute → Build → Context). */
const HOW_LAYER_WORKS_CARDS: HowLayerWorksCard[] = [
  {
    id: "improve",
    nodeId: "2395:36825",
    title: "Ramp Faster",
    description:
      "Day-1 discovery practice on your personas, with paths mapped to your funnel.",
  },
  {
    id: "execute",
    nodeId: "2395:36840",
    title: "Launch Confident",
    description:
      "Guide every GTM moment. Get real-time support, insights, and next steps when they matter most.",
  },
  {
    id: "build",
    nodeId: "2395:37124",
    title: "Win More",
    description:
      "Transform your GTM knowledge into actionable playbooks your entire team can follow.",
  },
  {
    id: "context",
    nodeId: "2395:37186",
    title: "Plug and Play",
    description:
      "Plug Layer into your own data & over 500+ integrations. Use pre-built connections for common apps.",
  },
];

function HowLayerWorksCard({ card }: { card: HowLayerWorksCard }) {
  const isImprove = card.id === "improve";
  const isBuild = card.id === "build";
  return (
    <article
      className={`${styles.card}${isImprove ? ` ${styles.cardImprove}` : ""}${isBuild ? ` ${styles.cardBuild}` : ""}`}
      data-pin-scroll-card
      data-node-id={card.nodeId}
    >
      <HowLayerWorksCardVisual id={card.id} />
      <div className={styles.copy}>
        <h3 className={styles.cardTitle}>{card.title}</h3>
        <p className={styles.cardDescription}>{card.description}</p>
      </div>
    </article>
  );
}

function CardTrack({
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
      className={`${styles.track} landing-lead-how-layer-works-carousel__track ${pinEnabled ? styles.trackPinned : ""}`}
      data-name="Frame 1171276378"
      data-node-id="1822:22487"
      data-pin-align
      role="list"
      style={
        pinEnabled
          ? { transform: `translate3d(${translateX}px, 0, 0)` }
          : undefined
      }
    >
      {HOW_LAYER_WORKS_CARDS.map((card) => (
        <div key={card.id} role="listitem">
          <HowLayerWorksCard card={card} />
        </div>
      ))}
    </div>
  );
}

function HowLayerWorksBody({
  headerRef,
  trackRef,
  translateX,
  pinEnabled,
}: {
  headerRef: React.RefObject<HTMLElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  translateX: number;
  pinEnabled: boolean;
}) {
  return (
    <div
      className="landing-what-we-do-split landing-band-left"
      data-name="Sub-section Container"
      data-node-id="2395:35506"
    >
      <section
        ref={headerRef}
        className={`${styles.copySection} landing-how-layer-works-section`}
        aria-labelledby="why-layer-heading"
        data-name="What We Do Container"
        data-node-id="2395:35507"
      >
        <p className={styles.eyebrow} data-node-id="2395:35508">
          why layer
        </p>

        <LandingHeadingReveal
          as="h2"
          id="why-layer-heading"
          className={styles.headline}
          data-node-id="2395:35509"
        >
          <span className={styles.headlineLine}>Your best GTM thinking,</span>
          <span className={styles.headlineLine}>
            built into{" "}
            <span className={styles.highlight}>every rep!</span>
          </span>
        </LandingHeadingReveal>
      </section>

      <section
        className={`${styles.carouselSection} landing-lead-how-layer-works-carousel ${pinEnabled ? styles.sectionPinned : ""}`}
        aria-label="How Layer Works steps"
        data-name="What We Do Container"
        data-node-id="2395:36823"
      >
        <CardTrack
          trackRef={trackRef}
          translateX={translateX}
          pinEnabled={pinEnabled}
        />
      </section>
    </div>
  );
}

/** Figma 1822:22480 — How Layer Works (same as lead capture; exported as WhyLayer). */
export function WhyLayer() {
  const pinEnabled = usePinnedHorizontalScrollEnabled();
  const headerRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [edgePadding, setEdgePadding] = useState(32);

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
    cardCount: HOW_LAYER_WORKS_CARDS.length,
    enabled: pinEnabled,
    spacerRef,
    trackRef,
    edgePadding,
    endAlign: "mirror",
    compactPin: true,
  });

  const stack = (
    <div className={`${styles.gutterShell} why-layer-shell lead-how-layer-works-shell`}>
      <div className={styles.gutterFrame} aria-hidden />
      <HowLayerWorksBody
        headerRef={headerRef}
        trackRef={trackRef}
        translateX={pinEnabled ? translateX : 0}
        pinEnabled={pinEnabled}
      />
      <div className={styles.securityComplianceWrap}>
        <PricingSecurityCompliance />
      </div>
    </div>
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
