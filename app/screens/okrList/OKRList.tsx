import React, {PureComponent} from 'react';
import {StyleSheet, View, Dimensions, ViewStyle, FlatList} from 'react-native';
import {getColor, Colors} from '../../styles/colors';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {fetchOKRData} from './api/APICalls';
import {OKRViewData, OKRViewDataEntry} from './api/Models';
import ProgressBar from '../../components/commons/CircularProgress';
import {OkrListItem} from './OkrListItem';
import {getSpace, Spaces} from '../../styles/spaces';
import {Button} from '../../components/molecules/Button';
import {FontStyles} from '../../styles/fonts/names';
import {Sizes} from '../../styles/fonts/sizes';
import Modal from 'react-native-modal';
import FilterListModal from '../../components/compounds/FilterListModal';
import {filterOkrViewData} from './utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: getColor({color: Colors.white}),
  },
  progressBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    backgroundColor: getColor({color: Colors.white}),
    marginBottom: '10%',
  },
  button: {
    paddingVertical: getSpace(Spaces.small),
    paddingHorizontal: getSpace(Spaces.subMedium),
    borderRadius: 30,
    borderColor: getColor({color: Colors.buttonFill, opacity: 60}),
    backgroundColor: getColor({color: Colors.buttonFill, opacity: 60}),
    position: 'absolute',
    bottom: '0%',
    alignSelf: 'center',
  },
  buttonText: {
    paddingVertical: getSpace(Spaces.small),
    paddingHorizontal: getSpace(Spaces.small),
  },
  modalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const defaultStates = {
  okrViewdata: [] as Array<OKRViewDataEntry>,
  okrCategories: [] as Array<string>,
  isDataLoaded: false,
  isModalVisible: false,
};

export type OKRListScreenProps = {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, any>;
};

type OkrListState = Partial<typeof defaultStates>;

class OKRList extends PureComponent<OKRListScreenProps, OkrListState> {
  OkrAllViewData: Array<OKRViewDataEntry> = [];

  constructor(props: OKRListScreenProps) {
    super(props);
    const {} = props.route.params || {};
    this.state = defaultStates;
  }

  componentDidMount() {
    fetchOKRData()
      .then((okrViewData: OKRViewData) => {
        if (okrViewData) {
          // save original Okrdata this is for fitering purpose
          // all filtering will occur on this
          this.OkrAllViewData = [...okrViewData.viewData];
          this.setState({
            okrViewdata: okrViewData.viewData,
            okrCategories: okrViewData.categories,
            isDataLoaded: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isDataLoaded: false,
        });
      });
  }

  onShowHistoryPress = () => {};

  onTakeTestPress = () => {};

  onKnowMorePress = () => {};

  onHomePress = () => {
    this.props.navigation && this.props.navigation.popToTop();
  };

  renderItem = ({item, index}: {item: OKRViewDataEntry; index: number}) => {
    return <OkrListItem item={item} index={index} />;
  };

  keyExtractor = (item: OKRViewDataEntry) => {
    return item.data.id;
  };

  renderOKRData = () => {
    return (
      <FlatList
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        data={this.state.okrViewdata}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  };

  onFilterSelected = (filterOption: string) => {
    this.setState({
      isModalVisible: false,
      okrViewdata: filterOkrViewData(this.OkrAllViewData, filterOption),
    });
  };

  onFilterClick = () => {
    this.setState({isModalVisible: true});
  };

  renderFilterButton = () => {
    return (
      <Button
        style={[styles.button]}
        touchableProps={{
          touchable: 'highLight',
          underlayColor: 'transparent',
          onPress: this.onFilterClick,
          disabled: false,
        }}
        textProps={{
          style: styles.buttonText,
          textColor: {color: Colors.white},
          fontFamily: FontStyles.bold,
          fontSize: Sizes.large,
        }}
        text={'Filter Results'}
      />
    );
  };

  closeFilterListModal = () => {
    this.setState({isModalVisible: false});
  };

  render() {
    const {height, width} = Dimensions.get('window');
    const containerDimStyle: ViewStyle = {height: height, width: width};
    return (
      <View style={[styles.container, containerDimStyle]}>
        {this.state.isDataLoaded ? (
          this.renderOKRData()
        ) : (
          <View style={styles.progressBar}>
            <ProgressBar />
          </View>
        )}
        {this.renderFilterButton()}
        <Modal style={styles.modalStyle} isVisible={this.state.isModalVisible}>
          <FilterListModal
            onClosePressed={this.closeFilterListModal}
            filterData={this.state.okrCategories}
            onFilterSelected={this.onFilterSelected}
          />
        </Modal>
      </View>
    );
  }
}

export default OKRList;
