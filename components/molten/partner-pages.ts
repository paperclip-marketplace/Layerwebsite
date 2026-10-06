import { MOLTEN_ASSETS } from "./molten-assets";

export type PartnerGlow = "molten" | "notion" | "inflexion";

export type PartnerPageConfig = {
  companyName: string;
  /** First line of the offer heading, before “portfolio companies”. */
  offerHeadlineName: string;
  /** Lowercase label in “the {name} offer”. */
  offerEyebrowName: string;
  path: string;
  logoAlt: string;
  /** Design width of the company mark at 28px height. Molten stays on its own CSS. */
  logoWidth: number;
  logoSrc?: string;
  logoKind: "image" | "inflexion";
  glow: PartnerGlow;
};

export const MOLTEN_PARTNER: PartnerPageConfig = {
  companyName: "Molten Ventures",
  offerHeadlineName: "Molten",
  offerEyebrowName: "molten",
  path: "/molten",
  logoAlt: "Molten",
  logoWidth: 113,
  logoSrc: MOLTEN_ASSETS.moltenLogo,
  logoKind: "image",
  glow: "molten",
};

export const NOTION_CAPITAL_PARTNER: PartnerPageConfig = {
  companyName: "Notion Capital",
  offerHeadlineName: "Notion Capital",
  offerEyebrowName: "notion capital",
  path: "/notion-capital",
  logoAlt: "Notion Capital",
  logoWidth: 105,
  logoSrc: "/assets/images/notion-capital/notion-capital-logo.webp",
  logoKind: "image",
  glow: "notion",
};

export const INFLEXION_PARTNER: PartnerPageConfig = {
  companyName: "Inflexion",
  offerHeadlineName: "Inflexion",
  offerEyebrowName: "inflexion",
  path: "/inflexion",
  logoAlt: "Inflexion",
  logoWidth: 148,
  logoKind: "inflexion",
  glow: "inflexion",
};
