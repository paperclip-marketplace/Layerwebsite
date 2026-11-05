import type { LegalSection } from "@/components/legal/types";

export const TERMS_EFFECTIVE_DATE = "16 October 2026";
export const TERMS_LAST_UPDATED = "16 October 2026";

export const TERMS_INTRODUCTION = [
  'These Terms and Conditions ("Terms") govern access to and use of the Layer AI platform, applications, software, integrations, and related services (the "Service") provided by Layer AI Systems Ltd, company number 15632925, trading as Layer AI ("Layer", "we", "us" or "our").',
  'If you use the Service for an organisation, you confirm that you have authority to bind that organisation. In these Terms, "Customer" means that organisation or, for an individual subscription, the individual purchasing the Service. "User" means a person authorised by Customer to use the Service.',
  'An order form, online checkout, statement of work, or other written agreement accepted by Layer and Customer is an "Order". These Terms and each Order form the "Agreement".',
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: "service",
    number: 1,
    title: "The Service",
    paragraphs: [
      "Layer provides AI-assisted tools for revenue teams, which may include assistants, roleplay and simulation, meeting support, coaching, analysis, content generation, workflows, and integrations with third-party systems.",
      "Layer may improve or change the Service over time. We will not materially reduce the core functionality of a paid Service during an active subscription without reasonable notice, except where a change is required for security, legal compliance, third-party availability, or to prevent harm.",
      "Features identified as beta, preview, experimental, or evaluation features may change or be withdrawn and are provided without service-level commitments unless an Order says otherwise.",
    ],
  },
  {
    id: "accounts-and-organisation-administration",
    number: 2,
    title: "Accounts and Organisation Administration",
    paragraphs: [
      "Users must provide accurate account information, protect their credentials, and promptly report suspected unauthorised access.",
      "Customer controls which Users may access its workspace and may configure roles, permissions, connected services, features, and approval rules. Depending on that configuration, authorised administrators may access or manage organisation content, usage, settings, and reports. Customer is responsible for its Users and for ensuring that its configuration and use of the Service are lawful and appropriate.",
    ],
  },
  {
    id: "right-to-use",
    number: 3,
    title: "Right to Use the Service",
    paragraphs: [
      "Subject to the Agreement and payment of applicable fees, Layer grants Customer a limited, non-exclusive, non-transferable right during the subscription term to permit its Users to access and use the Service for Customer's internal business purposes.",
      "Customer must not, and must not allow anyone else to:",
    ],
    bullets: [
      "use the Service unlawfully or to infringe another person's rights;",
      "gain unauthorised access to the Service, another account, or another customer's data;",
      "upload malicious code or interfere with the security or operation of the Service;",
      "reverse engineer, decompile, copy, or create derivative works from the Service except where applicable law does not permit that restriction;",
      "resell, sublicense, or provide the Service as a service bureau without Layer's written agreement;",
      "use the Service or its outputs to build or train a competing product or model;",
      "bypass usage limits, permissions, approval controls, or technical safeguards;",
      "submit content it does not have the right to use; or",
      "use the Service to harass, discriminate, deceive, or cause unlawful harm.",
    ],
  },
  {
    id: "customer-content",
    number: 4,
    title: "Customer Content",
    paragraphs: [
      '"Customer Content" means data, content, instructions, records, and materials submitted to the Service by or for Customer, obtained from Customer\'s connected services, or generated specifically from that material for Customer.',
      "As between the parties, Customer retains its rights in Customer Content. Customer grants Layer and its subprocessors a limited, non-exclusive right to host, copy, transmit, transform, and otherwise process Customer Content only as needed to provide, secure, support, and maintain the Service, comply with Customer's documented instructions, and meet legal obligations.",
      "Customer is responsible for ensuring that it has the rights, notices, lawful bases, permissions, and consents needed for Layer to process Customer Content as contemplated by the Agreement. This includes responsibility for its use of call, meeting, recording, monitoring, coaching, employment, communication, and connected-system features.",
      "Layer does not acquire ownership of Customer Content. Unless Customer expressly agrees in writing, Layer will not use Customer Content to train or fine-tune general-purpose or foundation AI models and will contractually restrict its AI subprocessors from using Customer Content for their own model training.",
      '"Service Data" means usage, performance, diagnostic and technical data, and data derived from Customer Content that has been aggregated or de-identified so that it does not reasonably identify Customer, any User or any individual. Layer may use and own Service Data to operate, secure, analyse, and improve its products, services, and models.',
    ],
  },
  {
    id: "ai-generated-content-and-actions",
    number: 5,
    title: "AI-Generated Content and Actions",
    paragraphs: [
      "The Service uses artificial intelligence. Outputs may be inaccurate, incomplete, unexpected, or unsuitable for a particular purpose. Customer and its Users remain responsible for reviewing outputs and applying professional judgement.",
      "Scores, coaching, recommendations, forecasts, and similar outputs are decision-support tools. They must not be used as the sole basis for employment, financial, legal, medical, or similarly consequential decisions.",
      "The Service may draft, propose, or perform actions in connected systems. An action may require a User's confirmation or may be performed under authority and permissions previously configured by Customer. Customer is responsible for deciding which Users and workflows receive that authority, monitoring its use, and maintaining appropriate human oversight.",
    ],
  },
  {
    id: "connected-services",
    number: 6,
    title: "Connected Services",
    paragraphs: [
      "Customer may choose to connect third-party services. Customer authorises Layer to access and exchange data with those services as needed to provide the selected functionality.",
      "Third-party services are governed by their own terms and privacy practices. Layer is not responsible for a third-party service's independent acts, availability, or changes. Customer is responsible for maintaining the necessary third-party accounts and permissions.",
      "Disconnecting a service normally prevents future access through that connection but may not delete Customer Content already imported, created, or derived through the Service. Deletion and return are governed by the applicable Service controls, DPA, Order, and retention process.",
    ],
  },
  {
    id: "data-protection-and-security",
    number: 7,
    title: "Data Protection and Security",
    paragraphs: [
      "Our [Privacy Policy](/privacy) explains how Layer handles personal data as a controller. Where Layer processes Customer Personal Data on Customer's behalf, the [Layer Data Processing Addendum](/dpa) applies and is incorporated into the Agreement.",
      "Layer will maintain a security programme with technical and organisational measures appropriate to the nature of the Service and the risks of processing. Customer remains responsible for secure configuration, User access, credentials, devices, and connected accounts within its control.",
    ],
  },
  {
    id: "confidentiality",
    number: 8,
    title: "Confidentiality",
    paragraphs: [
      '"Confidential Information" means non-public information disclosed by one party to the other that is marked confidential or should reasonably be understood to be confidential. Customer Content is Customer\'s Confidential Information. The Service, non-public product information, security materials, and pricing not publicly offered are Layer\'s Confidential Information.',
      "The receiving party will use Confidential Information only to perform or exercise rights under the Agreement, protect it using reasonable care, and disclose it only to personnel, advisers, and service providers who need it and are subject to confidentiality obligations.",
      "Confidential Information does not include information that the receiving party can demonstrate was lawfully known without restriction, becomes public without breach, is independently developed, or is lawfully received from another source. A party may disclose information where legally required, provided it gives advance notice where permitted and reasonable assistance at the other party's expense.",
    ],
  },
  {
    id: "fees-billing-and-taxes",
    number: 9,
    title: "Fees, Billing, and Taxes",
    paragraphs: [
      "Fees, plan limits, subscription period, and payment terms are stated in the Order or checkout. Unless stated otherwise, fees are exclusive of taxes and are non-cancellable and non-refundable except where the Agreement or law provides otherwise.",
      "Subscriptions renew for the period shown in the Order or checkout unless cancelled before renewal. Layer may change pricing for a future renewal period by giving reasonable advance notice.",
      "Late undisputed amounts may result in suspension after reasonable notice. Customer must raise a good-faith billing dispute promptly and continue paying undisputed amounts.",
    ],
  },
  {
    id: "intellectual-property-and-feedback",
    number: 10,
    title: "Intellectual Property and Feedback",
    paragraphs: [
      "Layer and its licensors retain all rights in the Service, software, models, designs, documentation, methods, and technology. No rights are granted except those expressly stated in the Agreement.",
      "As between the parties, and to the extent any intellectual-property rights arise, Customer owns outputs generated specifically for Customer from Customer Content. Customer may use those outputs for its internal business purposes, subject to applicable law, third-party rights, and the characteristics of generative AI. Similar or identical outputs may be generated for other users, and Layer does not warrant that an output is unique or eligible for intellectual-property protection. Layer retains all rights in the Service and any Layer materials incorporated into an output.",
      "If Customer provides feedback, Layer may use it without restriction or payment, provided Layer does not publicly identify Customer as the source without permission.",
    ],
  },
  {
    id: "service-availability-and-support",
    number: 11,
    title: "Service Availability and Support",
    paragraphs: [
      "Layer will use commercially reasonable efforts to provide the Service. Specific support, availability, or service-level commitments apply only where stated in an Order or separate service-level agreement.",
      "The Service may be interrupted for maintenance, security, third-party failures, emergencies, or circumstances beyond Layer's reasonable control.",
    ],
  },
  {
    id: "suspension",
    number: 12,
    title: "Suspension",
    paragraphs: [
      "Layer may suspend access where reasonably necessary to address a security risk, unlawful use, material breach, non-payment, harm to the Service or another party, or a legal requirement. Where practicable, Layer will give notice and limit the suspension to the affected scope.",
    ],
  },
  {
    id: "term-and-termination",
    number: 13,
    title: "Term and Termination",
    paragraphs: [
      "The Agreement begins when Customer accepts an Order, completes checkout, or first uses the Service and continues for the applicable subscription term.",
      "Either party may terminate for an uncured material breach after giving 30 days' written notice, or immediately if the breach cannot be cured. Layer may terminate a free Service on reasonable notice.",
      "On termination, Customer's right to use the Service ends. Treatment of Customer Content is governed by the DPA, Order, and applicable retention process. Termination does not remove payment obligations already incurred.",
      "Provisions that by their nature should survive will survive, including confidentiality, intellectual property, fees due, disclaimers, liability limits, and general terms.",
    ],
  },
  {
    id: "warranties-and-disclaimers",
    number: 14,
    title: "Warranties and Disclaimers",
    paragraphs: [
      "Each party warrants that it has authority to enter into the Agreement.",
      "Layer warrants that it will provide paid Services with reasonable skill and care. Customer's exclusive remedy for a material breach of this warranty is for Layer to re-perform the affected Service or, if Layer cannot do so within a reasonable period, allow Customer to terminate the affected Service and receive a pro-rata refund of prepaid fees for the unused terminated period.",
      'Except for express commitments in the Agreement and to the maximum extent permitted by law, the Service and outputs are provided "as is" and "as available". Layer disclaims implied warranties of merchantability, satisfactory quality, fitness for a particular purpose, non-infringement, uninterrupted availability, and error-free or fully accurate output.',
      "Nothing in the Agreement excludes rights or warranties that cannot lawfully be excluded.",
    ],
  },
  {
    id: "liability",
    number: 15,
    title: "Liability",
    paragraphs: [
      "Nothing in the Agreement excludes or limits liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, breach of confidentiality to the extent it cannot lawfully be limited, or any other liability that cannot lawfully be excluded or limited.",
      "Subject to the previous paragraph, neither party will be liable for indirect or consequential loss, or for loss of profit, revenue, business opportunity, goodwill, or anticipated savings.",
      "Subject to the first paragraph of this section, each party's total aggregate liability arising out of or relating to the Agreement will not exceed the fees paid or payable by Customer for the Service in the 12 months before the event giving rise to the claim. For a free Service, Layer's total aggregate liability will not exceed £100.",
    ],
  },
  {
    id: "indemnities",
    number: 16,
    title: "Indemnities",
    paragraphs: [
      "Customer will defend Layer against third-party claims arising from Customer Content or Customer's use of the Service in breach of the Agreement or applicable law, and will pay finally awarded damages and reasonable settlement amounts, provided Layer promptly notifies Customer, gives Customer control of the defence and settlement, and provides reasonable cooperation.",
    ],
  },
  {
    id: "governing-law-and-disputes",
    number: 17,
    title: "Governing Law and Disputes",
    paragraphs: [
      "The Agreement is governed by the laws of England and Wales. The courts of England and Wales have exclusive jurisdiction, except that either party may seek urgent injunctive relief in any competent court.",
      "Before starting formal proceedings, the parties will attempt in good faith for at least 30 days to resolve the dispute through representatives authorised to settle it.",
    ],
  },
  {
    id: "general",
    number: 18,
    title: "General",
    paragraphs: [
      "The Agreement is the entire agreement about the Service and replaces prior discussions on that subject. If documents conflict, the following order applies unless an Order expressly states otherwise: the Order, the DPA for personal-data processing, these Terms, and referenced policies.",
      "Neither party may assign the Agreement without the other's consent, not to be unreasonably withheld, except to an affiliate or in connection with a merger, reorganisation, or sale of substantially all relevant assets.",
      "Neither party is liable for delay caused by circumstances beyond its reasonable control, excluding payment obligations.",
      "If a provision is unenforceable, it will be adjusted only as necessary and the remainder will continue. Failure to enforce a provision is not a waiver.",
      "Notices under the Agreement must be sent to the contact in the Order or, for Layer, to hello@withlayer.ai. Electronic notices are permitted. No third party has a right to enforce the Agreement under the Contracts (Rights of Third Parties) Act 1999.",
    ],
  },
  {
    id: "contact",
    number: 19,
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
