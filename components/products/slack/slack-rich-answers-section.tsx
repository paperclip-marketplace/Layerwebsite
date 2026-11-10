import type { ReactNode } from "react";
import { PEOPLE } from "./slack-people";
import shared from "./slack-page.module.css";
import styles from "./slack-rich-answers-section.module.css";

/*
 * Rich answers projected natively into Slack: data_visualization (bar, line,
 * area, pie), data_table fallback, metrics, follow-up buttons and relationship
 * paths — PitchBots lib/integrations/slack/render/openui.ts.
 */

const BARS = [
  { label: "Disc.", value: "$420k", height: 83 },
  { label: "Eval.", value: "$610k", height: 120 },
  { label: "Prop.", value: "$380k", height: 75 },
  { label: "Neg.", value: "$290k", height: 57 },
  { label: "Commit", value: "$140k", height: 28 },
];

const DEALS = [
  ["Halcyon Freight", "Negotiation", "$186,000", "Dec 14"],
  ["Kestrel Health", "Proposal", "$94,500", "Nov 28"],
  ["Orbit Mills", "Commit", "$61,200", "Nov 21"],
];

const PATH = [
  { name: "You", face: PEOPLE.even.face },
  { name: "Priya", face: PEOPLE.priya.face },
  { name: "Dana", face: PEOPLE.dana.face },
  { name: "Marcus", face: PEOPLE.marcus.face },
];

function Tile({ title, body, children }: { title: string; body: string; children: ReactNode }) {
  return (
    <figure className={styles.tile}>
      <div className={styles.block}>{children}</div>
      <figcaption className={styles.caption}>
        <strong>{title}</strong>
        <span>{body}</span>
      </figcaption>
    </figure>
  );
}

export function SlackRichAnswersSection() {
  return (
    <section id="rich" className={shared.section} aria-labelledby="slack-rich-heading">
      <div className={shared.headCopy}>
        <p className={shared.eyebrow}>Rich answers, not just chat bubbles</p>
        <h2 id="slack-rich-heading" className={shared.title}>
          Tables, charts and plans, built from your Layer data.
        </h2>
        <p className={shared.lead}>
          Native Slack tables and charts from authorised CRM, call and account context. When a chart would
          round away detail, your Agent sends the exact table instead.
        </p>
      </div>

      <div className={styles.grid}>
        <Tile title="Bar, line and area charts" body="Native Slack chart when the series fits; otherwise the exact table.">
          <p className={styles.blockTitle}>Q4 open pipeline by stage</p>
          <div className={styles.bars} role="img" aria-label="Open pipeline: Discovery $420k, Evaluation $610k, Proposal $380k, Negotiation $290k, Commit $140k">
            {BARS.map((bar) => (
              <span key={bar.label} className={styles.bar}>
                <span className={styles.barValue}>{bar.value}</span>
                <span className={styles.barFill} style={{ height: `calc(${bar.height} * var(--l-vw))` }} />
                <span className={styles.barLabel}>{bar.label}</span>
              </span>
            ))}
          </div>
        </Tile>

        <Tile title="Trends over time" body="Pipeline, activity and forecast movement for managers and executives.">
          <p className={styles.blockTitle}>
            Weighted pipeline, 8 weeks <span className={styles.up}>+29%</span>
          </p>
          <svg
            className={styles.area}
            viewBox="0 0 300 120"
            preserveAspectRatio="none"
            role="img"
            aria-label="Weighted pipeline rose from 610 thousand to 790 thousand dollars over eight weeks"
          >
            <path d="M0 30H300M0 60H300M0 90H300" stroke="#eeeeee" strokeWidth="1" />
            <path d="M0 74L43 68L86 78L129 58L171 50L214 54L257 40L300 32V120H0Z" fill="#1264a3" opacity="0.14" />
            <path d="M0 74L43 68L86 78L129 58L171 50L214 54L257 40L300 32" fill="none" stroke="#1264a3" strokeWidth="2.5" />
          </svg>
          <p className={styles.axis}>
            <span>Sep 14</span>
            <span>Nov 2 · $790k</span>
          </p>
        </Tile>

        <Tile title="Pie for share-of-total" body="Values are always labelled, so the answer survives without colour.">
          <p className={styles.blockTitle}>Open pipeline by segment</p>
          <div className={styles.pieRow}>
            <svg className={styles.pie} viewBox="0 0 120 120" role="img" aria-label="Enterprise 48 percent, Mid-market 34 percent, SMB 18 percent">
              <circle cx="60" cy="60" r="40" fill="none" stroke="#1264a3" strokeWidth="40" strokeDasharray="120.6 251.3" transform="rotate(-90 60 60)" />
              <circle cx="60" cy="60" r="40" fill="none" stroke="#2bac76" strokeWidth="40" strokeDasharray="85.4 251.3" strokeDashoffset="-120.6" transform="rotate(-90 60 60)" />
              <circle cx="60" cy="60" r="40" fill="none" stroke="#ecb22e" strokeWidth="40" strokeDasharray="45.3 251.3" strokeDashoffset="-206" transform="rotate(-90 60 60)" />
            </svg>
            <ul className={styles.legend}>
              <li>
                <span className={styles.swatchBlue} />
                Enterprise · 48%
              </li>
              <li>
                <span className={styles.swatchGreen} />
                Mid-market · 34%
              </li>
              <li>
                <span className={styles.swatchYellow} />
                SMB · 18%
              </li>
            </ul>
          </div>
        </Tile>

        <Tile title="Exact-table fallback" body="Owners, values, stages and dates, sortable in Slack. Nothing is rounded.">
          <p className={styles.blockTitle}>Deals closing this month</p>
          <div className={styles.table} role="table">
            <div className={`${styles.row} ${styles.head}`} role="row">
              {["Deal", "Stage", "Amount", "Close"].map((column) => (
                <span key={column} role="columnheader">
                  {column}
                </span>
              ))}
            </div>
            {DEALS.map((deal) => (
              <div key={deal[0]} className={styles.row} role="row">
                {deal.map((cell) => (
                  <span key={cell} role="cell">
                    {cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </Tile>

        <Tile title="Metrics, progress and follow-ups" body="Follow-up buttons continue the same conversation — one tap, no retyping.">
          <p className={styles.blockTitle}>Halcyon renewal readiness</p>
          <div className={styles.metrics}>
            <span>
              Days left<strong>41</strong>
            </span>
            <span>
              Usage<strong>+22%</strong>
            </span>
            <span>
              Plan steps<strong>3 of 5</strong>
            </span>
          </div>
          <span className={styles.progress} aria-hidden>
            <span />
          </span>
          <span className={styles.buttons} aria-hidden>
            <span>What&apos;s blocking step 4?</span>
            <span>Draft the rollout recap</span>
          </span>
        </Tile>

        <Tile title="Relationship paths" body="Who you know, how, and the warmest route in.">
          <p className={styles.blockTitle}>Warm path to Marcus Lee, CFO</p>
          <p className={styles.path}>
            {PATH.map((step, index) => (
              <span key={step.name} className={styles.pathStep}>
                {index > 0 ? <span className={styles.arrow}>→</span> : null}
                {/* eslint-disable-next-line @next/next/no-img-element -- illustrative SVG avatar */}
                <img src={step.face} alt="" aria-hidden />
                {step.name}
              </span>
            ))}
          </p>
          <p className={styles.pathNote}>
            Priya and Dana worked together at Kestrel Health (2019–22). Dana and Marcus run the weekly ops
            review.
          </p>
          <span className={styles.buttons} aria-hidden>
            <span>Draft intro request to Priya</span>
          </span>
        </Tile>
      </div>
    </section>
  );
}
