import React from 'react';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import CircularProgressBar from './CircularProgressBar';
import {getColor, Colors} from '../../../styles/colors';

const progressBarColors = [
  getColor({color: Colors.primaryColor}),
  getColor({color: Colors.rightGradient}),
  getColor({color: Colors.leftGradient}),
];

const progressBarContainer = 40;
const progressBarSize = 30;

const styles = StyleSheet.create({
  container: {
    width: progressBarContainer,
    height: progressBarContainer,
    backgroundColor: getColor({color: Colors.white}),
    elevation: 2,
    borderRadius: progressBarContainer,
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
      colors={progressBarColors}
      maxSweepAngle={300}
      minSweepAngle={20}
      rotationSpeed={1}
      strokeWidth={5}
      style={styles.progressBar}
      sweepSpeed={1}
    />
  </View>
);

ProgressBar.propTypes = {style: ViewPropTypes.style};

export default ProgressBar;
