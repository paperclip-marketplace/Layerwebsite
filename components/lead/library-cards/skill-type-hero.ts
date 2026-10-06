/** Library card hero — Figma ref 280×176, card hero 148px tall. */
export const SKILL_CARD_HERO_REF_HEIGHT = 176;
export const SKILL_CARD_HERO_HEIGHT = 148;

export type SkillCardGradientType = "directive" | "procedure" | "evaluator";

export function getSkillCardTypeGradient(
  skillType: string | undefined,
): SkillCardGradientType | null {
  if (
    skillType === "directive" ||
    skillType === "procedure" ||
    skillType === "evaluator"
  ) {
    return skillType;
  }
  return null;
}
