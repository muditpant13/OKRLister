import {rgba} from './helpers/rgba';

const blueberry = '#282C3F',
  watermelon = '#FF3F6C',
  tangerine = '#FF5722',
  salmon = '#990000',
  spinach = '#14958F',
  sage = '#72BFBC',
  mango = '#FCB301',
  grapeFruit = '#F16565',
  indigo = '#526CD0',
  mynt = '#0BC6A0',
  positiveHighlight = '#03A685',
  white = '#ffffff',
  black = '#000000',
  buttonFill = '#01c9ec',
  primaryGradient = '#6043bd',
  leftGradient = '#6F12FF',
  rightGradient = '#CE32B0',
  graphFill = '#00C2CB',
  onboardingButton = '#248AE8';

export enum Colors {
  primaryColor = 1,
  secondaryColor,
  discount,
  urgency,
  critical,
  mild,
  veryMild,
  error,
  weblink,
  tertiary,
  white,
  black,
  accent,
  buttonFill,
  primaryGradient,
  onboardingButton,
  leftGradient,
  rightGradient,
  graphFill,
}

const colors = {
  [Colors.primaryColor]: watermelon,
  [Colors.secondaryColor]: blueberry,
  [Colors.discount]: tangerine,
  [Colors.urgency]: salmon,
  [Colors.critical]: mango,
  [Colors.mild]: sage,
  [Colors.veryMild]: spinach,
  [Colors.error]: grapeFruit,
  [Colors.weblink]: indigo,
  [Colors.tertiary]: mynt,
  [Colors.white]: white,
  [Colors.black]: black,
  [Colors.accent]: positiveHighlight,
  [Colors.buttonFill]: buttonFill,
  [Colors.primaryGradient]: primaryGradient,
  [Colors.onboardingButton]: onboardingButton,
  [Colors.leftGradient]: leftGradient,
  [Colors.rightGradient]: rightGradient,
  [Colors.graphFill]: graphFill,
};

const defaultColor: Colors = Colors.secondaryColor;

export const getColor = function (
  colorInfo?: ColorType,
  onlyRGBValue: boolean = false,
): string {
  let hexColor = colors[defaultColor];
  if (!colorInfo && typeof colorInfo !== 'object') {
    return hexColor;
  }
  const {color = defaultColor, opacity = 100} = colorInfo;
  hexColor = colors[color];
  return opacity < 100 || onlyRGBValue ? rgba(hexColor, opacity) : hexColor;
};

export interface ColorType {
  color: Colors;
  opacity?: number;
}
