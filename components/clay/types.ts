/** Clay avatar variants — matched to project reference art (style A & B). */
export type ClayAvatarVariant =
  | "beanie"
  | "glasses"
  | "thumbs"
  | "think"
  | "hijab"
  | "smile";

export type ClayAvatarSize = "sm" | "md" | "lg" | "xl";

export const CLAY_AVATAR_SIZES: Record<ClayAvatarSize, number> = {
  sm: 56,
  md: 80,
  lg: 112,
  xl: 140,
};
