"use client";

import { useState, type ComponentType } from "react";
import { AGENTS, PEOPLE, type SlackAgent, type SlackPerson } from "./slack-people";
import { SceneCsm, SceneExec, SceneManager, SceneSdr, SceneWinPlan } from "./slack-scenes";
import shared from "./slack-page.module.css";
import styles from "./slack-roles-section.module.css";

type RoleId = "sdr" | "ae" | "csm" | "manager" | "exec";

type Role = {
  id: RoleId;
  tab: string;
  person: SlackPerson;
  agent: SlackAgent;
  seat: string;
  headline: string;
  preview?: string;
  actions: { title: string; body: string }[];
  routines: string[];
  Scene: ComponentType;
};

/* Starter Routine names come from PitchBots' starter catalogue (supabase starter routines + lib/home/home-routines.ts). */
const ROLES: Role[] = [
  {
    id: "sdr",
    tab: "SDR",
    person: PEOPLE.theo,
    agent: AGENTS.nova,
    seat: "Theo's Agent · SDR",
    headline: "From ICP to first touch, in one DM.",
    actions: [
      {
        title: "Shortlists ICP-fit leads",
        body: "From Layer Data & Signals, ranked against the ICP in your Context — with the reason each one fits.",
      },
      { title: "Enriches the ones you pick", body: "Work email, phone, LinkedIn. A missing field is named, never invented." },
      {
        title: "Creates records, starts the sequence",
        body: "CRM leads plus a multi-step Routine: one approval, stops on reply or bounce.",
      },
    ],
    routines: ["Multi-step outbound", "Watch · job change", "Morning Brief", "Follow-Up Obligations"],
    Scene: SceneSdr,
  },
  {
    id: "ae",
    tab: "AE",
    person: PEOPLE.even,
    agent: AGENTS.maya,
    seat: "Even's Agent · AE",
    headline: "Every deal risk becomes a plan you can approve.",
    preview: "Deal health and Win Plan · preview",
    actions: [
      {
        title: "Flags new risk, with evidence",
        body: "Stakeholder coverage, decision authority, mutual next step, close-date credibility — each cited.",
      },
      {
        title: "Builds the Win Plan",
        body: "Emails, meetings, CRM updates and practice, with the exact content shown before you approve.",
      },
      { title: "Runs it, then rescores", body: "One approval starts the Routine. The deal is reassessed as the evidence changes." },
    ],
    routines: ["Meeting Preparation", "Close-date slip", "End-of-Day Commitments", "Friday Pipeline Cleanup"],
    Scene: SceneWinPlan,
  },
  {
    id: "csm",
    tab: "CSM",
    person: PEOPLE.priya,
    agent: AGENTS.leo,
    seat: "Priya's Agent · CSM",
    headline: "Renewals and expansion, handled before they're urgent.",
    actions: [
      { title: "Reviews every renewal", body: "Next 90 days, with health and expansion signals per account, every Thursday." },
      { title: "Catches champion changes", body: "Watch spots the job change; Leo drafts the re-introduction to the new owner." },
      { title: "Turns gaps into tasks", body: "CRM tasks, emails and handoff fixes from the AE — each one waiting for Approve." },
    ],
    routines: ["Renewal & Expansion Review", "AE-to-CS Handoff Review", "Meeting Preparation"],
    Scene: SceneCsm,
  },
  {
    id: "manager",
    tab: "Sales manager",
    person: PEOPLE.jordan,
    agent: AGENTS.sol,
    seat: "Jordan's Agent · Sales manager",
    headline: "Know where to coach and which deals need you.",
    preview: "Call scores and deal health · preview",
    actions: [
      { title: "Rolls up the forecast", body: "Commit, best case and at-risk deals by seller, every Monday." },
      { title: "Builds a coaching agenda", body: "Seven skills scored on every call, with the exact moment to replay." },
      { title: "Preps your 1:1s", body: "Reports to you; never acts on a seller's deals. Their own Agent does." },
    ],
    routines: ["Weekly Team Forecast", "Coaching Agenda", "Pipeline risk"],
    Scene: SceneManager,
  },
  {
    id: "exec",
    tab: "Executive",
    person: PEOPLE.rosa,
    agent: AGENTS.iris,
    seat: "Rosa's Agent · CRO",
    headline: "One operating brief. Every number has a source.",
    preview: "Call scores and deal health · preview",
    actions: [
      {
        title: "The week in four numbers",
        body: "Commit, pipeline movement, new risk and renewals at stake — every Monday at 7.",
      },
      { title: "Three operating risks", body: "Each with the evidence behind it: CRM changes, scored calls, account signals." },
      { title: "Decisions that need you", body: "With the team's recommendation attached. Read only — it changes nothing." },
    ],
    routines: ["Leadership Operating Brief", "Weekly Team Forecast"],
    Scene: SceneExec,
  },
];

export function SlackRolesSection() {
  const [active, setActive] = useState<RoleId>("ae");
  const role = ROLES.find((item) => item.id === active) ?? ROLES[1];
  const { Scene } = role;

  return (
    <section id="roles" className={shared.section} aria-labelledby="slack-roles-heading">
      <div className={shared.headCopy}>
        <p className={shared.eyebrow}>Built for every seat</p>
        <h2 id="slack-roles-heading" className={shared.title}>
          Each person&apos;s Agent does the work that seat is measured on.
        </h2>
      </div>

      <div className={shared.tablist} role="tablist" aria-label="Role">
        {ROLES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === active}
            className={`${shared.tab} ${item.id === active ? shared.tabActive : ""}`}
            onClick={() => setActive(item.id)}
          >
            {item.tab}
          </button>
        ))}
      </div>

      <div className={styles.panel} role="tabpanel" aria-label={role.tab}>
        <div className={styles.intro}>
          <p className={styles.seat}>
            <span className={styles.faces} aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element -- illustrative SVG avatar */}
              <img src={role.person.face} alt="" />
              {/* eslint-disable-next-line @next/next/no-img-element -- illustrative SVG avatar */}
              <img src={role.agent.face} alt="" />
            </span>
            <span>
              <strong>{role.agent.name}</strong> · {role.seat}
            </span>
          </p>
          <h3 className={styles.headline}>{role.headline}</h3>
          {role.preview ? <span className={shared.previewChip}>{role.preview}</span> : null}
        </div>
        <ol className={styles.actions}>
          {role.actions.map((action) => (
            <li key={action.title} className={styles.action}>
              <strong>{action.title}</strong>
              <span>{action.body}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className={styles.routines}>
        <span className={styles.routinesLabel}>Routines for this seat</span>
        {role.routines.map((routine) => (
          <span key={routine} className={styles.routine}>
            {routine}
          </span>
        ))}
      </p>

      <div className={shared.sceneFrame}>
        <Scene />
      </div>
    </section>
  );
}
