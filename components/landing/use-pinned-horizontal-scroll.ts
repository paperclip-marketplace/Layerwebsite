"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type UsePinnedHorizontalScrollOptions = {
  cardCount: number;
  enabled: boolean;
  spacerRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLElement | null>;
  cardSelector?: string;
  /** Horizontal inset for first/last card; reads --split-pin-x-pad from section when omitted */
  edgePadding?: number;
};

function readEdgePadding(
  track: HTMLElement,
  edgePadding: number | undefined,
): number {
  if (edgePadding != null) {
    return edgePadding;
  }

  const section = track.closest("section");
  if (section) {
    const fromVar = Number.parseFloat(
      getComputedStyle(section).getPropertyValue("--split-pin-x-pad"),
    );
    if (Number.isFinite(fromVar) && fromVar > 0) {
      return fromVar;
    }
  }

  return 10;
}

export function usePinnedHorizontalScroll({
  cardCount,
  enabled,
  spacerRef,
  trackRef,
  cardSelector = "[data-pin-scroll-card]",
  edgePadding: edgePaddingOption,
}: UsePinnedHorizontalScrollOptions) {
  const [translateX, setTranslateX] = useState(0);
  const [spacerHeight, setSpacerHeight] = useState<number | null>(null);
  const maxShiftRef = useRef(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track || !enabled || cardCount < 1) {
      return;
    }

    const cards = [
      ...track.querySelectorAll<HTMLElement>(cardSelector),
    ];
    if (cards.length === 0) {
      return;
    }

    const lastCard = cards[cards.length - 1];
    const edgePadding = readEdgePadding(track, edgePaddingOption);
    const section = track.closest("section");
    const sectionLeft = section?.getBoundingClientRect().left ?? 0;
    const startInset = sectionLeft + edgePadding;

    track.style.paddingLeft = `${startInset}px`;
    track.style.paddingRight = `${edgePadding}px`;
    track.style.transform = "translate3d(0, 0, 0)";

    const viewportWidth = window.innerWidth;
    const lastCardLeft = lastCard.getBoundingClientRect().left;
    const lastCardWidth = lastCard.getBoundingClientRect().width;

    // Progress 0: first card at content-aligned inset. Progress 1: last card fully visible with trailing inset.
    const lastCardLeftAtEnd = viewportWidth - edgePadding - lastCardWidth;
    const maxShift = Math.max(0, lastCardLeft - lastCardLeftAtEnd);

    maxShiftRef.current = maxShift;
    setSpacerHeight(window.innerHeight + maxShift);
  }, [cardCount, cardSelector, edgePaddingOption, enabled, trackRef]);

  useLayoutEffect(() => {
    if (!enabled) {
      setSpacerHeight(null);
      setTranslateX(0);
      const track = trackRef.current;
      if (track) {
        track.style.paddingLeft = "";
        track.style.paddingRight = "";
        track.style.transform = "";
      }
      return;
    }

    measure();

    const track = trackRef.current;
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => measure())
        : null;

    if (track && resizeObserver) {
      resizeObserver.observe(track);
      track.querySelectorAll(cardSelector).forEach((card) => {
        resizeObserver.observe(card);
      });
    }

    window.addEventListener("resize", measure);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [enabled, measure, trackRef]);

  useEffect(() => {
    if (!enabled || spacerHeight == null) {
      return;
    }

    const spacer = spacerRef.current;
    const track = trackRef.current;
    if (!spacer || !track) {
      return;
    }

    const pinEl = spacer.querySelector<HTMLElement>("[data-pin-sticky]");
    if (!pinEl) {
      return;
    }

    const headerH =
      Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--landing-header-h",
        ),
      ) || 64;

    const trigger = ScrollTrigger.create({
      trigger: spacer,
      start: `top top+=${headerH}`,
      end: () =>
        `+=${Math.max(0, spacer.offsetHeight - window.innerHeight)}`,
      pin: pinEl,
      pinSpacing: false,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        setTranslateX(-self.progress * maxShiftRef.current);
      },
    });

    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
    };
  }, [enabled, spacerHeight, spacerRef, trackRef]);

  return { translateX, spacerHeight, remeasure: measure };
}

export function usePinnedHorizontalScrollEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1201px)");

    const update = () => {
      setEnabled(desktop.matches && !reducedMotion.matches);
    };

    update();
    desktop.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);

    return () => {
      desktop.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}
