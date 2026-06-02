import { Fragment } from "react";

function FormattedInlineText({ text }: { text: string }) {
  const parts = text.split(/(".*?")/g);

  return (
    <>
      {parts.map((part) => (
        <Fragment key={part}>
          {part.startsWith('"') && part.endsWith('"') ? (
            <strong>{part}</strong>
          ) : (
            part
          )}
        </Fragment>
      ))}
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
      {text.slice(colonIndex + 1)}
    </>
  );
}
