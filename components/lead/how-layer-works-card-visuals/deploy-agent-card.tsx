import Image from "next/image";
import { DEPLOY_CARD_ASSETS } from "./deploy-card-assets";
import styles from "./deploy-agent-card.module.css";

/** Figma 1822:24298 — Center elevated Maria card */
export function DeployCenterAgentCard() {
  return (
    <article className={`${styles.card} ${styles.cardCenter} ${styles.elevated}`}>
      <div className={styles.hero}>
        <div className={styles.heroBg} aria-hidden>
          <div className={styles.heroBurstClip}>
            <Image
              src={DEPLOY_CARD_ASSETS.heroCenter}
              alt=""
              width={512}
              height={1024}
              sizes="280px"
              className={styles.heroBurstImg}
            />
          </div>
          <div className={styles.heroPortraitClip}>
            <Image
              src={DEPLOY_CARD_ASSETS.portraitMaria}
              alt=""
              width={1200}
              height={1600}
              sizes="280px"
              className={styles.heroPortraitImg}
            />
          </div>
        </div>

        <div className={styles.heroWash}>
          <div className={styles.avatar}>
            <div className={styles.avatarInner} aria-hidden>
              <Image
                src={DEPLOY_CARD_ASSETS.portraitMaria}
                alt=""
                width={1200}
                height={1600}
                sizes="100px"
                className={styles.avatarPortrait}
              />
            </div>
          </div>
          <div className={styles.rings} aria-hidden>
            {/* SVG rings — keep as img */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DEPLOY_CARD_ASSETS.ringsCenter}
              alt=""
              className={styles.ringsImg}
            />
          </div>
        </div>

        <div className={styles.teamChip} data-name="status-chips">
          <span className="material-symbols-rounded" aria-hidden>
            group
          </span>
          <span className={styles.teamChipLabel}>Sales Team EU</span>
        </div>
      </div>

      <CardBody
        name="Maria"
        lastUsed="Just Now"
        assigneeName="Even Walser"
        assigneeSrc={DEPLOY_CARD_ASSETS.assigneeEven}
      />
    </article>
  );
}

/** Figma 1822:24244 — Left Maria / Jhon Smith card */
export function DeployLeftAgentCard() {
  return (
    <article className={`${styles.card} ${styles.cardLeft}`} data-node-id="1822:24244">
      <div className={styles.hero} data-node-id="1822:24245">
        <div className={styles.heroBg} aria-hidden>
          <Image
            src={DEPLOY_CARD_ASSETS.heroLeft}
            alt=""
            fill
            sizes="260px"
            className={styles.heroCover}
          />
          <Image
            src={DEPLOY_CARD_ASSETS.heroLeftAccent}
            alt=""
            fill
            sizes="260px"
            className={styles.heroCover}
          />
        </div>

        <div className={styles.heroWash} data-node-id="1822:24246">
          <div className={styles.avatar} data-node-id="1822:24247" data-name="image">
            <div className={styles.avatarInner} aria-hidden>
              <Image
                src={DEPLOY_CARD_ASSETS.portraitMariaLeft}
                alt=""
                width={1200}
                height={1600}
                sizes="80px"
                className={styles.avatarPortrait}
              />
              <Image
                src={DEPLOY_CARD_ASSETS.avatarLeftOverlay}
                alt=""
                fill
                sizes="80px"
                className={styles.avatarOverlay}
              />
              <Image
                src={DEPLOY_CARD_ASSETS.heroLeft}
                alt=""
                fill
                sizes="80px"
                className={styles.avatarOverlay}
              />
              <Image
                src={DEPLOY_CARD_ASSETS.heroLeftAccent}
                alt=""
                fill
                sizes="80px"
                className={styles.avatarOverlay}
              />
            </div>
          </div>

          <div className={styles.rings} aria-hidden data-node-id="1822:24248">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DEPLOY_CARD_ASSETS.ringsLeft}
              alt=""
              className={styles.ringsImg}
            />
          </div>
        </div>

        <div
          className={styles.teamChip}
          data-name="status-chips"
          data-node-id="1822:24254"
        >
          <span className="material-symbols-rounded" aria-hidden>
            group
          </span>
          <span className={styles.teamChipLabel}>Sales Team EU</span>
        </div>
      </div>

      <CardBody
        name="Maria"
        lastUsed="Just Now"
        assigneeName="Jhon Smith"
        assigneeSrc={DEPLOY_CARD_ASSETS.assigneeJhon}
      />
    </article>
  );
}

/** Figma 1822:24269 — Right Alex card */
export function DeployRightAgentCard() {
  return (
    <article
      className={`${styles.card} ${styles.cardRight}`}
      data-node-id="1822:24269"
      data-name="agent-card"
    >
      <div className={styles.hero} data-node-id="1822:24270">
        <Image
          src={DEPLOY_CARD_ASSETS.heroRight}
          alt=""
          fill
          sizes="260px"
          className={styles.heroCover}
          aria-hidden
        />

        <div className={styles.heroWash} data-node-id="1822:24271">
          <div className={styles.avatar} data-node-id="1822:24272" data-name="image">
            <div className={styles.avatarInner} aria-hidden>
              <Image
                src={DEPLOY_CARD_ASSETS.portraitAlex}
                alt=""
                width={1200}
                height={1600}
                sizes="80px"
                className={styles.avatarPortrait}
              />
              <Image
                src={DEPLOY_CARD_ASSETS.heroRight}
                alt=""
                fill
                sizes="80px"
                className={styles.avatarOverlay}
              />
            </div>
          </div>

          <div className={styles.rings} aria-hidden data-node-id="1822:24273">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DEPLOY_CARD_ASSETS.ringsRight}
              alt=""
              className={styles.ringsImg}
            />
          </div>
        </div>
      </div>

      <CardBody
        name="Alex"
        lastUsed="12 Jun, 12:32 PM"
        assigneeName="Deepanjan Sen"
        assigneeSrc={DEPLOY_CARD_ASSETS.assigneeDeepanjan}
      />

      {/* Chip sits on the card root in Figma (not inside hero) */}
      <div
        className={styles.teamChip}
        data-name="status-chips"
        data-node-id="1822:24294"
      >
        <span className="material-symbols-rounded" aria-hidden>
          group
        </span>
        <span className={styles.teamChipLabel}>Sales Team EU</span>
      </div>
    </article>
  );
}

function CardBody({
  name,
  lastUsed,
  assigneeName,
  assigneeSrc,
}: {
  name: string;
  lastUsed: string;
  assigneeName: string;
  assigneeSrc: string;
}) {
  return (
    <div className={styles.body}>
      <div className={styles.textBlock}>
        <p className={styles.name}>{name}</p>
        <div className={styles.metaRow}>
          <span className={styles.meta}>Last Used</span>
          <span className={styles.dot} aria-hidden>
            {/* SVG dot */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DEPLOY_CARD_ASSETS.dot}
              alt=""
              className={styles.dotImg}
            />
          </span>
          <span className={styles.meta}>{lastUsed}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.footerLabel}>Assigned to</p>
        <div className={styles.assignee}>
          <span className={styles.assigneeName}>{assigneeName}</span>
          <span className={styles.assigneeThumb}>
            <Image
              src={assigneeSrc}
              alt=""
              fill
              sizes="28px"
              className={styles.assigneeImg}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
