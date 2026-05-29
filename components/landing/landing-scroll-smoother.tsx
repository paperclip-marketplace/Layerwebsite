"use client";

import { useLayoutEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./landing-scroll-smoother.module.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type LandingScrollSmootherProps = {
  children: ReactNode;
};

/** GSAP ScrollSmoother — desktop only; native scroll on mobile/tablet for horizontal carousels */
export function LandingScrollSmoother({ children }: LandingScrollSmootherProps) {
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1201px)");

    let smoother: ScrollSmoother | null = null;

    const refresh = () => ScrollTrigger.refresh();

    const destroy = () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      document.documentElement.classList.remove("landing-smooth-scroll");
      smoother?.kill();
      smoother = null;
    };

    const setup = () => {
      destroy();

      if (!desktop.matches || reducedMotion.matches) {
        return;
      }

      document.documentElement.classList.add("landing-smooth-scroll");

      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        smoothTouch: 0.1,
        effects: false,
        normalizeScroll: true,
      });

      refresh();
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);
    };

    setup();
    desktop.addEventListener("change", setup);
    reducedMotion.addEventListener("change", setup);

    return () => {
      desktop.removeEventListener("change", setup);
      reducedMotion.removeEventListener("change", setup);
      destroy();
    };
  }, []);

  return (
    <div id="smooth-wrapper" className={styles.wrapper}>
      <div id="smooth-content" className={styles.content}>
        {children}
      </div>
    </div>
  );
}
