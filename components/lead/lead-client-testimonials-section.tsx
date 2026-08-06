"use client";

import Image from "next/image";
import { memo, useState } from "react";
import { LandingHeadingReveal } from "@/components/landing/landing-text-reveal";
import { LEAD_CLIENT_TESTIMONIALS_ASSETS } from "./lead-client-testimonials-assets";
import styles from "./lead-client-testimonials-section.module.css";

type TestimonialCard = {
  id: string;
  nodeId: string;
  background: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  logoClassName: string;
  /** Pre-cropped mark — use <img> to avoid Next fill crop quirks on desktop */
  logoPreCropped?: boolean;
  backgroundClassName?: string;
  gradientOpacity: number;
  minimizedText: string;
  expandedQuote?: string;
  expandedName?: string;
  expandedRole?: string;
};

const TESTIMONIAL_CARDS: TestimonialCard[] = [
  {
    id: "riskledger",
    nodeId: "1822:22952",
    background: LEAD_CLIENT_TESTIMONIALS_ASSETS.card1Bg,
    logo: LEAD_CLIENT_TESTIMONIALS_ASSETS.card1Logo,
    logoWidth: 62,
    logoHeight: 56,
    logoClassName: styles.card1Logo,
    backgroundClassName: styles.card1Background,
    gradientOpacity: 0.6,
    minimizedText: "It\u2019s a no f**cking brainer!",
    expandedQuote: "It\u2019s a no f**cking brainer!",
    expandedName: "Alex Lyma-Young",
    expandedRole: "VP of Sales at RiskLedger",
  },
  {
    id: "salesforce",
    nodeId: "1822:22960",
    background: LEAD_CLIENT_TESTIMONIALS_ASSETS.card2Bg,
    logo: LEAD_CLIENT_TESTIMONIALS_ASSETS.card2Logo,
    logoWidth: 80,
    logoHeight: 56,
    logoClassName: styles.card2Logo,
    gradientOpacity: 0.45,
    minimizedText:
      "Bring your GTM knowledge together. Connect your data, tools, customer insights, and best practices in one place.",
  },
  {
    id: "pipedrive",
    nodeId: "1822:22964",
    background: LEAD_CLIENT_TESTIMONIALS_ASSETS.card3Bg,
    logo: LEAD_CLIENT_TESTIMONIALS_ASSETS.card3Logo,
    logoWidth: 43,
    logoHeight: 56,
    logoClassName: styles.card3Logo,
    logoPreCropped: true,
    gradientOpacity: 0.45,
    minimizedText:
      "Bring your GTM knowledge together. Connect your data, tools, customer insights, and best practices in one place.",
  },
];

const TestimonialCardItem = memo(function TestimonialCardItem({
  card,
  isExpanded,
  onActivate,
}: {
  card: TestimonialCard;
  isExpanded: boolean;
  onActivate: () => void;
}) {
  const hasExpandedContent = Boolean(card.expandedQuote);

  return (
    <article
      className={`${styles.card} ${isExpanded ? styles.cardExpanded : ""}`}
      data-node-id={card.nodeId}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      tabIndex={0}
      aria-label={
        hasExpandedContent
          ? `Testimonial from ${card.expandedName}`
          : card.minimizedText
      }
    >
      <div className={styles.cardBackdrop} aria-hidden>
        <div
          className={`${styles.cardBackgroundFrame} ${card.backgroundClassName ?? ""}`}
        >
          <Image
            src={card.background}
            alt=""
            fill
            className={styles.cardBackgroundImage}
            sizes="(max-width: 768px) 100vw, 670px"
          />
        </div>
        <div
          className={styles.cardGradient}
          style={{ ["--card-gradient-opacity" as string]: card.gradientOpacity }}
        />
      </div>

      <div className={styles.cardContent}>
        <div
          className={`${styles.logoWrap} ${card.logoClassName}`}
          data-name={`${card.id} logo`}
        >
          {card.logoPreCropped ? (
            <Image
              src={card.logo}
              alt=""
              width={card.logoWidth}
              height={card.logoHeight}
              className={styles.logoImage}
              sizes={`${card.logoWidth}px`}
            />
          ) : (
            <Image
              src={card.logo}
              alt=""
              fill
              className={styles.logoImage}
              sizes={`${card.logoWidth}px`}
            />
          )}
        </div>

        <div
          className={`${styles.minimizedCopy} ${isExpanded ? styles.minimizedCopyHidden : ""}`}
          data-node-id={card.id === "salesforce" ? "1822:22963" : undefined}
        >
          <p className={styles.minimizedText}>{card.minimizedText}</p>
        </div>

        {hasExpandedContent ? (
          <div
            className={`${styles.expandedCopy} ${isExpanded ? styles.expandedCopyVisible : ""}`}
            data-node-id="1822:22955"
          >
            <p className={styles.expandedQuote} data-node-id="1822:22956">
              &ldquo;{card.expandedQuote}&rdquo;
            </p>
            <div className={styles.expandedMeta} data-node-id="1822:22957">
              <p className={styles.expandedName} data-node-id="1822:22958">
                {card.expandedName}
              </p>
              <p className={styles.expandedRole} data-node-id="1822:22959">
                {card.expandedRole}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
});

/** Static header — kept outside card hover state so text reveal never re-runs */
function TestimonialsHeader() {
  return (
    <div className={styles.header} data-node-id="1822:22946">
      <p className={styles.eyebrow} data-node-id="1822:22947">
        From funded startups to $1B unicorns
      </p>
      <div
        className={`landing-copy-row ${styles.headlineRow}`}
        data-node-id="1822:22948"
      >
        <LandingHeadingReveal
          as="h2"
          id="lead-client-testimonials-heading"
          className={`${styles.headline} landing-copy-headline`}
          data-node-id="1822:22949"
        >
          What our clients{" "}
          <span className={styles.headlineHighlight}>say about us!</span>
        </LandingHeadingReveal>
        {/* Mobile-only supporting copy — Figma 1835:23121 */}
        <p className={styles.mobileDescription}>
          Bring your GTM knowledge, workflows, and tools together to equip every
          team member with AI that helps them prepare, perform, and improve.
        </p>
      </div>
    </div>
  );
}

function TestimonialsCards() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.cardsSection} data-node-id="1822:22950">
      <div className={styles.cardRow} data-node-id="1822:22951">
        {TESTIMONIAL_CARDS.map((card, index) => (
          <TestimonialCardItem
            key={card.id}
            card={card}
            isExpanded={activeIndex === index}
            onActivate={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

/** Figma 1822:22945 — What our clients say (expandable testimonial cards) */
export function LeadClientTestimonialsSection() {
  return (
    <section
      className={`${styles.section} lead-client-testimonials-section landing-clients-section landing-band-left`}
      aria-labelledby="lead-client-testimonials-heading"
      data-name="Sub-section Container"
      data-node-id="1822:22945"
    >
      <TestimonialsHeader />
      <TestimonialsCards />
    </section>
  );
}
