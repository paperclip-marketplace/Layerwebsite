import { FrameworkCard } from "../library-cards/framework-card";
import styles from "./build-meddic-card.module.css";

/** Figma 1822:23899 — MEDDIC frameworks card */
export function BuildMeddicCard() {
  return (
    <div className={styles.wrap} data-node-id="1822:23899">
      <FrameworkCard
        title="MEDDIC"
        description="6-component enterprise sales methodolody"
        leadChip="Metrics"
        overflowCount={3}
      />
    </div>
  );
}
