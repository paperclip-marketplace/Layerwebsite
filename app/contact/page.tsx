import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact Sales | Layer AI",
  description:
    "Talk to Layer about AI agents for your revenue team and the outcomes you want to improve.",
};

export default function ContactRoutePage() {
  return (
    <ContactPage
      recaptchaSiteKey={
        process.env.SALESFORCE_WEB_TO_LEAD_RECAPTCHA_SITE_KEY?.trim() ?? ""
      }
    />
  );
}
