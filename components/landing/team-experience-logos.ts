export const TEAM_LOGO_BASE = "/assets/images/landing/team-experience";

export type TeamLogoFit = "contain" | "contain-bottom" | "cover";

export type TeamLogo = {
  src: string;
  alt: string;
  fit?: TeamLogoFit;
};

export const TEAM_LOGO_ROWS: TeamLogo[][] = [
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

export const TEAM_LOGOS = TEAM_LOGO_ROWS.flat();
