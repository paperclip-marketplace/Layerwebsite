import { LegalDocumentContent } from "@/components/legal/legal-document-content";
import {
  DPA_EFFECTIVE_DATE,
  DPA_INTRODUCTION,
  DPA_LAST_UPDATED,
  DPA_SECTIONS,
} from "./dpa-data";

export function DpaContent() {
  return (
    <LegalDocumentContent
      pageId="dpa"
      pageLabel="Data Processing Addendum"
      effectiveDate={DPA_EFFECTIVE_DATE}
      lastUpdated={DPA_LAST_UPDATED}
      titleHighlight="Layer's "
      titleRest="Data Processing Addendum"
      introduction={DPA_INTRODUCTION}
      sections={DPA_SECTIONS}
    />
  );
}
