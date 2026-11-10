/**
 * Illustrative, fictional people and personal Layer Agents shown in the
 * Layer for Slack page. Faces are illustrations (not photos of real people),
 * and every Agent is always labelled "· AI Agent" wherever it speaks.
 */
const FACE_DIR = "/assets/images/slack/faces";

export type SlackPerson = {
  name: string;
  face: string;
};

export type SlackAgent = SlackPerson & {
  owner: string;
};

export const PEOPLE = {
  even: { name: "Even", face: `${FACE_DIR}/face-even.svg` },
  theo: { name: "Theo Park", face: `${FACE_DIR}/face-theo.svg` },
  priya: { name: "Priya Nair", face: `${FACE_DIR}/face-priya.svg` },
  jordan: { name: "Jordan Reyes", face: `${FACE_DIR}/face-jordan.svg` },
  rosa: { name: "Rosa Chen", face: `${FACE_DIR}/face-rosa.svg` },
  dana: { name: "Dana Okafor", face: `${FACE_DIR}/face-dana.svg` },
  marcus: { name: "Marcus Lee", face: `${FACE_DIR}/face-marcus.svg` },
} satisfies Record<string, SlackPerson>;

export const AGENTS = {
  maya: { name: "Maya", face: `${FACE_DIR}/face-maya.svg`, owner: "Even" },
  nova: { name: "Nova", face: `${FACE_DIR}/face-nova.svg`, owner: "Theo" },
  leo: { name: "Leo", face: `${FACE_DIR}/face-leo.svg`, owner: "Priya" },
  sol: { name: "Sol", face: `${FACE_DIR}/face-sol.svg`, owner: "Jordan" },
  iris: { name: "Iris", face: `${FACE_DIR}/face-iris.svg`, owner: "Rosa" },
} satisfies Record<string, SlackAgent>;

export const LAYER_MARK_SRC = "/assets/images/landing/layer-mark.svg";
export const LAYER_WORDMARK_SRC = "/assets/images/landing/layer-wordmark.svg";
