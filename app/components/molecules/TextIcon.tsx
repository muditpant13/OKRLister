import React, {StatelessComponent} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Icon, IconProps} from '../atoms/Icon';
import {TextViewProps} from '../atoms/TextView';
import {Colors} from '../../styles/colors';
import {Sizes} from '../../styles/fonts/sizes';
import {FontStyles} from '../../styles/fonts/names';
import {getSpace, Spaces} from '../../styles/spaces';
import {IconSizes} from '../../styles/iconSizes';
import {
  Direction,
  TitleSubtitleProps,
  TitleSubtitleView,
} from './TitleSubtitleView';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSubtextContainer: {
    backgroundColor: undefined,
  },
});

const defaultProps = {
  textProps: {
    fontSize: Sizes.small,
    fontFamily: FontStyles.regular,
    textColor: {color: Colors.secondaryColor},
    style: {marginVertical: getSpace(Spaces.noSpace)},
  },
  iconProps: {
    iconSize: IconSizes.medium,
    iconColor: {color: Colors.secondaryColor},
    iconMargin: Spaces.xSmall,
    iconName: '',
  },
};

export interface TextIconViewProps {
  styleTextIcon?: StyleProp<ViewStyle>;
  styleTextSubtext?: ViewStyle;
  iconOnRight?: boolean;
  textProps?: TextViewProps;
  subTextProps?: TextViewProps;
  iconProps?: IconProps;
  text?: string;
  subText?: string;
  titleSubtitleDirection?: Direction;
}

export const TextIconView: StatelessComponent<TextIconViewProps> = (props) => {
  const {
    styleTextIcon,
    textProps,
    iconProps,
    iconOnRight = true,
    text: title,
    subText: subtitle,
    subTextProps,
    styleTextSubtext = {},
    titleSubtitleDirection,
  } = props;

  const iconViewProps = iconProps ? iconProps : defaultProps.iconProps;

  const icon = iconProps ? <Icon {...iconViewProps} /> : null;

  const titleSubtitleProps: TitleSubtitleProps = {
    titleProps: {
      text: title,
      ...defaultProps.textProps,
      ...textProps,
      style: [defaultProps.textProps.style, textProps && textProps.style],
    },
    subtitleProps: {text: subtitle, ...subTextProps},
    direction: titleSubtitleDirection,
    style: [styles.textSubtextContainer, styleTextSubtext] as ViewStyle,
  };

  const textView = title ? <TitleSubtitleView {...titleSubtitleProps} /> : null;
  if (!textView && !icon) return null;
  return iconOnRight ? (
    <View style={[styles.container, styleTextIcon]}>
      {textView}
      {icon}
    </View>
  ) : (
    <View style={[styles.container, styleTextIcon]}>
      {icon}
      {textView}
    </View>
  );
};
