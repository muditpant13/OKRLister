import React, {FunctionComponent} from 'react';
import {Text, TextProps} from 'react-native';
import {getName, FontStyles} from '../../styles/fonts/names';
import {getSize, Sizes} from '../../styles/fonts/sizes';
import {getColor, Colors, ColorType} from '../../styles/colors';

const defaultProps = {
  fontSize: Sizes.medium,
  fontFamily: FontStyles.regular,
  textColor: {color: Colors.secondaryColor} as ColorType,
};

export type TextViewProps = Partial<typeof defaultProps> & TextProps;

export const TextView: FunctionComponent<TextViewProps> = (props) => {
  const {style, fontSize, fontFamily, textColor, children, ...rest} = props;

  const size = getSize(fontSize);
  const font = getName(fontFamily);
  const color = getColor(textColor);

  if (typeof children === 'undefined') {
    return null;
  }

  return (
    <Text
      style={[{fontSize: size}, {fontFamily: font}, {color}, style]}
      {...rest}>
      {children}
    </Text>
  );
};
