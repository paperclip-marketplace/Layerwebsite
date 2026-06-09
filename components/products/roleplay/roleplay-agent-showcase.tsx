import { ROLEPLAY_ASSETS } from "./roleplay-assets";
import styles from "./roleplay-hero-section.module.css";

type AgentCardVariant = "side-left" | "side-right" | "center";

type AgentCardProps = {
  variant: AgentCardVariant;
};

function AgentCardMedia({ variant }: AgentCardProps) {
  if (variant === "center") {
    return (
      <div className={styles.agentCardMedia} aria-hidden>
        <img
          src={ROLEPLAY_ASSETS.heroAgentFeatured}
          alt=""
          className={styles.agentCardFeatured}
        />
      </div>
    );
  }

  if (variant === "side-right") {
    return (
      <div className={styles.agentCardMedia} aria-hidden>
        <img
          src={ROLEPLAY_ASSETS.heroAgentBg}
          alt=""
          className={styles.agentCardBgRight}
        />
      </div>
    );
  }

  return (
    <div className={styles.agentCardMedia} aria-hidden>
      <img
        src={ROLEPLAY_ASSETS.heroAgentOverlay}
        alt=""
        className={styles.agentCardOverlayLeft}
      />
    </div>
  );
}

function AgentCard({ variant }: AgentCardProps) {
  const isCenter = variant === "center";
  const isSide = variant !== "center";

  return (
    <article
      className={`${styles.agentCard} ${isCenter ? styles.agentCardCenter : styles.agentCardSide}`}
      data-name="agent-card"
      data-node-id={
        variant === "center"
          ? "1088:4549"
          : variant === "side-left"
            ? "1088:4720"
            : "1088:4688"
      }
    >
      <AgentCardMedia variant={variant} />

      <div className={styles.agentCardContent}>
        <div className={styles.agentCardTop}>
          <span className={styles.agentChip}>Video Agent</span>
        </div>

        <div className={styles.agentCardBottom}>
          <div className={styles.agentIdentity}>
            <p className={styles.agentName}>Mark S.</p>
            <div className={styles.agentMeta}>
              <span>Chief Technology Officer</span>
              <span className={styles.agentMetaDot} aria-hidden />
              <span className={styles.agentCompany}>Sony</span>
            </div>
          </div>

          <div className={styles.agentStatsPanel}>
            <div className={styles.agentStats}>
              <div className={styles.agentStat}>
                <span className={styles.agentStatLabel}>Gaols</span>
                <span className={styles.agentStatValue}>56</span>
              </div>
              <div className={styles.agentStat}>
                <span className={styles.agentStatLabel}>Pains</span>
                <span className={styles.agentStatValue}>12</span>
              </div>
            </div>
            <button
              type="button"
              className={styles.agentTrainBtn}
              tabIndex={isSide ? -1 : 0}
            >
              <span>Start Training</span>
              <span
                className={`material-symbols-rounded ${styles.agentTrainIcon}`}
                aria-hidden
              >
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function RoleplayAgentShowcase() {
  return (
    <div
      className={styles.showcase}
      data-node-id="1088:4207"
      data-name="hero-ticker"
    >
      <div
        className={styles.showcaseSideRow}
        data-node-id="1088:4768"
        aria-hidden
      >
        <AgentCard variant="side-left" />
        <AgentCard variant="side-right" />
      </div>

      <AgentCard variant="center" />

      <div className={styles.showcaseNav} data-node-id="1088:4884">
        <button
          type="button"
          className={styles.showcaseNavBtn}
          aria-label="Previous agent"
          data-node-id="1088:4871"
        >
          <span
            className={`material-symbols-rounded ${styles.showcaseNavIcon}`}
            aria-hidden
          >
            arrow_back
          </span>
        </button>
        <button
          type="button"
          className={styles.showcaseNavBtn}
          aria-label="Next agent"
          data-node-id="1088:4865"
        >
          <span
            className={`material-symbols-rounded ${styles.showcaseNavIcon}`}
            aria-hidden
          >
            arrow_forward
          </span>
        </button>
      </div>

    </div>
  );
}
