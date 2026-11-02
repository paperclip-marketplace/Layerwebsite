import { AGENTS } from "./slack-people";
import shared from "./slack-page.module.css";
import styles from "./slack-routines-section.module.css";

/* Routine modes and card copy follow PitchBots lib/agent/cards.ts. */
const MODES = [
  {
    tag: "Read only",
    tone: styles.tagNeutral,
    title: "Reports, changes nothing.",
    body: "Briefs, forecasts and operating reviews.",
  },
  {
    tag: "Ask each time",
    tone: styles.tagWarn,
    title: "Prepares changes and asks you each time.",
    body: "Drafts, CRM updates and tasks as approval cards.",
  },
  {
    tag: "On your behalf",
    tone: styles.tagOk,
    title: "Updates on your behalf",
    body: "— only what you approved when you created it, and only where your admin allows.",
  },
];

const ACTIONS = [
  "Email draft",
  "Email send",
  "Calendar event",
  "CRM field update",
  "CRM follow-up task",
  "CRM call note",
  "Create CRM records",
  "LinkedIn invitation",
  "LinkedIn message",
  "Watch a person or company",
];

export function SlackRoutinesSection() {
  return (
    <section id="routines" className={shared.section} aria-labelledby="slack-routines-heading">
      <div className={styles.layout}>
        <div className={styles.copy}>
          <div className={shared.headCopy}>
            <p className={shared.eyebrow}>Routines</p>
            <h2 id="slack-routines-heading" className={shared.title}>
              Set it once. Your Agent keeps doing it.
            </h2>
            <p className={shared.lead}>
              Ask for a Routine in Slack. It runs on a schedule — or wakes when a close date slips, a stage moves
              or a deal is won or lost — and posts its results back to you.
            </p>
          </div>
          <ul className={styles.modes}>
            {MODES.map((mode) => (
              <li key={mode.tag} className={styles.mode}>
                <span className={`${styles.tag} ${mode.tone}`}>{mode.tag}</span>
                <span>
                  <strong>{mode.title}</strong> {mode.body}
                </span>
              </li>
            ))}
          </ul>
          <p className={styles.note}>
            <strong>Multi-step Routines</strong> — email, LinkedIn invitation, wait, follow up — need one approval
            for the whole sequence, and stop for anyone who replies or bounces.
          </p>
        </div>

        <div className={styles.aside}>
          <div className={styles.cardShell}>
            <div className={styles.card}>
              {/* eslint-disable-next-line @next/next/no-img-element -- illustrative SVG avatar */}
              <img src={AGENTS.maya.face} alt="" aria-hidden className={styles.avatar} />
              <div className={styles.cardBody}>
                <p className={styles.meta}>
                  <strong>Maya · AI Agent</strong>
                  <span className={styles.app}>APP</span>
                  <span className={styles.time}>4:12 PM</span>
                </p>
                <div className={styles.block}>
                  <p className={styles.blockTitle}>Let this routine act on your behalf?</p>
                  <p className={styles.blockText}>
                    <strong>Close-date slip</strong> — when a close date moves on one of your deals, find out why,
                    then prepare the next step and a CRM note.
                  </p>
                  <ul className={styles.radios} aria-label="Routine mode">
                    <li>
                      <span className={styles.radio} />
                      Read only — reports, changes nothing
                    </li>
                    <li>
                      <span className={`${styles.radio} ${styles.radioOn}`} />
                      <strong>Prepare changes and ask me each time</strong>
                    </li>
                    <li>
                      <span className={styles.radio} />
                      Update on my behalf
                    </li>
                  </ul>
                  <p className={styles.buttons} aria-hidden>
                    <span className={styles.primary}>Create routine</span>
                    <span>Edit</span>
                    <span>Dismiss</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <p className={styles.actionsLabel}>What your Agent can prepare for approval</p>
            <ul className={styles.chips}>
              {ACTIONS.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
