"use client";

import { useState } from "react";
import { SlackApprovalScene } from "./slack-approval-scene";
import { SlackProfileCard } from "./slack-profile-card";
import { SceneRelationship } from "./slack-scenes";
import shared from "./slack-page.module.css";
import styles from "./slack-control-section.module.css";

const CONTROLS = [
  {
    icon: "person",
    title: "Bound to one owner",
    body: "Maya works for Even. Teammates can add context in a thread; only Even directs private work or approves actions.",
  },
  {
    icon: "group",
    title: "The audience decides what's shared",
    body: "In a shared channel your Agent holds back private data and moves write requests to your DM.",
  },
  {
    icon: "menu_book",
    title: "Your Playbooks apply in Slack too",
    body: "The same team Playbooks shape what your Agent prepares in DMs and deal channels.",
  },
  {
    icon: "verified_user",
    title: "Approval for high-impact actions",
    body: "Every request is verified; unapproved cards expire after 24 hours; each step is logged.",
  },
  {
    icon: "link_off",
    title: "Disconnect any time",
    body: "Disconnect in Layer Settings and the managed Agent app is removed from Slack.",
  },
];

const LIFECYCLE = [
  { label: "Prepared", className: styles.prepared },
  { label: "Approved", className: styles.approved },
  { label: "Executed", className: styles.executed },
  { label: "Receipt", className: styles.receipt },
];

type Tab = "lifecycle" | "audience";

export function SlackControlSection() {
  const [tab, setTab] = useState<Tab>("lifecycle");

  return (
    <section id="control" className={shared.section} aria-labelledby="slack-control-heading">
      <div className={styles.layout}>
        <div className={styles.profile}>
          <SlackProfileCard />
        </div>
        <div className={styles.copy}>
          <div className={shared.headCopy}>
            <p className={shared.eyebrow}>Personal identity, governed authority</p>
            <h2 id="slack-control-heading" className={shared.title}>
              Personal by design. Governed by default.
            </h2>
            <p className={shared.lead}>
              The Slack situation changes what your Agent may see, who sees the result and whether approval is
              needed. It never changes who it works for.
            </p>
          </div>
          <ul className={styles.controls}>
            {CONTROLS.map((control) => (
              <li key={control.title} className={styles.control}>
                <span className={`material-symbols-rounded ${styles.icon}`} aria-hidden>
                  {control.icon}
                </span>
                <span>
                  <strong>{control.title}</strong>
                  {control.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.toolbar}>
        <ol className={styles.lifecycle} aria-label="Every action has four visible states">
          {LIFECYCLE.map((state, index) => (
            <li key={state.label} className={styles.lifecycleStep}>
              {index > 0 ? (
                <span className={`material-symbols-rounded ${styles.arrow}`} aria-hidden>
                  arrow_forward
                </span>
              ) : null}
              <span className={state.className}>{state.label}</span>
            </li>
          ))}
        </ol>
        <div className={shared.tablist} role="tablist" aria-label="Governance">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "lifecycle"}
            className={`${shared.tab} ${tab === "lifecycle" ? shared.tabActive : ""}`}
            onClick={() => setTab("lifecycle")}
          >
            Approval lifecycle
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "audience"}
            className={`${shared.tab} ${tab === "audience" ? shared.tabActive : ""}`}
            onClick={() => setTab("audience")}
          >
            Private by audience
          </button>
        </div>
      </div>

      <div className={shared.sceneFrame} role="tabpanel">
        {tab === "lifecycle" ? <SlackApprovalScene /> : <SceneRelationship />}
      </div>
    </section>
  );
}
