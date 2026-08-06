"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  LandingHeadingReveal,
  LandingSubheadingReveal,
} from "@/components/landing/landing-text-reveal";
import {
  usePinnedHorizontalScroll,
  usePinnedHorizontalScrollEnabled,
} from "@/components/landing/use-pinned-horizontal-scroll";
import {
  HowLayerWorksCardVisual,
  type HowLayerWorksCardId,
} from "./how-layer-works-card-visuals";
import { LeadWhyNowSection } from "./lead-why-now-section";
import styles from "./lead-how-layer-works-section.module.css";

type HowLayerWorksCard = {
  id: HowLayerWorksCardId;
  nodeId: string;
  title: string;
  description: string;
};

const HOW_LAYER_WORKS_CARDS: HowLayerWorksCard[] = [
  {
    id: "context",
    nodeId: "1822:23889",
    title: "Context",
    description:
      "Bring your GTM context together. Connect your data, tools, knowledge, and best practices in one place.",
  },
  {
    id: "build",
    nodeId: "1822:23895",
    title: "Build",
    description:
      "Your GTM knowledge, operationalized. Turn best practices into skills and playbooks.",
  },
  {
    id: "execute",
    nodeId: "1822:23957",
    title: "Execute",
    description:
      "Guide every GTM moment. Get real-time support, insights, and next steps when they matter most.",
  },
  {
    id: "deploy",
    nodeId: "1822:24241",
    title: "Deploy",
    description:
      "Give every role its own AI agent. Equip every team member with personalized context and capabilities.",
  },
  {
    id: "improve",
    nodeId: "1822:24326",
    title: "Improve",
    description:
      "Make every interaction better. Turn conversations and outcomes into coaching and continuous improvement.",
  },
];

function HowLayerWorksCard({ card }: { card: HowLayerWorksCard }) {
  const isImprove = card.id === "improve";
  return (
    <article
      className={`${styles.card}${isImprove ? ` ${styles.cardImprove}` : ""}`}
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
      data-node-id="1822:22480"
    >
      <section
        ref={headerRef}
        className={`${styles.copySection} landing-how-layer-works-section`}
        aria-labelledby="lead-how-layer-works-heading"
        data-name="What We Do Container"
        data-node-id="1822:22481"
      >
        <p className={styles.eyebrow} data-node-id="1822:22482">
          How Layer Works
        </p>

        <div
          className="landing-copy-row"
          data-name="What We Do Description"
          data-node-id="1822:22483"
        >
          <LandingHeadingReveal
            as="h2"
            id="lead-how-layer-works-heading"
            className={`${styles.headline} landing-copy-headline`}
            data-node-id="1822:22484"
          >
            <span className={styles.headlineLine}>One platform. Every</span>
            <span className={`${styles.headlineLine} ${styles.highlight}`}>
              GTM advantage.
            </span>
          </LandingHeadingReveal>
          <LandingSubheadingReveal
            className={`${styles.description} landing-copy-aside`}
            data-node-id="1822:22485"
          >
            Bring your GTM knowledge, workflows, and tools together to equip
            every team member with AI that helps them prepare, perform, and
            improve.
          </LandingSubheadingReveal>
        </div>
      </section>

      <section
        className={`${styles.carouselSection} landing-lead-how-layer-works-carousel ${pinEnabled ? styles.sectionPinned : ""}`}
        aria-label="How Layer Works steps"
        data-name="What We Do Container"
        data-node-id="1822:22486"
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

/**
 * Figma 1822:22480 + 1822:22940 — How Layer Works then Why Now immediately below.
 * On desktop pin, Why Now stays with the block (visible under the cards) while
 * the track scrubs horizontally — same as the top copy.
 */
export function LeadHowLayerWorksSection() {
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
    <div className={styles.gutterShell}>
      {/* L/R + full-bleed strokes above overflowing cards — matches home clients/integrations */}
      <div className={styles.gutterFrame} aria-hidden />
      <HowLayerWorksBody
        headerRef={headerRef}
        trackRef={trackRef}
        translateX={pinEnabled ? translateX : 0}
        pinEnabled={pinEnabled}
      />
      <LeadWhyNowSection />
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
