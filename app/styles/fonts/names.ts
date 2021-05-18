export enum FontStyles {
  regular = 1,
  medium,
  bold,
  italic,
  italicMedium,
  italicBold,
}

const names = {
  [FontStyles.regular]: 'SourceSansPro-Regular',
  [FontStyles.bold]: 'SourceSansPro-Bold',
  [FontStyles.medium]: 'SourceSansPro-SemiBold',
  [FontStyles.italic]: 'SourceSansPro-Italic',
  [FontStyles.italicMedium]: 'SourceSansPro-SemiBoldItalic',
  [FontStyles.italicBold]: 'SourceSansPro-BoldItalic',
};

const defaultName = FontStyles.regular;

export const getName = function (fontStyle?: FontStyleType): string {
  if (!fontStyle) {
    return names[defaultName];
  }
  return names[fontStyle] || names[defaultName];
};

export type FontStyleType = FontStyles;
