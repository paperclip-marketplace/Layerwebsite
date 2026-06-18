"use client";

import { useEffect } from "react";

/** Scroll to #our-story after navigating to the home page with that hash. */
export function LandingHashScroll() {
  useEffect(() => {
    if (window.location.hash !== "#our-story") return;

    const scrollToHero = () => {
      document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" });
    };

    const timeoutId = window.setTimeout(scrollToHero, 150);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return null;
}
