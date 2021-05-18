export enum IconSizes {
  xSmall = 1,
  xxSmall,
  xxSmallMed,
  small,
  xMedium,
  medium,
  large,
  xLarge,
  xxLarge,
  xxxLarge,
  vxxxLarge,
}

const sizeValues = {
  [IconSizes.xxSmall]: 8,
  [IconSizes.xxSmallMed]: 10,
  [IconSizes.xSmall]: 12,
  [IconSizes.small]: 16,
  [IconSizes.xMedium]: 20,
  [IconSizes.medium]: 24,
  [IconSizes.large]: 32,
  [IconSizes.xLarge]: 48,
  [IconSizes.xxLarge]: 56,
  [IconSizes.xxxLarge]: 72,
  [IconSizes.vxxxLarge]: 120,
};

const defaultSize = IconSizes.small;

export const getIconSize = function (iconSize?: IconSizeType): number {
  if (!iconSize) {
    return sizeValues[defaultSize];
  }
  return sizeValues[iconSize] || sizeValues[defaultSize];
};
export type IconSizeType = IconSizes;
