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
  /** Last card end position: `end` = trailing edgePadding; `mirror` = same inset as leading (startInset) */
  endAlign?: "mirror" | "end";
  /**
   * Pin copy + cards together, but wait until `[data-pin-align]` (or the pin
   * node) is vertically centered before scrubbing horizontally.
   */
  compactPin?: boolean;
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
  endAlign = "end",
  compactPin = false,
}: UsePinnedHorizontalScrollOptions) {
  const [translateX, setTranslateX] = useState(0);
  const [spacerHeight, setSpacerHeight] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
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
    track.style.paddingRight = `${endAlign === "mirror" ? startInset : edgePadding}px`;
    track.style.transform = "translate3d(0, 0, 0)";

    const viewportWidth = window.innerWidth;
    const lastCardLeft = lastCard.getBoundingClientRect().left;
    const lastCardWidth = lastCard.getBoundingClientRect().width;

    // Progress 0: first card at startInset. Progress 1: last card with matching trailing gutter.
    const trailingInset = endAlign === "mirror" ? startInset : edgePadding;
    const lastCardLeftAtEnd =
      viewportWidth - trailingInset - lastCardWidth;
    const maxShift = Math.max(0, lastCardLeft - lastCardLeftAtEnd);

    maxShiftRef.current = maxShift;

    if (compactPin) {
      // Content-sized wrapper; GSAP pinSpacing adds the horizontal-scroll room
      // so the next section doesn't jump up on unpin.
      setSpacerHeight(null);
    } else {
      setSpacerHeight(window.innerHeight + maxShift);
    }
    setReady(true);
    ScrollTrigger.refresh();
  }, [
    cardCount,
    cardSelector,
    compactPin,
    edgePaddingOption,
    endAlign,
    enabled,
    trackRef,
  ]);

  useLayoutEffect(() => {
    if (!enabled) {
      setSpacerHeight(null);
      setReady(false);
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
  }, [cardSelector, enabled, measure, trackRef]);

  useEffect(() => {
    if (!enabled || !ready) {
      return;
    }

    // Non-compact needs the tall spacer applied before creating the trigger.
    if (!compactPin && spacerHeight == null) {
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

    const onUpdate = (self: ScrollTrigger) => {
      setTranslateX(-self.progress * maxShiftRef.current);
    };

    const compactStart = () => {
      // Pin once the cards sit on the viewport center; copy can stay above.
      const alignEl =
        pinEl.querySelector<HTMLElement>("[data-pin-align]") ?? pinEl;
      const pinTop = pinEl.getBoundingClientRect().top;
      const alignRect = alignEl.getBoundingClientRect();
      const alignCenterFromPinTop =
        alignRect.top - pinTop + alignRect.height / 2;
      const centerY = headerH + (window.innerHeight - headerH) / 2;
      return `top top+=${centerY - alignCenterFromPinTop}`;
    };

    // Compact: trigger === pin target + pinSpacing so unpin is normal scroll
    // into the next section (no collapse / jump).
    const trigger = compactPin
      ? ScrollTrigger.create({
          trigger: pinEl,
          start: compactStart,
          end: () => `+=${maxShiftRef.current}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate,
        })
      : ScrollTrigger.create({
          trigger: spacer,
          start: `top top+=${headerH}`,
          end: () =>
            `+=${Math.max(0, spacer.offsetHeight - window.innerHeight)}`,
          pin: pinEl,
          pinSpacing: false,
          invalidateOnRefresh: true,
          onUpdate,
        });

    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
    };
  }, [compactPin, enabled, ready, spacerHeight, spacerRef, trackRef]);

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
