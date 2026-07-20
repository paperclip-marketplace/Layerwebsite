import Image, { type ImageProps } from "next/image";

type LandingOptimizedImageProps = Omit<ImageProps, "alt"> & {
  alt?: string;
};

/**
 * Local marketing assets via Next/Vercel Image Optimization (AVIF/WebP at the edge).
 * Prefer `fill` inside a positioned parent; otherwise pass width/height.
 */
export function LandingOptimizedImage({
  alt = "",
  sizes = "(max-width: 900px) 100vw, 1200px",
  quality = 80,
  ...props
}: LandingOptimizedImageProps) {
  return <Image alt={alt} sizes={sizes} quality={quality} {...props} />;
}

/** Prefetch assets through the `/_next/image` optimizer. */
export function prefetchOptimizedImages(
  srcs: string[],
  width = 1200,
  quality = 75,
) {
  if (typeof window === "undefined") return;
  for (const src of srcs) {
    const url = `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
    if (document.head.querySelector(`link[href="${url}"]`)) continue;
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  }
}
