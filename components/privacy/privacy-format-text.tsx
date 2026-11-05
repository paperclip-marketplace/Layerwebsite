import { Fragment } from "react";

import type { LegalBulletFormat } from "@/components/legal/types";

function FormattedRichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*|\[[^\]]+\]\([^)]+\)|"[^"]*")/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={`${index}-${part}`}>{part.slice(2, -2)}</strong>;
        }

        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return (
            <a key={`${index}-${part}`} href={link[2]}>
              {link[1]}
            </a>
          );
        }

        if (part.startsWith('"') && part.endsWith('"')) {
          return <strong key={`${index}-${part}`}>{part}</strong>;
        }

        return <Fragment key={`${index}-${part}`}>{part}</Fragment>;
      })}
    </>
  );
}

export function FormattedPrivacyParagraph({ text }: { text: string }) {
  return <FormattedRichText text={text} />;
}

export function FormattedPrivacyBullet({
  text,
  format = "colon-space",
}: {
  text: string;
  format?: LegalBulletFormat;
}) {
  if (format === "plain") {
    return <FormattedRichText text={text} />;
  }

  if (format === "label-space-paren") {
    const match = text.match(/^(.+?) \(([^)]+)\): (.*)$/);

    if (match) {
      return (
        <>
          <strong>{`${match[1]} `}</strong>({match[2]}): {match[3]}
        </>
      );
    }
  }

  const colonIndex = text.indexOf(": ");

  if (colonIndex === -1) {
    return <FormattedRichText text={text} />;
  }

  if (format === "colon-space") {
    return (
      <>
        <strong>{text.slice(0, colonIndex + 2)}</strong>
        {text.slice(colonIndex + 2)}
      </>
    );
  }

  return (
    <>
      <strong>{text.slice(0, colonIndex + 1)}</strong>
      {text.slice(colonIndex + 1)}
    </>
  );
}
