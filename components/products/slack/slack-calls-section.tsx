"use client";

import { useState } from "react";
import { SceneMeetingBrief, ScenePostCall } from "./slack-scenes";
import shared from "./slack-page.module.css";

type Moment = "before" | "after";

const OUTPUTS: Record<Moment, { label: string; body: string }[]> = {
  before: [
    {
      label: "7:30 every morning",
      body: "A brief for each meeting: why meet, last touch, and an opener and hypothesis for every attendee.",
    },
    {
      label: "Grounded in your Playbook",
      body: "Meeting goal, where you may fit, the questions to ask — from CRM, calls, email and research.",
    },
    {
      label: "Practice this call",
      body: "A voice roleplay of the hard moment, built from this deal — one tap from the brief.",
    },
  ],
  after: [
    {
      label: "Minutes after the call",
      body: "Decisions, commitments, risks — and the buyer requests nobody answered.",
    },
    {
      label: "One email per participant",
      body: "Tailored follow-ups saved as drafts in your mailbox, with documents written from the call.",
    },
    {
      label: "CRM and calendar, governed",
      body: "Next step, MEDDIC fields, call note and the next meeting — each waiting for Approve.",
    },
  ],
};

export function SlackCallsSection() {
  const [moment, setMoment] = useState<Moment>("before");

  return (
    <section id="calls" className={shared.section} aria-labelledby="slack-calls-heading">
      <div className={shared.sectionHead}>
        <div className={shared.headCopy}>
          <p className={shared.eyebrow}>Before and after every meeting</p>
          <h2 id="slack-calls-heading" className={shared.title}>
            Walk in prepared. Walk out with the follow-ups done.
          </h2>
          <p className={shared.lead}>
            Your Agent briefs you before every external meeting and, when the call ends, drafts every follow-up
            the call created — for SDRs, AEs and CSMs alike.
          </p>
        </div>
        <div className={shared.tablist} role="tablist" aria-label="Moment">
          {(["before", "after"] as const).map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={moment === id}
              className={`${shared.tab} ${moment === id ? shared.tabActive : ""}`}
              onClick={() => setMoment(id)}
            >
              {id === "before" ? "Before the call" : "After the call"}
            </button>
          ))}
        </div>
      </div>

      <ul className={shared.outputs}>
        {OUTPUTS[moment].map((item) => (
          <li key={item.label} className={shared.output}>
            <span className={shared.outputLabel}>{item.label}</span>
            {item.body}
          </li>
        ))}
      </ul>

      <div className={shared.sceneFrame} role="tabpanel">
        {moment === "before" ? <SceneMeetingBrief /> : <ScenePostCall />}
      </div>
    </section>
  );
}
