import { cn } from "@/lib/cn";

const SKILL_TYPE_META: Record<string, { label: string; icon: string }> = {
  directive: { label: "Directive", icon: "signpost" },
  procedure: { label: "Procedure", icon: "checklist" },
  evaluator: { label: "Evaluator", icon: "grading" },
  framework: { label: "Framework", icon: "account_tree" },
};

export function formatSkillTypeLabel(type: string) {
  return SKILL_TYPE_META[type]?.label ?? type;
}

type SkillTypeIconProps = {
  type: string;
  size?: number;
  className?: string;
};

export function SkillTypeIcon({
  type,
  size = 20,
  className,
}: SkillTypeIconProps) {
  const meta = SKILL_TYPE_META[type] ?? { label: type, icon: "psychology" };

  return (
    <span
      className={cn(
        "material-symbols-rounded leading-none text-[#323232]",
        className,
      )}
      style={{ fontSize: size }}
      aria-hidden
    >
      {meta.icon}
    </span>
  );
}
