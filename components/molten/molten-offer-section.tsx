import { LandingHeadingReveal } from "@/components/landing/landing-text-reveal";
import { LandingOptimizedImage } from "@/components/landing/landing-optimized-image";
import { MOLTEN_OFFER_CARDS } from "./molten-offer-data";
import styles from "./molten-offer-section.module.css";

/** Figma 2395:32937 — Leadership Progress / Molten offer metrics. */
export function MoltenOfferSection() {
  return (
    <section
      className={`${styles.section} landing-band-left molten-offer-section`}
      aria-labelledby="molten-offer-heading"
      data-node-id="2395:32937"
      data-name="Leadership Progress"
    >
      <div
        className={`${styles.metricsHeader} molten-offer-copy`}
        data-node-id="2395:32938"
        data-name="Leadership Metrics"
      >
        <p className={styles.eyebrow} data-node-id="2395:32939">
          the molten offer
        </p>
        <LandingHeadingReveal
          as="h2"
          id="molten-offer-heading"
          className={styles.headline}
          data-node-id="2395:32940"
        >
          <span className={styles.headlineLine}>Molten portfolio companies</span>
          <span className={styles.headlineLine}>
            get <span className={styles.highlight}>6 months on us.</span>
          </span>
        </LandingHeadingReveal>
      </div>

      <div
        className={styles.cardsShell}
        data-node-id="2395:32941"
        data-name="What We Do Container"
      >
        <div className={styles.cardRow} data-node-id="2395:32942">
          {MOLTEN_OFFER_CARDS.map((card) => (
            <article
              key={card.id}
              className={styles.card}
              data-node-id={card.dataNodeId}
              data-name={card.dataName}
            >
              <div className={styles.imageArea} data-name={card.imageDataName}>
                <LandingOptimizedImage
                  src={card.image}
                  alt={card.imageAlt}
                  className={styles.image}
                  width={325}
                  height={200}
                  sizes="(max-width: 768px) 80vw, 25vw"
                />
                <div className={styles.imageFade} aria-hidden />
              </div>
              <div className={styles.textBlock}>
                <p className={styles.cardTitle}>{card.title}</p>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
