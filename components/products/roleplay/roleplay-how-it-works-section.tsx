import { ROLEPLAY_ASSETS } from "./roleplay-assets";
import styles from "./roleplay-how-it-works-section.module.css";

type WorkflowCardData = {
  id: string;
  nodeId: string;
  variant: "light" | "dark";
  mediaLayout: "center" | "end" | "processing";
  label: string;
  description: string;
};

const WORKFLOW_CARDS: WorkflowCardData[] = [
  {
    id: "create",
    nodeId: "1089:5577",
    variant: "light",
    mediaLayout: "center",
    label: "Create your persona",
    description:
      "Start with agents purpose-built for hiring, ramping, and closing. Deploy them immediately. Extend them over time.",
  },
  {
    id: "enrich",
    nodeId: "1089:5583",
    variant: "dark",
    mediaLayout: "end",
    label: "Enrich your persona with call transcripts",
    description:
      "Build your own agents. Chain them together. Every one drawing from the same context, your data, your people, your way of winning.",
  },
  {
    id: "processing",
    nodeId: "1089:5634",
    variant: "light",
    mediaLayout: "processing",
    label: "Processing and configurations",
    description:
      "Start with agents purpose-built for hiring, ramping, and closing. Deploy them immediately. Extend them over time.",
  },
  {
    id: "created",
    nodeId: "1089:5640",
    variant: "light",
    mediaLayout: "center",
    label: "Persona created",
    description:
      "Start with agents purpose-built for hiring, ramping, and closing. Deploy them immediately. Extend them over time.",
  },
];

export function RoleplayHowItWorksSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="roleplay-how-heading"
      data-node-id="1088:5293"
    >
      <div className={styles.header} data-node-id="1088:5294">
        <p className={styles.eyebrow} data-node-id="1088:5295">
          how it works
        </p>
        <div className="landing-copy-row" data-node-id="1088:5296">
          <h2
            id="roleplay-how-heading"
            className={`${styles.headline} landing-copy-headline`}
            data-node-id="1088:5297"
          >
            <span className={styles.headlineLine}>Simple workflow, </span>
            <span className={`${styles.headlineLine} ${styles.highlight}`}>
              faster execution
            </span>
          </h2>
          <p
            className={`${styles.aside} landing-copy-aside`}
            data-node-id="1088:5298"
          >
            Layer gives every GTM team member more leverage by shifting
            context-heavy work to agents. Your team spends less time
            researching, preparing, seeking approvals, and documenting and more
            time creating pipeline, advancing deals, serving customers, and
            driving growth.
          </p>
        </div>
      </div>

      <div className={styles.grid} data-node-id="1089:5556">
        <div className={styles.gridRow} data-node-id="1089:5576">
          {WORKFLOW_CARDS.slice(0, 2).map((card) => (
            <WorkflowCard key={card.id} card={card} />
          ))}
        </div>
        <div className={styles.gridRow} data-node-id="1089:5562">
          {WORKFLOW_CARDS.slice(2).map((card) => (
            <WorkflowCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowCard({ card }: { card: WorkflowCardData }) {
  const isDark = card.variant === "dark";

  return (
    <article
      className={`${styles.card} ${isDark ? styles.cardDark : styles.cardLight}`}
      data-node-id={card.nodeId}
    >
      {isDark ? (
        <div className={styles.cardDarkBackdrop} aria-hidden>
          <div className={styles.cardDarkBg} />
          <div className={styles.cardDarkGrain} />
          <div className={styles.cardDarkOverlay} />
        </div>
      ) : null}

      <div
        className={`${styles.cardMedia} ${
          card.mediaLayout === "end" ? styles.cardMediaEnd : styles.cardMediaCenter
        }`}
      >
        {card.id === "create" ? (
          <div className={styles.mediaFill}>
            <img
              src={ROLEPLAY_ASSETS.howCreatePersona}
              alt=""
              className={styles.cardImageContain}
            />
          </div>
        ) : null}

        {card.id === "enrich" ? (
          <div className={styles.mediaEnrichFrame}>
            <img
              src={ROLEPLAY_ASSETS.howEnrichUi}
              alt=""
              className={styles.cardImageEnrich}
            />
          </div>
        ) : null}

        {card.id === "processing" ? (
          <div className={styles.mediaFill}>
            <div className={styles.processingImageWrap} aria-hidden>
              <img
                src={ROLEPLAY_ASSETS.howProcessing}
                alt=""
                className={styles.cardImageProcessing}
              />
              <div className={styles.cardProcessingFade} />
            </div>
          </div>
        ) : null}

        {card.id === "created" ? (
          <div className={styles.mediaFill}>
            <img
              src={ROLEPLAY_ASSETS.howPersonaCreated}
              alt=""
              className={styles.cardImageContain}
            />
          </div>
        ) : null}
      </div>

      <div className={styles.cardCopy}>
        <p className={styles.cardLabel}>{card.label}</p>
        <p className={styles.cardDescription}>{card.description}</p>
      </div>
    </article>
  );
}
