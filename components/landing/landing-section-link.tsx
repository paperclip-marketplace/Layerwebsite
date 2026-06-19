"use client";

import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import {
  useCallback,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

gsap.registerPlugin(ScrollSmoother);

type LandingSectionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function readHeaderOffset() {
  const fromVar = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--landing-header-h"),
  );
  return Number.isFinite(fromVar) && fromVar > 0 ? fromVar : 64;
}

/** In-page anchor that smooth-scrolls within LandingScrollSmoother when active. */
export function LandingSectionLink({
  href,
  onClick,
  children,
  ...rest
}: LandingSectionLinkProps) {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (!href.startsWith("#") || href.length < 2) return;

      event.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (!target) return;

      const headerOffset = readHeaderOffset();
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const smoother = ScrollSmoother.get();

      if (smoother) {
        smoother.scrollTo(target, !reducedMotion, `top top+=${headerOffset}`);
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({
          top,
          behavior: reducedMotion ? "auto" : "smooth",
        });
      }

      window.history.pushState(null, "", href);
    },
    [href, onClick],
  );

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
