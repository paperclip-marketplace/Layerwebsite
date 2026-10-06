import Image from "next/image";
import Link from "next/link";
import { LandingMarketingHeroBackdrop } from "@/components/landing/landing-marketing-hero-backdrop";
import {
  LandingHeadingReveal,
  LandingSubheadingReveal,
} from "@/components/landing/landing-text-reveal";
import { ROUTES } from "@/lib/config/constants";
import { MOLTEN_ASSETS } from "./molten-assets";
import styles from "./molten_hero.module.css";

/** Figma 2406:3168 — Molten Ventures partner hero. */
export function MoltenHero() {
  return (
    <div className={styles.root} data-node-id="2406:3168">
      <section
        className={styles.promoBar}
        aria-label="Molten Ventures offer"
        data-node-id="2406:3170"
      >
        <p className={styles.promoText} data-node-id="2406:3171">
          Exclusive for Molten Ventures
        </p>
        <Link
          href={ROUTES.signUp}
          className={styles.promoCta}
          data-node-id="2406:3172"
        >
          <span className={styles.promoCtaText} data-node-id="2406:3173">
            Claim 6 months Free!
          </span>
          <Image
            src={MOLTEN_ASSETS.arrowRight}
            alt=""
            width={20}
            height={20}
            className={styles.promoCtaIcon}
            aria-hidden
          />
        </Link>
      </section>

      <section
        className={styles.section}
        aria-labelledby="molten-hero-heading"
        data-node-id="2406:3175"
        data-name="Section Container"
      >
        <LandingMarketingHeroBackdrop
          dataNodeId="2467:3228"
          variant="molten"
          className="molten-hero-backdrop"
        />

        <div className={styles.content} data-node-id="2474:29474">
          <div className={styles.topBlock} data-node-id="2474:29510">
            <div className={styles.logoRow} data-node-id="2474:29511">
              <div className={styles.moltenLogoWrap} data-node-id="2474:29512">
                <Image
                  src={MOLTEN_ASSETS.moltenLogo}
                  alt="Molten"
                  width={113}
                  height={28}
                  className={styles.moltenLogo}
                  priority
                />
              </div>
              <div className={styles.logoDivider} aria-hidden>
                <Image
                  src={MOLTEN_ASSETS.logoDivider}
                  alt=""
                  width={1}
                  height={28}
                  className={styles.logoDividerImg}
                />
              </div>
              <div className={styles.layerLogoWrap} data-node-id="2474:29514">
                <Image
                  src={MOLTEN_ASSETS.layerWordmark}
                  alt="Layer"
                  width={118}
                  height={28}
                  className={styles.layerWordmark}
                  priority
                />
              </div>
            </div>

            <div className={styles.copyRow} data-node-id="2474:29519">
              <LandingHeadingReveal
                as="h1"
                id="molten-hero-heading"
                className={styles.headline}
                data-node-id="2474:29520"
              >
                <span className={styles.headlinePrimary}>
                  Win more. Ramp faster.{" "}
                </span>
                <span className={styles.headlineAccent}>Close Better!</span>
              </LandingHeadingReveal>
              <LandingSubheadingReveal
                className={styles.description}
                data-node-id="2474:29521"
              >
                Layer gives every GTM team member an AI agent with your context,
                playbooks, and tools so they can perform at their best.
              </LandingSubheadingReveal>
            </div>
          </div>

          <div className={styles.mediaBlock} data-node-id="2474:29522">
            <div className={styles.mediaFrame} data-node-id="2474:29522">
              <div className={styles.mediaInner} data-node-id="2474:29523">
                <Image
                  src={MOLTEN_ASSETS.heroDashboard}
                  alt="Layer product dashboard"
                  width={4096}
                  height={2651}
                  className={styles.mediaImage}
                  priority
                  sizes="(max-width: 768px) 100vw, min(1360px, 100vw)"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
