export enum Sizes {
  xxxSmall = 1,
  xxSmall,
  xSmall,
  small,
  medium,
  large,
  largeMedPlus,
  largePlus,
  xLarge,
  xxLarge,
  xxxLarge,
  xxxxLarge,
}

const sizeValues = {
  [Sizes.xxxSmall]: 4,
  [Sizes.xxSmall]: 8,
  [Sizes.xSmall]: 10,
  [Sizes.small]: 12,
  [Sizes.medium]: 14,
  [Sizes.large]: 16,
  [Sizes.largeMedPlus]: 18,
  [Sizes.largePlus]: 20,
  [Sizes.xLarge]: 24,
  [Sizes.xxLarge]: 32,
  [Sizes.xxxLarge]: 40,
  [Sizes.xxxxLarge]: 80,
};

const defaultSize = Sizes.medium;

// sizeString: one of the values from SizeStrings
// It should be used to get the actual value
export const getSize = function (size?: FontSizeType): number {
  if (!size) {
    return sizeValues[defaultSize];
  }
  return sizeValues[size] || sizeValues[defaultSize];
};

export type FontSizeType = Sizes;
