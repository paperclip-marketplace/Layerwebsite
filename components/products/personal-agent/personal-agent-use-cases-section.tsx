"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  LandingHeadingReveal,
  LandingSubheadingReveal,
} from "@/components/landing/landing-text-reveal";
import { PERSONAL_AGENT_ASSETS } from "./personal-agent-assets";
import {
  usePinnedHorizontalScroll,
  usePinnedHorizontalScrollEnabled,
} from "@/components/landing/use-pinned-horizontal-scroll";
import styles from "./personal-agent-use-cases-section.module.css";

const USE_CASES = [
  {
    id: "precall",
    nodeId: "1091:5938",
    mediaNodeId: "1091:5939",
    variant: "precall" as const,
    label: "Pre-call brief",
    description:
      "Start with agents purpose-built for hiring, ramping, and closing. Deploy them immediately. Extend them over time.",
  },
  {
    id: "approval",
    nodeId: "1091:5944",
    mediaNodeId: "1091:5945",
    variant: "approval" as const,
    label: "Approval flows",
    description:
      "Start with agents purpose-built for hiring, ramping, and closing. Deploy them immediately. Extend them over time.",
  },
  {
    id: "tools",
    nodeId: "1091:5950",
    mediaNodeId: "1091:5951",
    variant: "tools" as const,
    label: "Tool calling",
    description:
      "Start with agents purpose-built for hiring, ramping, and closing. Deploy them immediately. Extend them over time.",
  },
] as const;

function UseCaseCardMedia({
  variant,
  mediaNodeId,
}: {
  variant: (typeof USE_CASES)[number]["variant"];
  mediaNodeId: string;
}) {
  if (variant === "precall") {
    return (
      <div className={styles.cardMedia} data-node-id={mediaNodeId}>
        <div className={styles.cardMediaFrame}>
          <img
            src={PERSONAL_AGENT_ASSETS.useCasePrecall}
            alt=""
            className={styles.cardImagePrecall}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  if (variant === "approval") {
    return (
      <div className={styles.cardMedia} data-node-id={mediaNodeId}>
        <div className={styles.approvalBackdrop} aria-hidden>
          <img
            src={PERSONAL_AGENT_ASSETS.useCaseApprovalBg}
            alt=""
            className={styles.approvalBgImage}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.approvalBgGradient} />
        </div>
        <div className={styles.approvalContent}>
          <div className={styles.approvalAvatar}>
            <img
              src={PERSONAL_AGENT_ASSETS.useCaseApprovalAvatar}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className={styles.approvalThread}>
            <div className={styles.approvalBubble}>
              <p className={styles.approvalBubbleText}>
                Discount represents 22%, this is above your approval authority of
                15%. Should I trigger approval flow?
              </p>
              <button type="button" className={styles.approvalYesBtn}>
                <span
                  className={`material-symbols-rounded ${styles.approvalYesIcon}`}
                  aria-hidden
                >
                  check
                </span>
                <span className={styles.approvalYesLabel}>Yes</span>
              </button>
            </div>
            <div className={styles.approvalStatus}>
              <span className={styles.approvalStatusMuted}>Just Now</span>
              <span className={styles.approvalStatusDot} aria-hidden />
              <div className={styles.approvalStatusTrack}>
                <span className={styles.approvalStatusMuted}>Approval Sent</span>
                <span className={styles.approvalStatusDivider} aria-hidden />
                <span className={styles.approvalStatusMuted}>Seen</span>
                <span className={styles.approvalStatusDivider} aria-hidden />
              </div>
              <span className={styles.approvalStatusApproved}>
                <span>Approved</span>
                <span
                  className={`material-symbols-rounded ${styles.approvalApprovedIcon}`}
                  aria-hidden
                >
                  check_circle
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cardMedia} data-node-id={mediaNodeId}>
      <div className={styles.cardMediaFrame}>
        <img
          src={PERSONAL_AGENT_ASSETS.useCaseTools}
          alt=""
          className={styles.cardImageTools}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

function UseCaseCard({ item }: { item: (typeof USE_CASES)[number] }) {
  return (
    <article
      className={styles.card}
      data-pin-scroll-card
      data-node-id={item.nodeId}
    >
      <UseCaseCardMedia variant={item.variant} mediaNodeId={item.mediaNodeId} />
      <div className={styles.cardFooter}>
        <p className={styles.cardLabel}>{item.label}</p>
        <p className={styles.cardDescription}>{item.description}</p>
      </div>
    </article>
  );
}

function UseCaseCardTrack({
  trackRef,
  translateX,
  pinEnabled,
  onScrollNext,
}: {
  trackRef: React.RefObject<HTMLDivElement | null>;
  translateX: number;
  pinEnabled: boolean;
  onScrollNext: () => void;
}) {
  return (
    <div className={styles.carouselInner}>
      <div
        ref={trackRef}
        className={`${styles.track} ${pinEnabled ? styles.trackPinned : ""}`}
        data-node-id="1091:5937"
        role="list"
        style={
          pinEnabled
            ? { transform: `translate3d(${translateX}px, 0, 0)` }
            : undefined
        }
      >
        {USE_CASES.map((item) => (
          <div key={item.id} role="listitem">
            <UseCaseCard item={item} />
          </div>
        ))}
      </div>
      <div className={styles.fadeRight} aria-hidden data-node-id="1092:3925" />
      {!pinEnabled ? (
        <div className={styles.navTrack} data-node-id="1092:3934">
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Scroll use cases"
            data-node-id="1092:3927"
            onClick={onScrollNext}
          >
            <span className="material-symbols-rounded" aria-hidden>
              arrow_forward
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function PersonalAgentUseCasesSection() {
  const pinEnabled = usePinnedHorizontalScrollEnabled();
  const headerRef = useRef<HTMLDivElement>(null);
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
    cardCount: USE_CASES.length,
    enabled: pinEnabled,
    spacerRef,
    trackRef,
    edgePadding,
    endAlign: "mirror",
  });

  const scrollNext = () => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstElementChild?.clientWidth ?? 0;
    const gap = Number.parseFloat(getComputedStyle(track).gap || "0");
    track.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
  };

  return (
    <section
      id="use-cases"
      className={`${styles.section} ${pinEnabled ? styles.sectionPinned : ""} landing-full-bleed-strokes`}
      aria-labelledby="personal-agent-use-cases-heading"
      data-node-id="1091:5930"
    >
      <div ref={headerRef} className={styles.header} data-node-id="1091:5931">
        <p className={styles.eyebrow} data-node-id="1091:5932">
          use cases
        </p>
        <div className="landing-copy-row" data-node-id="1091:5933">
          <LandingHeadingReveal
            id="personal-agent-use-cases-heading"
            className={`${styles.headline} landing-copy-headline`}
            data-node-id="1091:5934"
          >
            <span className={styles.headlineLine}>See what your</span>
            <span className={`${styles.headlineLine} ${styles.highlight}`}>
              agent can do!
            </span>
          </LandingHeadingReveal>
          <LandingSubheadingReveal
            className={`${styles.aside} landing-copy-aside`}
            data-node-id="1091:5935"
          >
            Layer gives every GTM team member more leverage by shifting
            context-heavy work to agents. Your team spends less time researching,
            preparing, seeking approvals, and documenting and more time creating
            pipeline, advancing deals, serving customers, and driving growth.
          </LandingSubheadingReveal>
        </div>
      </div>

      <div className={styles.carouselWrap} data-node-id="1091:5936">
        {pinEnabled ? (
          <div
            ref={spacerRef}
            className={styles.pinSpacer}
            style={spacerHeight != null ? { height: spacerHeight } : undefined}
          >
            <div className={styles.pinSticky} data-pin-sticky>
              <UseCaseCardTrack
                trackRef={trackRef}
                translateX={translateX}
                pinEnabled
                onScrollNext={scrollNext}
              />
            </div>
          </div>
        ) : (
          <UseCaseCardTrack
            trackRef={trackRef}
            translateX={0}
            pinEnabled={false}
            onScrollNext={scrollNext}
          />
        )}
      </div>
    </section>
  );
}
