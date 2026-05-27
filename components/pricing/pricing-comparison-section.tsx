"use client";

import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/lib/config/constants";
import styles from "./pricing-comparison-section.module.css";

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
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [creditsOpen, setCreditsOpen] = useState(false);

  return (
    <section
      className={styles.section}
      aria-label="Pricing plans"
      data-name="Pricing comparison"
      data-node-id="336:1761"
    >
      <div
        className={styles.billingToggle}
        role="tablist"
        aria-label="Billing frequency"
        data-node-id="336:1762"
      >
        <button
          type="button"
          role="tab"
          aria-selected={billing === "monthly"}
          className={`${styles.billingOption} ${billing === "monthly" ? styles.billingOptionActive : ""}`}
          onClick={() => setBilling("monthly")}
        >
          Monthly Billing
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={billing === "yearly"}
          className={`${styles.billingOption} ${styles.billingOptionInactive} ${billing === "yearly" ? styles.billingOptionYearlyActive : ""}`}
          onClick={() => setBilling("yearly")}
        >
          <span>Yearly Billing</span>
          <span className={styles.saveBadge}>Save 20%</span>
        </button>
      </div>

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
            <p className={styles.price}>$200</p>
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
            <button
              type="button"
              className={styles.ctaCredits}
              onClick={() => setCreditsOpen((open) => !open)}
              aria-expanded={creditsOpen}
            >
              <span>Includes 1,000 credits per month</span>
              <span className="material-symbols-rounded" aria-hidden>
                expand_more
              </span>
            </button>
          </div>

          <div className={styles.featuresBox}>
            <p className={styles.featuresHeading}>
              The complete GTM Performance System
            </p>
            <div className={styles.featuresList}>
              {TEAM_FEATURES.map((feature) => (
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
