import Link from "next/link";
import { ROUTES } from "@/lib/config/constants";
import { AGENTS } from "./slack-people";
import shared from "./slack-page.module.css";
import styles from "./slack-cta-section.module.css";

export function SlackCtaSection() {
  return (
    <section id="install" className={styles.section} aria-labelledby="slack-cta-heading">
      <div className={styles.card}>
        {/* Gradient/Agent Glow paint style — only around the Agent's identity. */}
        <span className={styles.glow}>
          {/* eslint-disable-next-line @next/next/no-img-element -- illustrative SVG portrait */}
          <img src={AGENTS.maya.face} alt="Maya, an example Layer Agent" />
        </span>
        <p className={styles.kicker}>Maya · Even&apos;s Layer Agent — yours keeps the name and face you choose</p>
        <h2 id="slack-cta-heading" className={styles.title}>
          Bring your Agent to the conversations where work happens.
        </h2>
        <div className={styles.actions}>
          <Link href={ROUTES.slackConnect} className={shared.primaryCta}>
            Add to Slack
          </Link>
          <Link href={ROUTES.contactSales} className={shared.secondaryCta}>
            Talk to us
          </Link>
        </div>
        <p className={styles.fine}>Requires a Layer account. All people, companies and data shown are fictional.</p>
      </div>
    </section>
  );
}
