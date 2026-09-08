"use client";

import Link from "next/link";
import Script from "next/script";
import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  LandingHeadingReveal,
  LandingSubheadingReveal,
} from "@/components/landing/landing-text-reveal";
import { ROUTES } from "@/lib/config/constants";
import type {
  ContactLeadErrors,
  ContactLeadField,
} from "@/lib/contact/lead";
import {
  renderRecaptchaOnce,
  type RecaptchaClient,
  type RecaptchaRenderState,
} from "@/lib/contact/recaptcha";
import { CONTACT_ASSETS } from "./contact-assets";
import { SuccessCheckIcon } from "./success-check-icon";
import styles from "./contact-us.module.css";

gsap.registerPlugin(ScrollTrigger);

type SubmitState = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    grecaptcha?: RecaptchaClient;
  }
}

type ContactFormState = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  jobTitle: string;
  phone: string;
  message: string;
};

const INITIAL_STATE: ContactFormState = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  jobTitle: "",
  phone: "",
  message: "",
};

const FIELD_IDS: Record<ContactLeadField, string> = {
  firstName: "contact-first-name",
  lastName: "contact-last-name",
  email: "contact-email",
  company: "contact-company",
  jobTitle: "contact-job-title",
  phone: "contact-phone",
  message: "contact-message",
};

function FieldError({ id, error }: { id: string; error?: string }) {
  return error ? (
    <span id={id} className={styles.fieldError}>
      {error}
    </span>
  ) : null;
}

/** Form + success card — state lives here so typing does not re-render the headline. */
function ContactFormCard({ recaptchaSiteKey }: { recaptchaSiteKey: string }) {
  const [form, setForm] = useState<ContactFormState>(INITIAL_STATE);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<ContactLeadErrors>({});
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const captchaContainerRef = useRef<HTMLDivElement>(null);
  const captchaRenderStateRef = useRef<RecaptchaRenderState>({
    status: "idle",
    widgetId: null,
  });
  const captchaTimestampRef = useRef(Date.now());
  const submitted = submitState === "success";

  const renderCaptcha = useCallback(() => {
    renderRecaptchaOnce(
      window.grecaptcha,
      captchaContainerRef.current,
      recaptchaSiteKey,
      captchaRenderStateRef.current,
    );
  }, [recaptchaSiteKey]);

  useEffect(() => {
    const updateCaptchaTimestamp = () => {
      const response = formRef.current?.querySelector<HTMLTextAreaElement>(
        '[name="g-recaptcha-response"]',
      );
      if (!response?.value.trim()) captchaTimestampRef.current = Date.now();
    };
    const interval = window.setInterval(updateCaptchaTimestamp, 500);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!submitted) return;
    const id = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(id);
  }, [submitted]);

  const updateField =
    (field: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setSubmitState("submitting");
    setErrors({});
    setSubmitError("");

    const nativeForm = event.currentTarget;
    const values = Object.fromEntries(new FormData(nativeForm));
    const recaptchaToken = nativeForm
      .querySelector<HTMLTextAreaElement>('[name="g-recaptcha-response"]')
      ?.value.trim();

    if (!recaptchaToken) {
      setSubmitError("Please confirm that you are not a robot.");
      setSubmitState("error");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          recaptchaToken,
          captchaTimestamp: captchaTimestampRef.current,
        }),
      });
      const result = (await response.json()) as {
        ok: boolean;
        errors?: ContactLeadErrors;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setSubmitError(
          result.message ?? "We could not send your message. Please try again.",
        );
        window.grecaptcha?.reset(
          captchaRenderStateRef.current.widgetId ?? undefined,
        );
        setSubmitState("error");
        return;
      }

      setForm(INITIAL_STATE);
      setSubmitState("success");
    } catch {
      setSubmitError("We could not send your message. Please try again.");
      window.grecaptcha?.reset(
        captchaRenderStateRef.current.widgetId ?? undefined,
      );
      setSubmitState("error");
    }
  };

  if (submitted) {
    return (
      <div
        className={styles.successCard}
        data-node-id="1634:9657"
        data-name="Success"
        role="status"
        aria-live="polite"
      >
        <div className={styles.successBody} data-node-id="1634:9786">
          <div
            className={styles.successIcon}
            data-node-id="1634:9787"
            data-name="https://lottiefiles.com/animations/check-M8DjnL5QnE"
          >
            <SuccessCheckIcon className={styles.successIconImg} />
          </div>
          <div className={styles.successCopy} data-node-id="1634:9762">
            <p className={styles.successTitle} data-node-id="1634:9763">
              Thank
              <span className={styles.successTitleHighlight}> You!</span>
            </p>
            <p className={styles.successMessage} data-node-id="1634:9764">
              Our team will get back to you with in 24-48 hours
              <br />
              depending on the availibility.
            </p>
          </div>
        </div>
        <div className={styles.successCta} data-node-id="1634:9789">
          <p className={styles.successCtaText} data-node-id="1634:9788">
            Want to get started now?{"  "}
            <Link href={ROUTES.signUp} className={styles.successCtaLink}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {recaptchaSiteKey ? (
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={renderCaptcha}
        />
      ) : null}
      <form
        ref={formRef}
        className={styles.formCard}
        data-node-id="1634:8784"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className={styles.fields} data-node-id="1634:8785">
          <div className={styles.fieldRow} data-node-id="1634:8786">
            <label className={styles.field} htmlFor={FIELD_IDS.firstName} data-node-id="1634:8787">
              <span className={styles.label} data-node-id="1634:8790">
                First Name*
              </span>
              <input
                id={FIELD_IDS.firstName}
                className={styles.input}
                type="text"
                name="firstName"
                autoComplete="given-name"
                placeholder="Jhon"
                value={form.firstName}
                onChange={updateField("firstName")}
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby={
                  errors.firstName ? `${FIELD_IDS.firstName}-error` : undefined
                }
                data-node-id="1634:8791"
              />
              <FieldError
                id={`${FIELD_IDS.firstName}-error`}
                error={errors.firstName}
              />
            </label>

            <label className={styles.field} htmlFor={FIELD_IDS.lastName} data-node-id="1634:8797">
              <span className={styles.label} data-node-id="1634:8800">
                Last Name*
              </span>
              <input
                id={FIELD_IDS.lastName}
                className={styles.input}
                type="text"
                name="lastName"
                autoComplete="family-name"
                placeholder="Doe"
                value={form.lastName}
                onChange={updateField("lastName")}
                aria-invalid={Boolean(errors.lastName)}
                aria-describedby={
                  errors.lastName ? `${FIELD_IDS.lastName}-error` : undefined
                }
                data-node-id="1634:8801"
              />
              <FieldError
                id={`${FIELD_IDS.lastName}-error`}
                error={errors.lastName}
              />
            </label>
          </div>

          <div className={styles.fieldRow} data-node-id="1634:9703">
            <label className={styles.field} htmlFor={FIELD_IDS.company} data-node-id="1634:9704">
              <span className={styles.label} data-node-id="1634:9707">
                Company Name*
              </span>
              <input
                id={FIELD_IDS.company}
                className={styles.input}
                type="text"
                name="company"
                autoComplete="organization"
                placeholder="Acme Corp"
                value={form.company}
                onChange={updateField("company")}
                aria-invalid={Boolean(errors.company)}
                aria-describedby={
                  errors.company ? `${FIELD_IDS.company}-error` : undefined
                }
                data-node-id="1634:9708"
              />
              <FieldError
                id={`${FIELD_IDS.company}-error`}
                error={errors.company}
              />
            </label>

            <label className={styles.field} htmlFor={FIELD_IDS.email} data-node-id="1634:9714">
              <span className={styles.label} data-node-id="1634:9717">
                Work Email*
              </span>
              <input
                id={FIELD_IDS.email}
                className={styles.input}
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder="jhon@acme.com"
                value={form.email}
                onChange={updateField("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? `${FIELD_IDS.email}-error` : undefined
                }
                data-node-id="1634:9718"
              />
              <FieldError id={`${FIELD_IDS.email}-error`} error={errors.email} />
            </label>
          </div>

          <div className={styles.fieldRow}>
            <label className={styles.field} htmlFor={FIELD_IDS.jobTitle}>
              <span className={styles.label}>Job Title</span>
              <input
                id={FIELD_IDS.jobTitle}
                className={styles.input}
                type="text"
                name="jobTitle"
                autoComplete="organization-title"
                placeholder="Head of Revenue"
                value={form.jobTitle}
                onChange={updateField("jobTitle")}
              />
            </label>

            <label className={styles.field} htmlFor={FIELD_IDS.phone}>
              <span className={styles.label}>Phone</span>
              <input
                id={FIELD_IDS.phone}
                className={styles.input}
                type="tel"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+1 555 000 0000"
                value={form.phone}
                onChange={updateField("phone")}
              />
            </label>
          </div>

          <label className={styles.field} htmlFor={FIELD_IDS.message} data-node-id="1634:8817">
            <span className={styles.label} data-node-id="1634:8820">
              How can we help you?*
            </span>
            <textarea
              id={FIELD_IDS.message}
              className={styles.textarea}
              name="message"
              placeholder="Enter your message..."
              value={form.message}
              onChange={updateField("message")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? `${FIELD_IDS.message}-error` : undefined
              }
              data-node-id="1634:8821"
            />
            <FieldError
              id={`${FIELD_IDS.message}-error`}
              error={errors.message}
            />
          </label>
        </div>

        <label className={styles.honeypot} aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        {recaptchaSiteKey ? (
          <div className={styles.recaptcha}>
            <div ref={captchaContainerRef} />
          </div>
        ) : (
          <p className={styles.submitError} role="alert">
            This form is temporarily unavailable. Please email{" "}
            <a href="mailto:hello@withlayer.ai">hello@withlayer.ai</a>.
          </p>
        )}

        {submitError ? (
          <p className={styles.submitError} role="alert">
            {submitError}
          </p>
        ) : null}

        <button
          type="submit"
          className={styles.submit}
          data-node-id="1634:8827"
          data-name="button"
          disabled={submitState === "submitting" || !recaptchaSiteKey}
        >
          <span>
            {submitState === "submitting" ? "Sending…" : "Send Message"}
          </span>
          <span
            className={`material-symbols-rounded ${styles.submitIcon}`}
            aria-hidden
          >
            arrow_forward
          </span>
        </button>
      </form>
    </>
  );
}

/** Figma 1634:8775 — Contact Us section (copy + form / success card). */
export function ContactUs({ recaptchaSiteKey }: { recaptchaSiteKey: string }) {
  return (
    <section
      className={styles.section}
      aria-labelledby="contact-us-heading"
      data-node-id="1634:8775"
      data-name="Section Container"
    >
      <div
        className={styles.backdrop}
        aria-hidden
        data-node-id="1634:8734"
        data-name="bg"
      >
        <div className={styles.backdropWhite} />
        {/*
          PitchBots glow — under the grid. Edit colors in new-frame.svg
        */}
        <div className={styles.bottomEllipse}>
          <div className={styles.bottomEllipsePulse}>
            <div className={styles.bottomEllipseFlow}>
              <img
                src={CONTACT_ASSETS.bottomGlow}
                alt=""
                className={styles.bottomEllipseSvg}
              />
              <img
                src={CONTACT_ASSETS.bottomGlow}
                alt=""
                className={styles.bottomEllipseSvg}
                aria-hidden
              />
            </div>
          </div>
        </div>
        <div className={styles.backdropGrid} data-node-id="1634:8737">
          <div className={styles.backdropGridV} />
          <div className={styles.backdropGridH} />
        </div>
        <div className={styles.backdropFade} data-node-id="1634:8768" />
      </div>

      <div className={styles.content}>
        <p className={styles.badge} data-node-id="1634:8776">
          Contact Us
        </p>

        <div className={styles.row} data-node-id="1634:8779">
          <div
            className={styles.copy}
            data-node-id="1634:8780"
            data-name="Section Description Container"
          >
            <div className={styles.copyInner} data-node-id="1634:8781">
              <LandingHeadingReveal
                as="h1"
                id="contact-us-heading"
                className={styles.headline}
                data-node-id="1634:8782"
              >
                <span className={styles.headlineStack}>
                  <span className={styles.headlineLine}>Get in —</span>
                  <span
                    className={`${styles.headlineLine} ${styles.highlight}`}
                  >
                    touch with us
                  </span>
                </span>
              </LandingHeadingReveal>
              <LandingSubheadingReveal
                className={styles.description}
                data-node-id="1634:8783"
              >
                Tell us about your team, your goals, and the challenges
                you&apos;re solving. We&apos;ll show you how Layer can help your
                revenue organization perform at its best.
              </LandingSubheadingReveal>
            </div>
          </div>

          <ContactFormCard recaptchaSiteKey={recaptchaSiteKey} />
        </div>
      </div>
    </section>
  );
}
