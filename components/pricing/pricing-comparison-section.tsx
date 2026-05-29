"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ROUTES } from "@/lib/config/constants";
import styles from "./pricing-comparison-section.module.css";

type CreditTier = {
  id: string;
  credits: number;
  priceMonthly: number;
};

const TEAM_CREDIT_TIERS: CreditTier[] = [
  { id: "1000", credits: 1_000, priceMonthly: 200 },
  { id: "2500", credits: 2_500, priceMonthly: 500 },
  { id: "5000", credits: 5_000, priceMonthly: 1_000 },
  { id: "10000", credits: 10_000, priceMonthly: 2_000 },
  { id: "15000", credits: 15_000, priceMonthly: 3_000 },
  { id: "20000", credits: 20_000, priceMonthly: 4_000 },
];

const TEAM_FEATURES = [
  "Unlimited users",
  "1,000 monthly credits",
  "One agent for every rep",
  "Agent memory, personality, and seller profile matrix",
  "Voice and video agents",
  "Roleplay, live deal simulation, and scenario practice",
  "Coaching, assessment, onboarding, and enablement workflows",
  "Call preparation, in-call co-pilot, transcription, and follow-up automation",
  "Leadership control plane to define what great looks like",
  "Deploy standards, skills, frameworks, playbooks, and evaluation criteria across every customer interaction",
  "Context layer across calls, email, CRM, transcripts, and knowledge",
  "Shared skills, frameworks, tools, playbooks, personas, and evaluation criteria",
  "Agent knowledge across your connected stack",
  "600+ integrations",
  "Your data is never used for training",
] as const;

type OrgFeature = {
  title: string;
  description: string;
};

const ORG_FEATURES: OrgFeature[] = [
  {
    title: "Context Intelligence",
    description:
      "Connect and structure CRM data, calls, transcripts, knowledge, and GTM workflows into one unified context layer.",
  },
  {
    title: "Expert GTM Services",
    description:
      "Work with GTM operators and enablement experts using proven frameworks and playbooks.",
  },
  {
    title: "AI Agent Configuration",
    description:
      "Deploy role-based agents tailored to teams, workflows, customer moments, and approval paths.",
  },
  {
    title: "Rollout & Adoption",
    description:
      "Guided onboarding, workflow mapping, usage optimization, and performance reviews.",
  },
  {
    title: "Enterprise Security",
    description:
      "SSO, SCIM, audit logs, permissions, retention controls, and procurement support.",
  },
];

function CheckIcon() {
  return (
    <span className={`material-symbols-rounded ${styles.checkIcon}`} aria-hidden>
      check_circle
    </span>
  );
}

function FeatureRow({ text }: { text: string }) {
  return (
    <div className={styles.featureRow}>
      <CheckIcon />
      <p className={styles.featureText}>{text}</p>
    </div>
  );
}

function formatCreditsCount(credits: number): string {
  return credits.toLocaleString("en-US");
}

function formatTierLabel(credits: number): string {
  return `Includes ${formatCreditsCount(credits)} credits per month`;
}

function formatMonthlyPrice(price: number): string {
  return `$${price.toLocaleString("en-US")}`;
}

function OrgFeatureRow({ feature }: { feature: OrgFeature }) {
  return (
    <div className={styles.orgFeatureRow}>
      <div className={styles.orgFeatureInner}>
        <div className={styles.orgFeatureTitleRow}>
          <CheckIcon />
          <p className={styles.featureText}>{feature.title}</p>
        </div>
        <p className={styles.orgFeatureDescription}>{feature.description}</p>
      </div>
    </div>
  );
}

export function PricingComparisonSection() {
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState(TEAM_CREDIT_TIERS[0].id);
  const creditsWrapRef = useRef<HTMLDivElement>(null);

  const selectedTier =
    TEAM_CREDIT_TIERS.find((tier) => tier.id === selectedTierId) ??
    TEAM_CREDIT_TIERS[0];

  const teamFeatures = TEAM_FEATURES.map((feature, index) =>
    index === 1
      ? `${formatCreditsCount(selectedTier.credits)} monthly credits`
      : feature,
  );

  useEffect(() => {
    if (!creditsOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        creditsWrapRef.current &&
        !creditsWrapRef.current.contains(event.target as Node)
      ) {
        setCreditsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCreditsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [creditsOpen]);

  const handleTierSelect = (tierId: string) => {
    setSelectedTierId(tierId);
    setCreditsOpen(false);
  };

  return (
    <section
      className={styles.section}
      aria-label="Pricing plans"
      data-name="Pricing comparison"
      data-node-id="336:1761"
    >
      <div className={styles.cardsRow} data-node-id="336:1769">
        <article
          className={`${styles.planCard} ${styles.planCardTeam}`}
          data-name="Metric Container 1"
        >
          <div className={styles.planHeader}>
            <div className={styles.planTitleRow}>
              <h2 className={styles.planTitle}>Team</h2>
              <span className={styles.popularBadge}>Most Popular</span>
            </div>
            <p className={styles.planDescription}>
              For teams looking to improve ramp time, quota
              <br />
              attainment, win rates and growth
            </p>
          </div>

          <div className={styles.priceRow}>
            <p className={styles.price}>
              {formatMonthlyPrice(selectedTier.priceMonthly)}
            </p>
            <span className={styles.priceSuffix}>/ org</span>
            <span className={styles.priceSuffix}>/ month</span>
          </div>

          <div className={styles.ctaGroup}>
            <Link href={ROUTES.signUp} className={styles.ctaPrimary}>
              <span>Start Winning More</span>
              <span className="material-symbols-rounded" aria-hidden>
                arrow_forward
              </span>
            </Link>
            <div
              className={`${styles.ctaCreditsWrap} ${creditsOpen ? styles.ctaCreditsWrapOpen : ""}`}
              ref={creditsWrapRef}
            >
              <button
                type="button"
                className={styles.ctaCredits}
                onClick={() => setCreditsOpen((open) => !open)}
                aria-expanded={creditsOpen}
                aria-controls="team-credits-panel"
                id="team-credits-trigger"
              >
                <span>{formatTierLabel(selectedTier.credits)}</span>
                <span className="material-symbols-rounded" aria-hidden>
                  {creditsOpen ? "expand_less" : "expand_more"}
                </span>
              </button>

              {creditsOpen ? (
                <div
                  id="team-credits-panel"
                  className={styles.creditsDropdown}
                  role="listbox"
                  aria-labelledby="team-credits-trigger"
                  aria-activedescendant={`team-credit-tier-${selectedTier.id}`}
                >
                  {TEAM_CREDIT_TIERS.map((tier) => {
                    const isSelected = tier.id === selectedTier.id;

                    return (
                      <button
                        key={tier.id}
                        id={`team-credit-tier-${tier.id}`}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        className={`${styles.creditsOption} ${isSelected ? styles.creditsOptionSelected : ""}`}
                        onClick={() => handleTierSelect(tier.id)}
                      >
                        {formatTierLabel(tier.credits)}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>

          <div className={styles.featuresBox}>
            <p className={styles.featuresHeading}>
              The complete GTM Performance System
            </p>
            <div className={styles.featuresList}>
              {teamFeatures.map((feature) => (
                <FeatureRow key={feature} text={feature} />
              ))}
            </div>
          </div>
        </article>

        <article
          className={`${styles.planCard} ${styles.planCardOrg}`}
          data-name="Metric Container 2"
        >
          <div className={styles.planHeader}>
            <h2 className={styles.planTitle}>Organization</h2>
            <p className={styles.planDescription}>
              Expert-led deployment for teams rebuilding GTM
              <br />
              around agents.
            </p>
          </div>

          <div className={styles.priceRow}>
            <p className={styles.price}>Custom Plan</p>
          </div>

          <div className={styles.ctaGroup}>
            <Link href={ROUTES.signUp} className={styles.ctaPrimary}>
              <span>Talk to a GTM Architect</span>
              <span className="material-symbols-rounded" aria-hidden>
                arrow_forward
              </span>
            </Link>
            <div className={styles.ctaHighlight}>
              Need credits more than 20K? this plan is for you
            </div>
          </div>

          <div className={`${styles.featuresBox} ${styles.featuresBoxOrg}`}>
            <p className={styles.featuresHeading}>Everything in Team, plus:</p>
            <div className={styles.featuresList}>
              {ORG_FEATURES.map((feature) => (
                <OrgFeatureRow key={feature.title} feature={feature} />
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
