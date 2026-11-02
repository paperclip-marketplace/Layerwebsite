import Link from "next/link";
import { ROUTES } from "@/lib/config/constants";
import shared from "./slack-page.module.css";
import styles from "./slack-faq-section.module.css";

const FAQS = [
  {
    q: "How is this different from a Slack chatbot?",
    a: "There is no shared Layer bot. Each person's existing Layer Agent joins Slack as its own app, with the name and face they chose, and keeps the memory, Playbooks, Skills, Routines and action authority they already set in Layer.",
  },
  {
    q: "Does my Agent remember things about me?",
    a: "Yes — that's what makes it a partner. It keeps the memory you've allowed in Layer: your deals, the people involved, how you like to write and work. In shared channels that memory stays private to you.",
  },
  {
    q: "What can my Agent see in Slack?",
    a: "Your DMs with it and the channels you add it to. When mentioned in a thread, it reads that thread before answering. In shared channels it holds back private data and moves write requests to your DM.",
  },
  {
    q: "Can managers act on a seller's deals?",
    a: "Managers get team roll-ups and coaching agendas from their own Agent. Actions on a deal are prepared for — and approved by — the seller who owns it.",
  },
  {
    q: "What does it do without approval?",
    a: "It reads, analyses, briefs and drafts. Emails, CRM changes, calendar events and LinkedIn actions arrive as cards to Approve, Edit, Dismiss or ask Why?. A Routine only acts on your behalf in the mode you chose when you created it.",
  },
  {
    q: "Does a workspace admin need to approve it?",
    a: "If your workspace requires app approval, Slack sends your admin a request before your Agent can join. Layer admins also control which Routines and Playbooks are available to each team.",
  },
  {
    q: "How do I remove my Agent from Slack?",
    a: "Disconnect Slack in Layer Settings → Integrations. Layer removes your managed Agent app. Workspace admins can also remove apps from Slack's app management.",
  },
];

export function SlackFaqSection() {
  return (
    <section id="faq" className={shared.section} aria-labelledby="slack-faq-heading">
      <div className={styles.layout}>
        <div className={styles.intro}>
          <h2 id="slack-faq-heading" className={shared.title}>
            Questions from admins and reviewers
          </h2>
          <p className={shared.lead}>
            Installing for a team?{" "}
            <Link href={ROUTES.contactSales} className={styles.link}>
              Contact us
            </Link>{" "}
            or read our <Link href={ROUTES.privacy} className={styles.link}>Privacy Policy</Link> and{" "}
            <Link href={ROUTES.terms} className={styles.link}>Terms</Link>.
          </p>
          <p className={styles.notice}>
            <span className={`material-symbols-rounded ${styles.noticeIcon}`} aria-hidden>
              info
            </span>
            <span>
              <strong>AI notice.</strong> Layer Agents are AI and can make mistakes. Review their answers before
              relying on them. Actions that change other systems wait for your approval.
            </span>
          </p>
        </div>
        <div className={styles.list}>
          {FAQS.map((item, index) => (
            <details key={item.q} className={styles.item} open={index === 0}>
              <summary className={styles.question}>
                {item.q}
                <span className={`material-symbols-rounded ${styles.chevron}`} aria-hidden>
                  expand_more
                </span>
              </summary>
              <p className={styles.answer}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
