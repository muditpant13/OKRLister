import {StyleSheet, View, ViewPropTypes} from 'react-native';
import CircularProgressBar from './CircularProgressBar';
import React from 'react';
import {getColor, Colors} from '../../../styles/colors';

const progressBarColors = [
  getColor({color: Colors.primaryColor}),
  getColor({color: Colors.rightGradient}),
  getColor({color: Colors.leftGradient}),
];

const progressBarContainer = 40;
const progressBarSize = 32;

const styles = StyleSheet.create({
  container: {
    width: progressBarContainer,
    height: progressBarContainer,
    backgroundColor: getColor({color: Colors.white}),
    borderRadius: progressBarContainer,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    width: progressBarSize,
    height: progressBarSize,
  },
});

const ProgressBar = ({style}) => (
  <View style={[styles.container, style]}>
    <CircularProgressBar
      color={progressBarColors}
      rotationDuration={2000}
      size={progressBarSize}
      style={styles.progressBar}
      sweepDuration={750}
      thickness={2}
    />
  </View>
);

ProgressBar.propTypes = {style: ViewPropTypes.style};

export default ProgressBar;
