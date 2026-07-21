export const TEAM_LOGO_BASE = "/assets/images/landing/team-experience";

export type TeamLogoFit = "contain" | "contain-bottom" | "cover";

export type TeamLogo = {
  src: string;
  alt: string;
  fit?: TeamLogoFit;
};

export const TEAM_LOGO_ROWS: TeamLogo[][] = [
  [
    { src: `${TEAM_LOGO_BASE}/sage-logo.webp`, alt: "Sage" },
    { src: `${TEAM_LOGO_BASE}/criteo-logo.webp`, alt: "Criteo" },
    { src: `${TEAM_LOGO_BASE}/xero-logo.webp`, alt: "Xero" },
    { src: `${TEAM_LOGO_BASE}/bandwatch-logo.webp`, alt: "Brandwatch" },
    { src: `${TEAM_LOGO_BASE}/hubspot-logo.webp`, alt: "HubSpot" },
  ],
  [
    { src: `${TEAM_LOGO_BASE}/medallia-logo.webp`, alt: "Medallia" },
    { src: `${TEAM_LOGO_BASE}/apple-logo.webp`, alt: "Apple" },
    { src: `${TEAM_LOGO_BASE}/sap-logo.webp`, alt: "SAP" },
    { src: `${TEAM_LOGO_BASE}/parallels-logo.webp`, alt: "Parallels" },
    { src: `${TEAM_LOGO_BASE}/paperclip-logo.webp`, alt: "Paperclip" },
  ],
  [
    { src: `${TEAM_LOGO_BASE}/como-logo.webp`, alt: "Como" },
    { src: `${TEAM_LOGO_BASE}/swiggy-logo.webp`, alt: "Swiggy" },
    { src: `${TEAM_LOGO_BASE}/perfios-logo.webp`, alt: "Perfios" },
    { src: `${TEAM_LOGO_BASE}/sbicard-logo.webp`, alt: "SBI Card" },
    { src: `${TEAM_LOGO_BASE}/adgm-logo.webp`, alt: "ADGM" },
  ],
];

export const TEAM_LOGOS = TEAM_LOGO_ROWS.flat();
