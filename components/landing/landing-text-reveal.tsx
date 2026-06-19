"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "motion/react";
import {
  useLayoutEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import styles from "./landing-text-reveal.module.css";

gsap.registerPlugin(ScrollTrigger);

type HeadingTag = "h1" | "h2" | "h3";

type HeadingRevealProps = Omit<ComponentPropsWithoutRef<"h2">, "children"> & {
  children: ReactNode;
  as?: HeadingTag;
};

function isBlockLineElement(node: HTMLElement): boolean {
  const display = getComputedStyle(node).display;
  return display === "block" || display === "flex" || display === "grid";
}

function extractLineElements(container: HTMLElement): HTMLElement[] {
  const stack = container.querySelector('[class*="headlineStack"]');
  if (stack && stack.children.length > 1) {
    return Array.from(stack.children) as HTMLElement[];
  }

  const children = Array.from(container.children) as HTMLElement[];
  const blockChildren = children.filter(isBlockLineElement);

  if (blockChildren.length > 1) {
    return blockChildren;
  }

  if (children.length === 1) {
    const child = children[0];
    const nestedLines = Array.from(child.children).filter(
      (node) => node instanceof HTMLElement && isBlockLineElement(node),
    ) as HTMLElement[];

    if (nestedLines.length > 1) {
      return nestedLines;
    }
  }

  return [container];
}

function wrapWordsInElement(root: HTMLElement): HTMLElement[] {
  const wordInners: HTMLElement[] = [];

  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? "";
      if (!text) return;

      const parts = text.split(/(\s+)/);
      const fragment = document.createDocumentFragment();

      for (const part of parts) {
        if (!part) continue;

        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
          continue;
        }

        const mask = document.createElement("span");
        mask.className = styles.splitWord;
        const inner = document.createElement("span");
        inner.className = styles.splitWordInner;
        inner.textContent = part;
        mask.appendChild(inner);
        fragment.appendChild(mask);
        wordInners.push(inner);
      }

      node.parentNode?.replaceChild(fragment, node);
      return;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(walk);
    }
  };

  Array.from(root.childNodes).forEach(walk);
  return wordInners;
}

function wrapLineForSlide(lineEl: HTMLElement): HTMLElement {
  const mask = document.createElement("span");
  mask.className = styles.splitLineMask;
  const inner = document.createElement("span");
  inner.className = styles.splitLineInner;

  while (lineEl.firstChild) {
    inner.appendChild(lineEl.firstChild);
  }

  mask.appendChild(inner);
  lineEl.appendChild(mask);
  return inner;
}

function setupSplitTextReveal(container: HTMLElement) {
  const lineElements = extractLineElements(container);
  const multiLine = lineElements.length > 1;

  if (multiLine) {
    lineElements.forEach((lineEl) => lineEl.classList.add(styles.splitTextLine));
  }

  const firstLineWords = wrapWordsInElement(lineElements[0]);
  const lineSlides = lineElements.slice(1).map(wrapLineForSlide);

  return { firstLineWords, lineSlides };
}

/** GSAP scroll reveal — first line words, then following lines slide up from below. */
export function LandingHeadingReveal({
  children,
  className,
  id,
  as: Tag = "h2",
  ...rest
}: HeadingRevealProps) {
  const reduceMotion = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const originalHtmlRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    const el = headingRef.current;
    if (!el || reduceMotion) return;

    if (originalHtmlRef.current === null) {
      originalHtmlRef.current = el.innerHTML;
    } else {
      el.innerHTML = originalHtmlRef.current;
    }

    const { firstLineWords, lineSlides } = setupSplitTextReveal(el);

    gsap.set(firstLineWords, { yPercent: 110 });
    gsap.set(lineSlides, { yPercent: 100 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    timeline.to(firstLineWords, {
      yPercent: 0,
      duration: 0.65,
      stagger: 0.055,
      ease: "power4.out",
    });

    lineSlides.forEach((lineInner, index) => {
      timeline.to(
        lineInner,
        {
          yPercent: 0,
          duration: 0.75,
          ease: "power3.out",
        },
        index === 0 ? "-=0.2" : "<0.12",
      );
    });

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [children, reduceMotion]);

  if (reduceMotion) {
    return (
      <Tag id={id} className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag id={id} ref={headingRef} className={className} {...rest}>
      {children}
    </Tag>
  );
}

type SubheadingRevealProps = ComponentPropsWithoutRef<"p"> & {
  /** Stagger after heading (seconds). */
  delay?: number;
};

/** Subheading: fade in only — no vertical shift, layout unchanged. */
export function LandingSubheadingReveal({
  children,
  className,
  delay = 0.15,
  id,
  ...rest
}: SubheadingRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <p id={id} className={className} {...rest}>
        {children}
      </p>
    );
  }

  return (
    <motion.p
      id={id}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.p>
  );
}
