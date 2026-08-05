import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { formatSkillTypeLabel, SkillTypeIcon } from "./skill-type-meta";
import { SkillCardTypeBg } from "./skill-card-type-hero";
import styles from "./skill-card.module.css";

export type SkillCardProps = {
  name: string;
  description: string;
  skillType: string;
  typeLabel?: string;
  showChip: boolean;
  /** PitchBots hover/elevated styling — gradient + orange doc frame */
  elevated?: boolean;
  /** Force hover colors visible without interaction (Build card visual) */
  alwaysActive?: boolean;
  /** Optional layer between hero bg and illustration (Figma 1822:23903) */
  heroOverlay?: ReactNode;
  /** Hide body→hero seam fade (Build Discount Governance keeps rings visible) */
  hideBodyTopFade?: boolean;
  className?: string;
  heroClassName?: string;
  heroIllustrationClassName?: string;
};

/** PitchBots library SkillCard — display-only (no menu/actions). */
export function SkillCard({
  name,
  description,
  skillType,
  typeLabel,
  showChip,
  elevated = false,
  alwaysActive = false,
  heroOverlay,
  hideBodyTopFade = false,
  className,
  heroClassName,
  heroIllustrationClassName,
}: SkillCardProps) {
  const resolvedTypeLabel = typeLabel ?? formatSkillTypeLabel(skillType);
  const bodyText = description.trim() || "No description";
  const isPlaceholder = !description.trim();

  return (
    <article
      className={cn(
        styles.card,
        elevated && styles.cardElevated,
        alwaysActive && styles.cardAlwaysActive,
        className,
      )}
      aria-label={name}
    >
      <div className={cn(styles.hero, heroClassName)}>
        <div className={styles.heroBase} aria-hidden />
        <SkillCardTypeBg
          skillType={skillType}
          className={styles.heroTypeBgReveal}
        />

        {heroOverlay}

        <div
          className={cn(styles.heroIllustration, heroIllustrationClassName)}
          aria-hidden
        >
          <div className={styles.docFrame}>
            <div className={styles.docIcon}>
              <SkillTypeIcon
                type={skillType}
                size={44}
                className={styles.docIconGlyph}
              />
            </div>
          </div>
        </div>

        <div className={styles.heroControls}>
          {showChip ? (
            <span className={styles.chip} title={resolvedTypeLabel}>
              {resolvedTypeLabel}
            </span>
          ) : (
            <span aria-hidden />
          )}
          <span aria-hidden />
        </div>
      </div>

      <div className={styles.body}>
        {!hideBodyTopFade ? (
          <div className={styles.bodyTopFade} aria-hidden />
        ) : null}
        <h2 className={styles.title} title={name}>
          {name}
        </h2>
        <p
          className={cn(
            styles.description,
            isPlaceholder && styles.descriptionMuted,
          )}
          title={!isPlaceholder ? bodyText : undefined}
        >
          {bodyText}
        </p>
      </div>
    </article>
  );
}
