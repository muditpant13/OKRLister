import React, {FunctionComponent} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
  StyleProp,
  ViewStyle,
  TouchableHighlightProps,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Colors, ColorType, getColor} from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export type Touchables =
  | 'nativeFeedBack'
  | 'highLight'
  | 'opacity'
  | 'withoutFeedBack';

const TouchablesMap = {
  nativeFeedBack: TouchableNativeFeedback,
  highLight: TouchableHighlight,
  opacity: TouchableOpacity,
  withoutFeedBack: TouchableWithoutFeedback,
};

type CommonProps = TouchableHighlightProps & TouchableNativeFeedbackProps;
const defaultTouchable = Platform.OS === 'ios' ? 'highLight' : 'nativeFeedBack';

const defaultProps = {
  touchable: defaultTouchable as Touchables,
  underlayColorType: {
    color: Colors.white,
    opacity: 0,
  } as ColorType,
};

export type TouchableProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
} & CommonProps &
  Partial<typeof defaultProps>;

const getTouchable = (touchable?: Touchables) => {
  if (!touchable) touchable = defaultTouchable;
  touchable =
    touchable === 'nativeFeedBack' && Platform.OS === 'ios'
      ? 'highLight'
      : touchable;
  return TouchablesMap[touchable];
};

export const Touchable: FunctionComponent<TouchableProps> = (props) => {
  const {style, touchable, underlayColorType, children, ...rest} = props;
  const buttonUnderlayColor = getColor(underlayColorType);
  const Touchable: React.ReactType = getTouchable(touchable);
  return (
    <Touchable
      style={[styles.container, style]}
      underlayColor={buttonUnderlayColor}
      {...rest}>
      {children}
    </Touchable>
  );
};

Touchable.defaultProps = defaultProps;
