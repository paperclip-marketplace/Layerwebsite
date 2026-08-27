import { PlaybookCard } from "../library-cards/playbook-card";
import { BUILD_CARD_ASSETS } from "./build-card-assets";
import styles from "./build-objection-card.module.css";

/** Figma 1822:23898 — Objection Handling playbook card */
export function BuildObjectionCard() {
  return (
    <div className={styles.wrap} data-node-id="1822:23898">
      <PlaybookCard
        name="Objection Handling"
        description="Practice real-world responses to common buyer objections — from pricing concerns to competitor comparisons — with confidence and clarity."
        chipLabel="Roleplay"
        createdByName="Alex Lyma-Young"
        createdByAvatarSrc={BUILD_CARD_ASSETS.creatorAvatar}
        updatedAtLabel="27 Jun, 3:45 PM"
      />
    </div>
  );
}
