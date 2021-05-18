import {ViewStyle} from 'react-native';
import {Colors, getColor} from '../styles/colors';

/**
 * Returns the value of key within a object
 *
 * @param obj a non null object iside which key needs to be found
 * @param key a key name within object
 */
export const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] =>
  obj[key];

// alternate color styling for OKR's
export const getOkrEntryBgColor = (index: number): ViewStyle => {
  return index === 0 || index % 2 === 0
    ? {
        backgroundColor: getColor({
          color: Colors.white,
        }),
      }
    : {
        backgroundColor: getColor({
          color: Colors.secondaryColor,
          opacity: 10,
        }),
      };
};

// convert 0-25 indices to a,b,c & a1, a2 for other
export const convertNumberToString = (index: number): string => {
  let stringIndex = '';
  while (index >= 26) {
    stringIndex += `${stringIndex}${index / 26}`;
    index = index % 26;
  }
  stringIndex += `${stringIndex}${String.fromCharCode(97 + index)}`;
  return [...stringIndex].reverse().join('');
};

const isArray = (element: any) => {
  return element.constructor == Array;
};

const isObject = (element: any) => {
  return element.constructor == Object;
};

const isIterable = (element: any) => {
  return isArray(element) || isObject(element);
};

// TODO recursively iterate in future
export const createChildObjectiveInfoMessage = (
  childObjective: any,
  parentTitle: string,
): string => {
  let infoString = `parent: ${parentTitle}\n `;
  for (const key in childObjective) {
    if (childObjective.hasOwnProperty(key)) {
      if (!isIterable(childObjective[key])) {
        infoString += `${key}: ${childObjective[key]}\n`;
      }
    }
  }
  return infoString;
};
