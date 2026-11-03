import { AGENTS, LAYER_MARK_SRC } from "./slack-people";
import shared from "./slack-page.module.css";
import styles from "./slack-how-section.module.css";

const AGENT_FACES = [AGENTS.nova, AGENTS.maya, AGENTS.leo, AGENTS.sol, AGENTS.iris];

export function SlackHowSection() {
  return (
    <section id="how" className={shared.section} aria-labelledby="slack-how-heading">
      <div className={shared.headCopy}>
        <p className={shared.eyebrow}>Connect → meet your Agent → work together</p>
        <h2 id="slack-how-heading" className={shared.title}>
          Two minutes from Layer Settings to your first DM.
        </h2>
      </div>

      <ol className={styles.steps}>
        <li className={styles.step}>
          <div className={styles.visual}>
            <p className={styles.crumb}>Layer · Settings · Integrations</p>
            <div className={styles.integration}>
              <span className={`material-symbols-rounded ${styles.integrationIcon}`} aria-hidden>
                tag
              </span>
              <span className={styles.integrationText}>
                <strong>Slack</strong>
                <span>Brightline workspace</span>
              </span>
              <span className={styles.connect}>Connect</span>
            </div>
            <p className={styles.crumb}>If your workspace requires app approval, Slack sends your admin a request first.</p>
          </div>
          <div className={styles.copy}>
            <span className={styles.stepNo}>Step 1</span>
            <strong>Connect Layer to Slack</strong>
            <span>Start from Layer Settings, signed in as you.</span>
          </div>
        </li>

        <li className={styles.step}>
          <div className={`${styles.visual} ${styles.slackVisual}`}>
            <div className={styles.install}>
              {/* eslint-disable-next-line @next/next/no-img-element -- illustrative SVG avatar */}
              <img src={AGENTS.maya.face} alt="" aria-hidden className={styles.installFace} />
              <span>
                <strong>Maya · AI Agent</strong>
                <span>Even&apos;s Layer Agent wants to join Brightline</span>
              </span>
            </div>
            <ul className={styles.scopes}>
              <li>Read messages in DMs and channels she&apos;s added to</li>
              <li>Post messages and rich results as Maya</li>
            </ul>
            <p className={styles.installButtons} aria-hidden>
              <span className={styles.allow}>Allow</span>
              <span>Cancel</span>
            </p>
          </div>
          <div className={styles.copy}>
            <span className={styles.stepNo}>Step 2</span>
            <strong>Layer creates your Agent&apos;s app</strong>
            <span>Your name, face, Playbooks and owner are set from Layer.</span>
          </div>
        </li>

        <li className={styles.step}>
          <div className={`${styles.visual} ${styles.slackVisual}`}>
            <div className={styles.dm}>
              {/* eslint-disable-next-line @next/next/no-img-element -- illustrative SVG avatar */}
              <img src={AGENTS.maya.face} alt="" aria-hidden className={styles.dmFace} />
              <p>
                <strong>Maya · AI Agent</strong> <span className={styles.app}>APP</span>
                <br />
                Hi Even — I&apos;m Maya, your Layer Agent. Your briefs, follow-ups and Routines now come here too.
                Add me to a deal channel with <code>/invite @Maya</code>.
              </p>
            </div>
          </div>
          <div className={styles.copy}>
            <span className={styles.stepNo}>Step 3</span>
            <strong>Meet your Agent in a DM</strong>
            <span>Then invite it to the channels you choose.</span>
          </div>
        </li>
      </ol>

      <div className={styles.manager}>
        <span className={styles.managerArt} aria-hidden>
          <span className={styles.markTile}>
            {/* eslint-disable-next-line @next/next/no-img-element -- official Layer mark */}
            <img src={LAYER_MARK_SRC} alt="" />
          </span>
          <span className={`material-symbols-rounded ${styles.arrow}`}>arrow_forward</span>
          <span className={styles.agentStack}>
            {AGENT_FACES.map((agent) => (
              // eslint-disable-next-line @next/next/no-img-element -- illustrative SVG avatar
              <img key={agent.name} src={agent.face} alt="" />
            ))}
          </span>
        </span>
        <p>
          <strong>Behind the scenes:</strong> a separate Layer manager app is the control plane. It creates,
          updates and removes each person&apos;s Agent app and verifies every request. Nobody chats with it —
          you talk to your Agent.
        </p>
      </div>
    </section>
  );
}
