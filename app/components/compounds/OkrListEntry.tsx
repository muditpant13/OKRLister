import React, {FunctionComponent, useCallback} from 'react';
import {View, StyleSheet, ViewStyle, Alert} from 'react-native';
import {TextView, TextViewProps} from '../atoms/TextView';
import {Colors, getColor} from '../../styles/colors';
import {Sizes} from '../../styles/fonts/sizes';
import {FontStyles} from '../../styles/fonts/names';
import {Icon} from '../atoms/Icon';
import {IconSizes} from '../../styles/iconSizes';
import {getSpace, Spaces} from '../../styles/spaces';
import {OkrViewDataItem} from '../../screens/okrList/api/Models';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {createChildObjectiveInfoMessage} from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getSpace(Spaces.subMedium),
  },
  indexText: {
    marginHorizontal: getSpace(Spaces.xSmall),
  },
  titleContainerStyle: {flexDirection: 'row', flex: 1},
});

const defaultProps = {
  style: {} as ViewStyle,
  text: '',
  index: '',
  textProps: {
    fontFamily: FontStyles.medium,
    fontSize: Sizes.medium,
    style: {
      flexShrink: 1,
      flexWrap: 'wrap',
      marginHorizontal: getSpace(Spaces.small),
    } as ViewStyle,
  } as TextProps,
};

export type TextProps = {
  text?: string;
} & TextViewProps;

export type OkrListEntryProps = {
  objective?: OkrViewDataItem;
  parentObjective?: string;
} & Partial<typeof defaultProps>;

export const OkrListEntry: FunctionComponent<OkrListEntryProps> = (props) => {
  const {textProps, index, style, text, objective, parentObjective} = props;
  const titleTextProps = {
    ...defaultProps.textProps,
    style: {
      marginLeft: getSpace(Spaces.small),
      marginRight: getSpace(Spaces.large),
    },
    ...textProps,
  };

  const onTitleClick = useCallback(() => {
    if (parentObjective) {
      Alert.alert(
        `Info for objective id ${objective?.id}`,
        createChildObjectiveInfoMessage(objective, parentObjective),
      );
    }
  }, [objective, parentObjective]);

  return (
    <View style={[defaultProps.style, style, styles.container]}>
      <Icon
        iconName={'account-circle'}
        iconSize={IconSizes.medium}
        iconColor={{color: Colors.secondaryColor}}
      />
      <TextView
        style={styles.indexText}
        textColor={{color: Colors.secondaryColor, opacity: 60}}
        fontFamily={FontStyles.medium}
        fontSize={Sizes.medium}>{`${index}.`}</TextView>
      <TouchableHighlight
        disabled={!parentObjective}
        underlayColor={getColor({color: Colors.buttonFill, opacity: 10})}
        onPress={onTitleClick}>
        <View style={styles.titleContainerStyle}>
          <TextView {...titleTextProps}>{`${text}`}</TextView>
        </View>
      </TouchableHighlight>
    </View>
  );
};
