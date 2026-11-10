import type { Metadata } from "next";
import { SlackPage } from "@/components/products/slack/slack-page";

export const metadata: Metadata = {
  title: "Layer for Slack | Your personal Agent, now in Slack",
  description:
    "Bring your own Layer Agent into Slack. It preps your calls, drafts every follow-up, runs your Routines and keeps deals moving — and nothing leaves without your approval.",
  alternates: { canonical: "/slack" },
};

export default function SlackRoutePage() {
  return <SlackPage />;
}
