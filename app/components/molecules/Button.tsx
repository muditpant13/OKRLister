import React, {StatelessComponent} from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {TextIconView, TextIconViewProps} from './TextIcon';
import {Touchable, TouchableProps} from './TouchableComponent';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/* TODO: if this component is standardised, fix buttonType */

type ButtonBaseProps = {
  style?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  touchableProps?: Partial<TouchableProps>;
};

export type ButtonProps = ButtonBaseProps & TextIconViewProps;
export const Button: StatelessComponent<ButtonProps> = (props) => {
  const {
    style,
    disabledStyle,
    touchableProps = {} as TouchableProps,
    ...rest
  } = props;

  return (
    <Touchable
      {...touchableProps}
      style={[
        styles.container,
        style,
        touchableProps.disabled ? disabledStyle : null,
      ]}>
      <TextIconView {...rest} />
    </Touchable>
  );
};
