import Link from "next/link";
import { ROUTES } from "@/lib/config/constants";
import styles from "./pricing-cta-cards-section.module.css";

const CTA_IMAGE_BASE = "/assets/images/landing/pricing-cta";

export function PricingCtaCardsSection() {
  return (
    <section
      className={styles.section}
      aria-label="Get started with Layer"
      data-node-id="336:1886"
    >
      <article
        className={`${styles.card} ${styles.cardCreate}`}
        data-node-id="336:1887"
      >
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            <Link href={ROUTES.signUp} className={styles.cardTitleLink}>
              Create your First Agent
            </Link>
          </h2>
          <p className={styles.cardSubtitle}>
            <span className={styles.subtitleMuted}>
              Built to improve the metrics
            </span>
            <span className={styles.subtitleEmphasis}> revenue leaders</span>
            <span className={styles.subtitleEmphasis}>already </span>
            <span className={styles.subtitleMuted}>care about</span>
          </p>
        </div>
        <div className={styles.imageArea} data-node-id="336:1891">
          <img
            src={`${CTA_IMAGE_BASE}/create-agent.png`}
            alt="Layer workflow builder for creating your first agent"
            className={styles.imageCreate}
            width={700}
            height={378}
            loading="lazy"
            decoding="async"
          />
        </div>
      </article>

      <article
        className={`${styles.card} ${styles.cardDemo}`}
        data-node-id="336:1892"
      >
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Watch Demo</h2>
          <p className={styles.cardSubtitle}>
            <span className={styles.subtitleMuted}>
              We have lived the problem.
            </span>
            <span className={styles.subtitleEmphasis}>
              {" "}
              We know the metrics.
            </span>
            <span className={styles.subtitleMuted}> We </span>
            <span className={styles.subtitleEmphasis}>
              understand the operating system
            </span>
            <span className={styles.subtitleMuted}> of a revenue team.</span>
          </p>
        </div>
        <div className={styles.imageArea} data-node-id="336:1896">
          <img
            src={`${CTA_IMAGE_BASE}/watch-demo.png`}
            alt="Layer product demo with video and copilot interface"
            className={styles.imageDemo}
            width={700}
            height={378}
            loading="lazy"
            decoding="async"
          />
        </div>
      </article>
    </section>
  );
}
