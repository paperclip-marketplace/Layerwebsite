import Link from "next/link";
import {
  LandingHeadingReveal,
  LandingSubheadingReveal,
} from "@/components/landing/landing-text-reveal";
import { ROUTES } from "@/lib/config/constants";
import styles from "./roleplay-hero-section.module.css";
import { RoleplayShowcase } from "./roleplay-showcase";
import { RoleplayModeProvider } from "./roleplay-mode-context";
import { RoleplayModeToggle } from "./roleplay-mode-toggle";

export function RoleplayHeroSection() {
  return (
    <RoleplayModeProvider>
      <section
        className={styles.section}
        aria-labelledby="roleplay-hero-heading"
        data-node-id="1088:4206"
      >
      <div className={styles.heroInner} data-node-id="1088:4211">
        <p className={styles.badge} data-node-id="1088:4213">
          For Customer-Facing Teams
        </p>

        <div className={styles.heroContent} data-node-id="1088:5205">
          <div
            className={styles.titleBlock}
            data-node-id="1088:4214"
          >
            <LandingHeadingReveal
              as="h1"
              id="roleplay-hero-heading"
              className={styles.title}
              data-node-id="1088:4215"
            >
              Roleplay
            </LandingHeadingReveal>
            <LandingSubheadingReveal
              className={styles.description}
              data-node-id="1088:4216"
            >
              Layer gives every IC a personal agent across practice, prep, live
              support, and post call automation governed by leadership and
              trained on your business context.
            </LandingSubheadingReveal>
          </div>

          <div className={styles.actionsRow} data-node-id="1088:5204">
            <Link
              href={ROUTES.signUp}
              className={styles.primaryCta}
              data-node-id="1088:5199"
            >
              <span>Experience Roleplay for FREE</span>
              <span
                className={`material-symbols-rounded ${styles.ctaIcon}`}
                aria-hidden
              >
                arrow_forward
              </span>
            </Link>
            <RoleplayModeToggle />
          </div>
        </div>
      </div>

      <RoleplayShowcase />

      <div className={styles.supportingCopy} data-node-id="1088:5211">
        <LandingSubheadingReveal className={styles.supportingCopyText}>
          Layer agents are trained on your playbooks and customer context,
          connected to your existing tools, deployed where your team already
          works, helping them source, prepare, perform live, and follow up.
        </LandingSubheadingReveal>
      </div>
    </section>
    </RoleplayModeProvider>
  );
}
