import { PrivacyDocumentContent } from "@/components/privacy/privacy-document-content";
import {
  PRIVACY_EFFECTIVE_DATE,
  PRIVACY_INTRODUCTION,
  PRIVACY_LAST_UPDATED,
  PRIVACY_SECTIONS,
} from "./privacy-data";

export function PrivacyContent() {
  return (
    <PrivacyDocumentContent
      pageId="privacy"
      pageLabel="Privacy"
      effectiveDate={PRIVACY_EFFECTIVE_DATE}
      lastUpdated={PRIVACY_LAST_UPDATED}
      titleHighlight="Layer's "
      titleRest="Privacy Policy"
      introduction={PRIVACY_INTRODUCTION}
      sections={PRIVACY_SECTIONS}
    />
  );
}
