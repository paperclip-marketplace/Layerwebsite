import shared from "./card-visuals.module.css";
import { DEPLOY_CARD_ASSETS } from "./deploy-card-assets";
import styles from "./deploy-card-visual.module.css";
import {
  DeployCenterAgentCard,
  DeployLeftAgentCard,
  DeployRightAgentCard,
} from "./deploy-agent-card";

/** Figma 1822:24242 — Deploy card visual (coded agent cards) */
export function DeployCardVisual() {
  return (
    <div className={shared.visual} data-node-id="1822:24242">
      <div className={styles.backdrop} data-node-id="1822:24243" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={DEPLOY_CARD_ASSETS.backdropBg}
          alt=""
          className={styles.backdropImage}
        />
        <div className={styles.backdropGradient} />
      </div>

      <div className={styles.leftWrap} data-node-id="1822:24244">
        <DeployLeftAgentCard />
      </div>

      <div className={styles.rightWrap} data-node-id="1822:24269">
        <DeployRightAgentCard />
      </div>

      <div className={styles.centerWrap} data-node-id="1822:24298">
        <DeployCenterAgentCard />
      </div>

      <div className={styles.bottomFade} aria-hidden data-node-id="1822:24297" />
    </div>
  );
}
