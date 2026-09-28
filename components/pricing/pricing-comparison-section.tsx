import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/config/constants";
import { PricingSecurityCompliance } from "./pricing-security-compliance";
import styles from "./pricing-comparison-section.module.css";

const PLAN_ILLUSTRATIONS = {
  solo: "/assets/images/pricing/plans/solo.webp",
  team: "/assets/images/pricing/plans/team.webp",
  growth: "/assets/images/pricing/plans/growth.webp",
} as const;

const SHARED_FEATURES = [
  "One paired agent for every rep",
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

const ENTERPRISE_FEATURES = [
  "Context Intelligence",
  "Expert GTM Services",
  "AI Agent Configuration",
  "Rollout & Adoption",
  "Enterprise Security",
] as const;

type PlanTier = {
  id: string;
  name: string;
  description: string;
  priceLabel?: string;
  priceSuffix?: boolean;
  illustration?: (typeof PLAN_ILLUSTRATIONS)[keyof typeof PLAN_ILLUSTRATIONS];
  artVariant?: "standard" | "growth";
  monthlyCredits: number;
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: "dark" | "orange";
  featured?: boolean;
  featuresHeading: string;
  features: readonly string[];
  enterpriseGradient?: boolean;
};

const PLANS: PlanTier[] = [
  {
    id: "solo",
    name: "Solo",
    description: "For solo founders and one-person businesses",
    priceLabel: "$30",
    priceSuffix: true,
    illustration: PLAN_ILLUSTRATIONS.solo,
    artVariant: "standard",
    monthlyCredits: 2_000,
    ctaLabel: "Choose Solo",
    ctaHref: ROUTES.signUp,
    ctaVariant: "dark",
    featuresHeading: "Key Features:",
    features: [],
  },
  {
    id: "team",
    name: "Team",
    description:
      "For small teams and growing startups looking to collaborate and scale together",
    priceLabel: "$100",
    priceSuffix: true,
    illustration: PLAN_ILLUSTRATIONS.team,
    artVariant: "standard",
    monthlyCredits: 5_000,
    ctaLabel: "Choose Team",
    ctaHref: ROUTES.signUp,
    ctaVariant: "dark",
    featuresHeading: "Key Features:",
    features: [],
  },
  {
    id: "growth",
    name: "Growth",
    description:
      "For scaling companies ready to level up their growth and performance",
    priceLabel: "$200",
    priceSuffix: true,
    illustration: PLAN_ILLUSTRATIONS.growth,
    artVariant: "growth",
    monthlyCredits: 10_000,
    ctaLabel: "Choose Growth",
    ctaHref: ROUTES.signUp,
    ctaVariant: "orange",
    featured: true,
    featuresHeading: "Key Features:",
    features: [],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description:
      "For large organizations with custom needs and dedicated support",
    priceLabel: "Custom Billing",
    enterpriseGradient: true,
    monthlyCredits: 0,
    ctaLabel: "Talk to GTM expert",
    ctaHref: ROUTES.contactSales,
    ctaVariant: "dark",
    featuresHeading: "Everything in Growth, Plus:",
    features: ENTERPRISE_FEATURES,
  },
];

function formatCredits(credits: number): string {
  return `${credits.toLocaleString("en-US")} monthly credits`;
}

function buildStandardFeatures(monthlyCredits: number): string[] {
  return [formatCredits(monthlyCredits), ...SHARED_FEATURES];
}

function CheckIcon() {
  return (
    <span className={`material-symbols-rounded ${styles.checkIcon}`} aria-hidden>
      check
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

function PlanPricingBlock({
  plan,
}: {
  plan: PlanTier;
}) {
  return (
    <div className={styles.planPricing}>
      <div className={styles.priceRow}>
        <p className={styles.price}>{plan.priceLabel}</p>
        {plan.priceSuffix ? (
          <>
            <span className={styles.priceSuffix}>/ mo</span>
            <span className={styles.priceSuffix}>/ user</span>
          </>
        ) : null}
      </div>
      <Link
        href={plan.ctaHref}
        className={
          plan.ctaVariant === "orange"
            ? `${styles.ctaButton} ${styles.ctaButtonOrange}`
            : styles.ctaButton
        }
      >
        {plan.ctaLabel}
      </Link>
    </div>
  );
}

function PlanCardBody({ plan }: { plan: PlanTier }) {
  const features =
    plan.features.length > 0
      ? plan.features
      : buildStandardFeatures(plan.monthlyCredits);

  return (
    <>
      <div className={styles.planCardHeader}>
        <div className={styles.planSummary}>
          <h2 className={styles.planTitle}>{plan.name}</h2>
          <p className={styles.planDescription}>{plan.description}</p>
        </div>
        <PlanPricingBlock plan={plan} />
      </div>

      <div className={styles.planFeatures}>
        <p className={styles.featuresHeading}>{plan.featuresHeading}</p>
        <div className={styles.featuresList}>
          {features.map((feature) => (
            <FeatureRow key={feature} text={feature} />
          ))}
        </div>
      </div>
    </>
  );
}

function PlanIllustration({
  src,
  variant = "standard",
}: {
  src: string;
  variant?: "standard" | "growth";
}) {
  if (variant === "growth") {
    return (
      <div className={styles.planCardArt} aria-hidden>
        <div className={styles.planCardArtGrowthMask}>
          <img
            src={src}
            alt=""
            className={styles.planCardArtImageGrowth}
            decoding="async"
          />
        </div>
        <div
          className={`${styles.planCardArtGradient} ${styles.planCardArtGradientGrowth}`}
        />
      </div>
    );
  }

  return (
    <div className={styles.planCardArt} aria-hidden>
      <div className={styles.planCardArtStandardMask}>
        <img
          src={src}
          alt=""
          className={styles.planCardArtImageStandard}
          decoding="async"
        />
      </div>
      <div
        className={`${styles.planCardArtGradient} ${styles.planCardArtGradientStandard}`}
      />
    </div>
  );
}

function PlanCardSurface({
  plan,
  className,
}: {
  plan: PlanTier;
  className: string;
}) {
  return (
    <article className={className} data-name="Plan Illustration">
      {plan.illustration ? (
        <PlanIllustration
          src={plan.illustration}
          variant={plan.artVariant ?? "standard"}
        />
      ) : null}
      <PlanCardBody plan={plan} />
    </article>
  );
}

function PricingPlanCard({ plan }: { plan: PlanTier }) {
  if (plan.featured) {
    return (
      <div className={styles.planColumn}>
        <article
          className={styles.planFeatured}
          data-name="Featured Plan"
          data-node-id="2303:22877"
        >
          <div className={styles.featuredBadge}>
            <Image
              src="/assets/images/pricing/experts-choice-diamond.svg"
              alt=""
              width={13}
              height={12}
              className={styles.featuredBadgeIcon}
              aria-hidden
            />
            <span className={styles.featuredBadgeLabel}>
              Experts&apos; choice
            </span>
          </div>
          <PlanCardSurface
            plan={plan}
            className={`${styles.planCardSurface} ${styles.planFeaturedInner}`}
          />
        </article>
      </div>
    );
  }

  return (
    <div className={`${styles.planColumn} ${styles.planColumnOffset}`}>
      <PlanCardSurface
        plan={plan}
        className={`${styles.planCardSurface} ${styles.planCard} ${plan.enterpriseGradient ? styles.planCardEnterprise : ""}`}
      />
    </div>
  );
}

/** Figma 2303:22755 — Pricing plan cards */
export function PricingComparisonSection() {
  return (
    <section
      className={styles.section}
      aria-label="Pricing plans"
      data-name="Pricing comparison"
      data-node-id="2303:22755"
    >
      <div className={styles.cardsRow}>
        {PLANS.map((plan) => (
          <PricingPlanCard key={plan.id} plan={plan} />
        ))}
      </div>
      <PricingSecurityCompliance />
    </section>
  );
}
