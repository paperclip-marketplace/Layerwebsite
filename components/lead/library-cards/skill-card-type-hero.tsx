import { cn } from "@/lib/cn";
import { getSkillCardTypeGradient } from "./skill-type-hero";
import heroStyles from "./skill-type-hero.module.css";

type Props = {
  skillType: string;
  className?: string;
};

/** Type CSS gradient + grid overlay — no image assets. */
export function SkillCardTypeBg({ skillType, className }: Props) {
  const gradient = getSkillCardTypeGradient(skillType);
  if (!gradient) return null;

  return (
    <div
      className={cn(heroStyles.heroTypeBg, heroStyles.previewFade, className)}
      data-skill-type={skillType}
      aria-hidden
    >
      <div className={heroStyles.heroTypeBgGrid} />
    </div>
  );
}
