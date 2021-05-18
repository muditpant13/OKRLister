import React, {FunctionComponent} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {TextView, TextViewProps} from '../atoms/TextView';
import {getColor, Colors} from '../../styles/colors';
import {Sizes} from '../../styles/fonts/sizes';
import {FontStyles} from '../../styles/fonts/names';

const WhiteColor = getColor({color: Colors.white, opacity: 100});
const styles = StyleSheet.create({
  horizontal: {
    flex: 1,
    flexDirection: 'row',
  },
  whiteBackground: {
    backgroundColor: WhiteColor,
  },
});

const defaultProps = {
  titleProps: {
    fontFamily: FontStyles.bold,
    fontSize: Sizes.xLarge,
    style: {
      marginVertical: 10,
    },
  } as TextProps,
  subtitleProps: {
    fontFamily: FontStyles.regular,
    fontSize: Sizes.small,
    textColor: {color: Colors.black, opacity: 60},
  } as TextProps,
  direction: 'vertical' as Direction,
  style: {...styles.whiteBackground} as ViewStyle,
};

export type Direction = 'horizontal' | 'vertical';

export type TextProps = {
  text?: string;
} & TextViewProps;

export type TitleSubtitleProps = Partial<typeof defaultProps>;

export const TitleSubtitleView: FunctionComponent<TitleSubtitleProps> = (
  props,
) => {
  const {
    titleProps: {
      text: title = undefined,
      style: styleTitle = undefined,
      ...restTitleProps
    } = {},
    subtitleProps: {
      text: subtitle = undefined,
      style: styleSubtitle = undefined,
      ...restSubTitleProps
    } = {},
    style,
    direction,
  } = props;

  const titleProps = {...defaultProps.titleProps, ...restTitleProps};
  const subtitleProps = {...defaultProps.subtitleProps, ...restSubTitleProps};
  return (
    <View
      style={[
        defaultProps.style,
        style,
        direction === 'horizontal' ? styles.horizontal : undefined,
      ]}>
      {title ? (
        <TextView
          {...titleProps}
          style={[defaultProps.titleProps.style, styleTitle]}>
          {title}
        </TextView>
      ) : null}
      {subtitle ? (
        <TextView
          {...subtitleProps}
          style={[defaultProps.subtitleProps.style, styleSubtitle]}>
          {subtitle}
        </TextView>
      ) : null}
    </View>
  );
};
