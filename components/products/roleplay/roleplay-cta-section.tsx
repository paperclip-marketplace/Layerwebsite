import Link from "next/link";
import { ROUTES } from "@/lib/config/constants";
import { ROLEPLAY_ASSETS } from "./roleplay-assets";
import styles from "./roleplay-cta-section.module.css";

export function RoleplayCtaSection() {
  return (
    <section
      className={styles.section}
      aria-label="Get started with Layer Roleplay"
      data-node-id="1089:6196"
    >
      <div className={styles.cardsRow} data-node-id="1089:6234">
        <article
          className={`${styles.card} ${styles.cardCreate}`}
          data-node-id="1089:6197"
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
          <div className={styles.imageArea}>
            <img
              src={ROLEPLAY_ASSETS.ctaCreate}
              alt="Layer workflow builder for creating your first agent"
              className={styles.imageCreate}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className={styles.cardCtaWrap}>
            <Link href={ROUTES.signUp} className={styles.cardCta}>
              Get Started
            </Link>
          </div>
        </article>

        <article
          className={`${styles.card} ${styles.cardDemo}`}
          data-node-id="1089:6204"
        >
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <Link href={ROUTES.comingSoon} className={styles.cardTitleLink}>
                Watch Demo
              </Link>
            </h2>
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
          <div className={styles.imageArea}>
            <img
              src={ROLEPLAY_ASSETS.ctaDemo}
              alt="Layer product demo with video and copilot interface"
              className={styles.imageDemo}
              loading="lazy"
              decoding="async"
            />
          </div>
        </article>
      </div>

      <div className={styles.footerCopy} data-node-id="1089:6235">
        <p data-node-id="1089:6236">
          Layer agents are trained on your playbooks and customer context,
          connected to your existing tools, deployed where your team already
          works, helping them source, prepare, perform live, and follow up.
        </p>
      </div>
    </section>
  );
}
