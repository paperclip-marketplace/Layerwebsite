import Link from "next/link";
import { ROUTES } from "@/lib/config/constants";
import { PERSONAL_AGENT_ASSETS } from "./personal-agent-assets";
import styles from "./personal-agent-hero-section.module.css";

export function PersonalAgentHeroSection() {
  return (
    <section
      className={`${styles.section} landing-full-bleed-strokes`}
      aria-labelledby="personal-agent-hero-heading"
      data-node-id="1091:5882"
    >
      <div className={styles.heroInner} data-node-id="1091:5889">
        <p className={styles.badge} data-node-id="1091:5890">
          For Customer Facing Team
        </p>

        <div className={styles.heroContent} data-node-id="1091:5892">
          <div className={styles.titleBlock} data-node-id="1091:5893">
            <h1
              id="personal-agent-hero-heading"
              className={styles.title}
              data-node-id="1091:5894"
            >
              <span>Personal </span>
              <span className={styles.titleAccent}>Agent</span>
            </h1>
            <p className={styles.description} data-node-id="1091:5895">
              Layer gives every IC a personal agent across practice, prep, live
              support, and post call automation governed by leadership and
              trained on your business context.
            </p>
          </div>

          <div className={styles.actionsRow} data-node-id="1091:5896">
            <Link
              href={ROUTES.signUp}
              className={styles.primaryCta}
              data-node-id="1091:5898"
            >
              <span>Try Personal Agent</span>
              <span
                className={`material-symbols-rounded ${styles.ctaIcon}`}
                aria-hidden
              >
                arrow_forward
              </span>
            </Link>
            <a href="#use-cases" className={styles.secondaryCta} data-node-id="1091:5899">
              How it works
            </a>
          </div>
        </div>
      </div>

      <div className={styles.ticker} data-node-id="1091:5901" data-name="hero-ticker">
        <div className={styles.tickerBackdrop} aria-hidden>
          <img
            src={PERSONAL_AGENT_ASSETS.heroTickerBg}
            alt=""
            className={styles.tickerBgImage}
          />
          <div className={styles.tickerRadial} />
        </div>
        <div
          className={styles.tickerFadeBottom}
          aria-hidden
          data-node-id="1091:5902"
        />
        <div
          className={styles.tickerFadeTop}
          aria-hidden
          data-node-id="1091:5903"
        />

        <div className={styles.chatWrap} data-node-id="1091:5904">
          <div className={styles.chatInner} data-node-id="1091:5905">
            <div className={styles.chatCard} data-node-id="1091:5906">
              <div className={styles.chatPrompt} data-node-id="1091:5907">
                <p>Help me understand the last client call.</p>
                <p className={styles.chatPromptSpacer} aria-hidden>
                  &nbsp;
                </p>
              </div>
              <div className={styles.chatActions} data-node-id="1091:5908">
                <button
                  type="button"
                  className={styles.chatAddBtn}
                  data-node-id="1091:5909"
                  aria-label="Add attachment"
                >
                  <span
                    className={`material-symbols-rounded ${styles.chatActionIcon}`}
                    aria-hidden
                  >
                    add
                  </span>
                </button>
                <div className={styles.chatRightActions} data-node-id="1091:5910">
                  <button
                    type="button"
                    className={styles.chatVoiceBtn}
                    data-node-id="1091:5911"
                    aria-label="Voice input"
                  >
                    <span
                      className={`material-symbols-rounded ${styles.chatActionIcon}`}
                      aria-hidden
                    >
                      graphic_eq
                    </span>
                  </button>
                  <button
                    type="button"
                    className={styles.chatSendBtn}
                    data-node-id="1091:5912"
                  >
                    <span className={styles.chatSendLabel}>Send Message</span>
                    <span
                      className={`material-symbols-rounded ${styles.chatSendIcon}`}
                      aria-hidden
                    >
                      send
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.supportingCopy} data-node-id="1091:5913">
        <p data-node-id="1091:5914">
          Layer agents are trained on your playbooks and customer context,
          connected to your existing tools, deployed where your team already
          works, helping them source, prepare, perform live, and follow up.
        </p>
      </div>
    </section>
  );
}
