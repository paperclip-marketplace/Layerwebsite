"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState, type ChangeEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  LandingHeadingReveal,
  LandingSubheadingReveal,
} from "@/components/landing/landing-text-reveal";
import { ROUTES } from "@/lib/config/constants";
import { CONTACT_ASSETS } from "./contact-assets";
import { SuccessCheckIcon } from "./success-check-icon";
import styles from "./contact-us.module.css";

gsap.registerPlugin(ScrollTrigger);

type ContactFormState = {
  firstName: string;
  lastName: string;
  companyName: string;
  workEmail: string;
  message: string;
};

const INITIAL_STATE: ContactFormState = {
  firstName: "",
  lastName: "",
  companyName: "",
  workEmail: "",
  message: "",
};

/** Form + success card — state lives here so typing does not re-render the headline. */
function ContactFormCard() {
  const [form, setForm] = useState<ContactFormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    // Layout swaps form → success; refresh smoother/triggers so the card isn’t clipped.
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setSubmitted(true);
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
    <form
      className={styles.formCard}
      data-node-id="1634:8784"
      onSubmit={handleSubmit}
    >
      <div className={styles.fields} data-node-id="1634:8785">
        <div className={styles.fieldRow} data-node-id="1634:8786">
          <label className={styles.field} data-node-id="1634:8787">
            <span className={styles.label} data-node-id="1634:8790">
              First Name*
            </span>
            <input
              className={styles.input}
              type="text"
              name="firstName"
              required
              autoComplete="given-name"
              placeholder="Jhon"
              value={form.firstName}
              onChange={updateField("firstName")}
              data-node-id="1634:8791"
            />
          </label>

          <label className={styles.field} data-node-id="1634:8797">
            <span className={styles.label} data-node-id="1634:8800">
              Last Name*
            </span>
            <input
              className={styles.input}
              type="text"
              name="lastName"
              required
              autoComplete="family-name"
              placeholder="Doe"
              value={form.lastName}
              onChange={updateField("lastName")}
              data-node-id="1634:8801"
            />
          </label>
        </div>

        <div className={styles.fieldRow} data-node-id="1634:9703">
          <label className={styles.field} data-node-id="1634:9704">
            <span className={styles.label} data-node-id="1634:9707">
              Company Name*
            </span>
            <input
              className={styles.input}
              type="text"
              name="companyName"
              required
              autoComplete="organization"
              placeholder="Acme Corp"
              value={form.companyName}
              onChange={updateField("companyName")}
              data-node-id="1634:9708"
            />
          </label>

          <label className={styles.field} data-node-id="1634:9714">
            <span className={styles.label} data-node-id="1634:9717">
              Work Email*
            </span>
            <input
              className={styles.input}
              type="email"
              name="workEmail"
              required
              autoComplete="email"
              placeholder="jhon@acme.com"
              value={form.workEmail}
              onChange={updateField("workEmail")}
              data-node-id="1634:9718"
            />
          </label>
        </div>

        <label className={styles.field} data-node-id="1634:8817">
          <span className={styles.label} data-node-id="1634:8820">
            How can we help you?*
          </span>
          <textarea
            className={styles.textarea}
            name="message"
            required
            placeholder="Enter your message..."
            value={form.message}
            onChange={updateField("message")}
            data-node-id="1634:8821"
          />
        </label>
      </div>

      <button
        type="submit"
        className={styles.submit}
        data-node-id="1634:8827"
        data-name="button"
      >
        <span>Send Message</span>
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

/** Figma 1634:8775 — Contact Us section (copy + form / success card). */
export function ContactUs() {
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

          <ContactFormCard />
        </div>
      </div>
    </section>
  );
}
