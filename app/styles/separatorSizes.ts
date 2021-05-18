import {StyleSheet} from 'react-native';

export enum SeparatorSizes {
  hairlineWidth = 1,
  listSeparator = 2,
  default,
  section,
}

const sizeValues = {
  [SeparatorSizes.hairlineWidth]: StyleSheet.hairlineWidth,
  [SeparatorSizes.default]: 1,
  [SeparatorSizes.listSeparator]: 12,
  [SeparatorSizes.section]: 8,
};

const defaultSize = SeparatorSizes.hairlineWidth;

export const getSeparatorSize = function (
  separatorSize?: SeparatorSizeType,
): number {
  if (!separatorSize) {
    return sizeValues[defaultSize];
  }
  return sizeValues[separatorSize] || sizeValues[defaultSize];
};

export type SeparatorSizeType = SeparatorSizes;
