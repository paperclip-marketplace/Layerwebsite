"use client";

import { useEffect, useRef, useState } from "react";
import { AGENTS, PEOPLE } from "./slack-people";
import {
  AgentDmHeader,
  ButtonRow,
  Card,
  Ctx,
  Message,
  Quote,
  SlackButton,
  SlackWindow,
  Speech,
  slackStyles as s,
} from "./slack-ui";
import styles from "./slack-approval-scene.module.css";

/*
 * Interactive approval lifecycle — prepared → approved (working on it) →
 * executed → receipt, plus Edit ("Save & approve") and the Dismiss confirm.
 * State emoji, button labels and dialog copy follow
 * PitchBots lib/integrations/slack/render/cards.ts.
 */

type Stage = "prepared" | "approved" | "executed" | "receipt" | "dismissed";
type Modal = null | "why" | "edit" | "dismiss";

const STAGES: { id: Stage; label: string }[] = [
  { id: "prepared", label: "1 · Prepared" },
  { id: "approved", label: "2 · Approved" },
  { id: "executed", label: "3 · Executed" },
  { id: "receipt", label: "4 · Receipt" },
  { id: "dismissed", label: "Dismissed" },
];

const ORDER: Stage[] = ["prepared", "approved", "executed", "receipt"];

const INITIAL_BODY =
  "Hi Dana,\n\nThanks for backing the expansion on Tuesday. Before Marcus’s budget lock on Dec 1, could we spend 30 minutes on the rollout plan? I’d like to agree the v2 dates with your ops team so the renewal reflects where you’ll actually be.\n\nThursday 2:00 or Friday 10:30 work on my side.\n\nEven";

const { maya } = AGENTS;
const { even, priya, jordan } = PEOPLE;

export function SlackApprovalScene() {
  const [stage, setStage] = useState<Stage>("prepared");
  const [modal, setModal] = useState<Modal>(null);
  const [subject, setSubject] = useState("Rollout review before the 14th?");
  const [body, setBody] = useState(INITIAL_BODY);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const goTo = (next: Stage) => {
    clearTimers();
    setModal(null);
    setStage(next);
  };

  const approve = () => {
    goTo("approved");
    timers.current.push(setTimeout(() => setStage("executed"), 1500));
    timers.current.push(setTimeout(() => setStage("receipt"), 2700));
  };

  const reached = ORDER.indexOf(stage);
  const lines = body.split("\n").filter((line) => line.trim() !== "");
  const preview = lines.slice(0, 2).join("\n") + (lines.length > 2 ? "\n…" : "");

  const title =
    stage === "prepared"
      ? "📋 Follow-up email to Dana Okafor"
      : stage === "approved"
        ? "⏳ Follow-up email to Dana Okafor — working on it"
        : stage === "dismissed"
          ? "🚫 Follow-up email to Dana Okafor — dismissed"
          : "✅ Follow-up email to Dana Okafor — done";

  const status =
    stage === "prepared"
      ? "Prepared · waiting for your approval. Nothing has been sent."
      : stage === "approved"
        ? "Approved by Even · 10:12 AM · sending from even@brightline.example via Gmail…"
        : stage === "dismissed"
          ? "Dismissed by Even · Maya will not send it."
          : "Approved by Even · 10:12 AM · executed 10:12 AM";

  const overlay =
    modal === null ? null : (
      <div className={s.overlay}>
        {modal === "dismiss" ? (
          <div className={s.dialog} role="dialog" aria-modal="true" aria-label="Dismiss this action?">
            <div className={s.dialogBody}>
              <p className={s.dialogTitle}>Dismiss this action?</p>
              <p>The agent will not execute it.</p>
            </div>
            <div className={s.dialogFooter}>
              <SlackButton onClick={() => setModal(null)}>Keep</SlackButton>
              <SlackButton variant="danger" onClick={() => goTo("dismissed")}>
                Dismiss
              </SlackButton>
            </div>
          </div>
        ) : (
          <div
            className={s.dialog}
            role="dialog"
            aria-modal="true"
            aria-label={modal === "why" ? "Why this draft?" : "Edit email"}
          >
            <div className={s.dialogHeader}>
              <p className={s.dialogTitle}>{modal === "why" ? "Why this draft?" : "Edit email"}</p>
              <button type="button" className={s.dialogClose} aria-label="Close" onClick={() => setModal(null)}>
                ×
              </button>
            </div>
            {modal === "why" ? (
              <div className={s.dialogBody}>
                <p className={s.draft}>{body}</p>
                <p>
                  <strong>Evidence</strong>
                </p>
                <ul className={`${s.list} ${s.bullets}`}>
                  <li>Dana backed the expansion on the Oct 29 call (Gong, 14:32).</li>
                  <li>Marcus&apos;s budget lock is Dec 1 (Jordan, in the thread).</li>
                  <li>Tone and sign-off match Even&apos;s last 20 customer emails.</li>
                </ul>
              </div>
            ) : (
              <div className={s.dialogBody}>
                <label className={s.field}>
                  Subject
                  <input value={subject} onChange={(event) => setSubject(event.target.value)} />
                </label>
                <label className={s.field}>
                  Message
                  <textarea rows={7} value={body} onChange={(event) => setBody(event.target.value)} />
                </label>
              </div>
            )}
            <div className={s.dialogFooter}>
              <SlackButton onClick={() => setModal(null)}>{modal === "why" ? "Close" : "Cancel"}</SlackButton>
              <SlackButton variant="primary" onClick={approve}>
                {modal === "why" ? "Approve" : "Save & approve"}
              </SlackButton>
            </div>
          </div>
        )}
      </div>
    );

  return (
    <div className={styles.scene}>
      <div className={styles.stepper} role="group" aria-label="Scene state">
        <span className={styles.stepperLabel}>Scene state</span>
        {STAGES.map((item) => {
          const active = item.id === stage;
          const done = item.id !== "dismissed" && reached > -1 && ORDER.indexOf(item.id) < reached;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              className={`${styles.step} ${active ? styles.stepActive : ""} ${done ? styles.stepDone : ""}`}
              onClick={() => goTo(item.id)}
            >
              {item.label}
            </button>
          );
        })}
        <span className={styles.stepperHint}>The Slack buttons work too.</span>
      </div>

      <SlackWindow
        label="Interactive Slack scene: approve, edit or dismiss a follow-up email Maya prepared"
        user={even}
        channels={[{ name: "ae-team" }, { name: "deals-halcyon-renewal" }, { name: "pipeline-review" }]}
        dms={[priya, jordan]}
        agent={maya}
        header={<AgentDmHeader agent={maya} />}
        composer="Message Maya"
        overlay={overlay}
      >
        <Message author={maya} time="10:05 AM">
          <Speech>
            Here&apos;s the note to Dana. Kept it short and warm, and signed off with just “Even” like you
            always do. It goes nowhere until you say so.
          </Speech>
          <Quote person={even} meta="Thread in #deals-halcyon-renewal · Today at 9:33 AM · View reply">
            @Maya turn this thread into a renewal plan. What&apos;s at risk and what needs my approval?
          </Quote>
        </Message>
        <Message time="10:05" continuation>
          <Card title={title}>
            <span>
              <span className={s.muted}>To</span> Dana Okafor &lt;dana.okafor@halcyonfreight.example&gt;
              <br />
              <span className={s.muted}>Subject</span> <strong>{subject}</strong>
            </span>
            <span className={s.draft}>{preview}</span>
            <span className={s.muted}>{status}</span>
            {stage === "prepared" ? (
              <ButtonRow>
                <SlackButton variant="primary" onClick={approve}>
                  Approve
                </SlackButton>
                <SlackButton onClick={() => setModal("edit")}>Edit</SlackButton>
                <SlackButton onClick={() => setModal("dismiss")}>Dismiss</SlackButton>
                <SlackButton onClick={() => setModal("why")}>Why?</SlackButton>
              </ButtonRow>
            ) : null}
          </Card>
        </Message>
        {stage === "receipt" ? (
          <Message author={maya} time="10:12 AM">
            <Card title="Receipt">
              <span>
                <span className={s.muted}>Sent</span> 10:12 AM via Gmail, from even@brightline.example
                <br />
                <span className={s.muted}>Logged</span> Email activity on Halcyon Freight — Renewal FY27
                (Salesforce)
                <br />
                <span className={s.muted}>Thread</span> Receipt posted to #deals-halcyon-renewal
              </span>
            </Card>
            <Ctx>Done — and Dana usually replies within a day. I&apos;ll keep an eye out.</Ctx>
          </Message>
        ) : null}
      </SlackWindow>
    </div>
  );
}
