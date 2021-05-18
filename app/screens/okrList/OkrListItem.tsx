import React, {FunctionComponent, useCallback, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Icon} from '../../components/atoms/Icon';
import {OkrListEntry} from '../../components/compounds/OkrListEntry';
import {Colors, getColor} from '../../styles/colors';
import {FontStyles} from '../../styles/fonts/names';
import {Sizes} from '../../styles/fonts/sizes';
import {getIconSize, IconSizes} from '../../styles/iconSizes';
import {getSpace, Spaces} from '../../styles/spaces';
import {convertNumberToString} from '../../utils';
import {OKRViewDataEntry, OkrViewDataItem} from './api/Models';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  parentObjectiveContainer: {flexDirection: 'row', alignItems: 'center'},
  childContainer: {
    flexDirection: 'row',
  },
  placeholderViewStyle: {flex: 0.1},
});

type ListItemBaseProps = {
  style?: StyleProp<ViewStyle>;
  item: OKRViewDataEntry;
  index: number;
};

const renderChildObjectives = (
  childObjectives: Array<OkrViewDataItem>,
  parentTitle: string,
) => {
  return childObjectives.map((objective: OkrViewDataItem, index: number) => {
    return (
      <View
        key={objective.id}
        style={[
          styles.childContainer,
          {paddingLeft: getSpace(Spaces.large)},
          objective.bgColorStyle,
        ]}>
        <View style={styles.placeholderViewStyle} />
        <OkrListEntry
          parentObjective={parentTitle}
          objective={objective}
          text={objective.title}
          index={convertNumberToString(index)}
        />
      </View>
    );
  });
};

export const OkrListItem: FunctionComponent<ListItemBaseProps> = (props) => {
  const {item: {data, childObjectives} = {}, index} = props;
  const [showDropDown, toggleDropDown] = useState(true);
  const onDropDownClicked = useCallback(() => {
    toggleDropDown(!showDropDown);
  }, [toggleDropDown, showDropDown]);
  return (
    <View style={[styles.container]}>
      <View style={[styles.parentObjectiveContainer, data?.bgColorStyle]}>
        {childObjectives && childObjectives.length > 0 ? (
          <TouchableHighlight
            onPress={onDropDownClicked}
            underlayColor={getColor({color: Colors.white, opacity: 0})}>
            <Icon
              iconName={'arrow-drop-down'}
              iconSize={IconSizes.medium}
              iconColor={{color: Colors.secondaryColor}}
            />
          </TouchableHighlight>
        ) : (
          <View
            style={{
              width: getIconSize(IconSizes.medium) * 1.5,
            }}
          />
        )}
        <OkrListEntry
          text={data?.title}
          index={(index + 1).toString()}
          textProps={{
            fontFamily: FontStyles.medium,
            fontSize: Sizes.large,
          }}
        />
      </View>

      {showDropDown && childObjectives && childObjectives.length > 0
        ? renderChildObjectives(childObjectives, data?.title || '')
        : null}
    </View>
  );
};
