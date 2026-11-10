import Link from "next/link";
import { LandingSectionLink } from "@/components/landing/landing-section-link";
import { ROUTES } from "@/lib/config/constants";
import { AGENTS, PEOPLE, type SlackAgent, type SlackPerson } from "./slack-people";
import { SceneRenewal } from "./slack-scenes";
import shared from "./slack-page.module.css";
import styles from "./slack-hero-section.module.css";

const PAIRS: { person: SlackPerson; agent: SlackAgent; role: string; featured?: boolean }[] = [
  { person: PEOPLE.theo, agent: AGENTS.nova, role: "Theo, SDR" },
  { person: PEOPLE.even, agent: AGENTS.maya, role: "Even, AE", featured: true },
  { person: PEOPLE.priya, agent: AGENTS.leo, role: "Priya, CSM" },
  { person: PEOPLE.jordan, agent: AGENTS.sol, role: "Jordan, Manager" },
  { person: PEOPLE.rosa, agent: AGENTS.iris, role: "Rosa, CRO" },
];

const PROOF = [
  {
    icon: "person",
    title: "Already knows you",
    body: "Your deals, your voice, your week. It picks up exactly where you left off in Layer.",
  },
  {
    icon: "event_available",
    title: "Prepared before, done after",
    body: "A brief and practice before each meeting; every follow-up drafted after it.",
  },
  {
    icon: "autorenew",
    title: "Routines that run on their own",
    body: "On a schedule or when a deal changes — reports, prepared changes or approved updates.",
  },
  {
    icon: "verified_user",
    title: "Approval before impact",
    body: "Approve, Edit, Dismiss or ask Why? — then a receipt in the same thread.",
  },
];

export function SlackHeroSection() {
  return (
    <section className={styles.section} aria-labelledby="slack-hero-heading">
      <div className={styles.copy}>
        <p className={styles.badge}>
          <span className={styles.badgeNew}>New</span>
          Layer for Slack is in the Slack Marketplace
        </p>
        <h1 id="slack-hero-heading" className={styles.title}>
          Your Agent already knows you. Now it&apos;s in Slack.
        </h1>
        <p className={styles.description}>
          Not another workspace bot. The partner you work with in Layer — same name, same face, same memory
          of your deals, your voice and your week — joins your conversations. It preps, follows up and keeps
          deals moving, so you can spend your time with people. Nothing leaves without your approval.
        </p>
        <div className={styles.actions}>
          <Link href={ROUTES.slackConnect} className={shared.primaryCta}>
            Add to Slack
          </Link>
          <LandingSectionLink href="#roles" className={shared.secondaryCta}>
            See it for your role
          </LandingSectionLink>
        </div>
        <ul className={styles.pairs} aria-label="One personal Agent per person">
          {PAIRS.map(({ person, agent, role, featured }) => (
            <li key={agent.name} className={`${styles.pair} ${featured ? styles.pairFeatured : ""}`}>
              <span className={styles.faces} aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element -- illustrative SVG avatar */}
                <img src={person.face} alt="" />
                {/* eslint-disable-next-line @next/next/no-img-element -- illustrative SVG avatar */}
                <img src={agent.face} alt="" />
              </span>
              <span>
                <strong>{agent.name}</strong> · {role}
              </span>
            </li>
          ))}
        </ul>
        <p className={styles.pairsNote}>One personal Agent per person, on every seat of the revenue team.</p>
      </div>

      <div className={styles.scene}>
        <div className={shared.sceneFrame}>
          <SceneRenewal />
        </div>
        <p className={shared.caption}>
          <span>
            Even asks in a deal thread. Maya reads it, checks permitted CRM and call context, returns a plan —
            and keeps the follow-up waiting for Even&apos;s approval.
          </span>
          <span>Illustrative workspace, people and data.</span>
        </p>
      </div>

      <ul className={styles.proof} aria-label="Why it is different">
        {PROOF.map((item) => (
          <li key={item.title} className={styles.proofItem}>
            <span className={`material-symbols-rounded ${styles.proofIcon}`} aria-hidden>
              {item.icon}
            </span>
            <strong className={styles.proofTitle}>{item.title}</strong>
            <span className={styles.proofBody}>{item.body}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
