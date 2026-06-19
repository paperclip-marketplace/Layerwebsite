"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LandingHeadingReveal,
  LandingSubheadingReveal,
} from "@/components/landing/landing-text-reveal";
import { ROUTES } from "@/lib/config/constants";
import { PersonalAgentCustomizeAppearancePanel } from "./personal-agent-customize-appearance-panel";
import styles from "./personal-agent-customize-section.module.css";

const FEATURE_TABS = [
  { id: "customize", label: "Fully Customizable", icon: "settings" },
  { id: "multimodal", label: "Multimodal Agents", icon: "public" },
  { id: "workflows", label: "Workflows", icon: "tune" },
  { id: "context", label: "Business Context", icon: "description" },
] as const;

const FEATURE_ITEMS = [
  {
    id: "configure",
    title: "Configure exactly how you want",
    description:
      "Managers and enablement teams try to close the gap, but the system does not refine performance fast enough. Managers and enablement teams try to close the gap, but the system does not refine performance fast enough.",
    active: true,
  },
  {
    id: "tools",
    title: "Setup tools for automatic tool-calling",
    description:
      "Connect CRM, calendar, and call tools so your agent can pull deal context, draft follow-ups, and trigger approvals without you leaving the thread.",
    active: false,
  },
  {
    id: "knowledge",
    title: "Enrich your agent with knowledge base",
    description:
      "Add playbooks, transcripts, and internal docs so prep and answers stay grounded in how your team sells, not generic AI guesses.",
    active: false,
  },
] as const;

export function PersonalAgentCustomizeSection() {
  const [activeTab, setActiveTab] = useState<string>("customize");
  const [activeFeature, setActiveFeature] = useState<string>("configure");

  return (
    <section
      className={`${styles.section} landing-full-bleed-strokes`}
      aria-labelledby="personal-agent-customize-heading"
      data-node-id="1091:5961"
    >
      <div className={styles.header} data-node-id="1091:5962">
        <div className={styles.headerTop} data-node-id="1091:5963">
          <p className={styles.eyebrow} data-node-id="1091:5964">
            what you can do
          </p>
          <div className="landing-copy-row" data-node-id="1091:5965">
            <LandingHeadingReveal
              id="personal-agent-customize-heading"
              className={`${styles.headline} landing-copy-headline`}
              data-node-id="1091:5966"
            >
              <span className={styles.headlineLine}>Your agent is</span>
              <span className={`${styles.headlineLine} ${styles.highlight}`}>
                truly yours!
              </span>
            </LandingHeadingReveal>
            <LandingSubheadingReveal
              className={`${styles.aside} landing-copy-aside`}
              data-node-id="1091:5967"
            >
              Layer gives every GTM team member more leverage by shifting
              context-heavy work to agents. Your team spends less time researching,
              preparing, seeking approvals, and documenting and more time creating
              pipeline, advancing deals, serving customers, and driving growth.
            </LandingSubheadingReveal>
          </div>
        </div>

        <div className={styles.toolbar} data-node-id="1091:5968">
          <Link href={ROUTES.signUp} className={styles.primaryCta} data-node-id="1091:5970">
            <span>Try Now for FREE</span>
            <span className="material-symbols-rounded" aria-hidden>
              arrow_forward
            </span>
          </Link>

          <div className={styles.tabBar} data-node-id="1091:5971">
            {FEATURE_TABS.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`${styles.tab} ${isActive ? styles.tabActive : styles.tabMuted}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="material-symbols-rounded" aria-hidden>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.contentRow} data-node-id="1091:5984">
        <div className={styles.featureList}>
          {FEATURE_ITEMS.map((item) => {
            const isActive = activeFeature === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`${styles.featureItem} ${isActive ? styles.featureItemActive : ""}`}
                onClick={() => setActiveFeature(item.id)}
                aria-expanded={isActive}
              >
                <p className={styles.featureTitle}>{item.title}</p>
                {"description" in item ? (
                  <div
                    className={`${styles.featureDescriptionWrap} ${
                      isActive ? styles.featureDescriptionWrapOpen : ""
                    }`}
                  >
                    <div className={styles.featureDescriptionInner}>
                      <p className={styles.featureDescription}>{item.description}</p>
                    </div>
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className={styles.visualPanel}>
          <PersonalAgentCustomizeAppearancePanel />
        </div>
      </div>
    </section>
  );
}
