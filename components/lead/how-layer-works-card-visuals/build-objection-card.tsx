import { PlaybookCard } from "../library-cards/playbook-card";
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
        updatedAtLabel="27 Jun, 3:45 PM"
      />
    </div>
  );
}
