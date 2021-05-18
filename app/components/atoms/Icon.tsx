import React, {FunctionComponent} from 'react';
import {StyleSheet, ImageStyle, StyleProp} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {IconSizes, getIconSize} from '../../styles/iconSizes';
import {getColor, ColorType} from '../../styles/colors';
import {Spaces, getSpace} from '../../styles/spaces';
import {ImageResizeModes, getResizeMode} from '../../styles/imageResizeMode';
import {RequireAtLeastOne} from '../../typings/global';
export const styles = StyleSheet.create({
  container: {
    resizeMode: getResizeMode(ImageResizeModes.contain),
  } as ImageStyle,
});

export const defaultProps = {
  iconSize: IconSizes.medium,
  iconMargin: Spaces.xSmall,
};

type IconBaseProps = {
  style?: StyleProp<ImageStyle>;
  iconName?: string;
  iconRef?: React.RefObject<any>;
  iconColor?: ColorType;
} & Partial<typeof defaultProps>;

export type IconProps = RequireAtLeastOne<IconBaseProps, 'iconName'>;

export const Icon: FunctionComponent<IconProps> = (props) => {
  const {style, iconSize, iconColor, iconMargin, iconName, iconRef} = props;

  const size = getIconSize(iconSize);
  const color = iconColor ? getColor(iconColor) : undefined;
  const margin = getSpace(iconMargin);

  if (iconName) {
    return (
      <MaterialIcon
        name={iconName}
        size={size}
        ref={iconRef}
        style={[{color}, {margin}, style && style]}
      />
    );
  }

  return null;
};

Icon.defaultProps = defaultProps;
