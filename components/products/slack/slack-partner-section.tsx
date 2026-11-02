import { AGENTS, PEOPLE } from "./slack-people";
import shared from "./slack-page.module.css";
import styles from "./slack-partner-section.module.css";

const { maya } = AGENTS;
const { even } = PEOPLE;

type Line = { who: "maya" | "even"; text: string };

const MOMENTS: { time: string; lines: Line[]; actions?: string[]; title: string; body: string }[] = [
  {
    time: "Tue 9:05",
    lines: [
      {
        who: "maya",
        text: "Dana's been quiet for 9 days — you asked me to flag that. A light check-in? I'd keep it to two lines.",
      },
    ],
    actions: ["Draft it", "Give it a week"],
    title: "Remembers what you asked for",
    body: "And when, and why it mattered.",
  },
  {
    time: "Wed 12:40",
    lines: [
      {
        who: "maya",
        text: "You've been back-to-back since 8. I moved the CRM clean-up to tomorrow morning — nothing's due before then. Go get lunch 🥪",
      },
    ],
    title: "Notices your day, not just your deals",
    body: "Protects focus time and the things that matter after work.",
  },
  {
    time: "Thu 4:51",
    lines: [
      {
        who: "maya",
        text: "Honest take: Larkspur's Dec 19 close date is optimistic. I'd move it to January before Jordan's forecast call. Want me to prep the note?",
      },
    ],
    title: "Tells you the truth",
    body: "Candid when it matters, before it becomes a surprise.",
  },
  {
    time: "Fri 3:20",
    lines: [
      { who: "maya", text: "Halcyon signed 🎉 Two years, full price. Thank-you notes to Dana and Marcus?" },
      { who: "even", text: "yes. and thank you, seriously" },
      { who: "maya", text: "Team effort. You did the hard part in the room." },
    ],
    title: "Shares the win",
    body: "And gives you the credit.",
  },
];

export function SlackPartnerSection() {
  return (
    <section id="partner" className={shared.section} aria-labelledby="slack-partner-heading">
      <div className={shared.headCopy}>
        <p className={shared.eyebrow}>A partner, not a tool</p>
        <h2 id="slack-partner-heading" className={shared.title}>
          It remembers. It notices. It has your back.
        </h2>
        <p className={shared.lead}>
          Your Agent works alongside you all day — so it talks like someone who does. It knows what you asked
          for last week, what your afternoon looks like and when to just say well done.
        </p>
      </div>
      <ul className={styles.grid}>
        {MOMENTS.map((moment) => (
          <li key={moment.title} className={styles.moment}>
            <div className={styles.chat}>
              {moment.lines.map((line, index) => {
                const speaker = line.who === "maya" ? maya : even;
                return (
                  <div key={`${moment.title}-${index}`} className={styles.line}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- illustrative SVG avatar */}
                    <img src={speaker.face} alt="" aria-hidden className={styles.avatar} />
                    <p className={styles.lineBody}>
                      <span className={styles.lineMeta}>
                        <strong>{speaker.name}</strong>
                        {index === 0 ? <span>{moment.time}</span> : null}
                      </span>
                      {line.text}
                    </p>
                  </div>
                );
              })}
              {moment.actions ? (
                <div className={styles.actions} aria-hidden>
                  {moment.actions.map((action) => (
                    <span key={action}>{action}</span>
                  ))}
                </div>
              ) : null}
            </div>
            <p className={styles.caption}>
              <strong>{moment.title}</strong>
              <span>{moment.body}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
