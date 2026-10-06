import { cn } from "@/lib/cn";
import { PLAYBOOK_CARD_ASSETS } from "./playbook-card-assets";
import styles from "./playbook-card.module.css";

function creatorInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "?";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

export type PlaybookCardProps = {
  name: string;
  description: string;
  chipLabel?: string;
  createdByName: string;
  /** Optional photo avatar — falls back to initials when omitted */
  createdByAvatarSrc?: string;
  updatedAtLabel: string;
  /** Force hover thumb colors visible (Build card visual) */
  alwaysActive?: boolean;
};

/** PitchBots library PlaybookCard — display-only (no menu/actions). */
export function PlaybookCard({
  name,
  description,
  chipLabel = "Roleplay",
  createdByName,
  createdByAvatarSrc,
  updatedAtLabel,
  alwaysActive = false,
}: PlaybookCardProps) {
  return (
    <article
      className={cn(
        styles.playbookCard,
        alwaysActive && styles.playbookCardAlwaysActive,
      )}
      aria-label={name}
    >
      <div className={styles.playbookCardHero}>
        <div className={styles.playbookCardHeroBgWrap} aria-hidden>
          <div className={styles.playbookCardHeroGridMask}>
            <img
              className={styles.playbookCardHeroGridV}
              src={PLAYBOOK_CARD_ASSETS.gridLinesVertical}
              alt=""
            />
          </div>
          <div className={styles.playbookCardHeroRingsWrap}>
            <img
              className={styles.playbookCardHeroRings}
              src={PLAYBOOK_CARD_ASSETS.heroRings}
              alt=""
            />
          </div>
          <div className={styles.playbookCardHeroFadeBottom} />
        </div>

        <div className={styles.playbookCardHeroThumbWrap} aria-hidden>
          <div className={styles.playbookCardHeroThumbRotate}>
            <div className={styles.playbookCardHeroThumbFrame}>
              <span className={styles.playbookCardHeroThumbIconWrap}>
                <img
                  className={cn(
                    styles.playbookCardHeroThumbIcon,
                    styles.playbookCardHeroThumbIconDefault,
                  )}
                  src={PLAYBOOK_CARD_ASSETS.roleplayIcon}
                  alt=""
                />
                <img
                  className={cn(
                    styles.playbookCardHeroThumbIcon,
                    styles.playbookCardHeroThumbIconHover,
                  )}
                  src={PLAYBOOK_CARD_ASSETS.roleplayIconHover}
                  alt=""
                  aria-hidden
                />
              </span>
            </div>
          </div>
          <div className={styles.playbookCardHeroThumbFadeBottom} />
          <div className={styles.playbookCardHeroThumbFadeTop} />
        </div>

        <div className={styles.playbookCardHeroTop}>
          <span className={styles.playbookPlatformChip}>{chipLabel}</span>
        </div>
      </div>

      <div className={styles.playbookCardBody}>
        <div className={styles.playbookCardCopy}>
          <h3 className={styles.playbookCardTitle}>{name}</h3>
          <p className={styles.playbookCardDescription}>{description}</p>
        </div>

        <div className={styles.playbookCardMetaBox}>
          <div className={styles.playbookCardMetaRow}>
            <span className={styles.playbookCardMetaLabel}>Created by</span>
            <span
              className={styles.playbookCardCreatorAvatar}
              aria-label={createdByName}
              title={createdByName}
            >
              {createdByAvatarSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={createdByAvatarSrc}
                  alt=""
                  className={styles.playbookCardCreatorAvatarImage}
                />
              ) : (
                creatorInitials(createdByName)
              )}
            </span>
          </div>
          <div className={styles.playbookCardMetaRow}>
            <span className={styles.playbookCardMetaLabel}>Last Updated</span>
            <span className={styles.playbookCardMetaValue}>{updatedAtLabel}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
