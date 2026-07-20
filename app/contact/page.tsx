import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact Us | Layer AI",
  description:
    "Tell us about your team, your goals, and the challenges you're solving. We'll show you how Layer can help your revenue organization perform at its best.",
};

export default function ContactRoutePage() {
  return <ContactPage />;
}
