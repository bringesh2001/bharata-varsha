import type { EraGroup } from "@data/eras";

/** Literal class names so Tailwind can see them. Era colours are for marks only, never text. */
export const ERA_BG: Record<EraGroup, string> = {
  ancient: "bg-era-ancient",
  classical: "bg-era-classical",
  medieval: "bg-era-medieval",
  modern: "bg-era-modern",
};

export const ERA_BORDER_TOP: Record<EraGroup, string> = {
  ancient: "border-t-era-ancient",
  classical: "border-t-era-classical",
  medieval: "border-t-era-medieval",
  modern: "border-t-era-modern",
};
