import Image from "next/image";
import Link from "next/link";
import styles from "./coming-soon-section.module.css";

const BG_PATTERN = "/assets/images/landing/coming-soon/bg-pattern.png";
const APP_PREVIEW = "/assets/images/landing/coming-soon/app-preview.png";

export function ComingSoonSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="coming-soon-heading"
      data-node-id="1310:1735"
      data-name="bottom-cta"
    >
      <div className={styles.background} aria-hidden>
        <div className={styles.backgroundWhite} />
        <div className={styles.backgroundPattern}>
          <Image
            src={BG_PATTERN}
            alt=""
            fill
            className={styles.backgroundPatternImage}
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.previewStack} data-node-id="1310:1737" data-name="image">
          <div className={styles.previewCardBack} data-node-id="1310:1738" />
          <div className={styles.previewCardMid} data-node-id="1310:1739" />
          <div className={styles.previewCardFront} data-node-id="1310:1740">
            <Image
              src={APP_PREVIEW}
              alt="Layer application preview"
              fill
              className={styles.previewImage}
              sizes="(max-width: 768px) 90vw, 707px"
              priority
            />
          </div>
          <div className={styles.previewFade} data-node-id="1310:1756" />
        </div>

        <div className={styles.copyBlock} data-node-id="1310:1741">
          <div className={styles.copy} data-node-id="1310:1742">
            <h1 id="coming-soon-heading" className={styles.headline} data-node-id="1310:1743">
              We&apos;re <span className={styles.headlineAccent}>still cooking</span> this one up!
            </h1>
            <p className={styles.description} data-node-id="1310:1744">
              Our team is working hard to make this page live for you. Meanwhile you can play
              with our interactive demo.
            </p>
          </div>

          <div className={styles.demoButtonShell} data-node-id="1310:1758" data-name="button">
            <Link href="#" className={styles.demoButton}>
              <Image
                src="/assets/images/landing/coming-soon/terminal-icon.svg"
                alt=""
                width={24}
                height={24}
                className={styles.demoIcon}
                aria-hidden
              />
              <span className={styles.demoLabel}>Interactive Demo</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
