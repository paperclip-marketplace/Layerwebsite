import styles from "./team-experience.module.css";

const TEAM_LOGO_BASE = "/assets/images/landing/team-experience";

type LogoFit = "contain" | "contain-bottom" | "cover";

type TeamLogo = {
  src: string;
  alt: string;
  fit?: LogoFit;
};

const TEAM_LOGO_ROWS: TeamLogo[][] = [
  [
    { src: `${TEAM_LOGO_BASE}/sage-logo.png`, alt: "Sage" },
    { src: `${TEAM_LOGO_BASE}/criteo-logo.png`, alt: "Criteo" },
    { src: `${TEAM_LOGO_BASE}/xero-logo.png`, alt: "Xero" },
    { src: `${TEAM_LOGO_BASE}/bandwatch-logo.png`, alt: "Brandwatch" },
    { src: `${TEAM_LOGO_BASE}/hubspot-logo.png`, alt: "HubSpot" },
  ],
  [
    { src: `${TEAM_LOGO_BASE}/medallia-logo.png`, alt: "Medallia" },
    { src: `${TEAM_LOGO_BASE}/apple-logo.png`, alt: "Apple" },
    { src: `${TEAM_LOGO_BASE}/sap-logo.png`, alt: "SAP" },
    { src: `${TEAM_LOGO_BASE}/parallels-logo.png`, alt: "Parallels" },
    { src: `${TEAM_LOGO_BASE}/paperclip-logo.png`, alt: "Paperclip" },
  ],
  [
    { src: `${TEAM_LOGO_BASE}/como-logo.png`, alt: "Como" },
    { src: `${TEAM_LOGO_BASE}/swiggy-logo.png`, alt: "Swiggy" },
    { src: `${TEAM_LOGO_BASE}/perfios-logo.png`, alt: "Perfios" },
    { src: `${TEAM_LOGO_BASE}/sbicard-logo.png`, alt: "SBI Card" },
    { src: `${TEAM_LOGO_BASE}/adgm-logo.png`, alt: "ADGM" },
  ],
];

function fitClass(fit: LogoFit | undefined) {
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
    </section>
  );
}
