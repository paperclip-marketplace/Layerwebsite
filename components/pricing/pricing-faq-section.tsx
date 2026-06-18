"use client";

import { useState } from "react";
import {
  LandingHeadingReveal,
} from "@/components/landing/landing-text-reveal";
import styles from "./pricing-faq-section.module.css";

type FaqItem = {
  id: string;
  question: string;
  answer?: string;
};

const FAQ_ITEMS: FaqItem[] = [
  { id: "agent-time", question: "What counts as agent time?" },
  { id: "one-agent", question: "Can I start with one agent?" },
  {
    id: "share-standards",
    question: "Can teams share standards and frameworks?",
  },
  {
    id: "custom-setup",
    question: "Do larger teams need custom setup?",
  },
  {
    id: "more-agent-time",
    question: "What happens if I use more agent time?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
  },
  { id: "cancel-plans", question: "Can I cancel or change plans?" },
];

const DEFAULT_OPEN_ID = "more-agent-time";

export function PricingFaqSection() {
  const [openId, setOpenId] = useState<string | null>(DEFAULT_OPEN_ID);

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      className={styles.section}
      aria-labelledby="pricing-faq-heading"
      data-node-id="336:1897"
    >
      <div className={styles.labelColumn} data-node-id="336:1898">
        <p className={styles.label}>Frequently Asked Questions</p>
      </div>

      <div className={styles.contentColumn} data-node-id="336:1900">
        <LandingHeadingReveal
          id="pricing-faq-heading"
          className={styles.headline}
        >
          <span className={styles.headlineLine}>
            Not AI-gen answers.
            <br />
          </span>
          <span className={styles.highlight}>Real ones</span>
          <span className={styles.headlineLine}> here.</span>
        </LandingHeadingReveal>

        <div className={styles.accordion} data-node-id="336:1903">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.itemTrigger}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.question}>{item.question}</span>
                  <span
                    className={`material-symbols-rounded ${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
                    aria-hidden
                  >
                    {isOpen ? "remove" : "add"}
                  </span>
                </button>
                {isOpen && item.answer ? (
                  <p className={styles.answer}>{item.answer}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
