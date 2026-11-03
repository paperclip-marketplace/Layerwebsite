import { AGENTS, LAYER_MARK_SRC, LAYER_WORDMARK_SRC, PEOPLE } from "./slack-people";
import styles from "./slack-profile-card.module.css";

/* Maya's Slack app profile — face, AI disclosure, owner, memory and Layer attribution. */
export function SlackProfileCard() {
  const { maya } = AGENTS;
  return (
    <div className={styles.card} role="group" aria-label="Illustrative Slack app profile for Maya, an AI Agent">
      <p className={styles.header}>About this app</p>
      <div className={styles.body}>
        {/* eslint-disable-next-line @next/next/no-img-element -- illustrative SVG portrait */}
        <img src={maya.face} alt="Maya's portrait — an illustrated face for an AI Agent" className={styles.portrait} />
        <div className={styles.identity}>
          <p className={styles.name}>
            Maya · AI Agent <span className={styles.app}>APP</span>
          </p>
          <p>Even&apos;s personal Layer Agent</p>
          <p className={styles.status}>
            <span className={styles.dot} aria-hidden />
            Active · replies as Maya, works for Even
          </p>
        </div>
        <dl className={styles.facts}>
          <div>
            <dt>About</dt>
            <dd>
              I&apos;m Even&apos;s partner. I know the deals, the people and how Even likes to work, so I handle the
              prep and the paperwork and Even gets more time with customers. I draft — Even decides.
            </dd>
          </div>
          <div>
            <dt>Remembers</dt>
            <dd className={styles.chips}>
              <span>Short emails, no exclamation marks</span>
              <span>No calls before 9:30</span>
              <span>4:00 school pickup</span>
            </dd>
          </div>
          <div>
            <dt>Works for</dt>
            <dd className={styles.owner}>
              {/* eslint-disable-next-line @next/next/no-img-element -- illustrative SVG avatar */}
              <img src={PEOPLE.even.face} alt="" aria-hidden />
              <strong>Even</strong> Account Executive · Brightline
            </dd>
          </div>
          <div>
            <dt>Can see</dt>
            <dd className={styles.chips}>
              <span>DMs with Even</span>
              <span># deals-halcyon-renewal</span>
              <span># ae-team</span>
            </dd>
          </div>
          <div>
            <dt>Keeps private</dt>
            <dd>Even&apos;s notes, email and CRM detail stay out of shared channels and go to Even&apos;s DM.</dd>
          </div>
          <div>
            <dt>Asks Even first</dt>
            <dd>Sending email · updating CRM · booking meetings</dd>
          </div>
        </dl>
      </div>
      <div className={styles.footer}>
        <p className={styles.builtOn}>
          Built on
          {/* eslint-disable-next-line @next/next/no-img-element -- official Layer mark */}
          <img src={LAYER_MARK_SRC} alt="" aria-hidden className={styles.mark} />
          {/* eslint-disable-next-line @next/next/no-img-element -- official Layer wordmark */}
          <img src={LAYER_WORDMARK_SRC} alt="Layer" className={styles.wordmark} />
        </p>
        <p>Maya is an AI Agent and can make mistakes. Managed by the Layer app — remove her any time in Layer Settings.</p>
      </div>
    </div>
  );
}
