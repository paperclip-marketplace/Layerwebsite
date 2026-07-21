import styles from "./perform-widget-expanded.module.css";
import { LandingOptimizedImage } from "./landing-optimized-image";

const ASSET = "/assets/images/landing/split-section/perform-widget";

/** Figma 891:479 — Perform Widget (inside Widget / Expanded 713:281) */
export function PerformWidgetExpanded({
  priority = false,
}: {
  priority?: boolean;
}) {
  return (
    <div
      className={styles.root}
      data-name="Widget / Expanded"
      data-node-id="713:281"
    >
      <div
        className={styles.widgetExpanded}
        data-name="Widget Expanded"
        data-node-id="713:282"
      >
        <div
          className={styles.widgetExpandedIcon}
          data-name="Widget Expanded Icon"
          data-node-id="713:283"
        >
          <div
            className={styles.widgetExpandedIconClip}
            data-name="Clip path group"
            data-node-id="713:284"
          >
            <LandingOptimizedImage
              src={`${ASSET}/layer-white-logo-small.webp`}
              alt=""
              width={20}
              height={20}
              className={styles.widgetExpandedIconImg}
              sizes="20px"
              priority={priority}
            />
          </div>
        </div>
        <div className={styles.widgetExpandedButton} data-name="button" data-node-id="713:295">
          <span className={styles.widgetExpandedButtonText} data-node-id="713:298">
            Collapse
          </span>
          <span
            className={`material-symbols-rounded ${styles.widgetExpandedButtonIcon}`}
            data-node-id="713:299"
          >
            expand_less
          </span>
        </div>
        <div
          className={styles.widgetExpandedVisibility}
          data-name="Widget Expanded Visibility Icon"
          data-node-id="713:300"
        >
          <span
            className={`material-symbols-rounded ${styles.widgetExpandedVisibilityIcon}`}
            data-node-id="713:301"
          >
            visibility
          </span>
        </div>
      </div>

      <div className={styles.panel} data-name="Perform Widget" data-node-id="891:479">
        <div className={styles.panelBackdrop} aria-hidden>
          <div className={styles.panelGradient} />
          <div className={styles.panelTextureWrap}>
            <LandingOptimizedImage
              src={`${ASSET}/texture.webp`}
              alt=""
              fill
              className={styles.panelTexture}
              sizes="400px"
              priority={priority}
            />
          </div>
          <div className={styles.panelBlur} />
        </div>

        <div className={styles.panelBody}>
          <div className={styles.widgetMain} data-node-id="713:303">
            <div className={styles.header} data-node-id="713:305">
              <div className={styles.headerMeta} data-node-id="713:306">
                <div className={styles.headerParticipants} data-node-id="713:307">
                  <div className={styles.avatarStack} data-node-id="713:308">
                    <LandingOptimizedImage
                      src={`${ASSET}/avatar-1.webp`}
                      alt=""
                      width={24}
                      height={24}
                      className={styles.avatar}
                      sizes="24px"
                    />
                    <LandingOptimizedImage
                      src={`${ASSET}/avatar-2.webp`}
                      alt=""
                      width={24}
                      height={24}
                      className={styles.avatar}
                      sizes="24px"
                    />
                    <LandingOptimizedImage
                      src={`${ASSET}/avatar-3.webp`}
                      alt=""
                      width={24}
                      height={24}
                      className={styles.avatar}
                      sizes="24px"
                    />
                  </div>
                  <span className={styles.headerLabel}>Sarah, Michel and You</span>
                </div>
                <LandingOptimizedImage
                  src={`${ASSET}/dot.webp`}
                  alt=""
                  width={4}
                  height={4}
                  className={styles.metaDot}
                  sizes="4px"
                />
                <span className={styles.headerDate}>Thursday, 16 April</span>
              </div>
              <div className={styles.statusPill} data-node-id="891:492">
                <span className={styles.statusRecordIcon} aria-hidden data-node-id="891:493" />
                <span className={styles.statusText} data-node-id="891:494">
                  Listening Now
                </span>
              </div>
            </div>

            <div className={styles.thread} data-node-id="891:495">
              <div className={styles.agentRow} data-node-id="891:496">
                <div className={styles.agentAvatarWrap} data-node-id="891:497">
                  <LandingOptimizedImage
                    src={`${ASSET}/agent-avatar.webp`}
                    alt=""
                    width={32}
                    height={32}
                    className={styles.agentAvatar}
                    sizes="32px"
                    priority={priority}
                  />
                </div>
                <div className={styles.agentMessageCol}>
                  <div className={styles.agentBubble} data-node-id="891:499">
                    <p className={styles.agentBubbleText}>
                      Michel asked about security and data residency.
                    </p>
                  </div>
                  <div className={styles.suggestedAnswerBubble} data-node-id="891:501">
                    <p className={styles.suggestedAnswerLabel}>Suggested Answer</p>
                    <p className={styles.suggestedAnswerText}>
                      Lead with SSO, audit logs, role-based access, and EU data residency.
                      I&apos;ll attach the security brief after the call.
                    </p>
                  </div>
                  <span className={styles.timestamp} data-node-id="891:504">
                    Just Now
                  </span>
                </div>
              </div>

              <div className={styles.userRow} data-node-id="891:505">
                <div className={styles.userBubble} data-node-id="891:506">
                  <p className={styles.userBubbleText}>Good, send me the brief after.</p>
                </div>
              </div>

              <div className={styles.agentRow} data-node-id="891:508">
                <div className={styles.agentAvatarWrap} data-node-id="891:509">
                  <LandingOptimizedImage
                    src={`${ASSET}/agent-avatar.webp`}
                    alt=""
                    width={32}
                    height={32}
                    className={styles.agentAvatar}
                    sizes="32px"
                  />
                </div>
                <div className={styles.agentMessageCol}>
                  <div className={styles.agentBubble} data-node-id="891:511">
                    <p className={styles.agentBubbleText}>
                      The 22% discount is above your 15% approval limit.
                    </p>
                  </div>
                  <div className={styles.agentActionBubble} data-node-id="891:513">
                    <p className={styles.agentActionText}>
                      I&apos;ve prepared the approval request with deal context and close
                      date. Send to Sarah?
                    </p>
                    <button type="button" className={styles.yesButton} data-node-id="891:515">
                      <span className={`material-symbols-rounded ${styles.yesButtonIcon}`}>
                        check
                      </span>
                      <span className={styles.yesButtonLabel}>Yes</span>
                    </button>
                  </div>
                  <div className={styles.actionMeta} data-node-id="891:518">
                    <span className={styles.timestamp} data-node-id="891:519">
                      Just Now
                    </span>
                    <LandingOptimizedImage
                      src={`${ASSET}/divider-dot.webp`}
                      alt=""
                      width={4}
                      height={4}
                      className={styles.metaDot}
                      sizes="4px"
                    />
                    <div className={styles.actionTrail}>
                      <span className={styles.actionStep}>Approval Sent</span>
                      <span className={styles.actionDivider} aria-hidden />
                      <span className={styles.actionStep}>Seen</span>
                      <span className={styles.actionDivider} aria-hidden />
                      <span className={styles.approvedChip}>
                        Approved
                        <span className={`material-symbols-rounded ${styles.approvedIcon}`}>
                          check_circle
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer} data-node-id="891:528">
            <div className={styles.footerRow} data-node-id="891:529">
              <p className={styles.footerPrompt}>
                Ask about the conversation, or{" "}
                <span className={`material-symbols-rounded ${styles.footerPromptIcon}`}>
                  send
                </span>{" "}
                for chat history
              </p>
              <button type="button" className={styles.sendButton} data-node-id="891:534">
                <span className={`material-symbols-rounded ${styles.sendIcon}`}>send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
