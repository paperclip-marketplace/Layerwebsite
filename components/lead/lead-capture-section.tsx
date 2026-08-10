"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type RefObject,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  LandingHeadingReveal,
  LandingSubheadingReveal,
} from "@/components/landing/landing-text-reveal";
import { SuccessCheckIcon } from "@/components/contact/success-check-icon";
import { ROUTES } from "@/lib/config/constants";
import { LEAD_ASSETS } from "./lead-assets";
import {
  LEAD_FORM_INITIAL_STATE,
  LEAD_IMPROVEMENT_OPTIONS,
  LEAD_ROLE_OPTIONS,
  LEAD_ROLE_PLACEHOLDER,
  LEAD_TEAM_SIZE_OPTIONS,
  LEAD_TEAM_SIZE_PLACEHOLDER,
  type LeadFormState,
  type LeadImprovementOption,
} from "./lead-form-shared";
import { LeadFormSelect } from "./lead-form-select";
import styles from "./lead-capture-section.module.css";

gsap.registerPlugin(ScrollTrigger);

/** Mobile-only: clip hero grid/glow to the top edge of the Your Role field. */
function useMobileBackdropCrop(sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mq = window.matchMedia("(max-width: 768px)");

    const update = () => {
      if (!mq.matches) {
        section.style.removeProperty("--lead-mobile-bg-crop-y");
        return;
      }

      const anchor = section.querySelector<HTMLElement>(
        "[data-lead-mobile-bg-anchor]",
      );
      if (!anchor) {
        section.style.removeProperty("--lead-mobile-bg-crop-y");
        return;
      }

      const cropY = Math.max(
        0,
        anchor.getBoundingClientRect().top -
          section.getBoundingClientRect().top,
      );
      section.style.setProperty("--lead-mobile-bg-crop-y", `${cropY}px`);
    };

    const scheduleUpdate = () => {
      update();
      window.requestAnimationFrame(update);
    };

    scheduleUpdate();

    const ro = new ResizeObserver(scheduleUpdate);
    ro.observe(section);

    const observeAnchor = () => {
      const anchor = section.querySelector<HTMLElement>(
        "[data-lead-mobile-bg-anchor]",
      );
      if (anchor) ro.observe(anchor);
    };
    observeAnchor();

    mq.addEventListener("change", scheduleUpdate);
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("load", scheduleUpdate);
    void document.fonts?.ready.then(scheduleUpdate);

    return () => {
      ro.disconnect();
      mq.removeEventListener("change", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("load", scheduleUpdate);
    };
  }, [sectionRef]);
}

function LeadFormCard() {
  const [form, setForm] = useState<LeadFormState>(LEAD_FORM_INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    const id = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(id);
  }, [submitted]);

  const updateField =
    (field: "workEmail") => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const toggleImprovement = (option: LeadImprovementOption) => {
    setForm((prev) => {
      const selected = prev.improvements.includes(option);
      return {
        ...prev,
        improvements: selected
          ? prev.improvements.filter((item) => item !== option)
          : [...prev.improvements, option],
      };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (form.improvements.length === 0) {
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.successCard} role="status" aria-live="polite">
        <div className={styles.successBody}>
          <div className={styles.successIcon}>
            <SuccessCheckIcon className={styles.successIconImg} />
          </div>
          <div className={styles.successCopy}>
            <p className={styles.successTitle}>
              Thank
              <span className={styles.successTitleHighlight}> You!</span>
            </p>
            <p className={styles.successMessage}>
              Our team will get back to you within 24–48 hours depending on
              availability.
            </p>
          </div>
        </div>
        <div className={styles.successCta}>
          <p className={styles.successCtaText}>
            Want to get started now?{" "}
            <Link href={ROUTES.signUp} className={styles.successCtaLink}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      id="lead-capture-form"
      className={styles.formCard}
      onSubmit={handleSubmit}
    >
      <div className={styles.formHeader}>
        <p className={styles.formTitle}>
          See what <span className={styles.highlight}>Layer</span> can do!
        </p>
        <p className={styles.formSubtitle}>
          Tell us about your team and we&apos;ll show you where Layer can make
          the biggest impact.
        </p>
      </div>

      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.label}>Work Email*</span>
          <input
            className={styles.input}
            type="email"
            name="workEmail"
            required
            autoComplete="email"
            placeholder="jhon@acme.com"
            value={form.workEmail}
            onChange={updateField("workEmail")}
          />
        </label>

        <div className={styles.fieldRow}>
          <label className={styles.field}>
            <span className={styles.label}>Your Role*</span>
            <LeadFormSelect
              name="role"
              value={form.role}
              placeholder={LEAD_ROLE_PLACEHOLDER}
              options={LEAD_ROLE_OPTIONS}
              required
              fluid
              mobileBgAnchor
              onChange={(role) =>
                setForm((prev) => ({
                  ...prev,
                  role: role as LeadFormState["role"],
                }))
              }
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Team Size*</span>
            <LeadFormSelect
              name="teamSize"
              value={form.teamSize}
              placeholder={LEAD_TEAM_SIZE_PLACEHOLDER}
              options={LEAD_TEAM_SIZE_OPTIONS}
              required
              fluid
              onChange={(teamSize) =>
                setForm((prev) => ({
                  ...prev,
                  teamSize: teamSize as LeadFormState["teamSize"],
                }))
              }
            />
          </label>
        </div>

        <fieldset className={styles.checkboxFieldset}>
          <legend className={styles.label}>
            What&apos;re you looking to improve?*
          </legend>
          <div className={styles.checkboxGrid}>
            {LEAD_IMPROVEMENT_OPTIONS.map((option) => {
              const checked = form.improvements.includes(option);
              const inputId = `lead-improvement-${option.replace(/\s+/g, "-").toLowerCase()}`;

              return (
                <label
                  key={option}
                  className={styles.checkboxOption}
                  htmlFor={inputId}
                >
                  <input
                    id={inputId}
                    className={styles.checkboxInput}
                    type="checkbox"
                    name="improvements"
                    value={option}
                    checked={checked}
                    onChange={() => toggleImprovement(option)}
                  />
                  <span
                    className={`${styles.checkboxBox} ${checked ? styles.checkboxBoxChecked : ""}`}
                    aria-hidden
                  >
                    {checked ? (
                      <span
                        className={`material-symbols-rounded ${styles.checkboxMark}`}
                      >
                        check
                      </span>
                    ) : null}
                  </span>
                  <span className={styles.checkboxLabel}>{option}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <button
        type="submit"
        className={styles.submit}
        data-node-id="1835:19135"
      >
        <span className={styles.submitLabel}>Get a Personalized Walkthrough</span>
        <span
          className={`material-symbols-rounded ${styles.submitIcon}`}
          aria-hidden
        >
          arrow_forward
        </span>
      </button>
    </form>
  );
}

/** Figma 1822:22350 — Lead capture hero (copy + testimonial + form). */
export function LeadCaptureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useMobileBackdropCrop(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="lead-capture"
      className={styles.section}
      aria-labelledby="lead-capture-heading"
      data-node-id="1822:22350"
      data-name="Section Container"
    >
      <div className={styles.backdrop} aria-hidden data-node-id="1822:22351">
        <div className={styles.backdropWhite} />
        <div className={styles.backdropGlowClip}>
          <div className={styles.bottomEllipse}>
            <div className={styles.bottomEllipsePulse}>
              <div className={styles.bottomEllipseFlow}>
                <img
                  src={LEAD_ASSETS.bottomGlow}
                  alt=""
                  className={styles.bottomEllipseSvg}
                />
                <img
                  src={LEAD_ASSETS.bottomGlow}
                  alt=""
                  className={styles.bottomEllipseSvg}
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.backdropGrid} data-node-id="1822:22354">
          <div className={styles.backdropGridV} />
          <div className={styles.backdropGridH} />
        </div>
        <div className={styles.backdropFade} aria-hidden data-node-id="1835:19185" />
      </div>
      <div className={styles.backdropMobileCap} aria-hidden />

      <div className={styles.content}>
        <p className={styles.badge} data-node-id="1822:22387">
          AI Operating System For GTM Teams
        </p>

        <div className={styles.row} data-node-id="1822:22388">
          <div className={styles.leftColumn} data-node-id="1822:22389">
            <div className={styles.copyBlock} data-node-id="1822:22390">
              <LandingHeadingReveal
                as="h1"
                id="lead-capture-heading"
                className={styles.headline}
                data-node-id="1822:22391"
              >
                <span className={styles.headlineStack}>
                  <span className={styles.headlineLine}>Turn your GTM</span>
                  <span className={styles.headlineLine}>
                    knowledge into agents{" "}
                  </span>
                  <span className={styles.headlineLine}>
                    that{" "}
                    <span className={styles.highlight}>drive results.</span>
                  </span>
                </span>
              </LandingHeadingReveal>
              <LandingSubheadingReveal
                className={styles.description}
                data-node-id="1822:22392"
              >
                Layer gives every GTM team member an AI agent with your context,
                playbooks, and tools so they can perform at their best.
              </LandingSubheadingReveal>
            </div>

            <blockquote
              className={styles.testimonialCard}
              data-node-id="1822:22393"
            >
              <LandingHeadingReveal
                as="p"
                className={styles.testimonialQuote}
                data-node-id="1822:22394"
                delay={0.75}
              >
                &ldquo;It&apos;s a no f**cking brainer!&rdquo;
              </LandingHeadingReveal>
              <div className={styles.testimonialMeta} data-node-id="1822:22395">
                <div
                  className={styles.testimonialPerson}
                  data-node-id="1822:22396"
                >
                  <div
                    className={styles.testimonialAvatarWrap}
                    data-node-id="1822:22397"
                  >
                    <Image
                      src={LEAD_ASSETS.testimonialAvatar}
                      alt="Alex Lyma-Young"
                      fill
                      sizes="56px"
                      className={styles.testimonialAvatar}
                    />
                  </div>
                  <div
                    className={styles.testimonialIdentity}
                    data-node-id="1822:22398"
                  >
                    <p
                      className={styles.testimonialName}
                      data-node-id="1822:22399"
                    >
                      Alex Lyma-Young
                    </p>
                    <p
                      className={styles.testimonialRole}
                      data-node-id="1822:22400"
                    >
                      VP of Sales at RiskLedger
                    </p>
                  </div>
                </div>
                <div
                  className={styles.testimonialLogoWrap}
                  data-node-id="1822:22401"
                >
                  <Image
                    src={LEAD_ASSETS.riskLedgerLogo}
                    alt="Risk Ledger"
                    width={136}
                    height={24}
                    className={styles.testimonialLogo}
                  />
                </div>
              </div>
            </blockquote>
          </div>

          <LeadFormCard />
        </div>
      </div>
    </section>
  );
}
