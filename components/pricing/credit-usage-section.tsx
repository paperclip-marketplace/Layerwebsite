import {
  LandingHeadingReveal,
  LandingSubheadingReveal,
} from "@/components/landing/landing-text-reveal";
import styles from "./credit-usage-section.module.css";

type CreditUsageRow = {
  label: string;
  credits: string;
  unit: string;
};

type CreditUsageTable = {
  title: string;
  rows: CreditUsageRow[];
};

const CREDIT_USAGE_TABLES: CreditUsageTable[] = [
  {
    title: "Platform activity",
    rows: [
      { label: "Co-Pilot", credits: "2 Credits", unit: "/ minute" },
      {
        label: "Standard Voice Agent",
        credits: "5 Credits",
        unit: "/ minute",
      },
      { label: "Voice Roleplay", credits: "10 Credits", unit: "/ minute" },
      { label: "Video Roleplay", credits: "30 Credits", unit: "/ minute" },
    ],
  },
  {
    title: "Context summarization",
    rows: [
      {
        label: "Summarization Input",
        credits: "20 Credits",
        unit: "/ 1M tokens",
      },
      {
        label: "Summarization Output",
        credits: "100 Credits",
        unit: "/ 1M tokens",
      },
    ],
  },
];

type CreditUsageSectionProps = {
  headingId?: string;
};

export function CreditUsageSection({
  headingId = "credit-usage-heading",
}: CreditUsageSectionProps = {}) {
  return (
    <section
      className={`${styles.section} landing-full-bleed-strokes-top`}
      aria-labelledby={headingId}
      data-name="Forward Thinking Logos Container"
      data-node-id="1783:3710"
    >
      <div
        className={styles.header}
        data-name="Leadership Control Section Title"
        data-node-id="1783:3711"
      >
        <p className={styles.label} data-node-id="1783:3712">
          Credit usage
        </p>

        <div
          className={`landing-copy-row ${styles.copyRow}`}
          data-name="Leadership behavioral Description"
          data-node-id="1783:3713"
        >
          <LandingHeadingReveal
            as="h2"
            id={headingId}
            className={`landing-copy-headline ${styles.headline}`}
            data-node-id="1783:3714"
          >
            Know exactly what your{" "}
            <span className={styles.highlight}>credits cover.</span>
          </LandingHeadingReveal>
          <LandingSubheadingReveal
            className={`landing-copy-aside ${styles.description}`}
            data-node-id="1783:3715"
          >
            Every Layer action uses credits based on the work it performs.
            Here&apos;s a clear breakdown of how credits are consumed across
            agents, voice, roleplay, and context processing.
          </LandingSubheadingReveal>
        </div>
      </div>

      <div className={styles.tables} data-node-id="1783:3716">
        {CREDIT_USAGE_TABLES.map((table, tableIndex) => (
          <div
            key={table.title}
            className={styles.tableGroup}
            data-node-id={tableIndex === 0 ? "1783:3717" : "1783:3741"}
          >
            <div className={styles.tableTitleRow}>
              <p className={styles.tableTitle}>{table.title}</p>
            </div>

            <div className={styles.tableBody}>
              {table.rows.map((row) => (
                  <div
                    key={row.label}
                    className={styles.tableRow}
                  >
                    <div
                      className={`${styles.tableCell} ${styles.tableCellLabel}`}
                    >
                      <p className={styles.rowLabel}>{row.label}</p>
                    </div>
                    <div className={`${styles.tableCell} ${styles.tableCellValue}`}>
                      <p className={styles.rowValue}>
                        {row.credits}{" "}
                        <span className={styles.rowValueUnit}>{row.unit}</span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
