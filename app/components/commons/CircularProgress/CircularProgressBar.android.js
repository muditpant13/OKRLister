import React from 'react';
import PropTypes from 'prop-types';
import {requireNativeComponent, ViewPropTypes} from 'react-native';

const CircularProgressBar = (props) => <CircularProgressBar {...props} />;

CircularProgressBar.propTypes = {
  ...ViewPropTypes,
  angleInterpolator: PropTypes.oneOf([
    'linear',
    'accelerateDecelerate',
    'decelerate',
    'accelerate',
    'fastOutSlowIn',
  ]),
  circularProgressBarStyle: PropTypes.oneOf(['NORMAL', 'ROUNDED']),
  color: PropTypes.string,
  colors: PropTypes.array,
  maxSweepAngle: PropTypes.number,
  minSweepAngle: PropTypes.number,
  rotationSpeed: PropTypes.number,
  strokeWidth: PropTypes.number,
  sweepInterpolator: PropTypes.oneOf([
    'linear',
    'accelerateDecelerate',
    'decelerate',
    'accelerate',
    'fastOutSlowIn',
  ]),
  sweepSpeed: PropTypes.number,
};

export default requireNativeComponent('CircularProgressBar');
