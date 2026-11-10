export type LegalBulletFormat =
  | "colon"
  | "colon-space"
  | "label-space-paren"
  | "plain";

export type LegalSubsection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  bulletFormat?: LegalBulletFormat;
};

export type LegalSection = {
  id: string;
  /** Shown in the section badge. A string (e.g. "A1") labels an annex. */
  number: number | string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: LegalSubsection[];
  bulletFormat?: LegalBulletFormat;
  tailParagraphs?: string[];
};

export type LegalDocumentContentProps = {
  pageId: string;
  pageLabel: string;
  effectiveDate: string;
  lastUpdated: string;
  titleHighlight: string;
  titleRest: string;
  sections: LegalSection[];
};
