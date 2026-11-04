import { Fragment } from "react";

import styles from "./legal-content.module.css";

/**
 * Inline formatting for legal copy:
 *   "Quoted terms"     -> bold (defined terms)
 *   [label](/path)     -> link. Internal paths stay in the tab; http(s) opens a new one.
 */
const INLINE_TOKEN = /(\[[^\]]+\]\([^)\s]+\)|".*?")/g;
const LINK = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

function FormattedInlineText({ text }: { text: string }) {
  const parts = text.split(INLINE_TOKEN);

  return (
    <>
      {parts.map((part, index) => {
        const link = LINK.exec(part);
        if (link) {
          const [, label, href] = link;
          const external = /^https?:\/\//.test(href);
          return (
            <a
              key={index}
              href={href}
              className={styles.link}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {label}
            </a>
          );
        }
        return (
          <Fragment key={index}>
            {part.startsWith('"') && part.endsWith('"') ? (
              <strong>{part}</strong>
            ) : (
              part
            )}
          </Fragment>
        );
      })}
    </>
  );
}

export function FormattedLegalParagraph({ text }: { text: string }) {
  return <FormattedInlineText text={text} />;
}

export function FormattedLegalBullet({ text }: { text: string }) {
  const colonIndex = text.indexOf(": ");

  if (colonIndex === -1) {
    return <FormattedInlineText text={text} />;
  }

  return (
    <>
      <strong>{text.slice(0, colonIndex + 1)}</strong>
      <FormattedInlineText text={text.slice(colonIndex + 1)} />
    </>
  );
}
