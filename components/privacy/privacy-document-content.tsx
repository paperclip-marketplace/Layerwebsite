import {
  FormattedPrivacyBullet,
  FormattedPrivacyParagraph,
} from "./privacy-format-text";
import styles from "../legal/legal-content.module.css";
import type { LegalBulletFormat, LegalSection, LegalSubsection } from "../legal/types";

function getTitleContentGap(section: LegalSection): 12 | 24 {
  if (section.subsections?.length || section.bullets?.length) {
    return 24;
  }

  return 12;
}

function PrivacyBlock({
  paragraphs,
  bullets,
  bulletFormat,
  tailParagraphs,
}: {
  paragraphs?: string[];
  bullets?: string[];
  bulletFormat?: LegalBulletFormat;
  tailParagraphs?: string[];
}) {
  const hasFlowContent =
    (paragraphs && paragraphs.length > 0) ||
    (bullets && bullets.length > 0) ||
    (tailParagraphs && tailParagraphs.length > 0);

  if (!hasFlowContent) {
    return null;
  }

  return (
    <div className={styles.flowBlock}>
      {paragraphs && paragraphs.length > 0 ? (
        <div className={styles.paragraphGroup}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              <FormattedPrivacyParagraph text={paragraph} />
            </p>
          ))}
        </div>
      ) : null}
      {bullets && bullets.length > 0 ? (
        <ul className={styles.list}>
          {bullets.map((item) => (
            <li key={item} className={styles.listItem}>
              <FormattedPrivacyBullet text={item} format={bulletFormat} />
            </li>
          ))}
        </ul>
      ) : null}
      {tailParagraphs && tailParagraphs.length > 0 ? (
        <div className={styles.paragraphGroup}>
          {tailParagraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              <FormattedPrivacyParagraph text={paragraph} />
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PrivacySubsectionBlock({
  subsection,
  defaultBulletFormat,
}: {
  subsection: LegalSubsection;
  defaultBulletFormat?: LegalBulletFormat;
}) {
  return (
    <div className={styles.subsection}>
      {subsection.title ? (
        <p className={styles.subsectionTitle}>
          <strong>{subsection.title}</strong>
        </p>
      ) : null}
      <PrivacyBlock
        paragraphs={subsection.paragraphs}
        bullets={subsection.bullets}
        bulletFormat={subsection.bulletFormat ?? defaultBulletFormat}
      />
    </div>
  );
}

function PrivacySectionBlock({
  section,
  pageId,
}: {
  section: LegalSection;
  pageId: string;
}) {
  const titleContentGap = getTitleContentGap(section);
  const hasSubsections = Boolean(section.subsections?.length);
  const hasSectionBody = Boolean(
    section.paragraphs?.length ||
      section.bullets?.length ||
      section.tailParagraphs?.length,
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
            titleContentGap === 24
              ? styles.sectionMainWithSubsections
              : styles.sectionMainCompact
          }`}
        >
          <h2 id={`${pageId}-section-${section.id}`} className={styles.sectionTitle}>
            {section.title}
          </h2>

          {hasSectionBody && !hasSubsections ? (
            <PrivacyBlock
              paragraphs={section.paragraphs}
              bullets={section.bullets}
              bulletFormat={section.bulletFormat}
              tailParagraphs={section.tailParagraphs}
            />
          ) : null}

          {hasSubsections ? (
            <div className={styles.sectionContent}>
              {hasSectionBody ? (
                <PrivacyBlock
                  paragraphs={section.paragraphs}
                  bullets={section.bullets}
                  bulletFormat={section.bulletFormat}
                  tailParagraphs={section.tailParagraphs}
                />
              ) : null}
              <div className={styles.subsections}>
                {section.subsections?.map((subsection) => (
                  <PrivacySubsectionBlock
                    key={subsection.id}
                    subsection={subsection}
                    defaultBulletFormat={section.bulletFormat}
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

type PrivacyDocumentContentProps = {
  pageId: string;
  pageLabel: string;
  effectiveDate: string;
  lastUpdated: string;
  titleHighlight: string;
  titleRest: string;
  sections: LegalSection[];
};

export function PrivacyDocumentContent({
  pageId,
  pageLabel,
  effectiveDate,
  lastUpdated,
  titleHighlight,
  titleRest,
  sections,
}: PrivacyDocumentContentProps) {
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
          <h1 id={`${pageId}-heading`} className={styles.title}>
            <span className={styles.titleHighlight}>{titleHighlight}</span>
            {titleRest}
          </h1>
        </div>
      </header>

      <div className={styles.sections}>
        {sections.map((section) => (
          <PrivacySectionBlock key={section.id} pageId={pageId} section={section} />
        ))}
      </div>
    </div>
    </div>
  );
}
