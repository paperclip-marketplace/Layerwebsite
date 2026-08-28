"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import styles from "./landing-operator-section.module.css";

const TEXTURE_BASE = "/assets/images/landing/operator/textures";

/** Figma 2135:20484 — layer-texture variants, left to right */
const TEXTURES = [
  { id: "cloud", src: `${TEXTURE_BASE}/cloud.webp` },
  { id: "grass", src: `${TEXTURE_BASE}/grass.webp` },
  { id: "flower", src: `${TEXTURE_BASE}/flower.webp` },
  { id: "water", src: `${TEXTURE_BASE}/water.webp` },
  { id: "moss", src: `${TEXTURE_BASE}/moss.webp` },
  { id: "glass", src: `${TEXTURE_BASE}/glass.webp` },
] as const;

const HOLD_MS = 1600;

export function LandingOperatorTexture() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const inViewRef = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    for (const texture of TEXTURES) {
      const img = new Image();
      img.src = texture.src;
    }
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      if (!inViewRef.current) return;
      setActive((i) => (i + 1) % TEXTURES.length);
    }, HOLD_MS);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div
      ref={rootRef}
      className={styles.texture}
      data-name="layer-texture"
      data-node-id="2135:20484"
      aria-hidden
    >
      {TEXTURES.map((texture, index) => (
        <div
          key={texture.id}
          className={styles.textureFrame}
          data-active={index === active ? "true" : "false"}
        >
          {/* Native img keeps WebP alpha; next/image flattened these to JPEG. */}
          <img
            src={texture.src}
            alt=""
            className={styles.textureImage}
            width={696}
            height={464}
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}
