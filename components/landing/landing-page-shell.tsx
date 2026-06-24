import type { ReactNode } from "react";
import { USE_TEMPORARY_LANDING_FOOTER } from "@/lib/config/constants";
import { LandingFooter } from "./landing-footer";
import { LandingFooterTemporary } from "./landing-footer-temporary";
import { LandingHeader } from "./landing-header";
import { LandingMobileTitleSection } from "./landing-mobile-title-section";
import { LandingScrollSmoother } from "./landing-scroll-smoother";

type LandingPageShellProps = {
  children: ReactNode;
  pageClassName: string;
  showMobileTitle?: boolean;
  footer?: boolean;
};

/** Shared landing chrome: fixed header + GSAP smooth scroll + optional mobile title/footer. */
export function LandingPageShell({
  children,
  pageClassName,
  showMobileTitle = false,
  footer = true,
}: LandingPageShellProps) {
  return (
    <div className={`${pageClassName} landing-main`}>
      <LandingHeader />
      <LandingScrollSmoother>
        {showMobileTitle ? <LandingMobileTitleSection /> : null}
        {children}
        {footer ? (
          USE_TEMPORARY_LANDING_FOOTER ? (
            <LandingFooterTemporary />
          ) : (
            <LandingFooter />
          )
        ) : null}
      </LandingScrollSmoother>
    </div>
  );
}
