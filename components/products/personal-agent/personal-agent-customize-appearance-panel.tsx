import { PERSONAL_AGENT_ASSETS } from "./personal-agent-assets";
import styles from "./personal-agent-customize-appearance-panel.module.css";

type AvatarCardProps = {
  name: string;
  locale: string;
  description: string;
  image: string;
  imageClassName: string;
  selected?: boolean;
};

function AvatarCard({
  name,
  locale,
  description,
  image,
  imageClassName,
  selected = false,
}: AvatarCardProps) {
  return (
    <article
      className={`${styles.avatarCard} ${selected ? styles.avatarCardSelected : ""}`}
    >
      <div className={styles.avatarPreview}>
        <div className={styles.avatarPreviewMedia} aria-hidden>
          <img
            src={image}
            alt=""
            className={`${styles.avatarPreviewImage} ${imageClassName}`}
          />
          <div
            className={`${styles.avatarPreviewFade} ${selected ? styles.avatarPreviewFadeSelected : ""}`}
          />
        </div>
        <div className={styles.playButton}>
          <span className="material-symbols-rounded" aria-hidden>
            play_arrow
          </span>
        </div>
      </div>

      <div className={styles.avatarBody}>
        <div className={styles.avatarMeta}>
          <div className={styles.avatarTitleRow}>
            <p className={styles.avatarName}>{name}</p>
            <span
              className={`${styles.localePill} ${selected ? styles.localePillSelected : ""}`}
            >
              {locale}
            </span>
          </div>
          <p className={styles.avatarDescription}>{description}</p>
        </div>

        <div
          className={`${styles.avatarAction} ${selected ? styles.avatarActionSelected : ""}`}
        >
          <span>{selected ? "Selected" : "Select Avatar"}</span>
          <span className="material-symbols-rounded" aria-hidden>
            {selected ? "check" : "add"}
          </span>
        </div>
      </div>
    </article>
  );
}

const AVATAR_CARDS = [
  {
    name: "Lacey",
    locale: "German",
    description: "Light moody tone with assertive touch",
    image: PERSONAL_AGENT_ASSETS.avatarLacey,
    imageClassName: styles.avatarImageLacey,
    selected: false,
  },
  {
    name: "Mark",
    locale: "French",
    description: "Slightly assertive tone",
    image: PERSONAL_AGENT_ASSETS.avatarMark,
    imageClassName: styles.avatarImageMark,
    selected: true,
  },
  {
    name: "Avatar Name",
    locale: "Indian",
    description: "Light moody tone with assertive touch",
    image: PERSONAL_AGENT_ASSETS.avatarMark,
    imageClassName: styles.avatarImageMark,
    selected: false,
  },
  {
    name: "Avatar Name",
    locale: "Indian",
    description: "Light moody tone with assertive touch",
    image: PERSONAL_AGENT_ASSETS.avatarMark,
    imageClassName: styles.avatarImageMark,
    selected: false,
  },
] as const;

export function PersonalAgentCustomizeAppearancePanel() {
  return (
    <div className={styles.root} data-node-id="1091:5993">
      <div className={styles.background} aria-hidden>
        <img
          src={PERSONAL_AGENT_ASSETS.customizePanelBg}
          alt=""
          className={styles.backgroundImage}
        />
      </div>

      <div className={styles.glassCard} data-node-id="1092:3828">
        <div className={styles.panelBody} data-node-id="1092:3829">
          <div className={styles.panelScroll} data-node-id="1092:3830">
            <div className={styles.panelHeader} data-node-id="1092:3831">
              <p className={styles.stepLabel} data-node-id="1092:3832">
                Step 2 of 4
              </p>
              <div className={styles.titleBlock} data-node-id="1092:3833">
                <h3 className={styles.title} data-node-id="1092:3835">
                  Choose Appearance
                </h3>
                <p className={styles.subtitle} data-node-id="1092:3836">
                  Select an avatar or upload your own to personalize your agent.
                </p>
              </div>
            </div>

            <div className={styles.tabsWrap} data-node-id="1092:3837">
              <div className={styles.tabs} data-node-id="1092:3839">
                <div className={styles.tabItem} data-node-id="1092:3840">
                  <span>Image Avatar</span>
                </div>
                <div
                  className={`${styles.tabItem} ${styles.tabItemActive}`}
                  data-node-id="1092:3842"
                >
                  <span>Video Avatar (7)</span>
                </div>
              </div>
            </div>

            <div className={styles.avatarGrid} data-node-id="1092:3844">
              <div className={styles.avatarRow} data-node-id="1092:3845">
                {AVATAR_CARDS.slice(0, 2).map((card) => (
                  <AvatarCard key={card.name + card.locale} {...card} />
                ))}
              </div>
              <div className={styles.avatarRow} data-node-id="1092:3848">
                {AVATAR_CARDS.slice(2).map((card, index) => (
                  <AvatarCard
                    key={`${card.name}-${index}`}
                    {...card}
                  />
                ))}
              </div>
            </div>

            <div className={styles.scrollFade} aria-hidden data-node-id="1092:3851" />
          </div>

          <div className={styles.panelFooter} data-node-id="1092:3852">
            <button type="button" className={styles.backButton} data-node-id="1092:3853">
              <span className="material-symbols-rounded" aria-hidden>
                arrow_back
              </span>
              <span>Back</span>
            </button>

            <div className={styles.footerActions} data-node-id="1092:3854">
              <button type="button" className={styles.skipButton} data-node-id="1092:3855">
                Skip
              </button>
              <button
                type="button"
                className={styles.nextButton}
                disabled
                data-node-id="1092:3856"
              >
                <span>Next</span>
                <span className="material-symbols-rounded" aria-hidden>
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.scrollbar} aria-hidden data-node-id="1092:3857" />
      </div>
    </div>
  );
}
