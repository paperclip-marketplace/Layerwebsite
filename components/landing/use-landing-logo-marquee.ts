"use client";

import { useEffect, type RefObject } from "react";

export const MARQUEE_FAST_PLAYBACK_RATE = 2;
export const MARQUEE_SLOW_PLAYBACK_RATE = 1;

type UseLandingLogoMarqueeOptions = {
  viewportRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  cellsRef: RefObject<(HTMLDivElement | null)[]>;
  activeClassName: string;
};

export function useLandingLogoMarquee({
  viewportRef,
  trackRef,
  cellsRef,
  activeClassName,
}: UseLandingLogoMarqueeOptions) {
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1201px)");
    const tickerWrap =
      viewport.closest<HTMLElement>("[data-logo-marquee]") ?? viewport;

    let rafId = 0;
    let bindRafId = 0;
    let animation: Animation | null = null;
    let cancelled = false;
    let isTickerHovered = false;
    let hoveredIndex: number | null = null;

    const findCenterIndex = (centerX: number) => {
      let bestIndex = -1;
      let bestDistance = Infinity;

      cellsRef.current.forEach((cell, index) => {
        if (!cell || cell.dataset.forceMuted === "true") return;

        const rect = cell.getBoundingClientRect();
        const cellCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(cellCenterX - centerX);

        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      });

      return bestIndex;
    };

    const updateCells = () => {
      const viewportRect = viewport.getBoundingClientRect();
      const centerX = viewportRect.left + viewportRect.width / 2;

      let activeIndex: number | null = null;
      if (isTickerHovered) {
        activeIndex = hoveredIndex;
      } else {
        activeIndex = findCenterIndex(centerX);
      }

      for (const [index, cell] of cellsRef.current.entries()) {
        if (!cell) continue;

        const isForceMuted = cell.dataset.forceMuted === "true";
        const isActive = !isForceMuted && activeIndex === index;
        cell.classList.toggle(activeClassName, isActive);
      }

      rafId = requestAnimationFrame(updateCells);
    };

    const setPlaybackRate = (rate: number) => {
      if (animation) animation.playbackRate = rate;
    };

    const onTickerEnter = () => {
      isTickerHovered = true;
      if (desktop.matches) setPlaybackRate(MARQUEE_SLOW_PLAYBACK_RATE);
    };

    const onTickerLeave = () => {
      isTickerHovered = false;
      hoveredIndex = null;
      if (desktop.matches) setPlaybackRate(MARQUEE_FAST_PLAYBACK_RATE);
    };

    const cellCleanups: Array<() => void> = [];

    for (const [index, cell] of cellsRef.current.entries()) {
      if (!cell) continue;

      const onCellEnter = () => {
        hoveredIndex = index;
      };
      const onCellLeave = () => {
        if (hoveredIndex === index) hoveredIndex = null;
      };

      cell.addEventListener("mouseenter", onCellEnter);
      cell.addEventListener("mouseleave", onCellLeave);
      cellCleanups.push(() => {
        cell.removeEventListener("mouseenter", onCellEnter);
        cell.removeEventListener("mouseleave", onCellLeave);
      });
    }

    if (reducedMotion.matches) {
      for (const cell of cellsRef.current) {
        cell?.classList.add(activeClassName);
      }
      return () => {
        for (const cleanup of cellCleanups) cleanup();
      };
    }

    rafId = requestAnimationFrame(updateCells);
    tickerWrap.addEventListener("mouseenter", onTickerEnter);
    tickerWrap.addEventListener("mouseleave", onTickerLeave);

    const bindAnimation = () => {
      if (cancelled) return;

      animation = track.getAnimations()[0] ?? null;
      if (!animation) {
        bindRafId = requestAnimationFrame(bindAnimation);
        return;
      }

      animation.playbackRate = desktop.matches
        ? MARQUEE_FAST_PLAYBACK_RATE
        : 1;
    };

    bindAnimation();

    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        cancelAnimationFrame(rafId);
        for (const cell of cellsRef.current) {
          cell?.classList.add(activeClassName);
        }
      } else {
        rafId = requestAnimationFrame(updateCells);
      }
    };

    reducedMotion.addEventListener("change", onReducedMotionChange);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(bindRafId);
      tickerWrap.removeEventListener("mouseenter", onTickerEnter);
      tickerWrap.removeEventListener("mouseleave", onTickerLeave);
      reducedMotion.removeEventListener("change", onReducedMotionChange);
      for (const cleanup of cellCleanups) cleanup();
    };
  }, [activeClassName, cellsRef, trackRef, viewportRef]);
}
