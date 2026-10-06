const BASE = "/assets/images/inflexion";

/** Figma 2507:20664 — Inflexion wordmark, 148×28. */
const PIECES: { src: string; inset: string; masked?: boolean }[] = [
  { src: `${BASE}/v1.svg`, inset: "17.15% 97.58% 7.15% 0" },
  { src: `${BASE}/v2.svg`, inset: "16.42% 81.96% 6.99% 5.88%" },
  { src: `${BASE}/v3.svg`, inset: "16.42% 50.47% 5.88% 36.47%" },
  { src: `${BASE}/v4.svg`, inset: "16.42% 14.98% 5.88% 70.33%" },
  { src: `${BASE}/v5.svg`, inset: "16.43% 0.51% 7.15% 87.36%" },
  { src: `${BASE}/v6.svg`, inset: "17.13% 32.02% 7.15% 65.56%" },
  { src: `${BASE}/v7.svg`, inset: "-25.74% 65.85% 6.99% 31.74%" },
  { src: `${BASE}/v8.svg`, inset: "16.68% 36.61% 7.83% 49.87%" },
  { src: `${BASE}/mask-group.svg`, inset: "-71.43% 19.35% -24.81% 48.86%", masked: true },
  { src: `${BASE}/v9.svg`, inset: "-26.21% 71.05% 6.86% 20.33%" },
];

export function InflexionWordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      {PIECES.map((piece) => (
        <span
          key={piece.src}
          style={{
            position: "absolute",
            inset: piece.inset,
            ...(piece.masked
              ? {
                  maskImage: `url("${BASE}/mask.svg")`,
                  WebkitMaskImage: `url("${BASE}/mask.svg")`,
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskSize: "100% 100%",
                  WebkitMaskSize: "100% 100%",
                }
              : null),
          }}
        >
          <img
            src={piece.src}
            alt=""
            style={{ display: "block", width: "100%", height: "100%" }}
          />
        </span>
      ))}
    </span>
  );
}
