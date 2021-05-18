export enum Spaces {
  noSpace = 1,
  xSmall,
  small,
  subMedium,
  medium,
  largePlus,
  large,
  xLarge,
  xxLarge,
  xxxLarge,
}

const spaceValues = {
  [Spaces.noSpace]: 0,
  [Spaces.xSmall]: 4,
  [Spaces.small]: 8,
  [Spaces.subMedium]: 12,
  [Spaces.medium]: 16,
  [Spaces.largePlus]: 20,
  [Spaces.large]: 24,
  [Spaces.xLarge]: 32,
  [Spaces.xxLarge]: 40,
  [Spaces.xxxLarge]: 50,
};

const defaultSpace = Spaces.noSpace;

export const getSpace = function (space?: SpaceType): number {
  if (!space) {
    return spaceValues[defaultSpace];
  }
  return spaceValues[space] || spaceValues[defaultSpace];
};

export type SpaceType = Spaces;
