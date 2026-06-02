export type TermsSubsection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type TermsSection = {
  id: string;
  number: number;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: TermsSubsection[];
};

export const TERMS_EFFECTIVE_DATE = "13 April 2026";
export const TERMS_LAST_UPDATED = "13 April 2026";

export const TERMS_SECTIONS: TermsSection[] = [
  {
    id: "introduction",
    number: 1,
    title: "Introduction",
    paragraphs: [
      'These Terms & Conditions ("Terms") govern your access to and use of the Layer AI platform and related services (the "Service"), provided by Paperclip Marketplace Ltd, a company registered in England and Wales, trading as Layer AI ("we", "us", or "our").',
      "By accessing or using the Service, you agree to be bound by these Terms. If you are using the Service on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms.",
      "If you do not agree to these Terms, you must not use the Service.",
    ],
  },
  {
    id: "the-service",
    number: 2,
    title: "The Service",
    subsections: [
      {
        id: "description",
        title: "2.1 Description",
        paragraphs: [
          "Layer AI is an AI-powered platform that helps go-to-market teams work more effectively. The Service includes:",
        ],
        bullets: [
          "AI assistants that support your daily sales workflow",
          "Sales practice and simulation through AI-powered roleplay",
          "Live meeting assistance and real-time intelligence during calls",
          "Automated deal preparation, post-meeting workflows, and coaching",
          "Actions within your connected business tools, subject to your organisation's configured permissions",
          "An administrative control plane for organisational configuration",
          "Integration with third-party CRM, calendar, email, sales engagement, and communication platforms",
        ],
      },
      {
        id: "ai-generated-content",
        title: "2.2 AI-Generated Content and Actions",
        paragraphs: [
          "The Service generates content and may perform actions using artificial intelligence. You acknowledge that:",
        ],
        bullets: [
          "AI-generated content is produced to assist your work and does not constitute professional, legal, or financial advice.",
          "AI models may produce inaccurate, incomplete, or unexpected outputs. You should exercise your own professional judgement.",
          "Performance scores and coaching feedback are development aids and should not be used as the sole basis for employment or performance management decisions.",
          "Where the Service creates drafts or proposes actions in your connected tools (such as CRM updates, emails, or calendar events), these are presented for your review. The Service does not send communications on your behalf without your explicit action.",
        ],
      },
      {
        id: "actions-in-connected-systems",
        title: "2.3 Actions in Connected Systems",
        paragraphs: [
          "The Service may perform actions within your connected third-party tools on your behalf, such as updating records, creating drafts, or scheduling events. These actions are subject to a permission framework configured by your organisation's administrator, which determines what the Service may do autonomously and what requires human approval.",
          "You are responsible for reviewing actions proposed by the Service before confirming them. While we design the Service to operate within configured permissions, you should maintain appropriate oversight, particularly for actions involving customer-facing communications or commercial commitments.",
        ],
      },
    ],
  },
  {
    id: "accounts-and-access",
    number: 3,
    title: "Accounts and Access",
    subsections: [
      {
        id: "registration",
        title: "3.1 Registration",
        paragraphs: [
          "To use the Service, you must create an account and provide accurate, complete registration information. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account.",
        ],
      },
      {
        id: "organisation-accounts",
        title: "3.2 Organisation Accounts",
        paragraphs: [
          "If you join an organisation workspace, the administrator controls workspace settings, member access, permissions, and feature configuration. Administrators may have visibility into aggregated usage and performance data. Your use is also subject to any policies your organisation establishes.",
        ],
      },
      {
        id: "account-security",
        title: "3.3 Account Security",
        paragraphs: [
          "You must notify us immediately at hello@withlayer.ai if you become aware of any unauthorised use of your account. We are not liable for loss arising from unauthorised access where you have failed to maintain adequate credential security.",
        ],
      },
    ],
  },
  {
    id: "subscriptions-and-payment",
    number: 4,
    title: "Subscriptions and Payment",
    subsections: [
      {
        id: "plans-and-pricing",
        title: "4.1 Plans and Pricing",
        paragraphs: [
          "The Service is offered under various subscription plans. Usage may be measured by interactions, features, and connected integrations. Details are available on our website. We reserve the right to modify plans and pricing upon reasonable notice.",
        ],
      },
      {
        id: "billing",
        title: "4.2 Billing",
        paragraphs: [
          "Fees are billed on a recurring basis (monthly or annually). All fees are exclusive of applicable taxes unless stated otherwise. Payment is processed by our third-party payment processor.",
        ],
      },
      {
        id: "free-plan",
        title: "4.3 Free Plan",
        paragraphs: [
          "We may offer a free plan with limited features. Free plans are provided as-is and may be modified or discontinued at any time without notice.",
        ],
      },
      {
        id: "cancellation-and-refunds",
        title: "4.4 Cancellation and Refunds",
        paragraphs: [
          "You may cancel at any time through your account settings. Cancellation takes effect at the end of your current billing period. We do not offer refunds for partial periods unless required by law.",
        ],
      },
    ],
  },
  {
    id: "your-data-and-content",
    number: 5,
    title: "Your Data and Content",
    subsections: [
      {
        id: "ownership",
        title: "5.1 Ownership",
        paragraphs: [
          'You retain ownership of all data you provide to the Service ("Your Data"), including account information, data accessed through integrations, and content you create within the Service.',
        ],
      },
      {
        id: "licence-to-us",
        title: "5.2 Licence to Us",
        paragraphs: [
          "You grant us a non-exclusive, worldwide, royalty-free licence to use, process, store, and transmit Your Data solely to provide, maintain, and improve the Service. This licence terminates when you delete Your Data or close your account, subject to our retention policy.",
        ],
      },
      {
        id: "data-processing",
        title: "5.3 Data Processing",
        paragraphs: [
          "Our processing of personal data is governed by our Privacy Policy. Where we act as a data processor on behalf of your organisation, we will enter into a Data Processing Agreement upon request.",
        ],
      },
      {
        id: "connected-tool-data",
        title: "5.4 Connected Tool Data",
        paragraphs: [
          "When you connect third-party tools, you authorise us to access and process data from those tools to deliver the Service. You are responsible for ensuring you have the necessary rights to share that data. Raw data from connected tools is not persistently stored on our systems — only derived outputs are retained.",
        ],
      },
      {
        id: "ai-generated-outputs",
        title: "5.5 AI-Generated Outputs",
        paragraphs: [
          "AI-generated outputs produced by the Service (including recommendations, drafts, scores, and coaching feedback) are created for your use within your organisation for their intended business purposes.",
        ],
      },
    ],
  },
  {
    id: "acceptable-use",
    number: 6,
    title: "Acceptable Use",
    paragraphs: ["You agree not to use the Service to:"],
    bullets: [
      "Violate any applicable law, regulation, or third-party rights.",
      "Upload or transmit malicious code, viruses, or harmful content.",
      "Attempt to gain unauthorised access to the Service, other accounts, or our systems.",
      "Reverse engineer, decompile, or disassemble any part of the Service.",
      "Use the Service to develop a competing product or service.",
      "Resell, sublicence, or redistribute access without our written consent.",
      "Use the Service to harass, abuse, or harm any person.",
      "Misrepresent AI-generated content as human-created content where doing so would be deceptive.",
      "Submit data you do not have the right to use or that would violate the privacy of any third party.",
      "Intentionally circumvent your organisation's configured permissions or approval workflows.",
      "Use the Service for bulk automated actions in connected systems beyond normal business use.",
    ],
    subsections: [
      {
        id: "acceptable-use-enforcement",
        title: "",
        paragraphs: [
          "We reserve the right to suspend or terminate your access for breach of these terms.",
        ],
      },
    ],
  },
  {
    id: "intellectual-property",
    number: 7,
    title: "Intellectual Property",
    subsections: [
      {
        id: "our-ip",
        title: "7.1 Our IP",
        paragraphs: [
          "The Service, including its software, AI models, design, trademarks, and documentation, is owned by or licensed to Paperclip Marketplace Ltd. Nothing in these Terms transfers intellectual property rights in the Service to you.",
        ],
      },
      {
        id: "feedback",
        title: "7.2 Feedback",
        paragraphs: [
          "If you provide feedback or suggestions about the Service, you grant us a perpetual, irrevocable, royalty-free licence to use that feedback for any purpose.",
        ],
      },
    ],
  },
  {
    id: "third-party-services",
    number: 8,
    title: "Third-Party Services",
    paragraphs: [
      "The Service integrates with and relies upon third-party services for various capabilities. Your use of integrations may be subject to those providers' own terms. When the Service performs actions within your connected tools, those actions are subject to the relevant platform's terms. You are responsible for compliance with the terms of your connected platforms.",
    ],
  },
  {
    id: "service-availability-and-support",
    number: 9,
    title: "Service Availability and Support",
    subsections: [
      {
        id: "availability",
        title: "9.1 Availability",
        paragraphs: [
          "We aim to provide a reliable Service but do not guarantee uninterrupted or error-free operation. The Service may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control.",
        ],
      },
      {
        id: "modifications",
        title: "9.2 Modifications",
        paragraphs: [
          "We may update or modify features of the Service from time to time. We will provide reasonable advance notice of material changes.",
        ],
      },
      {
        id: "support",
        title: "9.3 Support",
        paragraphs: [
          "Support is provided in accordance with your subscription plan.",
        ],
      },
    ],
  },
  {
    id: "limitation-of-liability",
    number: 10,
    title: "Limitation of Liability",
    subsections: [
      {
        id: "no-exclusion",
        title: "10.1 No Exclusion of Mandatory Liability",
        paragraphs: [
          "Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded under applicable law.",
        ],
      },
      {
        id: "limitation",
        title: "10.2 Limitation",
        paragraphs: ["Subject to Section 10.1, to the maximum extent permitted by law:"],
        bullets: [
          "We exclude all liability for indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, data, business opportunities, or goodwill.",
          "Our total aggregate liability shall not exceed the greater of (a) the total fees paid by you in the 12 months preceding the claim, or (b) £100.",
        ],
      },
      {
        id: "ai-disclaimer",
        title: "10.3 AI Disclaimer",
        paragraphs: [
          "The Service uses artificial intelligence that may produce inaccurate or unexpected outputs. We do not warrant that AI-generated content or actions will be accurate, complete, or suitable for any particular purpose.",
          "You are responsible for reviewing and confirming actions the Service proposes in your connected systems. We are not liable for business consequences arising from actions you approve or confirm based on the Service's recommendations. You should maintain appropriate oversight of the Service's actions, particularly those involving customer communications, financial commitments, or changes to business records. The Service does not provide legal, financial, medical, or other regulated professional advice.",
        ],
      },
    ],
  },
  {
    id: "indemnification",
    number: 11,
    title: "Indemnification",
    paragraphs: [
      "You agree to indemnify and hold harmless Paperclip Marketplace Ltd, its directors, employees, and agents from claims, damages, losses, or expenses arising from:",
    ],
    bullets: [
      "Your use of the Service in breach of these Terms.",
      "Your violation of any applicable law or third-party rights.",
      "Data you submit that infringes any third party's intellectual property or privacy rights.",
      "Actions performed by the Service within your connected systems that you approved or that resulted from your organisation's permission configuration.",
    ],
  },
  {
    id: "confidentiality",
    number: 12,
    title: "Confidentiality",
    paragraphs: [
      "Each party agrees to keep confidential any non-public information received from the other party in connection with the Service. This does not apply to information that is publicly available, independently developed, lawfully received from a third party, or required to be disclosed by law.",
    ],
  },
  {
    id: "term-and-termination",
    number: 13,
    title: "Term and Termination",
    subsections: [
      {
        id: "term",
        title: "13.1 Term",
        paragraphs: [
          "These Terms remain in effect for as long as you have an account or use the Service.",
        ],
      },
      {
        id: "termination-by-you",
        title: "13.2 Termination by You",
        paragraphs: [
          "You may terminate at any time by cancelling your subscription and deleting your account.",
        ],
      },
      {
        id: "termination-by-us",
        title: "13.3 Termination by Us",
        paragraphs: [
          "We may suspend or terminate your access immediately for material breach, non-payment, or where required by law. We will provide reasonable notice where practicable.",
        ],
      },
      {
        id: "effect-of-termination",
        title: "13.4 Effect of Termination",
        paragraphs: [
          "Upon termination, your access ceases immediately and the Service will stop operating within your connected systems. We delete your data in accordance with our Privacy Policy. Sections that by their nature should survive (including intellectual property, limitation of liability, indemnification, and governing law) continue to apply.",
        ],
      },
    ],
  },
  {
    id: "governing-law-and-disputes",
    number: 14,
    title: "Governing Law and Disputes",
    paragraphs: [
      "These Terms are governed by the laws of England and Wales. Disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
      "Both parties agree to attempt good faith negotiation for at least 30 days before initiating formal proceedings.",
    ],
  },
  {
    id: "general-provisions",
    number: 15,
    title: "General Provisions",
    bullets: [
      "Entire agreement: these Terms, our Privacy Policy, and any applicable Data Processing Agreement constitute the entire agreement between us regarding the Service.",
      "Amendments: we may amend these Terms from time to time. Material changes will be notified by email or in-Service notice. Continued use constitutes acceptance.",
      "Assignment: you may not assign rights without our written consent. We may assign to an affiliate or in connection with a merger, acquisition, or asset sale.",
      "Severability: if any provision is unenforceable, the remainder continues in full force.",
      "Waiver: failure to enforce a right does not waive it.",
      "Force majeure: we are not liable for failures beyond our reasonable control.",
      "Third-party rights: no third party has rights under these Terms pursuant to the Contracts (Rights of Third Parties) Act 1999.",
    ],
  },
  {
    id: "contact-us",
    number: 16,
    title: "Contact Us",
    paragraphs: [
      "If you have any questions about these Terms, please contact us:",
      "Paperclip Marketplace Ltd t/a Layer AI",
      "Email: hello@withlayer.ai",
      "Website: withlayer.ai",
    ],
  },
];
