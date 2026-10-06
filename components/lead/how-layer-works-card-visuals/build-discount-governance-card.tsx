import { SkillCard } from "../library-cards/skill-card";
import { BUILD_CARD_ASSETS } from "./build-card-assets";
import styles from "./build-discount-governance-card.module.css";

/** Figma 1822:23903 / 1822:23904 — blur wash + concentric rings */
function DiscountGovernanceHeroOverlay() {
  return (
    <div className={styles.heroOverlay} aria-hidden data-node-id="1822:23903">
      <div className={styles.heroWash} />
      <div className={styles.heroRingsWrap} data-node-id="1822:23904">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BUILD_CARD_ASSETS.directiveHeroRings}
          alt=""
          className={styles.heroRingsImage}
        />
      </div>
    </div>
  );
}

/** Figma 1822:23947 — white wash over icon feet into body */
function DiscountGovernanceHeroForeground() {
  return (
    <div className={styles.heroIconFade} aria-hidden data-node-id="1822:23947" />
  );
}

/** Figma 1822:23945 — open-book directive glyph (not the shared signpost) */
function DiscountGovernanceHeroIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={BUILD_CARD_ASSETS.directiveIcon}
      alt=""
      className={styles.heroIconImage}
      width={78}
      height={78}
    />
  );
}

/** Figma 1822:23901 — Discount Governance center card (always elevated) */
export function BuildDiscountGovernanceCard() {
  return (
    <div className={styles.wrap} data-node-id="1822:23901">
      <SkillCard
        name="Discount Governance"
        description="Enforce approval thresholds on pricing and discount discussions"
        skillType="directive"
        showChip
        elevated
        alwaysActive
        hideBodyTopFade
        heroOverlay={<DiscountGovernanceHeroOverlay />}
        heroIcon={<DiscountGovernanceHeroIcon />}
        heroForeground={<DiscountGovernanceHeroForeground />}
        className={styles.card}
        heroClassName={styles.hero}
        heroIllustrationClassName={styles.heroIllustration}
      />
    </div>
  );
}
