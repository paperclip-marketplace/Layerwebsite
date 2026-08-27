import type { Metadata } from "next";
import { LeadPage } from "@/components/lead/lead-page";

export const metadata: Metadata = {
  title: "Layer AI for GTM Teams",
  description:
    "Turn your GTM knowledge into agents that drive results. Tell us about your team and we'll show you where Layer can make the biggest impact.",
};

export default function LeadRoutePage() {
  return <LeadPage />;
}
