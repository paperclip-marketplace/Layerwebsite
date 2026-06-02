import type { LegalSection } from "@/components/legal/types";

export const PRIVACY_EFFECTIVE_DATE = "13 April 2026";
export const PRIVACY_LAST_UPDATED = "13 April 2026";

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    number: 1,
    title: "Who We Are",
    paragraphs: [
      'Layer AI is a trading name of **Paperclip Marketplace Ltd**, a company registered in England and Wales. We provide an AI-powered platform that helps go-to-market teams work more effectively (the **"Service"**). The Service includes AI assistants, sales practice and simulation tools, live meeting support, deal preparation, post-meeting workflows, coaching, and integrations with your existing business tools.',
      "For the purposes of the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018, Paperclip Marketplace Ltd is the data controller in respect of the personal data we process through the Service.",
      "Contact: hello@withlayer.ai",
    ],
  },
  {
    id: "what-data-we-collect",
    number: 2,
    title: "What Data We Collect",
    bulletFormat: "colon-space",
    subsections: [
      {
        id: "account-and-profile",
        title: "2.1 Account and Profile Information",
        paragraphs: ["When you register for and use the Service, we collect:"],
        bullets: [
          "Identity and organisation data: your name, email address, job title, company name, and team information.",
          "Authentication data: login credentials managed through our authentication provider, including single sign-on tokens.",
          "Preferences and settings: your communication preferences, notification settings, and configuration choices within the Service.",
          "Personalisation data: information about your working style and preferences that helps the Service tailor its assistance to you. This profile develops over time as you use the Service.",
        ],
      },
      {
        id: "subscription-and-billing",
        title: "2.2 Subscription and Billing Data",
        paragraphs: [
          "We collect billing address and usage information necessary to process your subscription. Payment card details are handled by our third-party payment processor and are never stored on our systems.",
        ],
      },
      {
        id: "session-and-interaction",
        title: "2.3 Session and Interaction Data",
        paragraphs: ["When you use the Service, we process:"],
        bullets: [
          "Voice and audio data: real-time audio during practice sessions, simulations, and voice interactions. Audio is processed in real time and is not persistently stored.",
          "Transcripts and conversation records: text records of your interactions with the Service, used for review, scoring, and coaching.",
          "Meeting data: when you use our live meeting features, we process real-time audio and conversation data to provide in-meeting assistance. Real-time data is ephemeral; post-meeting summaries and action items are retained.",
          "Performance and coaching data: AI-generated scores, feedback, and development recommendations.",
        ],
      },
      {
        id: "connected-tools",
        title: "2.4 Connected Tools and Integration Data",
        paragraphs: [
          "If you or your organisation connect third-party tools to the Service (such as CRM, calendar, email, sales engagement, or document platforms), we access data from those tools via authenticated API connections to provide our features.",
          "**We do not persistently store raw data from your connected tools.** Data from connected tools is either queried in real time (and never stored) or processed temporarily in memory to generate intelligence outputs such as summaries and recommendations. Only these derived outputs are retained — the underlying raw data is not.",
        ],
      },
      {
        id: "actions-and-workflow",
        title: "2.5 Actions and Workflow Data",
        paragraphs: [
          "The Service may perform actions within your connected tools on your behalf, such as drafting CRM updates, preparing email drafts, or creating calendar events. We log records of actions taken or proposed, including any approval requests and outcomes.",
        ],
      },
      {
        id: "usage-analytics-technical",
        title: "2.6 Usage, Analytics, and Technical Data",
        paragraphs: [
          "We automatically collect information about how you interact with the Service (features used, session frequency, interaction patterns) as well as standard technical data (IP address, browser type, device information, operating system).",
        ],
      },
    ],
  },
  {
    id: "how-we-use-your-data",
    number: 3,
    title: "How We Use Your Data",
    bulletFormat: "label-space-paren",
    paragraphs: [
      "We process your personal data for the following purposes and legal bases under the UK GDPR:",
    ],
    bullets: [
      "To provide and personalise the Service (contract performance): operating your account, delivering AI-powered features, personalising the Service to your preferences, executing workflows, and processing your subscription.",
      "To process payments (contract performance): billing, invoicing, and usage tracking via our payment processor.",
      "To improve the Service (legitimate interest): analysing usage patterns, evaluating feature effectiveness, and developing improvements. We minimise the data used and anonymise where possible.",
      "To communicate with you (legitimate interest / consent): service notifications, product updates, and marketing communications where you have opted in.",
      "To ensure security (legitimate interest): protecting against unauthorised access, fraud, and misuse.",
      "To comply with legal obligations (legal obligation): responding to lawful requests and maintaining legally required records.",
    ],
  },
  {
    id: "ai-processing",
    number: 4,
    title: "AI Processing",
    bulletFormat: "plain",
    paragraphs: [
      "The Service makes extensive use of artificial intelligence. Here is what you should know:",
    ],
    bullets: [
      "We use AI to provide all core features of the Service, including simulated conversations, live meeting assistance, content generation, scoring, coaching, and workflow automation.",
      "We use third-party AI service providers for capabilities including language processing, speech recognition, and speech synthesis. Data is transmitted to these providers during active use. We require all AI providers to process data under data processing agreements and do not permit them to use your data to train their models.",
      "The Service learns from your feedback (such as accepting, editing, or dismissing suggestions) to improve its relevance to you over time. We do not use your individual data to train foundation AI models.",
      "significant actions (such as sending communications or making commercial commitments) require your explicit confirmation.",
      "Your organisation's administrators may have access to aggregated performance and usage data.",
    ],
  },
  {
    id: "who-we-share-your-data-with",
    number: 5,
    title: "Who We Share Your Data With",
    bulletFormat: "colon-space",
    paragraphs: [
      "We share personal data with the following categories of recipients:",
    ],
    bullets: [
      "Infrastructure providers: cloud hosting, database, and compute services that run the Service.",
      "AI service providers: third-party AI capabilities used during active sessions, as described in Section 4.",
      "Authentication and payment providers: specialist services for login management and payment processing.",
      "Integration infrastructure: services that manage authenticated connections to your third-party tools.",
      "Analytics providers: anonymised and aggregated usage data to help us understand how the Service is used.",
      "Professional advisers: lawyers, accountants, and auditors where necessary.",
      "Law enforcement or regulators: where legally required.",
    ],
    tailParagraphs: ["We do not sell your personal data to any third party."],
  },
  {
    id: "international-data-transfers",
    number: 6,
    title: "International Data Transfers",
    paragraphs: [
      "Some of our service providers are based outside the United Kingdom. Where we transfer personal data internationally, we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) approved by the ICO, transfers to countries with adequacy decisions, or other legally recognised mechanisms under the UK GDPR.",
      "You may request further details about our international transfer safeguards by contacting us.",
    ],
  },
  {
    id: "data-retention",
    number: 7,
    title: "Data Retention",
    bulletFormat: "colon-space",
    paragraphs: [
      "We retain your data for as long as necessary to provide the Service:",
    ],
    bullets: [
      "Account and profile data: retained for the duration of your account and up to 12 months after closure.",
      "Session transcripts, scores, and coaching data: retained for the duration of your subscription. You or your administrator may delete transcripts at any time.",
      "Voice and audio data: processed in real time and not persistently stored.",
      "Connected tool data: raw data is never persistently stored. Derived outputs are retained for the duration of your subscription.",
      "Action and workflow logs: retained for the duration of your subscription.",
      "Billing data: up to 7 years to comply with tax and accounting obligations.",
      "Analytics data: aggregated and anonymised data may be retained indefinitely.",
    ],
  },
  {
    id: "your-rights",
    number: 8,
    title: "Your Rights",
    paragraphs: [
      "Under the UK GDPR, you have the right to access, rectify, erase, restrict processing of, and port your personal data. You may also object to processing based on legitimate interests and request human review of significant automated decisions.",
      "To exercise any of these rights, contact us at hello@withlayer.ai. We will respond within one month.",
      "You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.",
    ],
  },
  {
    id: "cookies",
    number: 9,
    title: "Cookies",
    paragraphs: [
      "We use cookies and similar technologies to operate the Service, maintain sessions, remember preferences, and understand usage. These include strictly necessary cookies (required for the Service to function), analytics cookies, and preference cookies. You can manage cookies through your browser settings.",
    ],
  },
  {
    id: "security",
    number: 10,
    title: "Security",
    paragraphs: [
      "in transit and at rest, strict data isolation between organisations, role-based access controls, and regular security monitoring. Raw data from your connected tools is processed in automated pipelines without human access and is not persistently stored.",
      "No system is completely secure. If you become aware of a security incident, please notify us immediately at hello@withlayer.ai.",
    ],
  },
  {
    id: "childrens-privacy",
    number: 11,
    title: "Children's Privacy",
    paragraphs: [
      "The Service is designed for business professionals and is not intended for anyone under 18. We do not knowingly collect data from children.",
    ],
  },
  {
    id: "changes-to-this-policy",
    number: 12,
    title: "Changes to This Policy",
    paragraphs: [
      "We may update this Policy from time to time. We will notify you of material changes by email or through a notice in the Service.",
    ],
  },
  {
    id: "contact-us",
    number: 13,
    title: "Contact Us",
    paragraphs: [
      "If you have any questions about this Policy, please contact us:",
      "Paperclip Marketplace Ltd t/a Layer AI",
      "Email: hello@withlayer.ai",
      "Website: withlayer.ai",
    ],
  },
];
