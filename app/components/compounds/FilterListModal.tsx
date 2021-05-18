import React, {FunctionComponent, PureComponent, useCallback} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Colors, getColor} from '../../styles/colors';
import {Sizes} from '../../styles/fonts/sizes';
import {TextView} from '../atoms/TextView';
import {getSpace, Spaces} from '../../styles/spaces';
import {Button} from '../molecules/Button';
import {FontStyles} from '../../styles/fonts/names';

const styles = StyleSheet.create({
  modalContainer: {
    paddingVertical: getSpace(Spaces.subMedium),
    paddingHorizontal: getSpace(Spaces.medium),
    backgroundColor: getColor({color: Colors.white}),
  },
  filterListItemSontainer: {
    marginVertical: getSpace(Spaces.small),
    padding: getSpace(Spaces.xSmall),
    backgroundColor: getColor({color: Colors.buttonFill, opacity: 60}),
  },
  closeButtonContainer: {
    marginTop: getSpace(Spaces.large),
    backgroundColor: getColor({color: Colors.error, opacity: 60}),
  },
});

const defaultProps = {
  filterData: [] as Array<string>,
};

const defaultStates = {
  isVisible: false,
};

type FilterState = Partial<typeof defaultStates>;

export type FilterListProps = {
  onFilterSelected: {(selectedOption: string): void};
  onClosePressed: {(): void};
} & Partial<typeof defaultProps>;

type FilterItemProps = {
  onFilterItemClicked: {(selectedOption: string): void};
  data: string;
};

const FilterListItem: FunctionComponent<FilterItemProps> = (props) => {
  const {data, onFilterItemClicked} = props;
  const onFilterValueSelected = useCallback(() => {
    onFilterItemClicked && onFilterItemClicked(data);
  }, [onFilterItemClicked, data]);
  return (
    <Button
      style={[styles.filterListItemSontainer]}
      touchableProps={{
        touchable: 'highLight',
        onPress: onFilterValueSelected,
      }}
      textProps={{
        textColor: {color: Colors.white},
        fontFamily: FontStyles.bold,
        fontSize: Sizes.largeMedPlus,
      }}
      text={data}
    />
  );
};

class FilterListModal extends PureComponent<FilterListProps, FilterState> {
  constructor(props: FilterListProps) {
    super(props);
    this.state = defaultStates;
  }

  onItemSelected = (option: string) => {
    this.props.onFilterSelected && this.props.onFilterSelected(option);
  };

  renderItem = ({item}: {item: string}) => {
    return (
      <FilterListItem data={item} onFilterItemClicked={this.onItemSelected} />
    );
  };

  keyExtractor = (item: string) => {
    return item;
  };

  footer = () => {
    return (
      <Button
        style={[styles.closeButtonContainer]}
        touchableProps={{
          touchable: 'highLight',
          onPress: this.props.onClosePressed && this.props.onClosePressed,
        }}
        textProps={{
          textColor: {color: Colors.white},
          fontFamily: FontStyles.bold,
          fontSize: Sizes.largeMedPlus,
        }}
        text={'Close'}
      />
    );
  };

  render() {
    return (
      <View style={[styles.modalContainer]}>
        {this.props.filterData && this.props.filterData.length > 0 ? (
          <FlatList
            data={this.props.filterData}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            ListFooterComponent={this.footer}
          />
        ) : (
          <TextView>{'No values to filter from!'}</TextView>
        )}
      </View>
    );
  }
}

export default FilterListModal;
