import styles from "./team-experience.module.css";
import {
  TEAM_LOGO_ROWS,
  type TeamLogo,
  type TeamLogoFit,
} from "./team-experience-logos";
import { TeamExperienceLogosTicker } from "./team-experience-logos-ticker";

function fitClass(fit: TeamLogoFit | undefined) {
  if (fit === "contain-bottom") return styles.logoImgContainBottom;
  if (fit === "cover") return styles.logoImgCover;
  return styles.logoImgContain;
}

function TeamLogoCell({ logo }: { logo: TeamLogo }) {
  return (
    <div className={styles.logoCell} data-name="Logo">
      <img
        src={logo.src}
        alt={logo.alt}
        width={136}
        height={64}
        className={`${styles.logoImg} ${fitClass(logo.fit)}`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/** Figma 735:1616 — Team Experience logos */
export function TeamExperienceSection() {
  return (
    <section
      className={`${styles.section} landing-team-experience-section landing-band-left`}
      aria-labelledby="team-experience-heading"
      data-name="Forward Thinking Logos Container"
      data-node-id="735:1616"
    >
      <div
        className={styles.copyRow}
        data-name="Frame 1171276682"
        data-node-id="735:1617"
      >
        <p id="team-experience-heading" className={styles.copy} data-node-id="735:1618">
          Built by people with hands-on experience across product, engineering,
          revenue, and operations at the companies below.
        </p>
      </div>

      <div
        className={styles.logoGrid}
        data-name="Frame 1171276713"
        data-node-id="735:1640"
      >
        {TEAM_LOGO_ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={styles.logoRow}
            data-name="Logo Row"
            data-node-id={
              rowIndex === 0
                ? "735:1619"
                : rowIndex === 1
                  ? "735:1625"
                  : "735:1631"
            }
          >
            {row.map((logo) => (
              <TeamLogoCell key={logo.src} logo={logo} />
            ))}
          </div>
        ))}
      </div>

      <TeamExperienceLogosTicker />
    </section>
  );
}
