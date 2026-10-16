import type { LegalSection } from "@/components/legal/types";

export const PRIVACY_EFFECTIVE_DATE = "16 October 2026";
export const PRIVACY_LAST_UPDATED = "16 October 2026";

export const PRIVACY_INTRODUCTION = [
  'Layer AI Systems Ltd, company number 15632925, trading as Layer AI ("Layer", "we", "us" or "our"), provides AI-assisted tools for revenue teams. This Privacy Policy explains how we handle personal data through our websites, applications, desktop software, integrations, communications and related services (together, the "Service").',
];

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "who-we-are-and-roles",
    number: 1,
    title: "Who We Are and the Roles We Perform",
    paragraphs: [
      "Layer is the controller of personal data that we use for our own business purposes, including operating accounts, administering subscriptions, securing and improving the Service, communicating with users, and running our website and business.",
      'When an organisation uses Layer to process data in its systems or content on its instructions, Layer generally acts as that organisation\'s processor. That processing is governed by our [Data Processing Addendum](/dpa) ("DPA") and the organisation\'s agreement with Layer. The organisation remains responsible for its own privacy notices, lawful basis, permissions, and instructions to us.',
      "If you use Layer through your employer or another organisation, that organisation may separately be a controller of your personal data. Its privacy notice applies to its use of your data.",
    ],
  },
  {
    id: "personal-data-we-handle",
    number: 2,
    title: "Personal Data We Handle",
    paragraphs: [
      "Depending on how the Service is configured and used, we may handle the following categories.",
    ],
    subsections: [
      {
        id: "account-and-organisation-data",
        title: "Account and Organisation Data",
        paragraphs: [
          "Names, work contact details, job title, organisation, team, role, account identifiers, authentication information provided by our identity provider, preferences, and service configuration.",
        ],
      },
      {
        id: "customer-content-and-connected-service-data",
        title: "Customer Content and Connected-Service Data",
        paragraphs: [
          "Content submitted by users or made available through a connected service, such as meeting and call content, transcripts, messages, documents, calendar information, CRM and sales records, notes, prompts, instructions, and related metadata.",
          "Some connected data is read when needed. Other features import or retain selected records so that Layer can provide continuity, search, intelligence, reporting, or automation. Layer may also create and retain derived outputs such as summaries, scores, recommendations, profiles, drafts, action records, and audit information. Disconnecting a service normally stops future access but does not necessarily delete information already imported or derived from it.",
        ],
      },
      {
        id: "voice-meeting-and-interaction-data",
        title: "Voice, Meeting, and Interaction Data",
        paragraphs: [
          "Audio or video streams needed to provide voice, roleplay, avatar, transcription, or live-assistance features; transcripts and conversation records; session metadata; and outputs such as coaching, scores, summaries, and action items.",
          "Whether an audio or video stream is retained depends on the feature, customer configuration, and notice presented for that interaction. Even where an audio stream is not retained, a transcript or derived output may be retained.",
        ],
      },
      {
        id: "usage-device-and-analytics-data",
        title: "Usage, Device, and Analytics Data",
        paragraphs: [
          "IP address, browser and device information, operating system, pages or features used, timestamps, performance information, approximate location derived from IP address, diagnostic events, and identifiers used to keep the Service secure and understand its use.",
          "Product analytics may be associated with an account or organisation. Microsoft Clarity analytics and session replay are enabled by default to help us diagnose bugs, understand failures, and refine and improve agent behaviour. Replays may include submitted messages and agent responses, but not call audio. Sensitive form fields remain masked. Users can disable Clarity at any time in Privacy Settings.",
        ],
      },
      {
        id: "billing-and-commercial-data",
        title: "Billing and Commercial Data",
        paragraphs: [
          "Subscription plan, invoices, payment status, usage and credit records, billing contact information, and transaction references. Payment-card information is handled by our payment provider and is not stored by Layer in full.",
        ],
      },
      {
        id: "communications",
        title: "Communications",
        paragraphs: [
          "Information contained in support requests, sales discussions, surveys, feedback, event registrations, and other communications with us.",
        ],
      },
      {
        id: "sensitive-data",
        title: "Sensitive Data",
        paragraphs: [
          "The Service is not designed to require special-category or highly sensitive personal data. Such data may nevertheless appear incidentally in customer content. Customers should not submit sensitive data unless they have an appropriate lawful basis and the Service and agreement permit that use.",
        ],
      },
    ],
  },
  {
    id: "where-personal-data-comes-from",
    number: 3,
    title: "Where Personal Data Comes From",
    paragraphs: ["We receive personal data:"],
    bullets: [
      "directly from users and customer administrators;",
      "from an organisation that provides or manages a user's access;",
      "from services a user or customer chooses to connect;",
      "from people participating in calls, meetings, messages, or other customer workflows;",
      "automatically from use of the Service; and",
      "from public sources, service providers, and business partners where permitted by law.",
    ],
    bulletFormat: "plain",
  },
  {
    id: "how-and-why-we-use-personal-data",
    number: 4,
    title: "How and Why We Use Personal Data",
    paragraphs: ["We use personal data to:"],
    bullets: [
      "provide, configure, support, and administer the Service;",
      "authenticate users and manage accounts and permissions;",
      "process customer instructions, generate outputs, and operate approved workflows;",
      "provide voice, transcription, roleplay, coaching, meeting, integration, and automation features;",
      "maintain context and continuity within the scope selected by the user or customer;",
      "monitor reliability, prevent misuse, investigate incidents, and protect the Service;",
      "measure usage, manage subscriptions, and process payments;",
      "communicate about the Service and respond to requests;",
      "improve usability, quality, and performance; and",
      "comply with law and establish, exercise, or defend legal claims.",
    ],
    bulletFormat: "plain",
    tailParagraphs: [
      "Where Layer is a controller, our legal bases may include performing a contract, pursuing legitimate interests in operating and securing our business, complying with legal obligations, and consent where the law requires it. When we rely on legitimate interests, we consider the nature of the data, the expected use, and the effect on individuals.",
      "Where Layer is a processor, the customer determines the relevant purposes and legal bases and instructs Layer through the agreement and its use of the Service.",
    ],
  },
  {
    id: "artificial-intelligence-and-automated-features",
    number: 5,
    title: "Artificial Intelligence and Automated Features",
    paragraphs: [
      "Layer uses artificial intelligence to generate content, assist with conversations, analyse interactions, provide coaching, and perform or propose workflow actions.",
      "AI outputs can be inaccurate, incomplete, or unexpected. Users and customers should apply appropriate human judgement, particularly for customer communications, commercial decisions, employment decisions, or other consequential uses.",
      "We do not use Customer Content to train or fine-tune general-purpose or foundation AI models, and we contractually restrict our AI subprocessors from using Customer Content for their own model training, unless the customer expressly agrees otherwise in writing.",
      "This commitment does not prevent processing needed to generate an output, retrieve customer-authorised context, maintain customer-specific preferences or memory, protect the Service, evaluate reliability, or use data that has been de-identified so that it can no longer reasonably be linked to a customer or individual.",
      "Depending on the customer's configuration, an action may be presented for user approval or performed within authority previously configured by the customer. Layer does not make solely automated decisions that are intended to produce legal or similarly significant effects about individuals unless the feature, customer instruction, and applicable safeguards expressly permit it.",
    ],
  },
  {
    id: "how-we-disclose-personal-data",
    number: 6,
    title: "How We Disclose Personal Data",
    paragraphs: ["We may disclose personal data:"],
    bullets: [
      "to service providers that supply hosting, storage, identity, AI, voice, integration, workflow, support, analytics, communications, and payment services;",
      "within the customer's organisation, according to its roles, permissions, configuration, and instructions;",
      "to a connected service when a user or customer asks Layer to read from or act in that service;",
      "to professional advisers, auditors, insurers, and financing or transaction counterparties under appropriate confidentiality obligations;",
      "to public authorities or other parties where required by law or reasonably necessary to protect rights, safety, or the Service; and",
      "in connection with a merger, financing, reorganisation, sale, or transfer of all or part of our business.",
    ],
    bulletFormat: "plain",
    tailParagraphs: [
      "We do not sell personal data for money. We do not share Customer Content for third-party behavioural advertising.",
      "Our current material subprocessor list is available on request under confidentiality. We do not publish internal network design, security configuration, source code, or information that would create unnecessary security or intellectual-property risk.",
    ],
  },
  {
    id: "international-transfers",
    number: 7,
    title: "International Transfers",
    paragraphs: [
      "Layer and its service providers may process personal data outside the United Kingdom or the country in which it was collected. Where required, we use recognised safeguards such as adequacy regulations, the UK International Data Transfer Agreement, the UK Addendum to the European Commission's Standard Contractual Clauses, or the EU Standard Contractual Clauses.",
      "Customers can request additional information about the safeguard applicable to their processing by contacting us.",
    ],
  },
  {
    id: "retention",
    number: 8,
    title: "Retention",
    paragraphs: [
      "We retain personal data only for as long as reasonably necessary for the relevant purpose, customer agreement, legal obligation, security requirement, or dispute. Retention differs by data category and feature.",
      "For example:",
    ],
    bullets: [
      "account and organisation records are generally retained while the account or customer relationship is active and for a limited period afterwards;",
      "customer content, imported records, transcripts, and derived outputs are retained according to the customer agreement, feature configuration, and applicable deletion process;",
      "temporary files or caches may use shorter operational expiry periods;",
      "security, action, billing, and audit records may be retained after other content is deleted where reasonably necessary to protect the Service, explain transactions, meet legal obligations, or resolve disputes; and",
      "backups are protected from ordinary use and removed through their normal secure lifecycle.",
    ],
    bulletFormat: "plain",
    tailParagraphs: [
      "A user-interface action such as clearing a view, archiving an item, or disconnecting a service may have a different effect from deleting stored data. Customers should use the applicable deletion control or contact us where a broader request is required.",
    ],
  },
  {
    id: "data-protection-rights",
    number: 9,
    title: "Data Protection Rights",
    paragraphs: [
      "Depending on where you live and how Layer processes your data, you may have rights to request access, correction, deletion, restriction, portability, or objection, to withdraw consent, or to complain to a data protection authority. These rights are not absolute and may be subject to legal exceptions.",
      "If Layer processes the relevant data on behalf of a customer, we may refer your request to that customer. If Layer is the controller, contact us using the details below. We may need information to verify your identity and authority.",
      "Individuals in the United Kingdom may complain to the Information Commissioner's Office at [ico.org.uk](https://ico.org.uk/). Individuals elsewhere may contact their local data protection authority.",
      "Residents of US states with applicable privacy laws may also have rights provided by those laws, including rights to know, access, correct, delete, or obtain a copy of certain personal data, and to appeal a refusal. Layer will not discriminate against an individual for exercising an applicable privacy right.",
    ],
  },
  {
    id: "cookies-and-similar-technologies",
    number: 10,
    title: "Cookies and Similar Technologies",
    paragraphs: [
      "We use cookies and similar technologies that are necessary to operate and secure the Service. We also use analytics and session-replay technologies as described above. Where applicable law requires consent before a technology is enabled, we will request it. Users can change the available analytics controls in Privacy Settings.",
    ],
  },
  {
    id: "security",
    number: 11,
    title: "Security",
    paragraphs: [
      "We use technical and organisational measures designed to protect personal data, taking into account the nature of the processing and the risks involved. These include measures relating to access control, encryption, tenant separation, secure development and operations, monitoring, incident response, resilience, and supplier management.",
      "No service can guarantee absolute security. Customers and users are responsible for protecting their credentials, devices, connected accounts, and authorised use of the Service.",
    ],
  },
  {
    id: "children",
    number: 12,
    title: "Children",
    paragraphs: [
      "The Service is intended for business users and is not directed to children under 18. We do not knowingly collect personal data directly from children through the Service.",
    ],
  },
  {
    id: "changes",
    number: 13,
    title: "Changes",
    paragraphs: [
      "We may update this Privacy Policy to reflect changes in law, the Service, or our practices. We will update the date above and provide additional notice where a change is material and the law or our agreement requires it.",
    ],
  },
  {
    id: "contact",
    number: 14,
    title: "Contact",
    paragraphs: [
      "Layer AI Systems Ltd",
      "Company number 15632925",
      "1 Dukes Passage, Brighton, East Sussex BN1 1BS, United Kingdom",
      "Email: [hello@withlayer.ai](mailto:hello@withlayer.ai)",
      "Website: [withlayer.ai](https://www.withlayer.ai)",
    ],
  },
];
