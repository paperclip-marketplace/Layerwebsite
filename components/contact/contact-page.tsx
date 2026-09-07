"use client";

import Link from "next/link";
import Script from "next/script";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

import { LandingPageShell } from "@/components/landing/landing-page-shell";
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

import styles from "./contact-page.module.css";

type SubmitState = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    grecaptcha?: RecaptchaClient;
  }
}

const FIELD_IDS: Record<ContactLeadField, string> = {
  firstName: "contact-first-name",
  lastName: "contact-last-name",
  email: "contact-email",
  company: "contact-company",
  jobTitle: "contact-job-title",
  phone: "contact-phone",
  message: "contact-message",
};

function FieldError({ error }: { error?: string }) {
  return error ? <span className={styles.fieldError}>{error}</span> : null;
}

export function ContactPage({ recaptchaSiteKey }: { recaptchaSiteKey: string }) {
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");
    setErrors({});
    setSubmitError("");

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const recaptchaToken = form
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

      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitError("We could not send your message. Please try again.");
      window.grecaptcha?.reset(
        captchaRenderStateRef.current.widgetId ?? undefined,
      );
      setSubmitState("error");
    }
  };

  return (
    <LandingPageShell pageClassName={styles.page}>
      {recaptchaSiteKey ? (
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={renderCaptcha}
        />
      ) : null}
      <main className={styles.main} id="main">
        <section className={styles.intro} aria-labelledby="contact-heading">
          <p className={styles.eyebrow}>CONTACT SALES</p>
          <h1 className={styles.heading} id="contact-heading">
            Let&apos;s move the metric that matters most.
          </h1>
          <p className={styles.description}>
            Tell us where your revenue team needs more leverage. A Layer GTM
            architect will get back to you to explore the right starting point.
          </p>
          <div className={styles.promiseList} aria-label="What to expect">
            <p>
              <span aria-hidden>01</span>
              A practical conversation about your current workflow
            </p>
            <p>
              <span aria-hidden>02</span>
              A focused recommendation, not a generic demo
            </p>
            <p>
              <span aria-hidden>03</span>
              Clear next steps for your team
            </p>
          </div>
        </section>

        <section className={styles.formCard} aria-label="Contact Layer sales">
          {submitState === "success" ? (
            <div className={styles.success} role="status">
              <span className="material-symbols-rounded" aria-hidden>
                check_circle
              </span>
              <h2>Thanks — we&apos;ll be in touch.</h2>
              <p>
                Your note is with the Layer team. We&apos;ll follow up at the email
                address you provided.
              </p>
              <Link href={ROUTES.home}>Back to Layer</Link>
            </div>
          ) : (
            <form
              ref={formRef}
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className={styles.formHeading}>
                <h2>Talk to Layer</h2>
                <p>Required fields are marked with an asterisk.</p>
              </div>

              <div className={styles.twoColumn}>
                <label className={styles.field} htmlFor={FIELD_IDS.firstName}>
                  <span>First name *</span>
                  <input
                    id={FIELD_IDS.firstName}
                    name="firstName"
                    autoComplete="given-name"
                    aria-invalid={Boolean(errors.firstName)}
                    aria-describedby={errors.firstName ? `${FIELD_IDS.firstName}-error` : undefined}
                  />
                  <span id={`${FIELD_IDS.firstName}-error`}>
                    <FieldError error={errors.firstName} />
                  </span>
                </label>

                <label className={styles.field} htmlFor={FIELD_IDS.lastName}>
                  <span>Last name *</span>
                  <input
                    id={FIELD_IDS.lastName}
                    name="lastName"
                    autoComplete="family-name"
                    aria-invalid={Boolean(errors.lastName)}
                    aria-describedby={errors.lastName ? `${FIELD_IDS.lastName}-error` : undefined}
                  />
                  <span id={`${FIELD_IDS.lastName}-error`}>
                    <FieldError error={errors.lastName} />
                  </span>
                </label>
              </div>

              <label className={styles.field} htmlFor={FIELD_IDS.email}>
                <span>Work email *</span>
                <input
                  id={FIELD_IDS.email}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${FIELD_IDS.email}-error` : undefined}
                />
                <span id={`${FIELD_IDS.email}-error`}>
                  <FieldError error={errors.email} />
                </span>
              </label>

              <label className={styles.field} htmlFor={FIELD_IDS.company}>
                <span>Company *</span>
                <input
                  id={FIELD_IDS.company}
                  name="company"
                  autoComplete="organization"
                  aria-invalid={Boolean(errors.company)}
                  aria-describedby={errors.company ? `${FIELD_IDS.company}-error` : undefined}
                />
                <span id={`${FIELD_IDS.company}-error`}>
                  <FieldError error={errors.company} />
                </span>
              </label>

              <div className={styles.twoColumn}>
                <label className={styles.field} htmlFor={FIELD_IDS.jobTitle}>
                  <span>Job title</span>
                  <input
                    id={FIELD_IDS.jobTitle}
                    name="jobTitle"
                    autoComplete="organization-title"
                  />
                </label>

                <label className={styles.field} htmlFor={FIELD_IDS.phone}>
                  <span>Phone</span>
                  <input
                    id={FIELD_IDS.phone}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </label>
              </div>

              <label className={styles.field} htmlFor={FIELD_IDS.message}>
                <span>What would you like to improve?</span>
                <textarea
                  id={FIELD_IDS.message}
                  name="message"
                  rows={5}
                  placeholder="For example: ramp time, meeting preparation, win rates or coaching consistency"
                />
              </label>

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
                className={styles.submitButton}
                disabled={submitState === "submitting" || !recaptchaSiteKey}
              >
                <span>
                  {submitState === "submitting"
                    ? "Sending…"
                    : "Talk to a GTM architect"}
                </span>
                <span className="material-symbols-rounded" aria-hidden>
                  arrow_forward
                </span>
              </button>

              <p className={styles.privacyNote}>
                By submitting this form, you agree that Layer may contact you
                about your enquiry. See our <Link href={ROUTES.privacy}>Privacy Policy</Link>.
              </p>
            </form>
          )}
        </section>
      </main>
    </LandingPageShell>
  );
}
