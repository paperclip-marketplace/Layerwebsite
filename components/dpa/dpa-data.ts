import type { LegalSection } from "@/components/legal/types";

export const DPA_EFFECTIVE_DATE = "16 October 2026";
export const DPA_LAST_UPDATED = "16 October 2026";

export const DPA_INTRODUCTION = [
  'This Data Processing Addendum, including its annexes (the "DPA"), forms part of the agreement governing the Customer\'s use of the Layer Service (the "Agreement") between the Customer identified in the Agreement ("Customer") and Layer AI Systems Ltd, company number 15632925 ("Layer").',
  "The DPA applies where Layer processes Customer Personal Data on Customer's behalf. By entering into the Agreement, each party agrees to this DPA. Capitalised terms not defined here have the meaning given in the Agreement.",
];

export const DPA_SECTIONS: LegalSection[] = [
  {
    id: "definitions",
    number: 1,
    title: "Definitions",
    paragraphs: [
      '"Applicable Data Protection Law" means privacy, data protection, and data security law applicable to Layer\'s processing of Customer Personal Data under the Agreement, including the UK GDPR, EU GDPR, Data Protection Act 2018, Swiss Federal Act on Data Protection, and applicable US State Privacy Laws.',
      '"Controller", "Data Subject", "Personal Data", "Process", "Processor", and "Supervisory Authority" have the meanings given by Applicable Data Protection Law. "Business", "Contractor", and "Service Provider" have the meanings given by applicable US State Privacy Laws.',
      '"Customer Personal Data" means Personal Data contained in Customer Content that Layer processes on Customer\'s behalf to provide the Service.',
      '"EU GDPR" means Regulation (EU) 2016/679. "UK GDPR" means the EU GDPR as incorporated into United Kingdom law, together with applicable amendments and the Data Protection Act 2018.',
      '"Information Security Incident" means a confirmed breach of Layer\'s security leading to accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to Customer Personal Data. It does not include unsuccessful attempts that do not compromise Customer Personal Data.',
      '"Restricted Transfer" means a transfer of Customer Personal Data that requires an approved transfer mechanism under Applicable Data Protection Law.',
      '"Subprocessor" means a third party engaged by Layer to process Customer Personal Data on Customer\'s behalf.',
      '"EU SCCs" means the European Commission standard contractual clauses adopted by Implementing Decision (EU) 2021/914. "UK Addendum" means the ICO\'s International Data Transfer Addendum to the EU SCCs, version B1.0, as revised in accordance with its mandatory clauses.',
    ],
  },
  {
    id: "roles-and-scope",
    number: 2,
    title: "Roles and Scope",
    paragraphs: [
      "Customer is a Controller or Processor, as applicable. Layer is a Processor of Customer Personal Data. If Customer is a Processor, Layer is Customer's Subprocessor and Customer confirms that its instructions and appointment of Layer are authorised by the relevant Controller.",
      "The subject matter, duration, nature, purpose, data categories, and Data Subjects are described in Annex 1.",
      "This DPA continues for as long as Layer processes Customer Personal Data, regardless of expiry or termination of the Agreement.",
      "Layer may process some personal data as an independent Controller, including account administration, billing, security, legal-compliance, and business-contact data. That processing is governed by Layer's [Privacy Policy](/privacy) and is outside this DPA.",
    ],
  },
  {
    id: "customer-instructions",
    number: 3,
    title: "Customer Instructions",
    paragraphs: ["Layer will process Customer Personal Data only:"],
    bullets: [
      "on Customer's documented instructions, including the Agreement, Orders, Customer's configuration and authorised use of the Service, and written instructions consistent with the Agreement;",
      "as necessary to provide, secure, support, and maintain the Service; or",
      "where required by applicable law, in which case Layer will inform Customer before processing unless the law prohibits notice.",
    ],
    subsections: [
      {
        id: "instruction-limits",
        title: "",
        paragraphs: [
          "Layer will promptly inform Customer if, in Layer's reasonable opinion, an instruction infringes Applicable Data Protection Law. Layer may suspend the affected processing while the parties resolve the issue.",
          "An instruction requiring material changes or work outside the Service is subject to written agreement and reasonable additional fees.",
        ],
      },
    ],
  },
  {
    id: "confidentiality-and-access",
    number: 4,
    title: "Confidentiality and Access",
    paragraphs: [
      "Layer will ensure that people authorised to process Customer Personal Data are bound by confidentiality obligations and receive access only where reasonably necessary for their role.",
    ],
  },
  {
    id: "security",
    number: 5,
    title: "Security",
    paragraphs: [
      "Layer will maintain technical and organisational measures designed to provide security appropriate to the risk, taking into account the state of the art, implementation costs, and the nature, scope, context, and purposes of processing. The current categories of measures are described in Annex 2.",
      "Layer may update its measures to reflect changes in technology, threats, law, or the Service, provided the overall protection of Customer Personal Data is not materially reduced.",
      "Customer is responsible for secure configuration of the Service within its control, management of Users and permissions, protection of credentials and devices, and lawful use of connected services.",
    ],
  },
  {
    id: "information-security-incidents",
    number: 6,
    title: "Information Security Incidents",
    paragraphs: [
      "Layer will notify Customer without undue delay and, in any event, within 72 hours after becoming aware of an Information Security Incident affecting Customer Personal Data.",
      "As information becomes reasonably available, Layer will provide relevant details about the nature of the incident, likely consequences, affected data, mitigation, and a contact point. Layer may provide information in phases and may withhold information where disclosure would create a security risk, breach law, or compromise another customer.",
      "Layer will take reasonable steps to contain, investigate, and mitigate the incident and will reasonably assist Customer with legally required notifications. Notification does not constitute an admission of fault or liability.",
    ],
  },
  {
    id: "assistance-and-data-subject-requests",
    number: 7,
    title: "Assistance and Data Subject Requests",
    paragraphs: [
      "Taking into account the nature of the processing and information available to Layer, Layer will provide reasonable assistance for Customer to:",
    ],
    bullets: [
      "respond to Data Subject requests;",
      "maintain security of processing;",
      "notify Supervisory Authorities and affected Data Subjects of personal-data breaches where required;",
      "conduct legally required data protection impact assessments; and",
      "consult a Supervisory Authority where required.",
    ],
    subsections: [
      {
        id: "request-handling",
        title: "",
        paragraphs: [
          "If Layer receives a request relating to Customer Personal Data, Layer will, unless prohibited by law, notify Customer and direct the requester to Customer. Layer will not respond substantively except on Customer's documented instruction or where legally required.",
          "Layer may charge reasonable fees for assistance requiring material work outside the standard Service, after giving Customer an estimate where practicable.",
        ],
      },
    ],
  },
  {
    id: "subprocessors",
    number: 8,
    title: "Subprocessors",
    paragraphs: [
      "Customer gives Layer general written authorisation to engage the Subprocessors identified in Layer's current Subprocessor List, which is available on request under confidentiality.",
      "Layer will:",
    ],
    bullets: [
      "enter into a written agreement with each Subprocessor imposing data-protection obligations appropriate to the processing and no less protective in substance than the relevant obligations in this DPA;",
      "remain responsible for each Subprocessor's performance of those obligations to the extent required by Applicable Data Protection Law; and",
      "make available the Subprocessor's name, service function, and relevant processing location or transfer information.",
    ],
    subsections: [
      {
        id: "subprocessor-changes",
        title: "",
        paragraphs: [
          "Layer will provide notice of a new material Subprocessor at least 15 days before it begins processing Customer Personal Data, normally by email or another notification method agreed with Customer.",
          "Customer may object during that period on reasonable data-protection grounds. The parties will work in good faith to resolve the objection. If no reasonable alternative is available, Customer may terminate the affected Service by written notice before the new Subprocessor begins processing and will pay amounts due up to termination. This is Customer's sole remedy for an unresolved Subprocessor objection.",
          "The Subprocessor List identifies material third parties that process Customer Personal Data for Layer. It need not disclose source code, internal architecture, security configurations, ordinary business software that does not process Customer Personal Data, or a connected service with which Customer chooses to interact directly.",
        ],
      },
    ],
  },
  {
    id: "return-and-deletion",
    number: 9,
    title: "Return and Deletion",
    paragraphs: [
      "During the term, Customer may use available Service controls to access, export, or delete supported Customer Content. Customer may export Customer Content using available Service controls for 30 days after termination.",
      "Layer will delete Customer Personal Data within 90 days after termination, except where:",
    ],
    bullets: [
      "applicable law requires retention;",
      "Customer Personal Data is contained in backups that are protected from ordinary use and deleted through Layer's normal secure backup lifecycle; or",
      "limited data must be retained to establish, exercise, or defend legal claims, maintain security, or evidence billing or compliance, in each case only for as long as reasonably necessary and subject to continued protection.",
    ],
    subsections: [
      {
        id: "retained-data",
        title: "",
        paragraphs: [
          "Layer will cease other processing of retained Customer Personal Data and will delete it when the relevant exception ends.",
        ],
      },
    ],
  },
  {
    id: "audits-and-compliance-information",
    number: 10,
    title: "Audits and Compliance Information",
    paragraphs: [
      "Layer will make available information reasonably necessary to demonstrate compliance with this DPA. Where available, Layer may satisfy an audit request by providing relevant independent reports, certifications, summaries, questionnaires, or other diligence materials under confidentiality restrictions.",
      "If that information is insufficient for a requirement imposed by Applicable Data Protection Law, Customer may request an audit no more than once in any 12-month period, or following a material Information Security Incident where legally justified. The parties will agree a reasonable scope, timing, duration, confidentiality arrangement, and method designed to avoid disruption and protect other customers and Layer's security and intellectual property.",
      "Customer will bear its audit costs and reimburse Layer's reasonable costs for material assistance outside the standard diligence process. An auditor must be independent, suitably qualified, not a Layer competitor, and bound by confidentiality.",
      "Nothing requires Layer to disclose another customer's data, privileged information, penetration-test details, source code, credentials, threat-detection logic, or information whose disclosure would create a material security risk. Layer will provide a reasonable alternative form of evidence where possible.",
    ],
  },
  {
    id: "artificial-intelligence",
    number: 11,
    title: "Artificial Intelligence",
    paragraphs: [
      "Layer will not use Customer Personal Data to train or fine-tune a general-purpose or foundation AI model, whether owned by Layer or a third party, unless Customer expressly instructs or authorises that use in writing.",
      "Layer will contractually prohibit an AI Subprocessor from using Customer Personal Data for its own model training or fine-tuning except where Customer has expressly authorised that use in writing.",
      "This section does not prohibit:",
    ],
    bullets: [
      "processing Customer Personal Data to provide model inference and generate requested outputs;",
      "retrieval, configuration, memory, or personalisation performed for Customer within the Service;",
      "processing necessary for security, abuse prevention, reliability, or support; or",
      "use of data that has been de-identified so that it can no longer reasonably identify Customer or a Data Subject, where permitted by law.",
    ],
    subsections: [
      {
        id: "automated-decision-making",
        title: "",
        paragraphs: [
          "If Customer configures the Service for automated decision-making that is intended to produce legal or similarly significant effects, Customer must notify Layer before that use. The parties will reasonably cooperate to document the processing and implement safeguards required by Applicable Data Protection Law.",
        ],
      },
    ],
  },
  {
    id: "government-requests",
    number: 12,
    title: "Government Requests",
    paragraphs: [
      "Unless prohibited by law, Layer will notify Customer of a legally binding request from a public authority for Customer Personal Data. Layer will review the request for legal validity, disclose only the data legally required, and use reasonable efforts to redirect the authority to Customer where appropriate.",
    ],
  },
  {
    id: "international-transfers",
    number: 13,
    title: "International Transfers",
    paragraphs: [
      "Layer will ensure that Restricted Transfers use a valid transfer mechanism and any supplementary measures reasonably required by Applicable Data Protection Law.",
      "For a transfer subject to the EU GDPR where the receiving country is not covered by an adequacy decision, the EU SCCs are incorporated into this DPA as follows:",
    ],
    bullets: [
      "Module Two applies where Customer is a Controller and Layer is a Processor;",
      "Module Three applies where Customer is a Processor and Layer is a Subprocessor;",
      "Clause 7, the optional docking clause, applies;",
      "Clause 9 uses Option 2, general written authorisation, with the notice period in section 8;",
      "the optional language in Clause 11 does not apply;",
      "for Module Two, the optional language in Clause 9(a) does not apply;",
      "Clause 17 uses the law of Ireland; and",
      "Clause 18 selects the courts of Ireland.",
    ],
    subsections: [
      {
        id: "transfer-terms",
        title: "",
        paragraphs: [
          "Annexes I and II to the EU SCCs are populated using Annexes 1 and 2 of this DPA and the parties' details in the Agreement. The competent Supervisory Authority is determined under Clause 13 of the EU SCCs.",
          "For a Restricted Transfer subject to the UK GDPR, the EU SCCs as completed above are modified by the UK Addendum, which is incorporated by reference. Tables 1 to 3 are completed using the parties' details, Annexes 1 and 2, and the selections above. In Table 4, either party may end the UK Addendum as permitted by section 19 of its mandatory clauses.",
          "For a transfer subject to Swiss data protection law, the EU SCCs apply with references to the EU and EU GDPR interpreted to include Switzerland and the Swiss Federal Act on Data Protection as required, and the competent authority is the Swiss Federal Data Protection and Information Commissioner.",
          "If an approved transfer mechanism is replaced or amended, Layer may update this section on written notice to maintain lawful transfers, provided the update does not materially reduce protection of Customer Personal Data.",
        ],
      },
    ],
  },
  {
    id: "us-state-privacy-laws",
    number: 14,
    title: "US State Privacy Laws",
    paragraphs: [
      "To the extent US State Privacy Laws apply and Layer acts as a Processor, Service Provider, or Contractor, Layer will:",
    ],
    bullets: [
      "process Customer Personal Data only for the limited and specified purposes in the Agreement and Customer's documented instructions;",
      "not sell Customer Personal Data or share it for cross-context behavioural advertising;",
      "not retain, use, or disclose Customer Personal Data outside the direct business relationship or combine it with personal data from another source except as permitted by applicable law and reasonably necessary to provide the Service;",
      "provide the same level of privacy protection required of a Processor, Service Provider, or Contractor under applicable law;",
      "notify Customer if Layer determines it can no longer meet an applicable obligation; and",
      "allow Customer to take reasonable and appropriate steps to stop and remediate unauthorised processing.",
    ],
  },
  {
    id: "customer-responsibilities",
    number: 15,
    title: "Customer Responsibilities",
    paragraphs: ["Customer will:"],
    bullets: [
      "comply with Applicable Data Protection Law and process Customer Personal Data lawfully;",
      "provide required notices and obtain required permissions or consents;",
      "ensure its instructions are lawful and that it is entitled to provide Customer Personal Data to Layer;",
      "use the Service's roles, permissions, and controls appropriately; and",
      "avoid intentionally submitting restricted or highly sensitive data unless the Agreement and Service expressly support that processing.",
    ],
  },
  {
    id: "liability-and-conflict",
    number: 16,
    title: "Liability and Conflict",
    paragraphs: [
      "Each party's liability under this DPA is subject to the exclusions and limitations in the Agreement, except to the extent Applicable Data Protection Law or the EU SCCs prohibit that limitation.",
      "If this DPA conflicts with the Agreement on processing Customer Personal Data, this DPA controls. If the EU SCCs or UK Addendum conflict with this DPA, the applicable transfer terms control.",
    ],
  },
  {
    id: "changes",
    number: 17,
    title: "Changes",
    paragraphs: [
      "Layer may update this DPA where reasonably necessary to comply with law or maintain valid transfer mechanisms, provided the update does not materially reduce protection of Customer Personal Data. Material changes will be notified in accordance with the Agreement.",
    ],
  },
  {
    id: "annex-1-processing-details",
    number: "A1",
    title: "Annex 1 — Processing Details",
    subsections: [
      {
        id: "parties",
        title: "Parties",
        paragraphs: [
          "**Processor / data importer:** Layer AI Systems Ltd, company number 15632925, 1 Dukes Passage, Brighton, East Sussex BN1 1BS, United Kingdom. Contact: hello@withlayer.ai.",
          "**Customer / data exporter:** The Customer identified in the Agreement. Customer's contact details are stated in the Agreement, Order, or account.",
        ],
      },
      {
        id: "subject-matter-and-purpose",
        title: "Subject Matter and Purpose",
        paragraphs: [
          "Processing Customer Personal Data to provide, secure, support, and maintain the AI-assisted revenue-team features selected and configured by Customer, including relevant assistant, roleplay, voice, meeting, coaching, analysis, integration, workflow, and administration features.",
        ],
      },
      {
        id: "duration",
        title: "Duration",
        paragraphs: [
          "The term of the Agreement plus the return, deletion, backup, and legally required retention periods described in this DPA.",
        ],
      },
      {
        id: "nature-of-processing",
        title: "Nature of Processing",
        paragraphs: [
          "Collection, access, transmission, recording, organisation, storage, retrieval, consultation, analysis, transformation, generation, alignment, combination, restriction, return, and deletion, as initiated or configured by Customer and reasonably necessary to provide the Service.",
        ],
      },
      {
        id: "categories-of-data-subjects",
        title: "Categories of Data Subjects",
        paragraphs: [
          "Customer and prospect personnel; Users and administrators; people participating in communications, calls, meetings, or customer workflows; customer, supplier, partner, and business contacts; and other people whose Personal Data Customer submits or makes available through the Service.",
        ],
      },
      {
        id: "categories-of-customer-personal-data",
        title: "Categories of Customer Personal Data",
        paragraphs: [
          "Business identity and contact data; account and role data; communications and content; call, meeting, audio, transcript, and interaction data; CRM, calendar, email, document, and connected-service data; prompts and instructions; sales, coaching, performance, and workflow data; generated summaries, scores, recommendations, drafts, and other derived outputs; device, usage, and diagnostic data; and other Personal Data submitted by Customer.",
        ],
      },
      {
        id: "sensitive-data",
        title: "Sensitive Data",
        paragraphs: [
          "The Service is not intended to require sensitive or special-category data. Such data may appear incidentally in unstructured Customer Content. Customer must not intentionally submit regulated credentials, full payment-card data, government identifiers, health records subject to sector-specific law, children's data, or other restricted data unless the parties have expressly agreed that the Service supports it.",
        ],
      },
      {
        id: "frequency",
        title: "Frequency",
        paragraphs: ["Continuous or as initiated by Customer during its use of the Service."],
      },
      {
        id: "subprocessors-and-transfers",
        title: "Subprocessors and Transfers",
        paragraphs: [
          "As described in Layer's current Subprocessor List, available on request under confidentiality, and section 13 of this DPA.",
        ],
      },
    ],
  },
  {
    id: "annex-2-security-measures",
    number: "A2",
    title: "Annex 2 — Security Measures",
    paragraphs: [
      "Layer's security programme includes measures appropriate to the Service and risk in the following areas:",
    ],
    bullets: [
      "information-security ownership, policies, and risk management;",
      "personnel confidentiality, security awareness, and access lifecycle;",
      "logical access control, least privilege, and authentication safeguards;",
      "tenant and data-access separation;",
      "encryption in transit and at rest where appropriate;",
      "secure software development, change management, and review;",
      "vulnerability, dependency, patch, and threat management;",
      "event logging, monitoring, alerting, and investigation;",
      "incident response and breach-management procedures;",
      "backup, resilience, recovery, and continuity measures;",
      "supplier assessment and contractual data-protection controls;",
      "secure disposal and deletion processes; and",
      "periodic testing and review of relevant controls.",
    ],
    subsections: [
      {
        id: "further-security-information",
        title: "",
        paragraphs: [
          "Layer may provide further security information through an appropriate diligence process subject to confidentiality and security restrictions.",
        ],
      },
    ],
  },
  {
    id: "acceptance",
    number: "✓",
    title: "Acceptance",
    paragraphs: [
      "This DPA is accepted when the parties enter into an Agreement that incorporates it. If a separate signature is required, authorised representatives may sign an Order or separate copy that references this DPA.",
    ],
  },
];
