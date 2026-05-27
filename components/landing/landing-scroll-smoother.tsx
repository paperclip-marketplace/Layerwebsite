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

/** GSAP ScrollSmoother — https://gsap.com/docs/v3/Plugins/ScrollSmoother/ */
export function LandingScrollSmoother({ children }: LandingScrollSmootherProps) {
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || ScrollSmoother.get()) {
      return;
    }

    document.documentElement.classList.add("landing-smooth-scroll");

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      smoothTouch: 0.1,
      effects: false,
      normalizeScroll: true,
    });

    const refresh = () => ScrollTrigger.refresh();
    refresh();

    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      document.documentElement.classList.remove("landing-smooth-scroll");
      smoother.kill();
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
