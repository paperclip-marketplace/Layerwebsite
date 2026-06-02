import { LegalDocumentContent } from "@/components/legal/legal-document-content";
import {
  TERMS_EFFECTIVE_DATE,
  TERMS_LAST_UPDATED,
  TERMS_SECTIONS,
} from "./terms-data";

export function TermsContent() {
  return (
    <LegalDocumentContent
      pageId="terms"
      pageLabel="Terms & Conditions"
      effectiveDate={TERMS_EFFECTIVE_DATE}
      lastUpdated={TERMS_LAST_UPDATED}
      titleHighlight="Layer's "
      titleRest="Terms & Conditions"
      sections={TERMS_SECTIONS}
    />
  );
}
