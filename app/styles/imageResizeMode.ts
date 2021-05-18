export enum ImageResizeModes {
  contain = 1,
  cover,
  stretch,
  center,
  repeat,
}

const resizeModeValues = {
  [ImageResizeModes.contain]: 'contain',
  [ImageResizeModes.cover]: 'cover',
  [ImageResizeModes.stretch]: 'stretch',
  [ImageResizeModes.center]: 'center',
  [ImageResizeModes.repeat]: 'repeat',
};

const defaultResizeMode = ImageResizeModes.cover;

export const getResizeMode = function (
  resizeMode?: ImageResizeModeType,
): string {
  if (!resizeMode) {
    return resizeModeValues[defaultResizeMode];
  }
  return resizeModeValues[resizeMode] || resizeModeValues[defaultResizeMode];
};

export type ImageResizeModeType = ImageResizeModes;
