import {
  LandingHeadingReveal,
} from "@/components/landing/landing-text-reveal";
import {
  FormattedLegalBullet,
  FormattedLegalParagraph,
} from "./format-legal-text";
import styles from "./legal-content.module.css";
import type {
  LegalDocumentContentProps,
  LegalSection,
  LegalSubsection,
} from "./types";

function LegalBlock({
  paragraphs,
  bullets,
}: {
  paragraphs?: string[];
  bullets?: string[];
}) {
  return (
    <>
      {paragraphs && paragraphs.length > 0 ? (
        <div className={styles.paragraphGroup}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              <FormattedLegalParagraph text={paragraph} />
            </p>
          ))}
        </div>
      ) : null}
      {bullets && bullets.length > 0 ? (
        <ul className={styles.list}>
          {bullets.map((item) => (
            <li key={item} className={styles.listItem}>
              <FormattedLegalBullet text={item} />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

function LegalSubsectionBlock({ subsection }: { subsection: LegalSubsection }) {
  return (
    <div className={styles.subsection}>
      {subsection.title ? (
        <p className={styles.subsectionTitle}>{subsection.title}</p>
      ) : null}
      <LegalBlock
        paragraphs={subsection.paragraphs}
        bullets={subsection.bullets}
      />
    </div>
  );
}

function LegalSectionBlock({
  section,
  pageId,
}: {
  section: LegalSection;
  pageId: string;
}) {
  const hasSubsections = Boolean(section.subsections?.length);
  const hasSectionBody = Boolean(
    section.paragraphs?.length || section.bullets?.length,
  );

  return (
    <section
      className={styles.sectionCard}
      aria-labelledby={`${pageId}-section-${section.id}`}
    >
      <div className={styles.sectionInner}>
        <div className={styles.numberBadge} aria-hidden>
          <p className={styles.numberBadgeText}>{section.number}</p>
        </div>

        <div
          className={`${styles.sectionMain} ${
            hasSubsections ? styles.sectionMainWithSubsections : ""
          }`}
        >
          <h2 id={`${pageId}-section-${section.id}`} className={styles.sectionTitle}>
            {section.title}
          </h2>

          {hasSectionBody && !hasSubsections ? (
            <LegalBlock
              paragraphs={section.paragraphs}
              bullets={section.bullets}
            />
          ) : null}

          {hasSubsections ? (
            <div className={styles.sectionContent}>
              {hasSectionBody ? (
                <LegalBlock
                  paragraphs={section.paragraphs}
                  bullets={section.bullets}
                />
              ) : null}
              <div className={styles.subsections}>
                {section.subsections?.map((subsection) => (
                  <LegalSubsectionBlock
                    key={subsection.id}
                    subsection={subsection}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function LegalDocumentContent({
  pageId,
  pageLabel,
  effectiveDate,
  lastUpdated,
  titleHighlight,
  titleRest,
  sections,
}: LegalDocumentContentProps) {
  return (
    <div className="landing-page-gutter">
      <div className={styles.shell}>
      <header className={styles.heroCard} aria-labelledby={`${pageId}-heading`}>
        <div className={styles.heroHeading}>
          <div className={styles.metaRow}>
            <p className={styles.metaLabel}>{pageLabel}</p>
            <p className={styles.metaDates}>
              Effective Date: {effectiveDate} | Last Updated: {lastUpdated}
            </p>
          </div>
          <LandingHeadingReveal as="h1" id={`${pageId}-heading`} className={styles.title}>
            <span className={styles.titleHighlight}>{titleHighlight}</span>
            {titleRest}
          </LandingHeadingReveal>
        </div>
      </header>

      <div className={styles.sections}>
        {sections.map((section) => (
          <LegalSectionBlock key={section.id} pageId={pageId} section={section} />
        ))}
      </div>
    </div>
    </div>
  );
}
